# EnvLink Frontend - Developer Documentation

## 🚀 Project Overview

EnvLink is a real-time AQI (Air Quality Index) monitoring and environmental awareness platform built for the NASA Space Apps Challenge. This frontend application provides users with comprehensive air quality data, trip planning with environmental considerations, and educational content about environmental health.

## 📋 Features

- **Real-time AQI Monitoring**: Location-based air quality data with forecasts
- **Trip Planning**: Route optimization considering air quality factors
- **Interactive Chatbot**: Assistance for air quality questions
- **Earth Today**: Global environmental data and satellite imagery
- **AQI Lab**: Advanced analytics and historical data visualization
- **Gamification**: Achievement system and daily goals
- **PWA Support**: Offline capabilities and mobile app-like experience

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: React Context + useReducer
- **Charts**: Recharts
- **PWA**: Vite PWA Plugin + Workbox
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── figma/           # UI components
│   └── *.tsx            # Feature components
├── contexts/            # React Context providers
│   └── AppContext.tsx   # Main app state management
├── hooks/               # Custom React hooks
│   ├── useAQIData.ts    # AQI data fetching
│   ├── useWeatherData.ts # Weather data fetching
│   └── useTripPlanning.ts # Trip planning logic
├── services/            # API services
│   └── api.ts           # Backend API integration
├── types/               # TypeScript type definitions
│   ├── index.ts         # Main types
│   ├── api.ts           # API types
│   ├── components.ts    # Component prop types
│   └── constants.ts     # Application constants
├── styles/              # Global styles
└── utils/               # Utility functions
```

## 🔧 Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airguard-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_NASA_API_KEY=your_nasa_api_key
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🔌 Backend Integration

### API Endpoints

The frontend expects the following backend endpoints:

#### AQI Data
- `POST /api/aqi/current` - Get current AQI data
- `POST /api/aqi/forecast` - Get AQI forecast
- `POST /api/aqi/historical` - Get historical AQI data

#### Weather Data
- `POST /api/weather/current` - Get current weather
- `POST /api/weather/forecast` - Get weather forecast

#### Trip Planning
- `POST /api/trips/plan` - Plan a trip
- `POST /api/trips/optimize` - Optimize existing trip
- `GET /api/trips/history` - Get trip history

#### NASA TEMPO Data
- `POST /api/tempo/current` - Get current TEMPO data
- `POST /api/tempo/historical` - Get historical TEMPO data
- `GET /api/tempo/coverage` - Get TEMPO coverage data

#### Environmental Data
- `GET /api/environmental/global` - Get global environmental data
- `POST /api/environmental/regional` - Get regional data
- `POST /api/environmental/trends` - Get environmental trends

#### User Data
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics
- `PUT /api/user/stats` - Update user statistics
- `GET /api/user/achievements` - Get user achievements
- `GET /api/user/settings` - Get user settings
- `PUT /api/user/settings` - Update user settings

#### Chatbot
- `POST /api/chatbot/chat` - Send chat message
- `GET /api/chatbot/suggestions` - Get chat suggestions

### API Request/Response Format

All API requests should follow this format:

```typescript
// Request
{
  "latitude": number,
  "longitude": number,
  // ... other parameters
}

// Response
{
  "success": boolean,
  "data": any,
  "message"?: string,
  "error"?: string,
  "timestamp": string
}
```

### Error Handling

The frontend handles the following error codes:
- `NETWORK_ERROR` - Network connectivity issues
- `API_ERROR` - Backend API errors
- `MISSING_COORDINATES` - Location data required
- `PERMISSION_ERROR` - Browser permission denied
- `TIMEOUT` - Request timeout

## 🎨 Component Architecture

### State Management

The app uses React Context for global state management:

```typescript
// AppContext provides:
- User data and statistics
- AQI and weather data
- Environmental data
- UI state (loading, errors, current page)
- User settings and preferences
- PWA state (online/offline, install status)
```

### Custom Hooks

- `useAQIData()` - AQI data fetching and caching
- `useWeatherData()` - Weather data management
- `useTripPlanning()` - Trip planning functionality
- `useApp()` - Access to global app state
- `useSettings()` - User settings management

### Component Patterns

All components follow these patterns:
- TypeScript interfaces for props
- Proper error boundaries
- Loading states
- Accessibility support
- Responsive design
- PWA compatibility

## 📱 PWA Features

### Service Worker
- Caches static assets and API responses
- Provides offline functionality
- Handles background sync
- Manages push notifications

### Manifest
- App installation prompts
- Custom app icons and splash screens
- Shortcuts for quick access
- Theme and display settings

### Offline Support
- Cached AQI and weather data
- Offline trip planning (cached routes)
- Graceful degradation when offline
- Background data sync when online

## 🧪 Testing

### Test Structure
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for API services
- E2E tests for critical user flows

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Set the following in production:
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_NASA_API_KEY` - NASA API key
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API key

### Build Output
The build creates a `dist/` directory with:
- Static assets (JS, CSS, images)
- Service worker files
- PWA manifest
- Source maps (for debugging)

## 🔧 Configuration

### Vite Configuration
- PWA plugin configuration
- Build optimization
- Development server settings
- Asset handling

### Tailwind Configuration
- Custom color palette
- Component styling
- Responsive breakpoints
- Dark mode support

## 📊 Performance

### Optimization Features
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Service worker caching
- API response caching

### Monitoring
- Performance metrics tracking
- Error reporting
- User analytics
- PWA metrics

## 🐛 Troubleshooting

### Common Issues

1. **Service Worker not updating**
   - Clear browser cache
   - Check service worker registration
   - Verify manifest.json

2. **API requests failing**
   - Check CORS configuration
   - Verify API endpoints
   - Check network connectivity

3. **PWA not installing**
   - Verify manifest.json
   - Check HTTPS requirement
   - Validate service worker

4. **TypeScript errors**
   - Run `npm run type-check`
   - Check type definitions
   - Verify imports

### Debug Mode
Enable debug mode by setting:
```env
REACT_APP_DEBUG=true
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Write tests for new components
4. Update documentation
5. Test PWA functionality

## 📄 License

This project is part of the NASA Space Apps Challenge and follows the challenge guidelines.

---

**Note**: This frontend is designed to work with a Node.js backend that provides the API endpoints listed above. Ensure the backend is running and accessible before starting the frontend development server.
