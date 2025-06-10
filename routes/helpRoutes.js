// routes/helpRoutes.js
const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { email, number } = req.body;

  if (!email || !number) {
    return res.status(400).json({ message: 'Email and number are required.' });
  }

  try {
    // Save to DB
    const newHelpRequest = new HelpRequest({ email, number });
    await newHelpRequest.save();

    // Setup email
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
      subject: 'Thanks for contacting FAQGrades!',
      html: `
        <h3>Hello!</h3>
        <p>Thanks for reaching out to <strong>FAQGrades</strong>.</p>
        <p>We've received your message and will respond shortly. Please share us your queries.</p>
        <br>
        <p>Warm regards,<br/>FAQGrades Support Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Help request submitted and confirmation email sent.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
