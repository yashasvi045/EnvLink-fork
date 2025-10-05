// Application Constants
export const APP_CONFIG = {
  name: 'EnvLink',
  version: '1.0.0',
  description: 'Real-time AQI Forecast, Trip Planning, Daily Advice & Earth Insights',
  tagline: 'Real-time AQI Forecast, Trip Planning, Daily Advice & Earth Insights',
  author: 'NASA Space Apps Challenge Team',
  repository: 'https://github.com/your-org/envlink',
  website: 'https://envlink.app',
} as const;

// AQI Levels and Colors
export const AQI_LEVELS = {
  GOOD: { min: 0, max: 50, label: 'Good', color: '#10B981', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  MODERATE: { min: 51, max: 100, label: 'Moderate', color: '#3B82F6', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  UNHEALTHY_SENSITIVE: { min: 101, max: 150, label: 'Unhealthy for Sensitive Groups', color: '#F59E0B', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  UNHEALTHY: { min: 151, max: 200, label: 'Unhealthy', color: '#EF4444', bgColor: 'bg-red-50', textColor: 'text-red-600' },
  VERY_UNHEALTHY: { min: 201, max: 300, label: 'Very Unhealthy', color: '#8B5CF6', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  HAZARDOUS: { min: 301, max: 500, label: 'Hazardous', color: '#7C2D12', bgColor: 'bg-red-900', textColor: 'text-red-900' },
} as const;

// Pollutant Limits (EPA Standards)
export const POLLUTANT_LIMITS = {
  PM25: { limit: 35, unit: 'μg/m³', name: 'PM2.5' },
  PM10: { limit: 150, unit: 'μg/m³', name: 'PM10' },
  O3: { limit: 70, unit: 'ppb', name: 'Ozone (O₃)' },
  NO2: { limit: 100, unit: 'ppb', name: 'Nitrogen Dioxide (NO₂)' },
  SO2: { limit: 75, unit: 'ppb', name: 'Sulfur Dioxide (SO₂)' },
  CO: { limit: 9, unit: 'ppm', name: 'Carbon Monoxide (CO)' },
} as const;

// Health Advice by AQI Level
export const HEALTH_ADVICE = {
  [AQI_LEVELS.GOOD.label]: {
    general: 'Air quality is satisfactory and poses little or no risk.',
    sensitiveGroups: 'No health impacts expected.',
    outdoorActivities: 'Perfect for outdoor activities!',
    maskRequired: false,
    windowsOpen: true,
  },
  [AQI_LEVELS.MODERATE.label]: {
    general: 'Air quality is acceptable for most people.',
    sensitiveGroups: 'Sensitive individuals may experience minor breathing discomfort.',
    outdoorActivities: 'Generally safe for outdoor activities.',
    maskRequired: false,
    windowsOpen: true,
  },
  [AQI_LEVELS.UNHEALTHY_SENSITIVE.label]: {
    general: 'Sensitive groups may experience health effects.',
    sensitiveGroups: 'Children, elderly, and those with respiratory issues should limit outdoor activities.',
    outdoorActivities: 'Limit prolonged outdoor exertion.',
    maskRequired: true,
    windowsOpen: false,
  },
  [AQI_LEVELS.UNHEALTHY.label]: {
    general: 'Everyone may begin to experience health effects.',
    sensitiveGroups: 'Sensitive groups should avoid outdoor activities.',
    outdoorActivities: 'Avoid outdoor activities.',
    maskRequired: true,
    windowsOpen: false,
  },
  [AQI_LEVELS.VERY_UNHEALTHY.label]: {
    general: 'Health alert: everyone may experience more serious health effects.',
    sensitiveGroups: 'Sensitive groups should avoid all outdoor activities.',
    outdoorActivities: 'Avoid all outdoor activities.',
    maskRequired: true,
    windowsOpen: false,
  },
  [AQI_LEVELS.HAZARDOUS.label]: {
    general: 'Health warnings of emergency conditions.',
    sensitiveGroups: 'Everyone should avoid outdoor activities.',
    outdoorActivities: 'Stay indoors with windows closed.',
    maskRequired: true,
    windowsOpen: false,
  },
} as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home', path: '/' },
  { id: 'trip', label: 'Trip Planner', icon: 'MapPin', path: '/trip' },
  { id: 'chat', label: 'Chatbot', icon: 'MessageCircle', path: '/chat' },
  { id: 'earth', label: 'Earth Today', icon: 'Globe', path: '/earth' },
  { id: 'lab', label: 'AQILab', icon: 'FlaskConical', path: '/lab' },
] as const;

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  SPECIAL: 'special',
} as const;

// Daily Goal Types
export const DAILY_GOAL_TYPES = {
  CHECK_AQI: 'check_aqi',
  PLAN_TRIP: 'plan_trip',
  READ_EARTH_TODAY: 'read_earth_today',
  USE_CHATBOT: 'use_chatbot',
  SHARE_DATA: 'share_data',
} as const;

// Points System
export const POINTS_SYSTEM = {
  DAILY_GOALS: {
    [DAILY_GOAL_TYPES.CHECK_AQI]: 10,
    [DAILY_GOAL_TYPES.PLAN_TRIP]: 25,
    [DAILY_GOAL_TYPES.READ_EARTH_TODAY]: 15,
    [DAILY_GOAL_TYPES.USE_CHATBOT]: 20,
    [DAILY_GOAL_TYPES.SHARE_DATA]: 30,
  },
  ACHIEVEMENTS: {
    [ACHIEVEMENT_CATEGORIES.DAILY]: 50,
    [ACHIEVEMENT_CATEGORIES.WEEKLY]: 100,
    [ACHIEVEMENT_CATEGORIES.MONTHLY]: 250,
    [ACHIEVEMENT_CATEGORIES.SPECIAL]: 500,
  },
  BONUS: {
    STREAK_7_DAYS: 100,
    STREAK_30_DAYS: 500,
    PERFECT_WEEK: 200,
    ECO_FRIENDLY_ROUTE: 50,
  },
} as const;

// Level System
export const LEVEL_SYSTEM = {
  LEVELS: [
    { level: 1, pointsRequired: 0, title: 'Air Quality Novice' },
    { level: 2, pointsRequired: 100, title: 'Pollution Watcher' },
    { level: 3, pointsRequired: 300, title: 'Air Quality Enthusiast' },
    { level: 4, pointsRequired: 600, title: 'Environmental Guardian' },
    { level: 5, pointsRequired: 1000, title: 'Climate Champion' },
    { level: 6, pointsRequired: 1500, title: 'Earth Protector' },
    { level: 7, pointsRequired: 2200, title: 'Air Quality Master' },
    { level: 8, pointsRequired: 3000, title: 'Environmental Hero' },
    { level: 9, pointsRequired: 4000, title: 'Climate Warrior' },
    { level: 10, pointsRequired: 5000, title: 'EnvLink Legend' },
  ],
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// NASA TEMPO Configuration
export const TEMPO_CONFIG = {
  BASE_URL: 'https://api.nasa.gov/insight_weather/',
  API_KEY: process.env.REACT_APP_NASA_API_KEY || '',
  DATA_TYPES: ['no2', 'o3', 'hcho', 'aod'],
  RESOLUTION: 0.1, // degrees
  UPDATE_INTERVAL: 15 * 60 * 1000, // 15 minutes
} as const;

// PWA Configuration
export const PWA_CONFIG = {
  name: 'EnvLink',
  shortName: 'EnvLink',
  description: 'Real-time AQI Forecast, Trip Planning, Daily Advice & Earth Insights',
  themeColor: '#10B981',
  backgroundColor: '#ffffff',
  display: 'standalone',
  orientation: 'portrait',
  startUrl: '/',
  scope: '/',
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
    },
    {
      src: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
    },
    {
      src: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
    },
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_SETTINGS: 'envlink_user_settings',
  USER_STATS: 'envlink_user_stats',
  ACHIEVEMENTS: 'envlink_achievements',
  CACHED_AQI: 'envlink_cached_aqi',
  CACHED_WEATHER: 'envlink_cached_weather',
  CACHED_TRIPS: 'envlink_cached_trips',
  THEME: 'envlink_theme',
  LOCATION: 'envlink_location',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Unable to fetch data. Please try again.',
  LOCATION_ERROR: 'Unable to access your location. Please enable location services.',
  PERMISSION_ERROR: 'Permission denied. Please check your browser settings.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ACHIEVEMENT_UNLOCKED: 'Achievement unlocked!',
  GOAL_COMPLETED: 'Daily goal completed!',
  TRIP_PLANNED: 'Trip planned successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#10B981',
  SECONDARY: '#3B82F6',
  TERTIARY: '#F59E0B',
  QUATERNARY: '#8B5CF6',
  QUINARY: '#EC4899',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
} as const;
