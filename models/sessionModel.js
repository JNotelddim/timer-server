import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new mongoose.Schema({
  expiration: {
    type: Date,
    unique: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
});

const user = mongoose.model("session", sessionSchema);
export default user;
