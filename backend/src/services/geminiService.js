import axios from 'axios';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function callGemini(message) {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY not set');
  const body = {
    prompt: message
  };
  // Note: Using a simplified request shape; adjust to your Gemini account docs if needed
  const res = await axios.post(`${GEMINI_URL}?key=${GEMINI_KEY}`, { input: { text: message }}, { timeout: 12000 });
  const text = res.data?.candidates?.[0]?.output || res.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  return { success: true, response: text || 'No response from Gemini' };
}

export function mockGemini(message) {
  if (message.toLowerCase().includes('aqi')) return { success: true, response: 'AQI hôm nay khoảng 42 (mock).' };
  return { success: true, response: 'Xin chào! Đây là trợ lý EnvLink (mock).' };
}
