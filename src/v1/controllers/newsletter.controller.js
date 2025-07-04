import {
  newsletterAi,
  summaryMakerAi,
} from "../services/newsletter.service.js";

export const createNewsLetter = async (req, res) => {
  try {
    const { transcript } = req.body;

    const resData = await newsletterAi(transcript);
    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};

export const createSummary = async (req, res) => {
  try {
    const { transcript } = req.body;

    const resData = await summaryMakerAi(transcript);
    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};
