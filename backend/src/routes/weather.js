import express from 'express';
import { fetchWeather, mockWeather } from '../services/weatherService.js';
const router = express.Router();

router.post('/current', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const data = await fetchWeather(latitude, longitude);
    res.json({ success: true, data });
  } catch (err) {
    const fallback = mockWeather();
    res.json({ success: true, data: fallback, fallback: true, error: err.message });
  }
});

export default router;
