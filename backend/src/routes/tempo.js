// src/routes/tempo.js
import express from 'express';
import { getTempoData } from '../services/tempoService.js';

const router = express.Router(); 

router.post('/nasa/tempo', async (req, res) => {
  const { latitude, longitude, start, end } = req.body || {};
  if (!latitude || !longitude) return res.status(400).json({ success: false, error: 'latitude and longitude required' });
  const today = new Date();
  const toYYYYMMDD = (d) => d.toISOString().slice(0,10).replace(/-/g,'');
  const startDate = start || toYYYYMMDD(new Date(today.getTime()-24*60*60*1000));
  const endDate = end || toYYYYMMDD(today);

  try {
    const out = await getTempoData(latitude, longitude, startDate, endDate);
    res.json({ success: true, data: out });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
