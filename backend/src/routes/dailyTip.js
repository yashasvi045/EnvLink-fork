import express from 'express';
const router = express.Router();
router.get('/', (req, res) => res.json({ success: true, data: { message: 'Hạn chế ra ngoài giờ cao điểm ô nhiễm.' }}));
export default router;
