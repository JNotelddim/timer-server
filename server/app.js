const express = require("express");
const app = express();
const port = 3000;

var workouts = require("./controllers/workouts");

app.use("/workouts", workouts);

app.get("/login", (req, res) => res.send("login user: ..."));
app.get("/signout", (req, res) => res.send("sign out user: ..."));

app.listen(port, () =>
  console.log(`Timer server listening at http://localhost:${port}`)
);
