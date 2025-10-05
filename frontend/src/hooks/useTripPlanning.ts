import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { TripPlan, TripRequest, AppError } from '../types';
import { STORAGE_KEYS } from '../types/constants';

interface UseTripPlanningOptions {
  onTripPlanned?: (trip: TripPlan) => void;
}

export function useTripPlanning(options: UseTripPlanningOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [tripHistory, setTripHistory] = useState<TripPlan[]>([]);

  const { onTripPlanned } = options;

  // Get cached trip history
  const getCachedTrips = useCallback(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CACHED_TRIPS);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to load cached trips:', error);
    }
    return [];
  }, []);

  // Save trip to cache
  const saveTripToCache = useCallback((trip: TripPlan) => {
    try {
      const existingTrips = getCachedTrips();
      const updatedTrips = [trip, ...existingTrips].slice(0, 10); // Keep only last 10 trips
      localStorage.setItem(STORAGE_KEYS.CACHED_TRIPS, JSON.stringify(updatedTrips));
    } catch (error) {
      console.error('Failed to cache trip:', error);
    }
  }, [getCachedTrips]);

  // Plan a trip
  const planTrip = useCallback(async (request: TripRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.planTrip(request);
      
      if (response.success) {
        const trip: TripPlan = {
          id: response.data.tripId,
          origin: response.data.origin,
          destination: response.data.destination,
          totalDuration: response.data.totalDuration,
          totalDistance: response.data.totalDistance,
          averageAQI: response.data.averageAQI,
          segments: response.data.segments.map((segment: any) => ({
            location: segment.location,
            aqi: segment.aqi,
            time: segment.time,
            duration: segment.duration,
            coordinates: segment.coordinates,
            weather: segment.weather,
            recommendations: segment.recommendations,
          })),
          recommendations: response.data.recommendations,
          createdAt: new Date(response.data.createdAt),
        };

        // Save to cache
        saveTripToCache(trip);

        // Update local state
        setTripHistory(prev => [trip, ...prev].slice(0, 10));

        // Call callback
        onTripPlanned?.(trip);

        return trip;
      }
    } catch (err) {
      const appError: AppError = {
        code: err.code || 'API_ERROR',
        message: err.message || 'Failed to plan trip',
        details: err,
        timestamp: new Date(),
        severity: 'medium',
      };
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, [onTripPlanned, saveTripToCache]);

  // Optimize existing trip
  const optimizeTrip = useCallback(async (tripId: string, preferences: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.optimizeTrip(tripId, preferences);
      
      if (response.success) {
        const optimizedTrip: TripPlan = {
          id: response.data.tripId,
          origin: response.data.origin,
          destination: response.data.destination,
          totalDuration: response.data.totalDuration,
          totalDistance: response.data.totalDistance,
          averageAQI: response.data.averageAQI,
          segments: response.data.segments.map((segment: any) => ({
            location: segment.location,
            aqi: segment.aqi,
            time: segment.time,
            duration: segment.duration,
            coordinates: segment.coordinates,
            weather: segment.weather,
            recommendations: segment.recommendations,
          })),
          recommendations: response.data.recommendations,
          createdAt: new Date(response.data.createdAt),
        };

        // Update in cache and local state
        saveTripToCache(optimizedTrip);
        setTripHistory(prev => 
          prev.map(trip => trip.id === tripId ? optimizedTrip : trip)
        );

        return optimizedTrip;
      }
    } catch (err) {
      const appError: AppError = {
        code: err.code || 'API_ERROR',
        message: err.message || 'Failed to optimize trip',
        details: err,
        timestamp: new Date(),
        severity: 'medium',
      };
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, [saveTripToCache]);

  // Load trip history
  const loadTripHistory = useCallback(async () => {
    try {
      const response = await apiService.getTripHistory();
      
      if (response.success) {
        const trips: TripPlan[] = response.data.map((trip: any) => ({
          id: trip.tripId,
          origin: trip.origin,
          destination: trip.destination,
          totalDuration: trip.totalDuration,
          totalDistance: trip.totalDistance,
          averageAQI: trip.averageAQI,
          segments: trip.segments.map((segment: any) => ({
            location: segment.location,
            aqi: segment.aqi,
            time: segment.time,
            duration: segment.duration,
            coordinates: segment.coordinates,
            weather: segment.weather,
            recommendations: segment.recommendations,
          })),
          recommendations: trip.recommendations,
          createdAt: new Date(trip.createdAt),
        }));

        setTripHistory(trips);
        return trips;
      }
    } catch (err) {
      console.error('Failed to load trip history:', err);
      // Fallback to cached data
      const cachedTrips = getCachedTrips();
      setTripHistory(cachedTrips);
      return cachedTrips;
    }
  }, [getCachedTrips]);

  // Get trip by ID
  const getTripById = useCallback((tripId: string) => {
    return tripHistory.find(trip => trip.id === tripId);
  }, [tripHistory]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    planTrip,
    optimizeTrip,
    loadTripHistory,
    getTripById,
    tripHistory,
    isLoading,
    error,
    clearError,
  };
}
