const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // React dev server
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

const protect = require("./middlewares/auth_middleware");


// Import routes (when they're implemented)
const authRoutes = require('./routes/auth_routes');
const taskRoutes = require('./routes/task_routes');
const habitRoutes = require('./routes/habit_routes');
const analyticsRoutes = require("./routes/analytics_routes");
const errorMiddleware = require('./middlewares/error_middleware');



// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use(errorMiddleware);


app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Error handling middleware (should be last)


module.exports = app;

//Responsible for:
// Middlewares
// Routes
// Error handling
