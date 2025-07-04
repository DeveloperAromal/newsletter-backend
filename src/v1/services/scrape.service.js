import { scrapeWebsite } from "../utils/scraper.js";

export async function ScrapeWeb(url) {
  const data = await scrapeWebsite(url);
  return data;
}
