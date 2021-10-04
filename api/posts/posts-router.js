const express = require('express');

const router = express.Router();

router.get('/applepies', (req, res) => {
  res.status(201).json({ message: 'APPLE A DAY KEEPS THE DOCTOR AWAY' });
});

module.exports = router;
