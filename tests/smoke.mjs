import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require("../.audit/node_modules/playwright");
const { default: AxeBuilder } = require("../.audit/node_modules/@axe-core/playwright");
const baseURL = process.env.TEST_URL ?? "http://127.0.0.1:3210";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => {
  if (message.type() === "error" && /hydrat|didn't match|uncaught/i.test(message.text())) errors.push(message.text());
});
await mkdir(".audit/screenshots", { recursive: true });

async function accessibility(label) {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  assert.deepEqual(result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), [], label);
}

try {
  await page.goto(baseURL);
  await page.getByRole("button", { name: "Buka Modul PDF", exact: true }).waitFor();
  assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
  await accessibility("Initial homepage accessibility");

  for (const width of [320, 375, 390, 414, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const overflow = await page.evaluate(() => ({ body: document.body.scrollWidth, root: document.documentElement.scrollWidth, viewport: innerWidth }));
    assert.ok(overflow.body <= width && overflow.root <= width, `Overflow at ${width}: ${JSON.stringify(overflow)}`);
    if (width < 1024) {
      await page.getByRole("button", { name: "Buka menu navigasi" }).click();
      const menu = page.locator("#mobile-menu");
      assert.equal(await menu.evaluate(element => element.open), true);
      if (width === 320) await accessibility("Mobile menu accessibility");
      await page.keyboard.press("Escape");
      assert.equal(await menu.evaluate(element => element.open), false);
      assert.equal(await page.getByRole("button", { name: "Buka menu navigasi" }).evaluate(element => element === document.activeElement), true);
      await page.getByRole("button", { name: "Buka menu navigasi" }).click();
      await menu.getByRole("link", { name: "Materi", exact: false }).click();
      await page.waitForFunction(() => location.hash === "#materi");
    } else {
      assert.equal(await page.getByRole("navigation", { name: "Navigasi utama", exact: true }).isVisible(), true);
    }
    console.log(`Responsive ${width}: PASS`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  // Exercise the genuine missing-file branch independently of the PDF on disk.
  await page.route("**/assets/modul-ajar.pdf", route => route.fulfill({ status: 404, body: "Not found" }));
  await page.getByRole("button", { name: "Buka Modul PDF", exact: true }).click();
  await page.getByRole("heading", { name: "PDF belum tersedia" }).waitFor();
  await accessibility("PDF fallback accessibility");
  await page.screenshot({ path: ".audit/screenshots/pdf-mobile.png" });
  await page.keyboard.press("Escape");
  await page.unroute("**/assets/modul-ajar.pdf");
  assert.equal(await page.getByRole("button", { name: "Buka Modul PDF", exact: true }).evaluate(element => element === document.activeElement), true);

  for (const choice of ["Cari peneliti dan sumber aslinya", "Belum; periksa bukti kausalitas", "Bandingkan judul dengan isi dan buktinya"]) await page.getByRole("button", { name: choice, exact: true }).click();
  assert.equal(await page.getByText("Cara berpikir yang tepat!", { exact: true }).count(), 3);

  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const name of ["Kenali artikel", "Verifikasi digital", "Fakta & opini"]) {
    await page.getByRole("tab", { name }).click();
    await page.getByRole("tabpanel").getByRole("button", { name: "Tandai bab selesai" }).click();
  }
  assert.ok(await page.locator("#latihan").getByRole("link", { name: "Kerjakan identifikasi" }).isVisible(), "Reading the facts chapter must not silently complete the identification game");
  await page.getByRole("tab", { name: "Fakta & opini" }).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: "Keabsahan data" }).getAttribute("aria-selected"), "true");

  const game = page.locator("#tantangan");
  for (const [i, choice] of ["Fakta", "Opini", "Fakta", "Opini", "Perlu konteks", "Opini"].entries()) {
    await game.getByRole("button", { name: choice, exact: true }).click();
    if (i < 5) await game.getByRole("button", { name: "Berikutnya", exact: true }).click();
  }
  await game.getByRole("heading", { name: "Enam klaim sudah dibedah!" }).waitFor();
  assert.ok(await game.getByText("6 dari 6 jawaban tepat.", { exact: false }).isVisible());

  for (const checkbox of await page.locator("#verifikasi").getByRole("checkbox").all()) await checkbox.check();
  await page.getByText("CLAIM CHECK COMPLETE", { exact: true }).waitFor();
  await page.locator("#verifikasi").getByRole("button", { name: "Lemah", exact: false }).click();
  assert.equal(await page.getByText("Pesan berantai, tangkapan layar tanpa konteks, klaim anonim.").isVisible(), true);

  await page.setViewportSize({ width: 320, height: 900 });
  const editor = page.locator("#editorial");
  const categories = ["Kandidat Fakta", "Opini", "Opini", "Kandidat Fakta", "Kandidat Fakta", "Opini Ahli", "Fakta tentang Prediksi", "Opini/Rekomendasi"];
  const actions = ["Verifikasi sumber", "Identifikasi narasumber", "Cek konteks", "Verifikasi sumber", "Periksa bukti kausalitas", "Identifikasi narasumber", "Verifikasi sumber", "Bandingkan data"];
  for (let i = 0; i < 8; i++) {
    await editor.getByRole("button", { name: `Buka klaim ${i + 1}`, exact: true }).click();
    await editor.getByRole("button", { name: categories[i], exact: true }).click();
    await editor.getByLabel("2. Pilih tindakan utama editor").selectOption(actions[i]);
    await editor.getByRole("button", { name: "Simpan analisis", exact: true }).click();
  }
  await editor.getByRole("button", { name: "BUTUH REVISI", exact: true }).click();
  await editor.getByLabel("Alasan putusan (minimal 15 karakter)").fill("Sumber data dan periode pengukuran belum diverifikasi melalui laporan asli.");
  await editor.getByRole("button", { name: "Kirim putusan", exact: false }).click();
  await editor.getByRole("heading", { name: "BUTUH REVISI", exact: true }).waitFor();
  assert.equal(await editor.getByText("100", { exact: false }).first().isVisible(), true);
  const editorOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  assert.ok(editorOverflow, "Completed editorial result fits 320px");
  await page.screenshot({ path: ".audit/screenshots/editor-mobile.png" });

  const practice = page.locator("#latihan");
  for (const name of ["Alasan", "Verifikasi mini", "HOTS"]) {
    await practice.getByRole("button", { name, exact: false }).click();
    for (const textarea of await practice.locator("textarea").all()) await textarea.fill("Perlu menelusuri sumber asli, waktu, konteks, metode, dan bukti pendukung sebelum menyimpulkan.");
  }
  await practice.getByRole("button", { name: "Tandai latihan selesai", exact: false }).click();

  const evaluation = page.locator("#evaluasi");
  // Wrong answers must not receive credit, and retry must clear the attempt.
  for (let i = 0; i < 5; i++) {
    await evaluation.getByRole("radio").nth(0).check();
    if (i < 4) await evaluation.getByRole("button", { name: "Berikutnya", exact: false }).click();
  }
  await evaluation.getByRole("button", { name: "Kumpulkan jawaban", exact: false }).click();
  await evaluation.getByText("0 dari 5 jawaban tepat.", { exact: false }).waitFor();
  await evaluation.getByRole("button", { name: "Coba lagi", exact: true }).click();
  for (const [i, answer] of [1, 2, 1, 1, 2].entries()) {
    await evaluation.getByRole("radio").nth(answer).check();
    if (i < 4) await evaluation.getByRole("button", { name: "Berikutnya", exact: false }).click();
  }
  await evaluation.getByRole("button", { name: "Kumpulkan jawaban", exact: false }).click();
  await evaluation.getByText("5 dari 5 jawaban tepat.", { exact: false }).waitFor();
  await page.screenshot({ path: ".audit/screenshots/evaluation-mobile.png" });

  for (const button of await page.locator("#refleksi").getByRole("button", { name: /^Sudah:/ }).all()) await button.click();
  await page.getByRole("progressbar", { name: "Progress belajar" }).getAttribute("aria-valuenow").then(value => assert.equal(value, "100"));
  await page.locator("#reflection-note-0").fill("Saya akan memeriksa sumber sebelum membagikan informasi.");
  await page.getByLabel("Cari istilah atau makna").fill("korelasi");
  assert.equal(await page.locator("#glosarium dt").count(), 1);
  await page.getByLabel("Cari istilah atau makna").fill("tidakadaistilahini");
  await page.getByText("Belum ada istilah yang cocok.", { exact: false }).waitFor();
  await page.getByLabel("Cari istilah atau makna").fill("");
  await accessibility("Completed learning flows accessibility");

  await page.reload();
  await evaluation.getByText("5 dari 5 jawaban tepat.", { exact: false }).waitFor();
  await page.waitForFunction(() => document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow") === "100");
  assert.equal(await page.locator("#reflection-note-0").inputValue(), "Saya akan memeriksa sumber sebelum membagikan informasi.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: ".audit/screenshots/desktop-top.png" });
  await page.screenshot({ path: ".audit/screenshots/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: ".audit/screenshots/mobile-top.png" });
  await page.screenshot({ path: ".audit/screenshots/mobile.png", fullPage: true });

  // Valid JSON with the wrong shape and malformed JSON must recover safely.
  await page.evaluate(() => {
    localStorage.setItem("bedah-informasi:v1:completed", "{}");
    localStorage.setItem("bedah-informasi:v1:evaluation", "{broken");
  });
  await page.reload();
  await page.waitForFunction(() => document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow") === "0");
  await evaluation.getByRole("radio").first().waitFor();
  // Reload with reduced motion already active to catch SSR/client style mismatches.
  assert.deepEqual(errors, [], "No browser runtime errors");

  const offlineContext = await browser.newContext();
  const offlineStoragePage = await offlineContext.newPage();
  await offlineStoragePage.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage unavailable", "SecurityError"); } });
  });
  await offlineStoragePage.goto(baseURL);
  await offlineStoragePage.getByRole("tab", { name: "Kenali artikel" }).click();
  await offlineStoragePage.getByRole("tabpanel").getByRole("button", { name: "Tandai bab selesai" }).click();
  await offlineStoragePage.waitForFunction(() => document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow") === "13");
  await offlineContext.close();
  console.log("PASS: quizzes, editorial, practice, reflection, glossary, PDF fallback, storage recovery, reduced motion, and accessibility.");
} catch (error) {
  // Attach a useful screenshot if a step fails.
  await page.screenshot({ path: ".audit/screenshots/failure.png", fullPage: false });
  throw error;
} finally {
  await browser.close();
}
