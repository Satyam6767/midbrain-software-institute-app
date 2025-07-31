const express = require('express');
const router = express.Router();
const CourseDetails = require('../models/CourseDetails');
const authMiddleware = require('../middleware/authMiddleware');  // Protect if needed

// GET single course details by ID (protected)
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    const details = await CourseDetails.findOne({ courseId: req.params.courseId });
    if (!details) {
      return res.status(404).json({ message: 'Course details not found' });
    }
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course details' });
  }
});

// POST a new course detail (for testing/admin purpose)
router.post('/', async (req, res) => {
  try {
    const course = new CourseDetails(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error creating course details' });
  }
});

module.exports = router;
