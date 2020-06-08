import express from "express";

import router from "./controllers/index.js";
import models, { connectDb } from "./models/index.js";

const app = express();
app.use("/", router);

// app.listen(port, () =>
//   console.log(`Timer server listening at http://localhost:${port}`)
// );

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Timer api listening on port ${process.env.PORT}!`)
  );
});
