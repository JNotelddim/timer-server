import express from "express";

import models from "../models/index.js";

const { Session, Workout } = models;
const router = express.Router();

const validateSession = (req, res, next) => {
  if (!req.cookies || req.cookies.length === 0) {
    //if they haven't got a session cookie, they need to sign in.
    res.status(400).send("Login to continue.");
  }

  const { session } = req.cookies;
  Session.findById(session, (err, doc) => {
    if (err) {
      //if something fails when searching for the session, don't let them through
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
  }).catch((err) => res.status(501).send("Account search failed."));
};

router.use(validateSession);

router.get("/", (req, res) => {
  const { user } = req.cookies;
  Workout.find({ user }, (err, docs) => {
    if (err) {
      res.status(501).send("DB query for user workouts failed.");
    } else {
      res.send(docs);
    }
  }).catch((err) => res.status(501).send("Workout query failed."));
});

router.get("/:workoutId", (req, res) => {
  const { workoutId } = req.params;
  const { user } = req.cookies;
  Workout.find({ user, _id: workoutId }, (err, doc) => {
    if (err) {
      res.status(501).send("DB query for user workout by id failed.");
    } else {
      res.send(doc);
    }
  }).catch((err) => res.status(501).send("Workout query failed."));
});

router.put("/", (req, res) => {
  const { user } = req.cookies;

  console.log(req.body);
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send("Invalid workout.");
    return;
  }

  const workout = new Workout({ title, content, user });
  workout.save();

  res.send(workout);
});

export default router;
