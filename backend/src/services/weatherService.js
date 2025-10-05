import axios from 'axios';

export async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await axios.get(url, { timeout: 8000 });
    const w = res.data.current_weather || {};
    return {
      temperature: w.temperature,
      windSpeed: w.windspeed,
      windDirection: w.winddirection,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    throw err;
  }
}

export function mockWeather() {
  return { temperature: 30, windSpeed: 3.5, windDirection: 'NE', timestamp: new Date().toISOString() };
}
