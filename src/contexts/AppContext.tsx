import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AQIData, UserStats, WeatherData, EnvironmentalData, AppSettings, AppError } from '../types';

// State Interface
interface AppState {
  // User Data
  userStats: UserStats | null;
  settings: AppSettings;
  
  // AQI Data
  aqiData: AQIData | null;
  aqiHistory: AQIData[];
  aqiForecast: AQIData[];
  
  // Weather Data
  weatherData: WeatherData | null;
  weatherForecast: WeatherData[];
  
  // Environmental Data
  environmentalData: EnvironmentalData | null;
  
  // UI State
  isLoading: boolean;
  error: AppError | null;
  currentPage: string;
  
  // Location
  userLocation: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  } | null;
  
  // PWA State
  isOnline: boolean;
  isInstalled: boolean;
  updateAvailable: boolean;
}

// Action Types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'SET_USER_STATS'; payload: UserStats | null }
  | { type: 'UPDATE_USER_STATS'; payload: Partial<UserStats> }
  | { type: 'SET_AQI_DATA'; payload: AQIData | null }
  | { type: 'SET_AQI_HISTORY'; payload: AQIData[] }
  | { type: 'SET_AQI_FORECAST'; payload: AQIData[] }
  | { type: 'SET_WEATHER_DATA'; payload: WeatherData | null }
  | { type: 'SET_WEATHER_FORECAST'; payload: WeatherData[] }
  | { type: 'SET_ENVIRONMENTAL_DATA'; payload: EnvironmentalData | null }
  | { type: 'SET_USER_LOCATION'; payload: AppState['userLocation'] }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_INSTALLED_STATUS'; payload: boolean }
  | { type: 'SET_UPDATE_AVAILABLE'; payload: boolean }
  | { type: 'RESET_STATE' };

// Initial State
const initialState: AppState = {
  userStats: null,
  settings: {
    theme: 'light',
    units: 'metric',
    notifications: {
      aqiAlerts: true,
      dailyGoals: true,
      achievements: true,
      weatherUpdates: true,
    },
    location: {
      latitude: 0,
      longitude: 0,
      city: '',
      country: '',
      autoDetect: true,
    },
    dataRefresh: {
      aqi: 5, // 5 minutes
      weather: 10, // 10 minutes
      environmental: 30, // 30 minutes
    },
  },
  aqiData: null,
  aqiHistory: [],
  aqiForecast: [],
  weatherData: null,
  weatherForecast: [],
  environmentalData: null,
  isLoading: false,
  error: null,
  currentPage: 'home',
  userLocation: null,
  isOnline: navigator.onLine,
  isInstalled: false,
  updateAvailable: false,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_USER_STATS':
      return { ...state, userStats: action.payload };
    
    case 'UPDATE_USER_STATS':
      return {
        ...state,
        userStats: state.userStats ? { ...state.userStats, ...action.payload } : null,
      };
    
    case 'SET_AQI_DATA':
      return { ...state, aqiData: action.payload };
    
    case 'SET_AQI_HISTORY':
      return { ...state, aqiHistory: action.payload };
    
    case 'SET_AQI_FORECAST':
      return { ...state, aqiForecast: action.payload };
    
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload };
    
    case 'SET_WEATHER_FORECAST':
      return { ...state, weatherForecast: action.payload };
    
    case 'SET_ENVIRONMENTAL_DATA':
      return { ...state, environmentalData: action.payload };
    
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };
    
    case 'SET_INSTALLED_STATUS':
      return { ...state, isInstalled: action.payload };
    
    case 'SET_UPDATE_AVAILABLE':
      return { ...state, updateAvailable: action.payload };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider Component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('airguardians_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: 'SET_SETTINGS', payload: settings });
      } catch (error) {
        console.error('Failed to load saved settings:', error);
      }
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('airguardians_settings', JSON.stringify(state.settings));
  }, [state.settings]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // PWA install detection
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      // Store the event for later use
      window.deferredPrompt = e;
    };

    const handleAppInstalled = () => {
      dispatch({ type: 'SET_INSTALLED_STATUS', payload: true });
      window.deferredPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Selector Hooks
export function useAQIData() {
  const { state } = useApp();
  return {
    current: state.aqiData,
    history: state.aqiHistory,
    forecast: state.aqiForecast,
  };
}

export function useWeatherData() {
  const { state } = useApp();
  return {
    current: state.weatherData,
    forecast: state.weatherForecast,
  };
}

export function useUserStats() {
  const { state, dispatch } = useApp();
  return {
    stats: state.userStats,
    updateStats: (updates: Partial<UserStats>) => {
      dispatch({ type: 'UPDATE_USER_STATS', payload: updates });
    },
  };
}

export function useSettings() {
  const { state, dispatch } = useApp();
  return {
    settings: state.settings,
    updateSettings: (updates: Partial<AppSettings>) => {
      dispatch({ type: 'UPDATE_SETTINGS', payload: updates });
    },
  };
}

export function useLocation() {
  const { state, dispatch } = useApp();
  return {
    location: state.userLocation,
    setLocation: (location: AppState['userLocation']) => {
      dispatch({ type: 'SET_USER_LOCATION', payload: location });
    },
  };
}

export function useUI() {
  const { state, dispatch } = useApp();
  return {
    isLoading: state.isLoading,
    error: state.error,
    currentPage: state.currentPage,
    isOnline: state.isOnline,
    isInstalled: state.isInstalled,
    updateAvailable: state.updateAvailable,
    setLoading: (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    setError: (error: AppError | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
    setCurrentPage: (page: string) => {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    },
  };
}

// Declare global window properties for PWA
declare global {
  interface Window {
    deferredPrompt: any;
  }
}
