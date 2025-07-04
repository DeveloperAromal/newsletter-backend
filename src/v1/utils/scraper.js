import { chromium } from "playwright";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";

async function extractContent(page) {
  return await page.evaluate(() => {
    const headings = Array.from(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    ).map((el) => el.textContent.trim());
    const paragraphs = Array.from(document.querySelectorAll("p")).map((el) =>
      el.textContent.trim()
    );
    return [...headings, ...paragraphs].join(" ");
  });
}

export async function scrapeWebsite(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: USER_AGENT,
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector("h1, p", { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
  } catch (e) {
    console.warn("[Playwright] Navigation or wait error:", e.message);
  }

  const textContent = await extractContent(page);
  await browser.close();

  return textContent;
}
