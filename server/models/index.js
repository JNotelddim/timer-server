import mongoose from "mongoose";

import Workout from "./workoutModel.js";
import User from "./userModel.js";

const password = process.env.API_PASS;
const dbName = "timer-express";
console.log("password used: ", password);

const connectDb = () =>
  mongoose.connect(
    `mongodb+srv://apiUser:${password}@timercluster-7uy5n.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );

const models = { Workout, User };

export { connectDb };
export default models;
