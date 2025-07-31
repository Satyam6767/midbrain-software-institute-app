const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name email mobile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
