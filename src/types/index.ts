// Core AQI and Air Quality Types
export interface AQIData {
  value: number;
  location: string;
  trend: 'up' | 'down' | 'stable';
  timestamp: Date;
  pollutants: PollutantData[];
  healthAdvice: HealthAdvice;
}

export interface PollutantData {
  name: string;
  value: number;
  unit: string;
  limit: number;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  description: string;
}

export interface HealthAdvice {
  general: string;
  sensitiveGroups: string;
  outdoorActivities: string;
  maskRequired: boolean;
  windowsOpen: boolean;
}

// Weather and Environmental Data
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  pressure: number;
  visibility: number;
}

export interface EnvironmentalData {
  co2Levels: number;
  oceanTemperature: number;
  deforestationRate: number;
  globalAQI: number;
  lastUpdated: Date;
}

// Trip Planning Types
export interface TripRequest {
  origin: string;
  destination: string;
  departureTime?: Date;
  transportMode: 'driving' | 'walking' | 'cycling' | 'transit';
  preferences: TripPreferences;
}

export interface TripPreferences {
  prioritizeAirQuality: boolean;
  avoidHighTraffic: boolean;
  maxDuration?: number; // in minutes
  maxDistance?: number; // in miles
}

export interface RouteSegment {
  location: string;
  aqi: number;
  time: string;
  duration: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  weather: WeatherData;
  recommendations: string[];
}

export interface TripPlan {
  id: string;
  origin: string;
  destination: string;
  totalDuration: string;
  totalDistance: number;
  averageAQI: number;
  segments: RouteSegment[];
  recommendations: string[];
  createdAt: Date;
}

// Chatbot Types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'suggestion' | 'data';
  metadata?: {
    aqiData?: AQIData;
    tripPlan?: TripPlan;
    healthAdvice?: HealthAdvice;
  };
}

export interface ChatbotResponse {
  message: string;
  suggestions?: string[];
  data?: any;
  action?: 'navigate' | 'show_data' | 'plan_trip';
}

// Gamification Types
export interface UserStats {
  points: number;
  level: number;
  streak: number;
  nextLevelPoints: number;
  achievements: Achievement[];
  dailyGoals: DailyGoal[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  points: number;
  progress?: number;
  total?: number;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface DailyGoal {
  id: string;
  task: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'check_aqi' | 'plan_trip' | 'read_earth_today' | 'use_chatbot' | 'share_data';
}

// NASA TEMPO Data Types
export interface TEMPOData {
  timestamp: Date;
  latitude: number;
  longitude: number;
  no2: number;
  o3: number;
  hcho: number;
  aod: number;
  quality: 'high' | 'medium' | 'low';
  coverage: number;
}

export interface SatelliteData {
  source: 'TEMPO' | 'MODIS' | 'VIIRS' | 'ground_station';
  timestamp: Date;
  data: TEMPOData | any;
  coverage: number;
  resolution: number;
  quality: 'high' | 'medium' | 'low';
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AQIDisplayProps extends BaseComponentProps {
  value: number;
  location: string;
  trend?: 'up' | 'down' | 'stable';
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  animated?: boolean;
}

export interface NavigationProps extends BaseComponentProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export interface DashboardProps extends BaseComponentProps {
  onNavigate: (page: string) => void;
  userStats?: UserStats;
  aqiData?: AQIData;
  weatherData?: WeatherData;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Settings and Configuration
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  units: 'metric' | 'imperial';
  notifications: {
    aqiAlerts: boolean;
    dailyGoals: boolean;
    achievements: boolean;
    weatherUpdates: boolean;
  };
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    autoDetect: boolean;
  };
  dataRefresh: {
    aqi: number; // in minutes
    weather: number;
    environmental: number;
  };
}

// PWA Types
export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'natural' | 'landscape' | 'portrait';
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
}

// Export all types as a namespace for easier imports
export * from './api';
export * from './components';
export * from './constants';
