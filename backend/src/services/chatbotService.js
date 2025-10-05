import { callGemini, mockGemini } from './geminiService.js';

export async function chat(payload) {
  const message = payload.message || '';
  try {
    const out = await callGemini(message);
    return { response: out.response, source: 'gemini' };
  } catch (err) {
    const fb = mockGemini(message);
    return { response: fb.response, fallback: true, error: err.message };
  }
}

export async function suggestions() {
  return ['Hỏi AQI hiện tại', 'Lập kế hoạch chuyến đi', 'Mẹo bảo vệ sức khỏe'];
}
