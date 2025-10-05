// src/routes/aqi.js
import express from 'express';
import { fetchOpenAQ, mockAQI } from '../services/aqiService.js';

const router = express.Router();

// POST /aqi/current
router.post('/current', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const data = await fetchOpenAQ(latitude, longitude);
    res.json({ success: true, data });
  } catch (err) {
    const fallback = mockAQI(latitude, longitude);
    res.json({
      success: true,
      data: fallback,
      fallback: true,
      error: err.message
    });
  }
});

export default router;
