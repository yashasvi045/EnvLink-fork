// src/services/nasaPowerService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// =======================
// Config
// =======================
const NASA_POWER_BASE = 'https://power.larc.nasa.gov/api/temporal/daily/point';
const DEFAULT_COMMUNITY = 'RE'; // Research/Energy
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

// Load Earthdata credentials from .env
const EARTHDATA_USER = process.env.EARTHDATA_USER;
const EARTHDATA_PASS = process.env.EARTHDATA_PASS;

// =======================
// Simple in-memory cache
// =======================
const powerCache = new Map(); // key -> { ts, value }

function cacheKey(lat, lon, start, end, params) {
  return `${lat}:${lon}:${start}:${end}:${params}`;
}

function getFromCache(key) {
  const cached = powerCache.get(key);
  if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
    return cached.value;
  }
  return null;
}

function setCache(key, value) {
  powerCache.set(key, { ts: Date.now(), value });
}

// =======================
// Main fetch function
// =======================
export async function getPowerData(
  lat,
  lon,
  start,
  end,
  parameters = 'T2M,PRECTOT,WS10M'
) {
  const key = cacheKey(lat, lon, start, end, parameters);

  // Check cache first
  const cached = getFromCache(key);
  if (cached) return cached;

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
      auth: EARTHDATA_USER && EARTHDATA_PASS
        ? { username: EARTHDATA_USER, password: EARTHDATA_PASS }
        : undefined,
      timeout: 15000,
    });

    const data = res.data;
    setCache(key, data);
    return data;
  } catch (err) {
    throw new Error(`NASA POWER API error: ${err.message}`);
  }
}
