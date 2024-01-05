const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');

const router = express.Router();

// Endpoint to shorten a URL
router.post('/', async (req, res) => {
  const { longUrl } = req.body;

  // Check if the URL is valid
  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let shortId;

  try {
     // Keep generating a new short ID until it's unique
     do {
      shortId = shortid.generate();
      var existingUrl = await Url.findOne({ shortId });
    } while (existingUrl);
    
    // Create a new URL entry in the database
    const newUrl = new Url({
      longUrl,
      shortId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUrl.save();

    // res.json(newUrl);
    res.json({
      longUrl: newUrl.longUrl,
      shortId: newUrl.shortId,
      shortUrl: newUrl.shortUrl, // Access shortUrl using the virtual property
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
      visitCount: newUrl.visitCount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to check if a URL is valid
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = router;
