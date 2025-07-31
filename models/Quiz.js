const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // 👈 references Course model
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    validate: (v) => v.length === 4,
    required: true,
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
