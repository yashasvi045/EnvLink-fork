# Backend Integration Guide for EnvLink Frontend

## ✅ Frontend Status: **READY FOR BACKEND INTEGRATION**

Last Updated: October 5, 2025

---

## 📊 Project Readiness Summary

### ✅ Completed Frontend Features
- ✅ All UI components fully implemented
- ✅ API service layer with TypeScript types
- ✅ Mock data integration points identified
- ✅ Error handling framework
- ✅ Loading states implemented
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ PWA configuration ready
- ✅ State management (React Context)
- ✅ Navigation and routing
- ✅ Gamification system UI
- ✅ Daily tips/advice system UI

### 🔄 Pending Backend Integration Points
All features are working with mock data and ready to connect to b## 📝 Mock Data Locations

For reference, here are all files using mock data that need backend integration:

1. **Dashboard.tsx** - AQI data, weather data, daily tips
2. **TripPlanner.tsx** - Route segments, trip advice, daily tips
3. **EarthToday.tsx** - Global stats, environmental updates
4. **Chatbot.tsx** - Chat responses (simple rule-based)
5. **AppContext.tsx** - User stats, achievements

## Chatbot Requirements Summary

### Chatbot Feature
The Chatbot component requires a backend to function properly:

**Technology Options:**
- External API integration (optional)
- **Anthropic Claude API** - Good alternative with strong reasoning
- **Google Gemini API** - Cost-effective, good performance
- **Open-source LLMs** (Llama 3, Mistral) - Self-hosted, more control
- Custom backend logic (optional)
- **Hybrid System** - Combine rule-based + ML for optimal results

**Implementation Complexity:**
- 🟢 **Low**: Use existing LLM API (GPT-4, Claude) with custom prompts
- 🟡 **Medium**: Implement RAG (Retrieval-Augmented Generation) system
- 🔴 **High**: Custom backend logic on domain-specific data

**Note for Backend Team:**
The chatbot can be implemented **separately** from other features. The frontend has a working rule-based fallback, so you can:
1. Launch with basic rule-based responses
2. Develop ML backend in parallel
3. Swap in ML responses when ready (no frontend changes needed)Is.

---

## 🤖 Backend Technology Stack

### Node.js Backend
- **Runtime**: Node.js (recommended v18+ LTS)
- **Framework**: Express.js or Fastify (for performance)
- **Data Processing**: Big Data APIs for scalable operations
- **Caching**: Redis for fast response times

### Data Sources
1. **NASA TEMPO Satellite Data** - Real-time atmospheric composition
   - NO₂ (Nitrogen Dioxide)
   - O₃ (Ozone)
   - HCHO (Formaldehyde)
   - AOD (Aerosol Optical Depth)
   - Update Frequency: Hourly
   
2. **Local AQI Data** - Ground station measurements
   - PM2.5, PM10, SO₂, CO levels
   - Real-time updates from monitoring stations
   - Historical data for training

3. **Big Data APIs** - Aggregated environmental data
   - Weather patterns
   - Historical trends
   - Regional statistics

### ML Forecasting: XGBoost Model
- **Algorithm**: XGBoost (Extreme Gradient Boosting)
- **Purpose**: 7-day AQI forecasting
- **Features**: 
  - Lag features (1-day, 7-day, 30-day historical AQI)
  - Temporal features (hour, day of week, season)
  - Weather data (temperature, humidity, wind speed)
  - Pollutant correlations (PM2.5, PM10, O₃, NO₂, SO₂, CO)
  - NASA TEMPO satellite measurements
- **Performance**: < 50ms inference time for real-time predictions
- **Training**: Continuous learning from new data

---

## 🔌 API Integration Points

### 1. **AQI Data Endpoints** (PRIORITY: HIGH) - **Uses XGBoost ML**

#### Current Status
- Frontend: Mock AQI data (value: 42, location: "San Francisco, CA")
- File: `src/components/Dashboard.tsx`, `src/components/AQIDisplay.tsx`

