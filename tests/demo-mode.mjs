import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require("../.audit/node_modules/playwright");
const { default: AxeBuilder } = require("../.audit/node_modules/@axe-core/playwright");
const baseURL = process.env.TEST_URL ?? "http://127.0.0.1:3210";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const errors = [];
context.on("page", page => {
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /hydrat|didn't match|uncaught/i.test(message.text())) errors.push(message.text());
  });
});
// Audit the app's actual storage calls, including reads before hydration completes.
await context.addInitScript(() => {
  window.demoStorageCalls = [];
  for (const method of ["getItem", "setItem", "removeItem", "clear"]) {
    const original = Storage.prototype[method];
    Storage.prototype[method] = function (...args) {
      if (new URLSearchParams(location.search).get("demo") === "1" && (method === "clear" || String(args[0]).startsWith("bedah-informasi:"))) {
        window.demoStorageCalls.push({ method, key: args[0] });
      }
      return original.apply(this, args);
    };
  }
});
await mkdir(".audit/screenshots", { recursive: true });
const normal = await context.newPage();
let demo;

async function progress(page, percent) {
  await page.waitForFunction(value => document.querySelector('[role="progressbar"][aria-label="Progress belajar"]')?.getAttribute("aria-valuenow") === String(value), percent);
}
async function completeChapter(page, name) {
  await page.getByRole("tab", { name, exact: false }).click();
  await page.getByRole("tabpanel").getByRole("button", { name: "Tandai bab selesai", exact: true }).click();
}
async function savedData() {
  return normal.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
}
async function assertNoDemoStorage(page) {
  assert.deepEqual(await page.evaluate(() => window.demoStorageCalls), [], "Demo never reads, writes, or deletes stored learning data");
}

