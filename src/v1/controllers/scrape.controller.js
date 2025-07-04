import { ScrapeWeb } from "../services/scrape.service.js";

export const webScraper = async (req, res) => {
  try {
    const { url } = req.body;
    const resData =await ScrapeWeb(url);

    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};
