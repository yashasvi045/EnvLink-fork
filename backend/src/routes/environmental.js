import express from 'express';
import { getGlobalEnvironmental } from '../services/envService.js';
const router = express.Router();

router.get('/global', async (req, res) => {
  const data = await getGlobalEnvironmental();
  res.json({ success: true, data });
});

export default router;
