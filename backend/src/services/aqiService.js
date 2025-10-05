import axios from 'axios';
const OPENAQ_BASE = process.env.OPENAQ_BASE || 'https://api.openaq.org/v3';

export async function fetchOpenAQ(lat, lon) {
  try {
    const url = `${OPENAQ_BASE}/latest?coordinates=${lat},${lon}`;
    const res = await axios.get(url, { timeout: 8000 });
    const item = res.data.results?.[0];
    if (!item) throw new Error('No data from OpenAQ');
    return {
      location: item.location,
      coordinates: { latitude: lat, longitude: lon },
      pollutants: item.measurements,
      timestamp: item.lastUpdated || new Date().toISOString()
    };
  } catch (err) {
    throw err;
  }
}

export function mockAQI(lat, lon) {
  return {
    location: 'Hà Nội (mock)',
    coordinates: { latitude: lat, longitude: lon },
    pollutants: [
      { parameter: 'pm25', value: 12, unit: 'µg/m³' },
      { parameter: 'o3', value: 18, unit: 'ppb' }
    ],
    timestamp: new Date().toISOString()
  };
}
