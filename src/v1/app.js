import express from "express";
import cors from "cors";
import newsletterCreatorRoute from "./routes/newsletter.route.js";
import scrapeRoute from "./routes/scrape.route.js"
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", newsletterCreatorRoute);
app.use("/api/v1", scrapeRoute);


export default app;
