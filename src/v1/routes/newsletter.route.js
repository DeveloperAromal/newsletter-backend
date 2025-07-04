import express from "express";
import { createNewsLetter, createSummary } from "../controllers/newsletter.controller.js";

const router = express.Router();

router.post("/create/newsletter", createNewsLetter);
router.post("/create/summary", createSummary);
export default router;
