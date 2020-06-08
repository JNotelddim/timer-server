import express from "express";

import dotenv from "./env.js";
import router from "./controllers/index.js";
import models, { connectDb } from "./models/index.js";

const app = express();
app.use("/", router);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Timer api listening on port ${process.env.PORT}!`)
  );
});
