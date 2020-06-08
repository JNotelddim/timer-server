const express = require("express");
const app = express();
const port = 3000;
const router = require("./controllers");

app.use("/", router);

app.listen(port, () =>
  console.log(`Timer server listening at http://localhost:${port}`)
);
