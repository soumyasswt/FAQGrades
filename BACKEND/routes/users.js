const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Finalize Signup after OTP
router.post('/signup-finalize', async (req, res) => {
  const { email, name, role, grade, institute } = req.body;

  if (!email || !name || !role || !grade || !institute) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already registered with this email.' });
    }

    // Create and save user
    const newUser = new User({ email, name, role, grade, institute });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
