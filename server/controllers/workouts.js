import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get workouts");
});
router.get("/:workoutId", (req, res) => {
  return res.send(`get workout id: ${req.params.workoutId}`);
});
router.put("/", (req, res) => res.send(`put workout:`));

export default router;
