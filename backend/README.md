# EnvLink Backend (React + TypeScript ready)

This backend uses only free or freemium services and includes mock fallbacks.
It is configured to work with a React + TypeScript frontend running on http://localhost:3000.

Quickstart:
1. Copy `.env.example` -> `.env` and fill any keys (NASA, ORS, GEMINI if available).
2. `npm install`
3. `npm run dev`
4. Set frontend env `REACT_APP_API_URL` to your backend base, e.g. `http://localhost:3001/api`

Deployment:
- Push to GitHub and connect repo to Render. Render will run `npm install` and `npm start`.
- Use UptimeRobot to ping `/ping` to keep app awake on free tier.

