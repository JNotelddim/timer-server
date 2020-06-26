import express from "express";
const router = express.Router();

import models from "../models/index.js";
import workouts from "./workouts.js";
import { hashPassword, validatePassword } from "./passwordManagement.js";

const { User } = models;

router.use("/workouts", workouts);

router.get("/login", (req, res) => {
  //validate password,
  // const { email, password } = req.body;
  // User.find({ email });
  // validatePassword();
  //handle validation error
  //fail if validation doesn't success
  //otherwise, return 200?
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  //check if user email is in use
  User.find({ email }, (err, docs) => {
    console.log(err, docs);
    //check if it failed
    if (err)
      return res
        .status(501)
        .send("Unknown error occurred when checking if email already in use.");

    //fail if the email is in use
    if (docs.length > 0) return res.status(400).send("Email already in use.");

    //create the user if not exists
    hashPassword(password)
      .then(({ salt, hash, iterations }) => {
        //create the new user entry
        const newUser = new User({ email, salt, hash, iterations });
        newUser.save();
        return res.json(newUser);
      })
      //handle hashing error
      .catch((err) => res.status(501).send(err));
  }).exec();
});

router.get("/signout", (req, res) => res.send("sign out user: ..."));

export default router;
