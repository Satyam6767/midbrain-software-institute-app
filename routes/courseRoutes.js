const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const CourseDetails = require('../models/CourseDetails');
const authMiddleware = require('../middleware/authMiddleware');



// GET all courses (basic info)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// GET full course details by course ID (combining Course & CourseDetails)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const courseDetail = await CourseDetails.findById(req.params.id);
    if (!courseDetail) {
      return res.status(404).json({ message: 'Course details not found' });
    }
    res.json(courseDetail);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course details' });
  }
});

// POST a new course
router.post('/', async (req, res) => {
  const { title, description, duration, trainer, image } = req.body;

  if (!title || !description || !duration || !trainer || !image) {
    return res.status(400).json({ message: 'Please provide all course fields' });
  }

  try {
    const course = new Course({ title, description, duration, trainer, image });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating course' });
  }
});

module.exports = router;
