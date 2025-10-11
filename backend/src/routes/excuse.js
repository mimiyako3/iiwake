// backend/routes/excuse.js
const express = require('express');
const router = express.Router();
const { generateExcuse } = require('../utils/gemini');

router.post('/', async (req, res) => {
  const { input, mode } = req.body;

  const excuse = await generateExcuse(input, mode);
  console.log(input, mode);

  res.json({ excuse });
});

module.exports = router;
