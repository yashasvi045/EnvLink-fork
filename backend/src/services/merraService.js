// src/services/merraService.js
import axios from 'axios';
import { getPowerData } from './nasaPowerService.js';

const EARTHDATA_USER = process.env.EARTHDATA_USER;
const EARTHDATA_PASS = process.env.EARTHDATA_PASS;
const GESDISC_BASE = 'https://goldsmr4.gesdisc.eosdis.nasa.gov';

const merraCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function merraKey(lat, lon, start, end) {
  return `merra:${lat}:${lon}:${start}:${end}`;
}

/**
 * Try to fetch MERRA-2 subset from GES DISC (scaffold). If not available, fallback to POWER daily.
 */
async function fetchMerraFromGesdisc(datasetPath) {
  if (!EARTHDATA_USER || !EARTHDATA_PASS) {
    throw new Error('EARTHDATA credentials not set');
  }

  try {
    const res = await axios.get(`${GESDISC_BASE}${datasetPath}`, {
      auth: { username: EARTHDATA_USER, password: EARTHDATA_PASS },
      timeout: 30000,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    throw new Error(`MERRA GES DISC fetch failed: ${err.message}`);
  }
}

export async function getMerraData(lat, lon, start, end) {
  const key = merraKey(lat, lon, start, end);
  const cached = merraCache.get(key);
  if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) return cached.value;

  // Attempt GES DISC (if credentials present)
  if (EARTHDATA_USER && EARTHDATA_PASS) {
    try {
      const examplePath = '/opendap/MERRA2_MONTHLY/...'; // <--- replace with actual dataset path
      const raw = await fetchMerraFromGesdisc(examplePath);
      const value = { source: 'gesdisc', raw };
      merraCache.set(key, { ts: Date.now(), value });
      return value;
    } catch (err) {
      console.warn('MERRA GES DISC fetch failed:', err.message);
    }
  }

  // Fallback: use POWER daily as approximate features
  const power = await getPowerData(lat, lon, start, end, 'T2M,PRECTOT,WS10M');
  const fallback = { source: 'power-fallback', data: power };
  merraCache.set(key, { ts: Date.now(), value: fallback });
  return fallback;
}
