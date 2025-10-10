// backend/routes/excuse.js
const express = require('express');
const router = express.Router();
const { generateExcuse } = require('../utils/gemini');
const { getCachedExcuse, setCachedExcuse } = require('../utils/cache');

router.post('/', async (req, res) => {
  const { input } = req.body;
//   const cacheKey = `excuse:${input}`;

//   const cachedExcuse = await getCachedExcuse(cacheKey);
//   if (cachedExcuse) {
//     return res.json({ excuse: cachedExcuse });
//   }

  const excuse = await generateExcuse(input);
//   await setCachedExcuse(cacheKey, excuse, 3600); // 1時間キャッシュ

  res.json({ excuse });
});

module.exports = router;
