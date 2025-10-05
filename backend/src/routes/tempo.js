import express from 'express';
import { fetchTempo, mockTempo } from '../services/tempoService.js';
const router = express.Router();

router.post('/current', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const data = await fetchTempo(latitude, longitude);
    res.json({ success: true, data });
  } catch (err) {
    const fallback = mockTempo(latitude, longitude);
    res.json({ success: true, data: fallback, fallback: true, error: err.message });
  }
});

export default router;
