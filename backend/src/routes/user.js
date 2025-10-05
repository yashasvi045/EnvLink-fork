import express from 'express';
const router = express.Router();
router.get('/user', (req, res) => res.json({ success: true, data: { id: 'demo', name: 'Demo User' }}));
export default router;
