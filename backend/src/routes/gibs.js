// src/routes/gibs.js
import express from 'express';
import { getGibsTileUrl, availableLayers } from '../services/gibsService.js';

const router = express.Router();

/**
 * GET /api/nasa/gibs
 * Query params: layer, date, z, x, y
 * Returns redirect or URL to tile
 */
router.get('/', (req, res) => {
  const { layer, date, z = 0, x = 0, y = 0 } = req.query;
  try {
    const url = getGibsTileUrl({ layer, date, z, x, y });
    // simply return the URL so frontend can use it as img src or tile layer
    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/layers', (req, res) => {
  res.json({ success: true, data: availableLayers() });
});

export default router;
