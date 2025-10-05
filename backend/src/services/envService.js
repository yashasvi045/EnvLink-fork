export async function getGlobalEnvironmental() {
  return { global: { co2Levels: 419.5, aqi: 65, lastUpdated: new Date().toISOString() } };
}