#### Backend Implementation Notes
- Integrate NASA TEMPO satellite data
- Query local AQI monitoring stations
- Run XGBoost model for current analysis and forecasting
- Combine multiple data sources for accuracy

#### Required Backend Endpoints

**GET/POST `/api/aqi/current`**
```typescript
Request:
{
  latitude: number,
  longitude: number,
  includeForecast?: boolean,
  includeHealthAdvice?: boolean
}

Response:
{
  success: boolean,
  data: {
    current: {
      aqi: number,
      location: string,
      coordinates: { latitude: number, longitude: number },
      timestamp: string,
      pollutants: {
        pm25: number,
        pm10: number,
        o3: number,
        no2: number,
        so2: number,
        co: number
      },
      healthAdvice: {
        general: string,
        sensitiveGroups: string,
        outdoorActivities: string,
        maskRequired: boolean,
        windowsOpen: boolean
      }
    }
  },
  timestamp: string
}
```

**POST `/api/aqi/forecast`** - **XGBoost ML Prediction**
```typescript
Request:
{
  latitude: number,
  longitude: number,
  days?: number, // 1-7 days (default: 7)
  includeHourly?: boolean
}

Response:
{
  success: boolean,
  data: {
    forecast: {
      daily: Array<{
        date: string,
        day: string, // "Mon", "Tue", etc.
        aqi: number, // XGBoost prediction
        minAqi: number, // Confidence interval lower bound
        maxAqi: number, // Confidence interval upper bound
        temp: number,
        confidence: number, // Model confidence score (0-1)
        features?: { // Optional: Feature importance for transparency
          lagFeatures: any,
          weatherImpact: any,
          tempoData: any
        }
      }>
    },
    modelInfo?: { // Optional: Model metadata
      version: string,
      lastTrained: string,
      accuracy: number
    }
  }
}

// Backend Implementation Notes:
// 1. Fetch historical AQI data for lag features (1, 7, 30 days)
// 2. Get weather forecast data for next 7 days
// 3. Query NASA TEMPO for atmospheric composition trends
// 4. Run XGBoost model with combined features
// 5. Return predictions with confidence intervals
```

**POST `/api/aqi/historical`**
```typescript
Request:
{
  latitude: number,
  longitude: number,
  days: number // default 7
}
```

---

### 2. **Weather Data Endpoints** (PRIORITY: HIGH)

#### Current Status
- Frontend: Mock weather data (Wind: 12 mph, Humidity: 65%, UV Index: 5)
- File: `src/components/Dashboard.tsx`

#### Required Backend Endpoints

**POST `/api/weather/current`**
```typescript
Request:
{
  latitude: number,
  longitude: number
}

Response:
{
  success: boolean,
  data: {
    temperature: number,
    humidity: number,
    windSpeed: number,
    windDirection: string,
    uvIndex: number,
    visibility: number,
    pressure: number,
    condition: string
  }
}
```

**POST `/api/weather/forecast`**
```typescript
Request:
{
  latitude: number,
  longitude: number,
  days?: number // default 7
}
```

---

### 3. **Trip Planning Endpoints** (PRIORITY: MEDIUM)

#### Current Status
- Frontend: Mock route data with AQI values
- File: `src/components/TripPlanner.tsx`

#### Required Backend Endpoints

**POST `/api/trips/plan`**
```typescript
Request:
{
  origin: {
    latitude: number,
    longitude: number,
    address: string
  },
  destination: {
    latitude: number,
    longitude: number,
    address: string
  },
  departureTime?: string, // ISO string
  transportMode: 'driving' | 'walking' | 'cycling' | 'transit',
  preferences: {
    prioritizeAirQuality: boolean,
    avoidHighTraffic: boolean,
    maxDuration?: number,
    maxDistance?: number
  }
}

Response:
{
  success: boolean,
  data: {
    tripId: string,
    origin: string,
    destination: string,
    totalDuration: string,
    totalDistance: number,
    averageAQI: number,
    segments: Array<{
      location: string,
      aqi: number,
      time: string,
      duration: string,
      coordinates: { lat: number, lng: number },
      weather: {
        temperature: number,
        humidity: number,
        windSpeed: number,
        uvIndex: number
      },
      recommendations: string[]
    }>,
    recommendations: string[]
  }
}
```

