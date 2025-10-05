import express from 'express';
import { getDirections, mockRoute } from '../services/tripService.js';
const router = express.Router();

router.post('/plan', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    const data = await getDirections(origin, destination);
    res.json({ success: true, data });
  } catch (err) {
    const fallback = mockRoute(req.body.origin, req.body.destination);
    res.json({ success: true, data: fallback, fallback: true, error: err.message });
  }
});

export default router;
