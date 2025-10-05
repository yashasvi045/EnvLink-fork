// src/services/tempoService.js
import axios from 'axios';

import { getPowerData } from './nasaPowerService.js';

const GESDISC_BASE = 'https://goldsmr10.gesdisc.eosdis.nasa.gov'; // example host; actual path depends on dataset
const EARTHDATA_USER = process.env.EARTHDATA_USER;
const EARTHDATA_PASS = process.env.EARTHDATA_PASS;

// Simple cache
const tempoCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

function tempoKey(lat, lon, start, end) {
  return `tempo:${lat}:${lon}:${start}:${end}`;
}

/**
 * Placeholder helper: fetch TEMPO-like pollutant data via NASA POWER as a fallback.
 * POWER includes parameters that may be useful; TEMPO-specific L2 products are available on GES DISC.
 */
export async function fetchTempoFallback(lat, lon, start, end) {
  // use POWER to fetch proxy variables (POWER won't return tropospheric NO2 directly)
  const params = 'T2M,PRECTOT,WS10M';
  const power = await getPowerData(lat, lon, start, end, params);
  return { source: 'POWER-fallback', data: power };
}

/**
 * Example scaffold for authenticating to GES DISC and fetching TEMPO L2/L3 data.
 * NOTE: Real GES DISC endpoints/paths vary; you'll need to pick the dataset path and product variables.
 *
 * Many GES DISC endpoints require:
 *  - Earthdata login (username/password) and
 *  - token-based or cookie-based authentication for downloads.
 *
 * This function demonstrates using axios with basic auth to attempt an authenticated request.
 */
async function fetchTempoFromGesdisc(urlPath) {
  if (!EARTHDATA_USER || !EARTHDATA_PASS) {
    throw new Error('EARTHDATA credentials not set');
  }
  // Simplified: in practice, GES DISC may redirect to URS and require cookie handling
  try {
    const res = await axios.get(`${GESDISC_BASE}${urlPath}`, {
      auth: {
        username: EARTHDATA_USER,
        password: EARTHDATA_PASS
      },
      timeout: 20000,
      responseType: 'arraybuffer' // if binary (NetCDF); handle appropriately
    });
    return res.data;
  } catch (err) {
    throw new Error(`GES DISC fetch error: ${err.message}`);
  }
}

/**
 * Public function:
 * Try GES DISC TEMPO product fetch if credentials present, otherwise fallback to POWER proxy.
 * Returns a uniform shape: { source: 'tempo'|'power-fallback', data: <object> }
 */
export async function getTempoData(lat, lon, start, end) {
  const key = tempoKey(lat, lon, start, end);
  const cached = tempoCache.get(key);
  if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) return cached.value;

  // If EarthData credentials are provided, attempt GES DISC (scaffold)
  if (EARTHDATA_USER && EARTHDATA_PASS) {
    try {
      // Example URL path — you must replace with the real dataset path for TEMPO L2/L3
      // e.g. '/opendap/TEMPO_L2_NO2/.../file.nc'
      const examplePath = '/opendap/TEMPO_L2_NO2/'; // <<-- user must specify dataset path/file
      const raw = await fetchTempoFromGesdisc(examplePath);
      // NOTE: raw is likely NetCDF bytes. You may need to process it using a Python microservice (recommended) or a netcdf parser in Node.
      const value = { source: 'gesdisc', raw }; // placeholder; processing required
      tempoCache.set(key, { ts: Date.now(), value });
      return value;
    } catch (err) {
      // fall through to POWER fallback
      console.warn('GES DISC TEMPO fetch failed:', err.message);
    }
  }

  // POWER-based fallback (not TEMPO-quality but useful)
  const fallback = await fetchTempoFallback(lat, lon, start, end);
  tempoCache.set(key, { ts: Date.now(), value: fallback });
  return fallback;
}
