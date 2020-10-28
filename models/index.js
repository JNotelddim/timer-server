import mongoose from 'mongoose';

import Workout from './workoutModel.js';
import User from './userModel.js';
import Session from './sessionModel.js';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const connectDb = () =>
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@timercluster-7uy5n.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

const models = { Workout, User, Session };

export { connectDb };
export default models;
