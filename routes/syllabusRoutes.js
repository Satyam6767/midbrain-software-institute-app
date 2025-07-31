const express = require('express');
const router = express.Router();
const Syllabus = require('../models/Syllabus');
const authMiddleware = require('../middleware/authMiddleware');

// GET all syllabi (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const syllabi = await Syllabus.find().populate('courseId', 'title');
    res.json(syllabi);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching syllabi' });
  }
});

// GET syllabus by ID (protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id).populate('courseId', 'title');
    if (!syllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching syllabus' });
  }
});

// POST a new syllabus (open or protect if needed)
router.post('/', async (req, res) => {
  const { courseId, moduleTitle, topics, overallDuration, order } = req.body;

  if (!courseId || !moduleTitle || !Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ message: 'Please provide courseId, moduleTitle, and topics' });
  }

  try {
    const syllabus = new Syllabus({ courseId, moduleTitle, topics, overallDuration, order });
    await syllabus.save();
    res.status(201).json(syllabus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating syllabus' });
  }
});


module.exports = router;
