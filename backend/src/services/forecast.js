import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * POST /api/aqi/forecast
 * Body: { latitude, longitude }
 * Returns: AQI forecast (5 days / 3-hour intervals)
 */
router.post('/forecast', async (req, res) => {
  const { latitude, longitude } = req.body;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ success: false, message: 'Missing OPENWEATHER_API_KEY' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const { data } = await axios.get(url);

    // Convert raw data to simple, readable format
    const forecast = data.list.map(item => ({
      time: new Date(item.dt * 1000).toISOString(),
      aqi: item.main.aqi,
      components: item.components
    }));

    res.json({ success: true, source: 'OpenWeather', forecast });
  } catch (err) {
    console.error('Forecast error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
