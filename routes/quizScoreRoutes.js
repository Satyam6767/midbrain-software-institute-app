const express = require("express");
const router = express.Router();
const QuizScore = require("../models/QuizScore");
const authMiddleware = require("../middleware/authMiddleware");

// Save quiz score
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { score, total, quizTitle } = req.body;

    const newScore = new QuizScore({
      userId: req.user.id, // ✅ This will now work
      score,
      total,
      quizTitle,
    });

    await newScore.save();
    res.json({ message: "Score saved successfully" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Failed to save score" });
  }
});

// Get all scores
router.get("/myscores", authMiddleware, async (req, res) => {
  try {
    const scores = await QuizScore.find({ userId: req.user.id });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scores" });
  }
});

module.exports = router;
