const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// Endpoint to get JSON information for a given short URL
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Find the URL in the database by the short URL
    const url = await Url.findOne({ shortUrl });

    if (url) {
      // Respond with JSON information
      res.json({
        longUrl: url.longUrl,
        shortUrl: url.shortUrl,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        visitCount: url.visitCount,
      });
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;