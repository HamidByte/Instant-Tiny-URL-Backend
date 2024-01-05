const express = require('express');
const router = express.Router();

// Import individual route modules
const indexRoute = require('./indexRoute');
const shortenerRoute = require('./shortenerRoute');
const redirectRoute = require('./redirectRoute');
const statsRoute = require('./statsRoute');
const checkStatusRoute = require('./checkStatusRoute');

// Use the individual route modules
router.use('/', indexRoute);
router.use('/shortener', shortenerRoute);
router.get('/:shortId', redirectRoute);
router.use('/stats', statsRoute);
router.get('/check/:shortId', checkStatusRoute);

module.exports = router;