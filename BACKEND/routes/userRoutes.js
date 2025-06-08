const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const OtpStore = require('../models/OtpStore'); // OTP Model
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load .env vars

// 🔥 Utility to send OTP via Gmail
const sendOtpToEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// 🔥 Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📩 Request OTP Route - now supports signup and signin modes
router.post('/request-otp', async (req, res) => {
  const { email, mode } = req.body; // expecting mode: 'signup' or 'signin'

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const user = await User.findOne({ email });
    if (mode === 'signup' && user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (mode === 'signin' && !user) {
    return res.status(404).json({ message: 'User not found' });
  } 

    const otp = generateOtp();

    // Send OTP to user's email
    await sendOtpToEmail(email, otp);

    // Store OTP in DB with TTL (10 mins)
    await OtpStore.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'OTP sent to email.' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 🔒 Validate OTP Route
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const record = await OtpStore.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: 'OTP expired or not found.' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Delete OTP after successful validation
    await OtpStore.deleteOne({ email });

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 📝 Other user routes
router.post('/register', registerUser);
router.post('/signin', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
