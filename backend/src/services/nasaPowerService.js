// src/services/nasaPowerService.js
import axios from 'axios';

const NASA_POWER_BASE = 'https://power.larc.nasa.gov/api/temporal/daily/point';
const DEFAULT_COMMUNITY = 'RE'; // Research/energy; adjust if needed

// Simple in-memory cache for NASA POWER results
const powerCache = new Map(); // key -> { ts, value }
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

function cacheKey(lat, lon, start, end, params) {
  return `${lat}:${lon}:${start}:${end}:${params}`;
}

export async function getPowerData(lat, lon, start, end, parameters = 'T2M,PRECTOT,WS10M') {
  const key = cacheKey(lat, lon, start, end, parameters);
  const cached = powerCache.get(key);
  if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
    return cached.value;
  }

  try {
    const res = await axios.get(NASA_POWER_BASE, {
      params: {
        start,
        end,
        latitude: lat,
        longitude: lon,
        community: DEFAULT_COMMUNITY,
        parameters,
        format: 'JSON',
      },
      timeout: 15000
    });

    const data = res.data;
    powerCache.set(key, { ts: Date.now(), value: data });
    return data;
  } catch (err) {
    // bubble up error to caller to handle fallback
    throw new Error(`NASA POWER API error: ${err.message}`);
  }
}
