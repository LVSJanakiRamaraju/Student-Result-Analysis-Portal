const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { role, rollNo, name, password } = req.body;
  try {
    if (!role || !name || !password || (role === 'student' && !rollNo)) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const existingUser = role === 'student'
      ? await User.findOne({ role, rollNo })
      : await User.findOne({ role, name });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      role,
      rollNo: role === 'student' ? rollNo : null,
      name,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  const { role, rollNo, name, password } = req.body;
  try {
    const user = await User.findOne(
      role === 'student' ? { role, rollNo, name } : { role, name }
    );

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { role: user.role, name: user.name, rollNo: user.rollNo },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
