import mongoose from "mongoose";

const password = process.env.API_PASS;
const dbName = "timer-express";

console.log("password used: ", password);

mongoose.connect(
  `mongodb+srv://apiUser:${password}@timercluster-7uy5n.mongodb.net/${dbName}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to db!");
});

export default db;
