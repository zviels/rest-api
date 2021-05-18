const express = require('express');

const userRoutes = require('./user-routes');
const courseRoutes = require('./course-routes');

// Variables

const router = express.Router();

// Routes

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);

// Export Router

module.exports = router;