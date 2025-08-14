const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InterviewQuestion = require('../models/InterviewQuestion');

// =====================
// POST: Add a new interview question
// =====================
router.post('/', async (req, res) => {
  try {
    const { course, question, answer } = req.body;

    if (!course || !question || !answer) {
      return res.status(400).json({ message: 'Please provide course, question, and answer' });
    }

    const newQuestion = new InterviewQuestion({ course, question, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error adding interview question:', error);
    res.status(500).json({ message: 'Server error adding question' });
  }
});

// =====================
// GET: Fetch interview questions by course ID
// =====================
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Convert courseId to ObjectId to match database
    let courseObjectId;
    try {
      courseObjectId = mongoose.Types.ObjectId(courseId);
    } catch {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const questions = await InterviewQuestion.find({ course: courseObjectId });

    // Always return an array, even if empty
    return res.json(questions);
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    res.status(500).json({ message: 'Server error fetching interview questions' });
  }
});

module.exports = router;
