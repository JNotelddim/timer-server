import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get workouts");
});
router.get("/:workoutId", (req, res) =>
  res.send(`get workout id: ${req.params.workoutId}`)
);
router.put("/", (req, res) => {
  console.log(req);
  return res.send(`put workout:`);
});

export default router;
