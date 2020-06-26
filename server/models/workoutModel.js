import mongoose from "mongoose";
const { Schema } = mongoose;

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true,
  },
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const workout = mongoose.model("Workout", workoutSchema);
export default workout;