try {
  await normal.goto(baseURL);
  for (const chapter of ["Kenali artikel", "Fakta & opini", "Keabsahan data", "Verifikasi digital"]) await completeChapter(normal, chapter);
  await progress(normal, 50);
  await normal.locator("#reflection-note-0").fill("Catatan normal harus tetap tersimpan.");
  await normal.locator("#latihan").getByRole("button", { name: "Alasan", exact: false }).click();
  await normal.locator("#practice-reason-0").fill("Jawaban normal milik siswa.");
  await normal.locator("#evaluasi").getByRole("radio").first().check();
  await normal.locator("#tantangan").getByRole("button", { name: "Fakta", exact: true }).click();
  await normal.evaluate(() => localStorage.setItem("student-id", "student-demo-isolation-check"));
  const originalData = await savedData();
  await normal.reload();
  await progress(normal, 50);
  assert.equal(await normal.locator("#reflection-note-0").inputValue(), "Catatan normal harus tetap tersimpan.");
  assert.equal(await normal.getByLabel("Mode presentasi", { exact: true }).count(), 0);
  const reopened = await context.newPage();
  await reopened.goto(baseURL);
  await progress(reopened, 50);
  await reopened.close();
  console.log("PASS: normal progress and student notes survive refresh and reopening.");

  demo = await context.newPage();
  await demo.goto(`${baseURL}/?demo=1`);
  await demo.getByText("MODE PRESENTASI", { exact: true }).waitFor();
  await progress(demo, 0);
  assert.equal(await demo.locator("#reflection-note-0").inputValue(), "");
  assert.equal(await demo.locator("#evaluasi").getByRole("radio").first().isChecked(), false);
  assert.equal(await demo.locator("#tantangan").getByRole("button", { name: "Fakta", exact: true }).isEnabled(), true);
  await demo.locator("#latihan").getByRole("button", { name: "Alasan", exact: false }).click();
  assert.equal(await demo.locator("#practice-reason-0").inputValue(), "");
  await completeChapter(demo, "Kenali artikel");
  await completeChapter(demo, "Fakta & opini");
  await progress(demo, 25);
  await demo.locator("#reflection-note-0").fill("Catatan sementara presentasi.");
  await demo.locator("#practice-reason-0").fill("Jawaban sementara presentasi.");
  await demo.locator("#evaluasi").getByRole("radio").nth(2).check();
  await demo.locator("#tantangan").getByRole("button", { name: "Opini", exact: true }).click();
  await assertNoDemoStorage(demo);
  assert.deepEqual(await savedData(), originalData, "Demo activities leave ALL normal storage unchanged");

  // Section navigation must keep both demo mode and the current ephemeral state.
  const navigation = demo.getByRole("navigation", { name: "Navigasi utama", exact: true });
  const materialLink = navigation.getByRole("link", { name: "Materi", exact: true });
  assert.equal(await materialLink.getAttribute("href"), "/?demo=1#materi", "Opening a navigation link in a new tab retains demo mode");
  await materialLink.click();
  assert.equal(new URL(demo.url()).search, "?demo=1");
  await progress(demo, 25);
  await demo.locator("header").getByRole("button", { name: "Mulai Belajar", exact: true }).click();
  assert.equal(new URL(demo.url()).search, "?demo=1");
  await demo.setViewportSize({ width: 390, height: 844 });
  await demo.getByRole("button", { name: "Buka menu navigasi" }).click();
  await demo.locator("#mobile-menu").getByRole("link", { name: "Latihan", exact: false }).click();
  assert.equal(new URL(demo.url()).search, "?demo=1");
  await progress(demo, 25);
  assert.equal(await demo.locator("#reflection-note-0").inputValue(), "Catatan sementara presentasi.");
  await assertNoDemoStorage(demo);
  console.log("PASS: demo starts empty, activities work, and desktop/mobile navigation preserves demo mode.");

  const newTab = await context.newPage();
  await newTab.goto(`${baseURL}/?demo=1`);
  await newTab.getByText("MODE PRESENTASI", { exact: true }).waitFor();
  await progress(newTab, 0);
  assert.equal(await newTab.locator("#reflection-note-0").inputValue(), "");
  await completeChapter(newTab, "Keabsahan data");
  await progress(newTab, 13);
  await progress(demo, 25);
  await assertNoDemoStorage(newTab);
  await newTab.close();

  await demo.reload();
  await demo.getByText("MODE PRESENTASI", { exact: true }).waitFor();
  await progress(demo, 0);
  assert.equal(await demo.locator("#reflection-note-0").inputValue(), "");
  assert.equal(await demo.locator("#evaluasi").getByRole("radio").nth(2).isChecked(), false);
  assert.equal(await demo.locator("#tantangan").getByRole("button", { name: "Opini", exact: true }).isEnabled(), true);
  await demo.locator("#latihan").getByRole("button", { name: "Alasan", exact: false }).click();
  assert.equal(await demo.locator("#practice-reason-0").inputValue(), "");
  await assertNoDemoStorage(demo);
  assert.deepEqual(await savedData(), originalData);
  console.log("PASS: demo refresh and new tabs start at 0; demo tabs are independent.");

  for (const width of [320, 390, 768, 1440]) {
    await demo.setViewportSize({ width, height: 900 });
    await demo.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    assert.equal(await demo.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.body.scrollWidth <= innerWidth), true, `No demo UI overflow at ${width}`);
    if (width === 320 || width === 1440) {
      const axe = await new AxeBuilder({ page: demo }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      assert.deepEqual(axe.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), [], "Presentation UI accessibility");
      await demo.screenshot({ path: `.audit/screenshots/demo-${width}.png` });
    }
  }
  const exit = demo.getByRole("button", { name: "Keluar dari Mode Presentasi", exact: true });
  await exit.focus();
  await demo.keyboard.press("Enter");
  await demo.waitForURL(`${baseURL}/`);
  await progress(demo, 50);
  assert.equal(await demo.getByText("MODE PRESENTASI", { exact: true }).count(), 0);
  assert.equal(await demo.locator("#reflection-note-0").inputValue(), "Catatan normal harus tetap tersimpan.");
  assert.deepEqual(await savedData(), originalData);
  await normal.reload();
  await progress(normal, 50);
  for (const query of ["demo=0", "demo=true", "demo="]) {
    await demo.goto(`${baseURL}/?${query}`);
    await progress(demo, 50);
    assert.equal(await demo.getByText("MODE PRESENTASI", { exact: true }).count(), 0);
  }
  console.log("PASS: exiting returns to / with normal progress still 50%; only demo=1 enables demo.");

  // Ephemeral mode must work even if access to localStorage is blocked entirely.
  const blocked = await browser.newContext();
  const blockedPage = await blocked.newPage();
  await blockedPage.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage unavailable", "SecurityError"); } });
  });
  await blockedPage.goto(`${baseURL}/?demo=1`);
  await blockedPage.getByText("MODE PRESENTASI", { exact: true }).waitFor();
  await progress(blockedPage, 0);
  await completeChapter(blockedPage, "Kenali artikel");
  await progress(blockedPage, 13);
  await blockedPage.reload();
  await progress(blockedPage, 0);
  await blocked.close();
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  console.log("PASS: demo works with localStorage blocked; no runtime/hydration errors.");
} catch (error) {
  console.error("Browser errors:", errors);
  console.error("Progress at failure:", await (demo ?? normal).getByRole("progressbar").getAttribute("aria-valuenow"));
  await (demo ?? normal).screenshot({ path: ".audit/screenshots/demo-failure.png" });
  throw error;
} finally {
  await browser.close();
}
