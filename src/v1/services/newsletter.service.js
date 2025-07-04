import { newsletterCreator, SummaryAi } from "../utils/ai.js";

export async function newsletterAi(link, transcript) {
  const news = await newsletterCreator(link, transcript);
  return news;
}

export async function summaryMakerAi(transcript) {
  const summaries = await SummaryAi(transcript);
  return summaries;
}
