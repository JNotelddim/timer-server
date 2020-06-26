import mongoose from "mongoose";
const { Schema } = mongoose;

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
  // I don't know if this is necessary?
  sessions: [{ type: Schema.Types.ObjectId, required: false, ref: "Session" }],
});

const user = mongoose.model("User", userSchema);
export default user;
