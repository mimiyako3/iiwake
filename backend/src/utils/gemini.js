// backend/utils/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function generateExcuse(input) {
  const prompt = `次の状況における雅な言い訳を生成して。前置きは要りません。雅な言い訳の文章とその意味のみ生成して。今の状況: ${input}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { generateExcuse };
