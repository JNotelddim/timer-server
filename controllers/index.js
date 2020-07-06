import express from "express";
const router = express.Router();

import workouts from "./workouts.js";
import auth from "./auth.js";

router.use("/workouts", workouts);
router.use("", (req, res) => {
  res.send("Timer App");
});
router.use(auth);

export default router;
