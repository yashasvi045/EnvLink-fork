import { AQI_LEVELS, HEALTH_ADVICE } from '../types/constants';

/**
 * Get AQI color information based on AQI value
 * Dynamically returns colors that change based on air quality level
 */
export function getAQIColor(aqi: number) {
  if (aqi <= 50) {
    return {
      bg: 'bg-[#10B981]',
      text: 'text-[#10B981]',
      border: 'border-[#10B981]',
      bgLight: 'bg-green-50',
      label: 'Good',
      hex: '#10B981',
    };
  }
  if (aqi <= 100) {
    return {
      bg: 'bg-[#3B82F6]',
      text: 'text-[#3B82F6]',
      border: 'border-[#3B82F6]',
      bgLight: 'bg-blue-50',
      label: 'Moderate',
      hex: '#3B82F6',
    };
  }
  if (aqi <= 150) {
    return {
      bg: 'bg-[#F59E0B]',
      text: 'text-[#F59E0B]',
      border: 'border-[#F59E0B]',
      bgLight: 'bg-orange-50',
      label: 'Unhealthy for Sensitive Groups',
      hex: '#F59E0B',
    };
  }
  if (aqi <= 200) {
    return {
      bg: 'bg-[#EF4444]',
      text: 'text-[#EF4444]',
      border: 'border-[#EF4444]',
      bgLight: 'bg-red-50',
      label: 'Unhealthy',
      hex: '#EF4444',
    };
  }
  if (aqi <= 300) {
    return {
      bg: 'bg-[#8B5CF6]',
      text: 'text-[#8B5CF6]',
      border: 'border-[#8B5CF6]',
      bgLight: 'bg-purple-50',
      label: 'Very Unhealthy',
      hex: '#8B5CF6',
    };
  }
  return {
    bg: 'bg-[#7C2D12]',
    text: 'text-[#7C2D12]',
    border: 'border-[#7C2D12]',
    bgLight: 'bg-red-900',
    label: 'Hazardous',
    hex: '#7C2D12',
  };
}

/**
 * Get health advice based on AQI value
 */
export function getHealthAdvice(aqi: number) {
  const aqiInfo = getAQIColor(aqi);
  const label = aqiInfo.label as keyof typeof HEALTH_ADVICE;
  return HEALTH_ADVICE[label] || HEALTH_ADVICE['Good'];
}

/**
 * Get AQI level details from constants
 */
export function getAQILevel(aqi: number) {
  if (aqi <= 50) return AQI_LEVELS.GOOD;
  if (aqi <= 100) return AQI_LEVELS.MODERATE;
  if (aqi <= 150) return AQI_LEVELS.UNHEALTHY_SENSITIVE;
  if (aqi <= 200) return AQI_LEVELS.UNHEALTHY;
  if (aqi <= 300) return AQI_LEVELS.VERY_UNHEALTHY;
  return AQI_LEVELS.HAZARDOUS;
}

/**
 * Format AQI value with appropriate styling
 */
export function formatAQI(aqi: number): string {
  return Math.round(aqi).toString();
}

/**
 * Determine if outdoor activities are safe
 */
export function isOutdoorSafe(aqi: number): boolean {
  return aqi <= 100;
}

/**
 * Determine if mask is required
 */
export function isMaskRequired(aqi: number): boolean {
  return aqi > 100;
}

/**
 * Get appropriate icon or emoji for AQI level
 */
export function getAQIEmoji(aqi: number): string {
  if (aqi <= 50) return '😊';
  if (aqi <= 100) return '😐';
  if (aqi <= 150) return '😷';
  if (aqi <= 200) return '😨';
  if (aqi <= 300) return '🚨';
  return '☠️';
}

/**
 * Get recommendation message based on AQI
 */
export function getAQIRecommendation(aqi: number): string {
  if (aqi <= 50) return 'Perfect day for outdoor activities!';
  if (aqi <= 100) return 'Generally safe for most activities.';
  if (aqi <= 150) return 'Sensitive groups should limit outdoor exposure.';
  if (aqi <= 200) return 'Everyone should avoid prolonged outdoor activities.';
  if (aqi <= 300) return 'Stay indoors. Health alert in effect.';
  return 'Hazardous conditions. Emergency measures recommended.';
}
