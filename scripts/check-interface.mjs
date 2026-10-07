import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:8080");
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "output/atlas-home.png", fullPage: true });
await page.getByRole("link", { name: /Începe să explorezi/ }).click();
await page.getByRole("heading", { name: "Țările din Europa" }).waitFor();
await page
  .getByRole("textbox", { name: "Caută o țară sau o capitală" })
  .fill("bucuresti");
assert.equal(await page.locator(".country-row").count(), 1);
assert.equal(await page.locator(".country-row h3").textContent(), "România");
await page
  .getByRole("textbox", { name: "Caută o țară sau o capitală" })
  .fill("");
await page.screenshot({ path: "output/atlas-learning.png", fullPage: true });
await page.getByRole("button", { name: "Antarctica", exact: true }).click();
await page.getByRole("heading", { name: "Un continent fără țări" }).waitFor();
await page.goto("http://127.0.0.1:8080/#/geografie/quiz");
await page.locator(".country-picker summary").click();
await page
  .getByRole("textbox", { name: "Filtrează țările de repetat" })
  .fill("romania");
await page.locator(".picker-list input").check();
await page.getByRole("button", { name: "Începe quizul" }).click();
await page.getByRole("heading", { name: "România", exact: true }).waitFor();
await page.getByRole("button", { name: "Arată continentul" }).hover();
await expect(page.getByRole("tooltip")).toHaveCSS("opacity", "1");
assert.equal(
  await page.getByRole("button", { name: "Verifică răspunsul" }).isDisabled(),
  true,
);
await page.screenshot({ path: "output/atlas-quiz.png", fullPage: true });
await page
  .locator(".answer-options button")
  .filter({ hasText: "București" })
  .click();
await page.getByRole("button", { name: "Verifică răspunsul" }).click();
await page.getByText("Corect! Foarte bine.").waitFor();
await page.getByRole("button", { name: "Vezi rezultatul" }).click();
await page
  .getByRole("heading", { name: "Felicitări, exploratorule!" })
  .waitFor();
assert.equal(await page.locator(".score-number").textContent(), "100%");
await page.getByRole("button", { name: "Repetă quizul" }).click();
await page
  .locator(".answer-options button")
  .filter({ hasNotText: "București" })
  .first()
  .click();
await page.getByRole("button", { name: "Verifică răspunsul" }).click();
await page.getByText("Răspunsul corect: București", { exact: true }).waitFor();
await page.getByRole("button", { name: "Vezi rezultatul" }).click();
assert.equal(await page.locator(".score-number").textContent(), "0%");
await page.getByRole("button", { name: "Schimbă selecția" }).click();
await page.getByRole("button", { name: /Continente/ }).click();
await page.getByRole("button", { name: "Începe quizul" }).click();
assert.equal(await page.locator(".answer-options button").count(), 4);
await page.getByRole("heading", { name: "Pe ce continent se află?" }).waitFor();
assert.equal(
  await page.getByRole("button", { name: "Arată continentul" }).count(),
  0,
);
await page.goto("http://127.0.0.1:8080/#/matematica");
await page.getByRole("heading", { name: "Exersează matematica" }).waitFor();
await page.getByRole("button", { name: /Adunare/ }).click();
await page.getByRole("button", { name: /Începe exercițiile/ }).click();
await page.getByRole("button", { name: /Înapoi/ }).waitFor();
await page.setViewportSize({ width: 390, height: 844 });
for (const [route, file] of [
  ["/", "mobile-home"],
  ["/geografie", "mobile-learning"],
  ["/geografie/quiz", "mobile-quiz"],
]) {
  await page.goto("http://127.0.0.1:8080/#" + route);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    route + " overflows",
  );
  await page.screenshot({ path: `output/${file}.png`, fullPage: true });
}
assert.deepEqual(errors, []);
console.log(
  "Passed: desktop navigation, learning search, Antarctica, capital quiz, continent quiz, score, mathematics, mobile layouts, no browser errors.",
);
await browser.close();
