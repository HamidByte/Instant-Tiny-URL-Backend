const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// Redirect to the long URL using the short URL
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Find the URL in the database by the short URL
    const url = await Url.findOne({ shortUrl });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
