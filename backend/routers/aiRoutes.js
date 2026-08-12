const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/recommend', async (req, res) => {
  try {
    const { mood, preference, temperature } = req.body;

    const products = await Product.find();
    const menuList = products.map(p => `${p.name} - ₹${p.price}`).join('\n');

    const prompt = `
You are a friendly coffee shop barista AI. Here is today's menu:
${menuList}

A customer says:
- Mood: ${mood}
- Taste preference: ${preference}
- Wants it: ${temperature}

Recommend exactly ONE drink from the menu above that best matches their preferences.
Respond ONLY in this JSON format, nothing else:
{ "recommendation": "drink name from the menu", "reason": "one short friendly sentence why" }
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.status(200).json(parsed);

  } catch (err) {
    res.status(500).json({ message: 'AI recommendation failed', error: err.message });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const products = await Product.find();
    const menuList = products.map(p => `${p.name} - ₹${p.price}`).join('\n');

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      systemInstruction: `You are a friendly AI barista for BrewMind AI coffee shop. Here is the current menu:\n${menuList}\n\nOnly recommend drinks from this menu. Keep responses short, warm, and conversational — like a real barista chatting with a customer.`
    });

    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].text;
    const result = await chat.sendMessage(lastMessage);

    res.status(200).json({ reply: result.response.text() });

  } catch (err) {
    res.status(500).json({ message: 'Chat failed', error: err.message });
  }
});

module.exports = router;