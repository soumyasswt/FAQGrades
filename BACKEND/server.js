const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Initialize app FIRST
const app = express();

// Connect to MongoDB
connectDB();

// Allow CORS (adjust as needed)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
