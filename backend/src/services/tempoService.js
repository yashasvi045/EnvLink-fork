import axios from 'axios';
const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

export async function fetchTempo(lat, lon) {
  try {
    const url = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&api_key=${NASA_KEY}`;
    const res = await axios.get(url, { timeout: 10000 });
    return { data: res.data, lastUpdated: new Date().toISOString() };
  } catch (err) {
    throw err;
  }
}

export function mockTempo(lat, lon) {
  return { data: [{ timestamp: new Date().toISOString(), latitude: lat, longitude: lon, no2: 10.5, o3: 7.2 }], lastUpdated: new Date().toISOString() };
}
