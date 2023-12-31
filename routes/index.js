const express = require('express');
const router = express.Router();

// Import individual route modules
const indexRoute = require('./indexRoute');
const shortenerRoute = require('./shortenerRoute');
const redirectRoute = require('./redirectRoute');

// Use the individual route modules
router.use('/', indexRoute);
router.use('/shortener', shortenerRoute);
router.get('/:shortUrl', redirectRoute);

module.exports = router;