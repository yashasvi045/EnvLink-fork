import { 
  AQICurrentResponse, 
  AQIForecastRequest, 
  TripPlanRequest, 
  TripPlanResponse,
  TEMPODataRequest,
  TEMPODataResponse,
  EnvironmentalDataResponse,
  APIResponse,
  APIError 
} from '../types/api';
import { API_CONFIG } from '../types/constants';

// Base API class
class APIService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError({
          code: `HTTP_${response.status}`,
          message: errorData.message || response.statusText,
          details: errorData,
          timestamp: new Date(),
        });
      }

      const data = await response.json();
      return {
        success: true,
        data,
        timestamp: new Date(),
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new APIError({
          code: 'TIMEOUT',
          message: 'Request timeout',
          timestamp: new Date(),
        });
      }

      throw new APIError({
        code: 'NETWORK_ERROR',
        message: error.message || 'Network error',
        timestamp: new Date(),
      });
    }
  }

  // AQI Data Methods
  async getCurrentAQI(latitude: number, longitude: number): Promise<APIResponse<AQICurrentResponse>> {
    return this.request<AQICurrentResponse>('/aqi/current', {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude }),
    });
  }

  async getAQIForecast(request: AQIForecastRequest): Promise<APIResponse<AQICurrentResponse>> {
    return this.request<AQICurrentResponse>('/aqi/forecast', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getAQIHistory(latitude: number, longitude: number, days: number = 7): Promise<APIResponse<AQICurrentResponse>> {
    return this.request<AQICurrentResponse>('/aqi/historical', {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude, days }),
    });
  }

  // Weather Data Methods
  async getCurrentWeather(latitude: number, longitude: number): Promise<APIResponse<any>> {
    return this.request<any>('/weather', {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude }),
    });
  }

  async getWeatherForecast(latitude: number, longitude: number, days: number = 7): Promise<APIResponse<any>> {
    return this.request<any>('/weather', {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude, days }),
    });
  }

  // Trip Planning Methods
  async planTrip(request: TripPlanRequest): Promise<APIResponse<TripPlanResponse>> {
    return this.request<TripPlanResponse>('/trips', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async optimizeTrip(tripId: string, preferences: any): Promise<APIResponse<TripPlanResponse>> {
    return this.request<TripPlanResponse>('/trips', {
      method: 'POST',
      body: JSON.stringify({ tripId, preferences }),
    });
  }

  async getTripHistory(): Promise<APIResponse<TripPlanResponse[]>> {
    return this.request<TripPlanResponse[]>('/trips', {
      method: 'GET',
    });
  }

  // NASA TEMPO Data Methods
  async getTEMPOData(request: TEMPODataRequest): Promise<APIResponse<TEMPODataResponse>> {
    return this.request<TEMPODataResponse>('/nasa/tempo', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getTEMPOHistorical(request: TEMPODataRequest): Promise<APIResponse<TEMPODataResponse>> {
    return this.request<TEMPODataResponse>('/nasa/tempo', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getTEMPOCoverage(): Promise<APIResponse<any>> {
    return this.request<any>('/nasa/tempo', {
      method: 'GET',
    });
  }

  // Environmental Data Methods
  async getGlobalEnvironmentalData(): Promise<APIResponse<EnvironmentalDataResponse>> {
    return this.request<EnvironmentalDataResponse>('/global', {
      method: 'GET',
    });
  }

  async getRegionalEnvironmentalData(region: string): Promise<APIResponse<EnvironmentalDataResponse>> {
    return this.request<EnvironmentalDataResponse>('/global', {
      method: 'POST',
      body: JSON.stringify({ region }),
    });
  }

  async getEnvironmentalTrends(days: number = 30): Promise<APIResponse<any>> {
    return this.request<any>('/global', {
      method: 'POST',
      body: JSON.stringify({ days }),
    });
  }

  // User Data Methods
  async getUserProfile(): Promise<APIResponse<any>> {
    return this.request<any>('/user/profile', {
      method: 'GET',
    });
  }

  async updateUserProfile(profile: any): Promise<APIResponse<any>> {
    return this.request<any>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async getUserStats(): Promise<APIResponse<any>> {
    return this.request<any>('/user/stats', {
      method: 'GET',
    });
  }

  async updateUserStats(stats: any): Promise<APIResponse<any>> {
    return this.request<any>('/user/stats', {
      method: 'PUT',
      body: JSON.stringify(stats),
    });
  }

  async getAchievements(): Promise<APIResponse<any>> {
    return this.request<any>('/user/achievements', {
      method: 'GET',
    });
  }

  async getUserSettings(): Promise<APIResponse<any>> {
    return this.request<any>('/user/settings', {
      method: 'GET',
    });
  }

  async updateUserSettings(settings: any): Promise<APIResponse<any>> {
    return this.request<any>('/user/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Chatbot Methods
  async sendChatMessage(message: string, context?: any): Promise<APIResponse<any>> {
    return this.request<any>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async getChatSuggestions(): Promise<APIResponse<string[]>> {
    return this.request<string[]>('/suggestions', {
      method: 'GET',
    });
  }
}

// Create singleton instance
export const apiService = new APIService();

// Export individual methods for convenience
export const {
  getCurrentAQI,
  getAQIForecast,
  getAQIHistory,
  getCurrentWeather,
  getWeatherForecast,
  planTrip,
  optimizeTrip,
  getTripHistory,
  getTEMPOData,
  getTEMPOHistorical,
  getTEMPOCoverage,
  getGlobalEnvironmentalData,
  getRegionalEnvironmentalData,
  getEnvironmentalTrends,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  updateUserStats,
  getAchievements,
  getUserSettings,
  updateUserSettings,
  sendChatMessage,
  getChatSuggestions,
} = apiService;
