import express from "express";
const router = express.Router();

import workouts from "./workouts.js";

router.use("/workouts", workouts);

// router.get("/users", (req, res) => res.send("users"));
router.get("/login", (req, res) => res.send("login user: ..."));
router.get("/signout", (req, res) => res.send("sign out user: ..."));

export default router;