**POST `/api/trips/optimize`**
```typescript
Request:
{
  tripId: string,
  preferences: any
}
```

**GET `/api/trips/history`**
```typescript
Response:
{
  success: boolean,
  data: Array<TripPlanResponse>
}
```

---

### 4. **Daily Tips/Advice Endpoint** (PRIORITY: HIGH)

#### Current Status
- Frontend: Mock daily tip data
- Files: `src/components/Dashboard.tsx`, `src/components/TripPlanner.tsx`

#### Required Backend Endpoint

**GET `/api/daily-tip`**
```typescript
Response:
{
  success: boolean,
  data: {
    message: string,
    advice: string,
    healthTip: string,
    aqi?: number,
    location?: string
  }
}
```

**POST `/api/daily-tip/send-email`**
```typescript
Request:
{
  email: string,
  tip: {
    message: string,
    advice: string,
    healthTip: string
  }
}

Response:
{
  success: boolean,
  message: string
}
```

---

### 5. **NASA TEMPO Data Endpoints** (PRIORITY: MEDIUM)

#### Current Status
- Frontend: Placeholder for satellite data
- File: `src/components/EarthToday.tsx`

#### Backend Implementation Notes
- **Data Source**: NASA TEMPO (Tropospheric Emissions: Monitoring of Pollution)
- **Update Frequency**: Hourly measurements
- **Coverage**: North America (can expand)
- **Integration**: Real-time API or cached database
- **Purpose**: Enhance AQI predictions and provide atmospheric insights

#### TEMPO Data Components
1. **NO₂ (Nitrogen Dioxide)** - Traffic and industrial pollution indicator
2. **O₃ (Ozone)** - Photochemical smog and respiratory health
3. **HCHO (Formaldehyde)** - VOC emissions tracking
4. **AOD (Aerosol Optical Depth)** - Particulate matter estimation

#### Required Backend Endpoints

**POST `/api/tempo/current`**
```typescript
Request:
{
  latitude: number,
  longitude: number,
  startDate?: string,
  endDate?: string
}

Response:
{
  success: boolean,
  data: {
    data: Array<{
      timestamp: string,
      latitude: number,
      longitude: number,
      no2: number,
      o3: number,
      hcho: number,
      aod: number,
      quality: 'high' | 'medium' | 'low',
      coverage: number
    }>,
    coverage: {
      global: number,
      regional: number,
      local: number
    },
    lastUpdated: string
  }
}
```

**GET `/api/tempo/coverage`**
```typescript
Response:
{
  success: boolean,
  data: {
    regions: Array<string>,
    lastUpdated: string
  }
}
```

---

### 6. **Environmental Data Endpoints** (PRIORITY: MEDIUM)

#### Current Status
- Frontend: Mock global stats
- File: `src/components/EarthToday.tsx`

#### Required Backend Endpoints

**GET `/api/environmental/global`**
```typescript
Response:
{
  success: boolean,
  data: {
    global: {
      co2Levels: number, // ppm
      co2Change: string, // e.g., "-0.3%"
      oceanTemperature: number, // °C
      oceanTempChange: string,
      deforestationRate: number,
      deforestationChange: string,
      globalAQI: number,
      aqiStatus: string,
      lastUpdated: string
    },
    trends: Array<{
      date: string,
      co2: number,
      temperature: number,
      aqi: number,
      deforestation: number
    }>
  }
}
```

**POST `/api/environmental/regional`**
```typescript
Request:
{
  region: string
}
```

**POST `/api/environmental/trends`**
```typescript
Request:
{
  days: number // default 30
}
```

**GET `/api/environmental/updates`**
```typescript
Response:
{
  success: boolean,
  data: {
    updates: Array<{
      title: string,
      description: string,
      time: string,
      category: string,
      source?: string
    }>
  }
}
```

---

### 7. **Chatbot Endpoints** (PRIORITY: LOW) - **REQUIRES ML/AI**

