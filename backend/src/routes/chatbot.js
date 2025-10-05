import express from 'express';
import { chat, suggestions } from '../services/chatbotService.js';
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const out = await chat({ message });
    res.json({ success: true, data: out });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/suggestions', async (req, res) => {
  res.json({ success: true, data: await suggestions() });
});

export default router;
