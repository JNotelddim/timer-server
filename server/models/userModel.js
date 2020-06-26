import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  salt: {
    type: String,
    unique: false,
    required: true,
  },
  hash: {
    type: String,
    unique: false,
    required: true,
  },
  iterations: {
    type: Number,
    unique: false,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
export default user;
