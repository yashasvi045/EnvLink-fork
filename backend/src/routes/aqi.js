import express from 'express';
import { fetchOpenAQ, mockAQI } from '../services/aqiService.js';
import { runXgboost } from '../services/mlService.js';
const router = express.Router();

router.post('/current', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const data = await fetchOpenAQ(latitude, longitude);
    res.json({ success: true, data });
  } catch (err) {
    const fallback = mockAQI(latitude, longitude);
    res.json({ success: true, data: fallback, fallback: true, error: err.message });
  }
});

router.post('/forecast', async (req, res) => {
  try {
    const { latitude, longitude, days = 7 } = req.body;
    const features = [];
    for (let i = 1; i <= days; i++) features.push([latitude || 0, longitude || 0, i]);
    const out = await runXgboost(features);
    if (out && out.success && Array.isArray(out.prediction)) {
      const forecast = out.prediction.map((p, idx) => {
        const d = new Date(); d.setDate(d.getDate() + idx + 1);
        return { date: d.toISOString().split('T')[0], aqi: Math.round(p) };
      });
      res.json({ success: true, data: { forecast } });
    } else {
      // fallback
      const forecast = [];
      for (let i = 1; i <= days; i++) {
        const d = new Date(); d.setDate(d.getDate() + i);
        forecast.push({ date: d.toISOString().split('T')[0], aqi: 40 + i });
      }
      res.json({ success: true, data: { forecast }, fallback: true, error: out?.error || 'ml-fallback' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
