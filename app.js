import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "./env.js";
import router from "./controllers/index.js";
import models, { connectDb } from "./models/index.js";

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3001",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],
};

const app = express();

app.set("trust proxy", true);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use("/", cors(corsOptions), router);

connectDb()
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Timer api listening on port ${process.env.PORT}!`)
    );
  })
  .catch((err) => console.log(err));
