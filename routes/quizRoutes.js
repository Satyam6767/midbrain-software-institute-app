const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const QuizScore = require("../models/QuizScore");
const authMiddleware = require("../middleware/authMiddleware");

// Add quiz to a specific course
router.post("/add/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { question, options, correctAnswerIndex } = req.body;

    if (!question || options.length !== 4 || correctAnswerIndex > 3) {
      return res.status(400).json({ error: "Invalid quiz data" });
    }

    const newQuiz = new Quiz({
      courseId,
      question,
      options,
      correctAnswerIndex,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz added to course successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get quizzes for a specific course
router.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ courseId });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit Quiz Score
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { courseId, score } = req.body;

    if (!courseId || typeof score !== "number") {
      return res.status(400).json({ message: "courseId and score are required" });
    }

    const total = 10; // or fetch actual total questions if needed

    const newScore = new QuizScore({
      userId: req.user.id,
      courseId,
      score,
      total,
    });

    await newScore.save();
    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
