import express from "express";
import { webScraper } from "../controllers/scrape.controller.js";

const router = express.Router();

router.post("/scrape/web", webScraper);
export default router;
