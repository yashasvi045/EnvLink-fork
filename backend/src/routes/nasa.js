// src/routes/nasa.js
import express from 'express';
import { getPowerData } from '../services/nasaPowerService.js';
import { getTempoData } from '../services/tempoService.js';
import { getMerraData } from '../services/merraService.js';

const router = express.Router();

/**
 * POST /api/nasa/environmental
 * Body: { latitude, longitude, start, end }
 * Returns aggregated POWER + TEMPO + MERRA data (best-effort)
 */
router.post('/environmental', async (req, res) => {
  const { latitude, longitude, start, end } = req.body || {};
  if (!latitude || !longitude) return res.status(400).json({ success: false, error: 'latitude and longitude required' });

  // default date window (today) if not provided in YYYYMMDD
  const today = new Date();
  const toYYYYMMDD = (d) => d.toISOString().slice(0,10).replace(/-/g,'');
  const startDate = start || toYYYYMMDD(new Date(today.getTime() - 24*60*60*1000)); // yesterday
  const endDate = end || toYYYYMMDD(today);

  try {
    // Call POWER
    const power = await getPowerData(latitude, longitude, startDate, endDate);

    // Call TEMPO (may be POWER fallback)
    const tempo = await getTempoData(latitude, longitude, startDate, endDate);

    // Call MERRA-2 (may be POWER fallback)
    const merra = await getMerraData(latitude, longitude, startDate, endDate);

    // Build simplified payload — pick common useful parameters if available
    const aggregated = {
      power: power || null,
      tempo: tempo || null,
      merra: merra || null,
      meta: { latitude, longitude, start: startDate, end: endDate }
    };

    res.json({ success: true, data: aggregated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
