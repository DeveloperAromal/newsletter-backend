import puppeteer from "puppeteer";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";

async function extractContent(page) {
  return await page.evaluate(() => {
    const headings = Array.from(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    ).map((el) => el.textContent?.trim() || "");

    const paragraphs = Array.from(document.querySelectorAll("p")).map(
      (el) => el.textContent?.trim() || ""
    );

    return [...headings, ...paragraphs].join(" ");
  });
}

export async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({
    headless: "new", // use 'true' if you're using older puppeteer
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForSelector("h1, p", { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000); // give time for JS content to load
  } catch (e) {
    console.warn("[Puppeteer] Navigation or wait error:", e.message);
  }

  const textContent = await extractContent(page);
  await browser.close();

  return textContent;
}
