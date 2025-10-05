// src/services/gibsService.js

// GIBS base and supported layers examples
const GIBS_BASE = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best';

/**
 * Returns URL of a tile for the given layer/date/z/x/y.
 * Many layers use different tile sizes/zoom scheme; frontend may need to adapt.
 *
 * layer examples:
 * - MODIS_Terra_CorrectedReflectance_TrueColor
 * - MODIS_Terra_Aerosol
 * - S5P_NO2 (if available as layer)
 */
export function getGibsTileUrl({ layer = 'MODIS_Terra_CorrectedReflectance_TrueColor', date = null, z = 0, x = 0, y = 0, tileSize = '250m' }) {
  const day = date || new Date().toISOString().slice(0,10);
  // GIBS expects date in YYYY-MM-DD (or YYYY-MM) depending on layer; many support daily.
  return `${GIBS_BASE}/${layer}/default/${day}/${tileSize}/${z}/${y}/${x}.jpg`;
}

/**
 * Return a small list of recommended layers and metadata for the frontend to display
 */
export function availableLayers() {
  return [
    { id: 'MODIS_Terra_CorrectedReflectance_TrueColor', title: 'MODIS True Color' },
    { id: 'MODIS_Terra_Aerosol', title: 'MODIS Aerosol (AOD)' },
    { id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor', title: 'VIIRS True Color' }
    // add more as needed
  ];
}
