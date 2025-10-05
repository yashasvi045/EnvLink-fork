import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Setup CORS origins from env
const origins = (process.env.FRONTEND_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim());
app.use(cors({ origin: function(origin, callback) {
  // allow requests with no origin (like curl, server-to-server)
  if(!origin) return callback(null, true);
  if(origins.indexOf(origin) !== -1) return callback(null, true);
  return callback(new Error('CORS policy: origin not allowed'));
}}));

import aqiRoutes from './routes/aqi.js';
import weatherRoutes from './routes/weather.js';
import dailyTipRoutes from './routes/dailyTip.js';
import tripsRoutes from './routes/trips.js';
import tempoRoutes from './routes/tempo.js';
import chatRoutes from './routes/chatbot.js';
import envRoutes from './routes/environmental.js';
import userRoutes from './routes/user.js';

app.use('/api/aqi', aqiRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/daily-tip', dailyTipRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/tempo', tempoRoutes);
app.use('/api/chatbot', chatRoutes);
app.use('/api/environmental', envRoutes);
app.use('/api/user', userRoutes);

app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => res.json({ success: true, message: 'EnvLink Backend running' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ EnvLink backend listening on ${PORT}`));
