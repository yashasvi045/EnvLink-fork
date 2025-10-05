import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const localTips = [
  'Uống đủ nước mỗi ngày để duy trì sức khỏe tốt.',
  'Trồng thêm cây xanh giúp cải thiện chất lượng không khí.',
  'Hạn chế ra ngoài vào giờ cao điểm ô nhiễm.',
  'Tắt thiết bị điện khi không sử dụng để tiết kiệm năng lượng.',
  'Mang khẩu trang khi ra đường để bảo vệ sức khỏe hô hấp.',
];

// GET /api/dailyTip
router.get('/', async (req, res) => {
  try {
    // 50% cơ hội: lấy quote từ ZenQuotes API, 50% lấy từ danh sách local
    if (Math.random() < 0.5) {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      const quote = data[0]?.q || 'Stay positive and keep moving forward!';
      const author = data[0]?.a || 'Unknown';

      return res.json({
        success: true,
        source: 'ZenQuotes API',
        data: { message: `${quote} — ${author}` },
      });
    }

    // Random local tip
    const randomTip = localTips[Math.floor(Math.random() * localTips.length)];
    res.json({
      success: true,
      source: 'Local Tips',
      data: { message: randomTip },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Không thể lấy mẹo hôm nay' });
  }
});

export default router;
