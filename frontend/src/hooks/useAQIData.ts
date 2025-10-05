import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { apiService } from '../services/api';
import { AQIData, AppError } from '../types';
import { STORAGE_KEYS } from '../types/constants';

interface UseAQIDataOptions {
  latitude?: number;
  longitude?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in minutes
}

export function useAQIData(options: UseAQIDataOptions = {}) {
  const { state, dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const { latitude, longitude, autoRefresh = true, refreshInterval = 5 } = options;

  // Get cached data
  const getCachedData = useCallback(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CACHED_AQI);
      if (cached) {
        const data = JSON.parse(cached);
        const now = new Date();
        const cacheTime = new Date(data.timestamp);
        const diffMinutes = (now.getTime() - cacheTime.getTime()) / (1000 * 60);
        
        // Return cached data if it's less than 5 minutes old
        if (diffMinutes < 5) {
          return data;
        }
      }
    } catch (error) {
      console.error('Failed to load cached AQI data:', error);
    }
    return null;
  }, []);

  // Save data to cache
  const saveToCache = useCallback((data: AQIData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_AQI, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to cache AQI data:', error);
    }
  }, []);

  // Fetch AQI data
  const fetchAQIData = useCallback(async (lat?: number, lng?: number) => {
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
      const response = await apiService.getCurrentAQI(lat, lng);
      
      if (response.success) {
        const aqiData: AQIData = {
          value: response.data.current.aqi,
          location: response.data.current.location,
          trend: 'stable', // This would be calculated based on historical data
          timestamp: new Date(response.data.current.timestamp),
          pollutants: Object.entries(response.data.current.pollutants).map(([name, value]) => ({
            name: name.toUpperCase(),
            value: value as number,
            unit: name === 'co' ? 'ppm' : 'μg/m³',
            limit: 0, // This would come from constants
            status: 'Good', // This would be calculated
            description: '',
          })),
          healthAdvice: response.data.current.healthAdvice,
        };

        dispatch({ type: 'SET_AQI_DATA', payload: aqiData });
        saveToCache(aqiData);

        // Update forecast if available
        if (response.data.forecast) {
          const forecastData: AQIData[] = response.data.forecast.daily.map((day: any) => ({
            value: day.aqi,
            location: response.data.current.location,
            trend: 'stable',
            timestamp: new Date(day.date),
            pollutants: [],
            healthAdvice: {
              general: '',
              sensitiveGroups: '',
              outdoorActivities: '',
              maskRequired: false,
              windowsOpen: true,
            },
          }));
          dispatch({ type: 'SET_AQI_FORECAST', payload: forecastData });
        }
      }
    } catch (err) {
      const appError: AppError = {
        code: err.code || 'API_ERROR',
        message: err.message || 'Failed to fetch AQI data',
        details: err,
        timestamp: new Date(),
        severity: 'high',
      };
      setError(appError);
      dispatch({ type: 'SET_ERROR', payload: appError });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, saveToCache]);

  // Load data on mount
  useEffect(() => {
    // Try to load from cache first
    const cachedData = getCachedData();
    if (cachedData) {
      dispatch({ type: 'SET_AQI_DATA', payload: cachedData });
    }

    // Fetch fresh data if coordinates are available
    if (latitude && longitude) {
      fetchAQIData(latitude, longitude);
    }
  }, [latitude, longitude, fetchAQIData, getCachedData, dispatch]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !latitude || !longitude) return;

    const interval = setInterval(() => {
      fetchAQIData(latitude, longitude);
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, latitude, longitude, refreshInterval, fetchAQIData]);

  // Manual refresh function
  const refresh = useCallback(() => {
    if (latitude && longitude) {
      fetchAQIData(latitude, longitude);
    }
  }, [latitude, longitude, fetchAQIData]);

  return {
    data: state.aqiData,
    forecast: state.aqiForecast,
    history: state.aqiHistory,
    isLoading,
    error,
    refresh,
  };
}
