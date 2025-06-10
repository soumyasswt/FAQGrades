const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // your existing user routes
const helpRoutes = require('./routes/helpRoutes');
const usersRouter = require('./routes/users'); // new signup-finalize route
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Initialize app FIRST
const app = express();

// Connect to MongoDB
connectDB();

// Allow CORS (adjust as needed)
app.use(cors({ origin: 'https://faqgrades.vercel.app/', credentials: true }));

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);    // your existing user routes
app.use('/api/help', helpRoutes); 

// Add the signup-finalize route separately, 
// placed **before** your existing userRoutes to avoid conflicts,
// or with a more specific path if needed.
app.use('/api/users', usersRouter);  // contains /signup-finalize POST endpoint

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
