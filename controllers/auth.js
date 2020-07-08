import express from "express";

import models from "../models/index.js";
import { hashPassword, validatePassword } from "./passwordManagement.js";

const { User, Session } = models;

const router = express.Router();

//Helper FN
const handleNewSession = (userID, res) => {
  const session = new Session({
    user: userID,
    expiration: Date.now() + 36000000, //+12hrs
  });
  session.save().catch((err) => res.status(500).send("Saving session failed."));

  res.cookie("session", session._id, { maxAge: 36000000 });
  res.cookie("user", userID, { maxAge: 36000000 });
};

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body.data;

  //find the user by email
  User.find({ email }, (err, docs) => {
    //fail if there's an error
    if (err) return res.status(500).send("Login / User query error.");

    //fail if the email doesn't apply to any accounts
    if (docs.length === 0)
      return res.status(401).send("Login / Invalid credentials.");

    const { salt, hash, iterations, id: userID, email } = docs[0];

    //confirm that they've entered the correct credentials.
    validatePassword(hash, salt, iterations, password)
      .then((isValid) => {
        //return new session ID if successful
        if (isValid) {
          Session.deleteMany({ user: userID }, (err) => {
            if (err) {
              console.error(err);
              res
                .status(500)
                .send("Logout / Failed to clear existing sessions");
            } else {
              handleNewSession(userID, res);
              // res.status(200).send("Authenticated.");
              res.status(200).json({ email });
            }
          }).catch((err) => res.status(500).send("Session query failed."));
        }

        //fail if validation doesn't succeed
        else res.status(401).send("Login / Invalid credentials.");
      })
      .catch((err) => {
        console.error(err);

        //handle validation error
        res.status(500).send("Login / Validation Error");
      });
  });
});

// SIGNUP
router.post("/signup", (req, res) => {
  const { email, password } = req.body.data;

  //check if user email is in use
  User.find({ email }, (err, docs) => {
    //check if it failed
    if (err)
      return res
        .status(500)
        .send("Unknown error occurred when checking if email already in use.");

    //fail if the email is in use
    if (docs.length > 0) return res.status(400).send("Email already in use.");

    //create the user if not exists
    hashPassword(password)
      .then(({ salt, hash, iterations }) => {
        //create the new user entry
        const newUser = new User({ email, salt, hash, iterations });
        newUser
          .save()
          .catch((err) => res.status(500).send("Saving new user failed."));

        handleNewSession(newUser._id, res);

        return res.status(200).json({ email: newUser.email });
      })
      //handle hashing error
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  }).catch((err) => res.status(500).send("User query failed."));
});

// LOGOUT
router.get("/logout", (req, res) => {
  const { session } = req.cookies;
  Session.findByIdAndDelete(session, (err, result) => {
    if (err) {
      res.status(500).send("Failed to close session");
    } else {
      res.status(200).send("Logged out.");
    }
  }).catch((err) => res.status(500).send("Session query failed."));
});

export default router;
