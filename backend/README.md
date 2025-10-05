# EnvLink Backend (React + TypeScript ready)

This backend uses only free or freemium services and includes mock fallbacks.
It is configured to work with a React + TypeScript frontend running on http://localhost:3000.

Quickstart:
1. Copy `.env.example` -> `.env` and fill any keys (NASA, ORS, GEMINI if available).
2. `npm install`
3. `npm run dev`
4. Set frontend env `REACT_APP_API_URL` to your backend base, e.g. `http://localhost:3001/api`

Endpoints (all JSON):
- POST /api/aqi/current         { latitude, longitude }
- POST /api/aqi/forecast        { latitude, longitude, days }
- POST /api/weather/current     { latitude, longitude }
- POST /api/daily-tip/today     { language }
- POST /api/trips/plan          { origin: { latitude, longitude, address }, destination: { latitude, longitude, address } }
- POST /api/chatbot/chat        { message }
- POST /api/environmental/data  { latitude, longitude, date }
- POST /api/user/login          { email, password }
- POST /api/user/register       { name, email, password }
- POST /api/nasa/power          { latitude, longitude, parameters, startDate, endDate }
- POST /api/nasa/merra          { latitude, longitude, variables, date }
- POST /api/nasa/tempo          { latitude, longitude, date }
- POST /api/tempo/current       { latitude, longitude }
- POST /api/merra/current       { latitude, longitude }
- GET  /api/nasa/gibs/imagery   (query params: layer, bbox, date)
- GET  /ping

TypeScript example (frontend):
```ts
type AQICurrentReq = { latitude: number; longitude: number };
type AQICurrentRes = { success: boolean; data: any; fallback?: boolean; error?: string };

async function getAQI(lat: number, lon: number) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/aqi/current`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude: lat, longitude: lon })
  });
  const json: AQICurrentRes = await res.json();
  return json;
}
```

Deployment:
- Push to GitHub and connect repo to Render. Render will run `npm install` and `npm start`.
- Use UptimeRobot to ping `/ping` to keep app awake on free tier.

