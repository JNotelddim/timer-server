import express from "express";
const router = express.Router();

import workouts from "./workouts.js";
import auth from "./auth.js";

router.use("/workouts", workouts);
router.use(auth);

export default router;
