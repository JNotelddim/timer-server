import mongoose from "mongoose";
const { Schema } = mongoose;

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true,
  },
  //TODO: refactor "content" into sets: Array<{duration, title?, id?, exercises?: [], ...}>
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const workout = mongoose.model("Workout", workoutSchema);
export default workout;
