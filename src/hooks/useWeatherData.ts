import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { apiService } from '../services/api';
import { WeatherData, AppError } from '../types';
import { STORAGE_KEYS } from '../types/constants';

interface UseWeatherDataOptions {
  latitude?: number;
  longitude?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in minutes
}

export function useWeatherData(options: UseWeatherDataOptions = {}) {
  const { state, dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const { latitude, longitude, autoRefresh = true, refreshInterval = 10 } = options;

  // Get cached data
  const getCachedData = useCallback(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CACHED_WEATHER);
      if (cached) {
        const data = JSON.parse(cached);
        const now = new Date();
        const cacheTime = new Date(data.timestamp);
        const diffMinutes = (now.getTime() - cacheTime.getTime()) / (1000 * 60);
        
        // Return cached data if it's less than 10 minutes old
        if (diffMinutes < 10) {
          return data;
        }
      }
    } catch (error) {
      console.error('Failed to load cached weather data:', error);
    }
    return null;
  }, []);

  // Save data to cache
  const saveToCache = useCallback((data: WeatherData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_WEATHER, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to cache weather data:', error);
    }
  }, []);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (lat?: number, lng?: number) => {
    if (!lat || !lng) {
      setError({
        code: 'MISSING_COORDINATES',
        message: 'Latitude and longitude are required',
        timestamp: new Date(),
        severity: 'medium',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getCurrentWeather(lat, lng);
      
      if (response.success) {
        const weatherData: WeatherData = {
          temperature: response.data.temperature,
          humidity: response.data.humidity,
          windSpeed: response.data.windSpeed,
          windDirection: response.data.windDirection,
          uvIndex: response.data.uvIndex,
          pressure: response.data.pressure,
          visibility: response.data.visibility,
        };

        dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData });
        saveToCache(weatherData);
      }
    } catch (err) {
      const appError: AppError = {
        code: err.code || 'API_ERROR',
        message: err.message || 'Failed to fetch weather data',
        details: err,
        timestamp: new Date(),
        severity: 'medium',
      };
      setError(appError);
      dispatch({ type: 'SET_ERROR', payload: appError });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, saveToCache]);

  // Fetch weather forecast
  const fetchWeatherForecast = useCallback(async (lat?: number, lng?: number) => {
    if (!lat || !lng) return;

    try {
      const response = await apiService.getWeatherForecast(lat, lng, 7);
      
      if (response.success) {
        const forecastData: WeatherData[] = response.data.forecast.map((day: any) => ({
          temperature: day.temperature,
          humidity: day.humidity,
          windSpeed: day.windSpeed,
          windDirection: day.windDirection,
          uvIndex: day.uvIndex,
          pressure: day.pressure,
          visibility: day.visibility,
        }));

        dispatch({ type: 'SET_WEATHER_FORECAST', payload: forecastData });
      }
    } catch (err) {
      console.error('Failed to fetch weather forecast:', err);
    }
  }, [dispatch]);

  // Load data on mount
  useEffect(() => {
    // Try to load from cache first
    const cachedData = getCachedData();
    if (cachedData) {
      dispatch({ type: 'SET_WEATHER_DATA', payload: cachedData });
    }

    // Fetch fresh data if coordinates are available
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
      fetchWeatherForecast(latitude, longitude);
    }
  }, [latitude, longitude, fetchWeatherData, fetchWeatherForecast, getCachedData, dispatch]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !latitude || !longitude) return;

    const interval = setInterval(() => {
      fetchWeatherData(latitude, longitude);
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, latitude, longitude, refreshInterval, fetchWeatherData]);

  // Manual refresh function
  const refresh = useCallback(() => {
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
      fetchWeatherForecast(latitude, longitude);
    }
  }, [latitude, longitude, fetchWeatherData, fetchWeatherForecast]);

  return {
    current: state.weatherData,
    forecast: state.weatherForecast,
    isLoading,
    error,
    refresh,
  };
}
