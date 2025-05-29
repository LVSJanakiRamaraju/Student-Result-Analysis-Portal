const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  const { role, rollNo, name, password } = req.body;
  try {
    // Validate input
    if (!role || !name || !password || (role === 'student' && !rollNo)) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Check if user already exists
    const existing = role === 'student'
      ? await User.findOne({ role, rollNo })
      : await User.findOne({ role, name });

    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      rollNo: role === 'student' ? rollNo : null,
      name,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { role, rollNo, name, password } = req.body;
  try {
    const query = role === 'student' ? { role, rollNo, name } : { role, name };
    const user = await User.findOne(query);

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { role: user.role, name: user.name, rollNo: user.rollNo } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
