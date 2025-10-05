import axios from 'axios';
const ORS_KEY = process.env.ORS_API_KEY;

export async function getDirections(origin, destination) {
  if (!ORS_KEY) throw new Error('ORS_API_KEY not set');
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;
  const res = await axios.get(url, { headers: { 'Authorization': ORS_KEY }, timeout: 10000 });
  return res.data;
}

export function mockRoute(origin, destination) {
  return { tripId: 'mock_' + Date.now(), origin, destination, totalDuration: '20 mins', totalDistance: 5.2, averageAQI: 48 };
}
