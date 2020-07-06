import mongoose from "mongoose";

import Workout from "./workoutModel.js";
import User from "./userModel.js";
import Session from "./sessionModel.js";

// const password = process.env.API_PASS;
// const dbName = "timer-express";
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASS;

const connectDb = () =>
  mongoose.connect(
    // `mongodb+srv://apiUser:${password}@timercluster-7uy5n.mongodb.net/${dbName}?retryWrites=true&w=majority`
    `mongodb://${dbuser}:${dbpassword}@ds141043.mlab.com:41043/heroku_bmk0w74z`
  );

const models = { Workout, User, Session };

export { connectDb };
export default models;
