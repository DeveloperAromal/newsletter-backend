import app from "./src/v1/app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const base_url = process.env.APP_BASE_URL;

app.listen(port, () => {
  console.log(`${base_url}`);
});
