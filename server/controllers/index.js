import express from "express";
const router = express.Router();

import models from "../models/index.js";
import workouts from "./workouts.js";

const { User } = models;

router.use("/workouts", workouts);

// router.get("/users", (req, res) => res.send("users"));
router.get("/login", (req, res) => res.send("login user: ..."));
router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  User.find({ email: email }, (err, docs) => {
    console.log(err, docs);
    //check if it failed
    if (err)
      return res
        .status(501)
        .send("Unknown error occurred when checking if email already in use.");

    //check if the email is already in use
    if (docs.length > 0) return res.status(400).send("Email already in use.");

    //create the user if not exists
    const newUser = new User({ email, password });
    newUser.save();
    return res.json(newUser);
  }).exec();
});
router.get("/signout", (req, res) => res.send("sign out user: ..."));

export default router;
