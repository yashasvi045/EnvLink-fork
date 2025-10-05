import express from 'express';
const router = express.Router();
router.get('user/profile', (req, res) => res.json({ success: true, data: { id: 'demo', name: 'Demo User' }}));
router.get('user/stats', (req, res) => res.json({ success: true, data: { level: 1, points: 0 }}));
export default router;