#### Current Status
- Frontend: Simple rule-based responses
- File: `src/components/Chatbot.tsx`

#### ⚠️ **Machine Learning Requirements**
The chatbot feature requires ML/AI implementation on the backend:
- **Natural Language Processing (NLP)** for understanding user queries
- **Intent Classification** to determine user needs (AQI info, health advice, trip planning, etc.)
- **Context-Aware Responses** based on current location, AQI levels, weather conditions
- **Conversational Memory** to maintain context across multiple messages
- **Knowledge Base** about air quality, pollutants, health effects, environmental data

#### Recommended ML Approaches
1. **LLM Integration**: Use GPT-4, Claude, or Gemini API with custom prompts
2. **Fine-tuned Model**: Train on air quality and environmental health domain data
3. **Hybrid Approach**: Rule-based for simple queries + ML for complex conversations
4. **RAG (Retrieval-Augmented Generation)**: Combine vector database with LLM for accurate, up-to-date information

#### Required Backend Endpoints

**POST `/api/chatbot/chat`**
```typescript
Request:
{
  message: string,
  context?: {
    currentLocation?: string,
    currentAQI?: number,
    currentWeather?: any,
    userPreferences?: any,
    conversationHistory?: Array<{
      role: 'user' | 'assistant',
      content: string,
      timestamp: string
    }>
  },
  conversationId?: string
}

Response:
{
  success: boolean,
  data: {
    response: string,
    conversationId: string,
    intent?: string, // e.g., 'check_aqi', 'health_advice', 'trip_planning'
    suggestions?: string[], // Follow-up question suggestions
    confidence?: number, // ML model confidence score
    sources?: Array<{ // If using RAG
      title: string,
      url?: string,
      snippet?: string
    }>
  }
}
```

**GET `/api/chatbot/suggestions`**
```typescript
Response:
{
  success: boolean,
  data: {
    suggestions: string[] // Context-aware question suggestions
  }
}
```

#### ML Training Data Examples
The chatbot should be trained to handle queries like:
- "What's the current AQI in my location?"
- "Is it safe to go running outside today?"
- "Should I wear a mask based on current air quality?"
- "Plan a trip with the best air quality route"
- "What are the health effects of high PM2.5 levels?"
- "How does ozone affect sensitive groups?"
- "Compare air quality between two cities"
- "What's the forecast for tomorrow?"

#### Integration with Other APIs
The chatbot backend should integrate with:
- AQI Data API for real-time information
- Weather API for comprehensive responses
- Trip Planning API for route suggestions
- Environmental Data API for educational content

---

### 8. **User Data Endpoints** (PRIORITY: LOW)

#### Current Status
- Frontend: Mock user stats in context
- File: `src/contexts/AppContext.tsx`

#### Required Backend Endpoints

**GET `/api/user/profile`**
```typescript
Response:
{
  success: boolean,
  data: {
    id: string,
    name: string,
    email: string,
    avatar?: string,
    createdAt: string
  }
}
```

**PUT `/api/user/profile`**
```typescript
Request:
{
  name?: string,
  email?: string,
  avatar?: string
}
```

**GET `/api/user/stats`**
```typescript
Response:
{
  success: boolean,
  data: {
    level: number,
    points: number,
    streak: number,
    achievements: number,
    tripsPlanned: number,
    aqiChecks: number
  }
}
```

**PUT `/api/user/stats`**
```typescript
Request:
{
  points?: number,
  streak?: number,
  achievements?: number
}
```

**GET `/api/user/achievements`**
```typescript
Response:
{
  success: boolean,
  data: {
    achievements: Array<{
      id: string,
      title: string,
      description: string,
      category: string,
      points: number,
      unlocked: boolean,
      unlockedAt?: string
    }>
  }
}
```

**GET `/api/user/settings`**
```typescript
Response:
{
  success: boolean,
  data: {
    notifications: boolean,
    emailAlerts: boolean,
    darkMode: boolean,
    defaultLocation?: string
  }
}
```

