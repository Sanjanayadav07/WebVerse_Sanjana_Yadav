const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ✅ ONLY this (no extra quotes)
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neighbourhood')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/services', require('./src/routes/services'));
app.use('/api/bookings', require('./src/routes/bookings'));
// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));