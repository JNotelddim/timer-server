const express = require("express");
const router = express.Router();

const workouts = require("./workouts");

router.use("/workouts", workouts);

// router.get("/users", (req, res) => res.send("users"));
router.get("/login", (req, res) => res.send("login user: ..."));
router.get("/signout", (req, res) => res.send("sign out user: ..."));

module.exports = router;
