const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// Endpoint to get JSON information for a given shortId
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    // Find the URL in the database by the shortId
    const url = await Url.findOne({ shortId });

    if (url) {
      // Respond with JSON information
      res.json({
        longUrl: url.longUrl,
        shortId: url.shortId,
        shortUrl: url.shortUrl, // Access shortUrl using the virtual property
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