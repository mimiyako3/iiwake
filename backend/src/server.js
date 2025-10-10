// backend/app.js
const express = require('express');
const cors = require('cors');
const excuseRoutes = require('./routes/excuse');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/excuse', excuseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
});
