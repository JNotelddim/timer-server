const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("get workouts"));
router.get("/:workoutId", (req, res) =>
  res.send(`get workout id: ${req.params.workoutId}`)
);
router.put("/", (req, res) => {
  // const { title, contents } = req.body;
  console.log(req.body);
  return res.send(`put workout:`);
});

module.exports = router;
