import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";

const base = process.env.ATLAS_URL || "http://127.0.0.1:8092/";
const browser = await chromium.launch({
  channel: process.env.ATLAS_TEST_BROWSER || "chromium",
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 950 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  await page.getByRole("link", { name: "Spațiu", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Sistemul Solar în 3D" }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "output/space-home.png" });
  await expect(page.locator(".space-scene canvas")).toBeAttached();
  await expect(
    page.getByRole("button", { name: "Pornește animația" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Detaliu planetar" }).click();
  await expect(
    page.getByRole("heading", { name: "Saturn", exact: true }),
  ).toBeVisible();
  await page.locator(".scene-viewport").press("ArrowRight");
  await page.getByRole("button", { name: "Mărește modelul" }).click();
  await page.getByRole("button", { name: "Resetează vederea" }).click();
  await page
    .locator(".observatory")
    .screenshot({ path: "output/space-saturn.png" });
  await page.getByRole("button", { name: "Neptun", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Neptun", exact: true }),
  ).toBeVisible();
  await page.getByRole("slider", { name: /Semiaxa mare/ }).fill("4");
  await expect(page.getByText("8 ani tereștri")).toBeVisible();
  await page.getByRole("button", { name: "Tranzitul unei exoplanete" }).click();
  await page.getByRole("slider", { name: /Raza planetei/ }).fill("0.2");
  await expect(page.getByText("4%", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Sera orbitală" }).click();
  await page.getByRole("checkbox", { name: "Iluminare LED" }).uncheck();
  await expect(page.getByText("Creștere limitată")).toBeVisible();
  await page.getByRole("button", { name: "Avansat" }).click();
  await page
    .getByRole("textbox", { name: "Caută în lecții" })
    .fill("universul timpuriu");
  await page
    .locator(".space-lesson summary")
    .filter({ hasText: "Universul timpuriu și radiația de fond" })
    .click();
  await expect(page.getByText(/380.000 de ani/)).toBeVisible();
  await page
    .locator(".space-quiz-options")
    .getByRole("button", { name: "Venus", exact: true })
    .click();
  await expect(page.getByText(/Corect! .*Atmosfera/)).toBeVisible();
  for (let i = 0; i < 8; i++) {
    if (i > 0) await page.locator(".space-quiz-options button").first().click();
    await page
      .getByRole("button", {
        name: i === 7 ? "Vezi rezultatul" : "Următoarea întrebare",
      })
      .click();
  }
  await expect(page.getByText(/Ai obținut \d din 8 puncte/)).toBeVisible();
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(base + "#/spatiu");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(
    page.getByRole("heading", { name: "Sistemul Solar în 3D" }),
  ).toBeVisible();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.screenshot({ path: "output/space-mobile.png" });
  const fallback = await browser.newPage();
  await fallback.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      return kind.startsWith("webgl")
        ? null
        : getContext.call(this, kind, ...args);
    };
  });
  await fallback.goto(base + "#/spatiu");
  await expect(fallback.getByText(/WebGL indisponibil/)).toBeVisible();
  await fallback.getByRole("button", { name: "Luna", exact: true }).click();
  await expect(
    fallback.getByRole("heading", { name: "Luna", exact: true }),
  ).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    "Verified WebGL, reduced motion, world selection, all three labs, lesson filters, quiz, mobile layout, and WebGL fallback.",
  );
} finally {
  await browser.close();
}
