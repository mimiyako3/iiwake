// backend/utils/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function generateExcuse(input, mode) {
  const prompt = `次の状況における雅な言い訳を生成して。前置き、空白は要りません。雅な言い訳の文章とその意味のみ生成して。ただし、文章と意味の間には、"|"を入れてください。今の状況と生成したい雅な言い訳の口調と文章の長さ: ${input}。`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("Generated text:", text);

   // 雅な文章とその意味を分割
  const [elegantText, meaning] = text.split('|').map((part) => part.trim());
  console.log("Elegant Text:", elegantText);
  console.log("Meaning:", meaning);
  return { elegantText, meaning };
}

module.exports = { generateExcuse };
