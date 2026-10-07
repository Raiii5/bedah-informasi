import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, readFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require("../.audit/node_modules/playwright");
const { default: AxeBuilder } = require("../.audit/node_modules/@axe-core/playwright");
const baseURL = process.env.TEST_URL ?? "http://127.0.0.1:3210";
const original = await readFile(new URL("../public/assets/modul-ajar.pdf", import.meta.url));
assert.equal(original.subarray(0, 5).toString(), "%PDF-");
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({ acceptDownloads: true, reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => {
  if (message.type() === "error" && /hydrat|didn't match|uncaught/i.test(message.text())) errors.push(message.text());
});
const modal = page.getByRole("dialog", { name: "Modul ajar", exact: true });
const frame = modal.getByRole("region", { name: "Dokumen PDF modul ajar", exact: true });
const trigger = page.getByRole("button", { name: "Buka Modul PDF", exact: true });
await mkdir(".audit/screenshots", { recursive: true });

async function open() {
  await trigger.click();
  await frame.waitFor({ state: "visible" });
  assert.equal(await modal.getByRole("heading", { name: "PDF belum tersedia" }).count(), 0);
  await frame.locator("canvas").first().waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector("#pdf-viewer canvas")?.height > 0);
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), "hidden");
}
async function assertClosed() {
  await page.waitForFunction(() => !document.getElementById("pdf-viewer").open);
  await page.waitForFunction(() => document.documentElement.style.overflow === "");
  assert.equal(await frame.count(), 0, "Closing unloads the PDF document");
  assert.equal(await trigger.evaluate(element => element === document.activeElement), true, "Focus returns to the opener");
}

try {
  const response = await context.request.get(`${baseURL}/assets/modul-ajar.pdf`);
  assert.equal(response.status(), 200);
  assert.match(response.headers()["content-type"], /application\/pdf/i);
  assert.deepEqual(await response.body(), original, "The URL serves the original PDF bytes");
  await page.goto(baseURL);

  for (const width of [320, 375, 390, 414, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await open();
    const dimensions = await modal.evaluate(element => ({ width: element.clientWidth, scrollWidth: element.scrollWidth, height: element.getBoundingClientRect().height, top: element.getBoundingClientRect().top }));
    assert.ok(dimensions.width <= width && dimensions.scrollWidth <= dimensions.width, `No modal overflow at ${width}`);
    assert.ok(dimensions.top >= 0 && dimensions.top + dimensions.height <= 900, `Modal fits height at ${width}`);
    assert.ok((await frame.boundingBox()).height >= 400, `Comfortable PDF height at ${width}`);
    if (width === 320 || width === 1440) {
      const result = await new AxeBuilder({ page }).include("#pdf-viewer").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      assert.deepEqual(result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), [], `Viewer accessibility at ${width}`);
    }
    await modal.getByRole("button", { name: "Tutup viewer PDF", exact: true }).click();
    await assertClosed();
    console.log(`PDF responsive ${width}: PASS`);
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await open();
  const downloadLink = modal.getByRole("link", { name: "Download PDF", exact: false });
  const [download] = await Promise.all([page.waitForEvent("download"), downloadLink.click()]);
  assert.equal(download.suggestedFilename(), "modul-ajar.pdf");
  assert.deepEqual(await readFile(await download.path()), original, "Downloaded PDF is identical to the original");

  const newTabLink = modal.getByRole("link", { name: "Buka di Tab Baru", exact: false });
  assert.equal(await newTabLink.getAttribute("target"), "_blank");
  assert.equal(await newTabLink.getAttribute("rel"), "noopener noreferrer");
  const [newTab] = await Promise.all([context.waitForEvent("page"), newTabLink.click()]);
  await newTab.waitForURL(`${baseURL}/assets/modul-ajar.pdf`);
  await newTab.close();
  await page.bringToFront();

  // Scroll the actual PDF while the background page stays fixed.
  const box = await frame.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(1800);
  const before = await frame.screenshot({ path: ".audit/screenshots/pdf-before-scroll.png" });
  const pageScroll = await page.evaluate(() => scrollY);
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.keyboard.press("PageDown");
  await page.waitForFunction(() => document.querySelector(".pdf-scroll").scrollTop > 0);
  const keyboardScroll = await frame.evaluate(element => element.scrollTop);
  await page.mouse.wheel(0, 900);
  await page.waitForFunction(previous => document.querySelector(".pdf-scroll").scrollTop > previous, keyboardScroll);
  await page.waitForTimeout(700);
  const after = await frame.screenshot({ path: ".audit/screenshots/pdf-after-scroll.png" });
  assert.ok(!before.equals(after), "PDF content scroll changes the rendered document");
  assert.equal(await page.evaluate(() => scrollY), pageScroll, "Background page stays fixed while scrolling the PDF");
  await page.screenshot({ path: ".audit/screenshots/pdf-desktop.png" });
  await modal.getByRole("button", { name: "Perbesar PDF", exact: true }).click();
  await modal.getByText("125%", { exact: true }).waitFor();
  await modal.getByRole("button", { name: "Perkecil PDF", exact: true }).click();
  await modal.getByText("100%", { exact: true }).waitFor();
  await frame.focus();
  await page.keyboard.press("Escape");
  await assertClosed();

  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await open();
    assert.ok((await frame.boundingBox()).height >= 140, "PDF remains visible on short screens");
    assert.equal(await modal.evaluate(element => element.scrollWidth <= element.clientWidth), true);
    await page.keyboard.press("Tab");
    assert.equal(await modal.evaluate(element => element.contains(document.activeElement)), true, "Keyboard focus stays inside the modal");
    await page.keyboard.press("Escape");
    await assertClosed();
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await open();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: ".audit/screenshots/pdf-mobile-ready.png" });
  await modal.getByRole("button", { name: "Tutup viewer PDF", exact: true }).click();
  await assertClosed();

  // A real 404 must show the fallback; retry must recover once the file is available.
  await page.route("**/assets/modul-ajar.pdf", route => route.fulfill({ status: 404, body: "Not found" }));
  await trigger.click();
  await modal.getByRole("heading", { name: "PDF belum tersedia", exact: true }).waitFor();
  assert.equal(await frame.count(), 0);
  await page.unroute("**/assets/modul-ajar.pdf");
  await modal.getByRole("button", { name: "Coba lagi", exact: true }).click();
  await frame.waitFor({ state: "visible" });
  assert.equal(await modal.getByRole("heading", { name: "PDF belum tersedia" }).count(), 0);
  await page.keyboard.press("Escape");
  await assertClosed();

  // A network failure is distinct from a missing PDF and must still allow closing.
  await page.route("**/assets/modul-ajar.pdf", route => route.abort("failed"));
  await trigger.click();
  await modal.getByRole("heading", { name: "PDF belum dapat dibuka", exact: true }).waitFor();
  await page.keyboard.press("Escape");
  await assertClosed();
  await page.unroute("**/assets/modul-ajar.pdf");
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  console.log("PASS: original PDF, internal scroll, download integrity, new tab, Close/Escape, focus, fallback/retry, network error, responsive, and accessibility.");
} catch (error) {
  await page.screenshot({ path: ".audit/screenshots/pdf-failure.png" });
  throw error;
} finally {
  await browser.close();
}
