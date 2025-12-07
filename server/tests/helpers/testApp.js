/**
 * Test App Setup
 * Creates and exports Express app for testing
 */

require('dotenv').config({ path: '.env.test' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('../../middleware/errorHandler');
const corsConfig = require('../../middleware/corsConfig');

const authRoutes = require('../../routes/auth');
const taskRoutes = require('../../routes/tasks');
const tagRoutes = require('../../routes/tags');
const exportRoutes = require('../../routes/export');
const notificationRoutes = require('../../routes/notifications');
const userRoutes = require('../../routes/users');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(corsConfig);
// Disable morgan in test environment for cleaner output
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate limiter - more lenient for tests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Higher limit for tests
  message: {
    message: 'Too many requests from this IP, please try again later.',
  },
  skip: () => process.env.NODE_ENV === 'test', // Skip rate limiting in tests
});
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

app.get('/api/ping', (req, res) => res.json({ msg: 'pong' }));

// 404 & error handlers
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

module.exports = app;

