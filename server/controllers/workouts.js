import express from "express";

import models from "../models/index.js";

const { User, Session } = models;
const router = express.Router();

const validateSession = (req, res, next) => {
  //if they haven't got a session cookie, they need to sign in.
  if (!req.cookies || req.cookies.length === 0) {
    res.status(400).send("Login to continue.");
  }

  const { session } = req.cookies;
  Session.findById(session, (err, doc) => {
    if (err) {
      //if something fails when searching for the session, don't let them through
      console.error(err);
      res.status(401).send("Session expired. Log in again to continue");
    } else {
      if (!doc) {
        //if there's no session found, then they've been logged out. must log in again
        res.status(401).send("Login to continue.");
      } else {
        const { expiration } = doc;
        //if the session is past its expiry, it's no longer valid
        if (expiration < Date.now()) {
          res.status(401).send("Session expired. Log in again to continue");
        } else {
          //if the session hasn't yet expired, they can continue
          next();
        }
      }
    }
  });
};

router.use(validateSession);

router.get("/", (req, res) => {
  res.send("get workouts");
});

router.get("/:workoutId", (req, res) => {
  return res.send(`get workout id: ${req.params.workoutId}`);
});

router.put("/", (req, res) => res.send(`put workout:`));

export default router;
