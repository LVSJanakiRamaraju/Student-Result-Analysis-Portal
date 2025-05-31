const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance'); // Adjust path!

// GET performance data by user ID
router.get('/:id', async (req, res) => {
  try {
    const data = await Performance.findOne({ ID: req.params.id });
    console.log(data)
    if (!data) return res.status(404).json({ message: 'User not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
