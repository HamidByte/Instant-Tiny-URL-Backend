const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// Endpoint to check the status for a given shortId
router.get('/check/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    // Find the URL in the database by the shortId
    const url = await Url.findOne({ shortId });

    if (url) {
      // Respond with a 204 No Content status (URL exists)
      return res.status(204).end();
    } else {
      // Respond with a 404 Not Found status (URL not found)
      return res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    // Respond with a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;