**PUT `/api/user/settings`**
```typescript
Request:
{
  notifications?: boolean,
  emailAlerts?: boolean,
  darkMode?: boolean,
  defaultLocation?: string
}
```

---

## 🔧 Frontend Configuration

### Environment Variables Required

Create a `.env.local` file with:

```env
# Backend API
REACT_APP_API_URL=http://localhost:3001/api

# NASA API (if direct calls needed)
REACT_APP_NASA_API_KEY=your_nasa_api_key

# Google Maps (for trip planning)
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Feature Flags
REACT_APP_ENABLE_PWA=true
REACT_APP_ENABLE_CHATBOT=true
REACT_APP_DEBUG=false
```

### API Service Configuration

File: `src/types/constants.ts`

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
```

---

## 🚀 Integration Steps

### Step 1: Backend Setup
1. Implement all required endpoints listed above
2. Ensure CORS is configured for frontend origin
3. Set up error handling with proper HTTP status codes
4. Implement request validation
5. Add rate limiting if needed

### Step 2: Frontend Integration
1. Update `.env.local` with backend API URL
2. Test API endpoints with Postman/Thunder Client
3. Replace mock data calls with real API calls
4. Test error scenarios
5. Validate response formats

### Step 3: Testing
1. Test all API integrations
2. Verify error handling
3. Check loading states
4. Test offline functionality (PWA)
5. Perform end-to-end testing

---

## 📝 API Response Standards

### Success Response Format
```typescript
{
  success: true,
  data: any,
  message?: string,
  timestamp: string
}
```

### Error Response Format
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  },
  timestamp: string
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable

---

## 🔐 Security Requirements

### CORS Configuration
```javascript
{
  origin: ['http://localhost:3000', 'https://your-production-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Authentication (if needed)
- Frontend ready to handle JWT tokens
- Token storage in localStorage
- Automatic token refresh
- Logout functionality

---

## 📊 Mock Data Locations

For reference, here are all files using mock data that need backend integration:

1. **Dashboard.tsx** - AQI data, weather data, daily tips
2. **TripPlanner.tsx** - Route segments, trip advice, daily tips
3. **EarthToday.tsx** - Global stats, environmental updates
4. **Chatbot.tsx** - Chat responses (rule-based)
5. **AppContext.tsx** - User stats, achievements

---

## ✅ Frontend Checklist Before Production

- [ ] All API endpoints tested with backend
- [ ] Error handling verified
- [ ] Loading states working correctly
- [ ] Mock data removed
- [ ] Environment variables configured
- [ ] PWA functionality tested
- [ ] Mobile responsiveness verified
- [ ] Performance optimization completed
- [ ] Security review done
- [ ] Accessibility tested

---

## 📞 Support & Contact

For questions about frontend integration:
- Check `DEVELOPER_README.md` for detailed documentation
- Review `src/services/api.ts` for API service implementation
- Check `src/types/api.ts` for all TypeScript interfaces

---

## 🎯 Priority Implementation Order

### Phase 1 (Week 1) - Core Functionality
1. AQI Data endpoints (`/api/aqi/*`)
2. Weather Data endpoints (`/api/weather/*`)
3. Daily Tips endpoint (`/api/daily-tip`)

### Phase 2 (Week 2) - Enhanced Features
4. Trip Planning endpoints (`/api/trips/*`)
5. Environmental Data endpoints (`/api/environmental/*`)
6. NASA TEMPO Data endpoints (`/api/tempo/*`)

### Phase 3 (Week 3) - User Features
7. User Data endpoints (`/api/user/*`)
8. Additional features as needed

### Phase 4 (Later) - Advanced Chatbot Features (Requires Backend Team)
9. **Chatbot Integration** (`/api/chatbot/*`)
   - Requires NLP, LLM integration, or fine-tuned model
  - Context-aware conversational logic
   - Knowledge base about air quality and environmental health
   - This is a separate ML project and can be developed in parallel or after core features

---

**Status: READY FOR BACKEND DEVELOPMENT** ✅

The frontend is fully functional with mock data and ready to integrate with backend APIs as soon as they are available.
