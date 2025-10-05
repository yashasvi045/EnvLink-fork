import { ReactNode } from 'react';
import { AQIData, UserStats, WeatherData, TripPlan, ChatMessage, Achievement, DailyGoal } from './index';

// Base Component Props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
}

// AQI Display Component Props
export interface AQIDisplayProps extends BaseComponentProps {
  value: number;
  location: string;
  trend?: 'up' | 'down' | 'stable';
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

// Navigation Component Props
export interface NavigationProps extends BaseComponentProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userStats?: UserStats;
  showUserStats?: boolean;
}

// Dashboard Component Props
export interface DashboardProps extends BaseComponentProps {
  onNavigate: (page: string) => void;
  userStats?: UserStats;
  aqiData?: AQIData;
  weatherData?: WeatherData;
  isLoading?: boolean;
  error?: string;
}

// Trip Planner Component Props
export interface TripPlannerProps extends BaseComponentProps {
  onTripPlanned?: (trip: TripPlan) => void;
  initialOrigin?: string;
  initialDestination?: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
}

// Chatbot Component Props
export interface ChatbotProps extends BaseComponentProps {
  onMessageSent?: (message: ChatMessage) => void;
  initialMessages?: ChatMessage[];
  quickQuestions?: string[];
  placeholder?: string;
}

// Earth Today Component Props
export interface EarthTodayProps extends BaseComponentProps {
  environmentalData?: any;
  satelliteData?: any;
  isLoading?: boolean;
  error?: string;
}

// AQI Lab Component Props
export interface AQILabProps extends BaseComponentProps {
  aqiData?: AQIData[];
  historicalData?: any[];
  comparisonData?: any[];
  onExportData?: (format: 'csv' | 'json' | 'pdf') => void;
}

// Gamification Panel Component Props
export interface GamificationPanelProps extends BaseComponentProps {
  compact?: boolean;
  showLeaderboard?: boolean;
  userStats?: UserStats;
  achievements?: Achievement[];
  dailyGoals?: DailyGoal[];
  onAchievementClick?: (achievement: Achievement) => void;
  onGoalClick?: (goal: DailyGoal) => void;
}

// Achievement Toast Component Props
export interface AchievementToastProps extends BaseComponentProps {
  title: string;
  description: string;
  points: number;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

// Streak Tracker Component Props
export interface StreakTrackerProps extends BaseComponentProps {
  currentStreak: number;
  longestStreak: number;
  streakHistory: number[];
  onStreakClick?: () => void;
}

// Leaderboard Component Props
export interface LeaderboardProps extends BaseComponentProps {
  users: Array<{
    id: string;
    name: string;
    points: number;
    level: number;
    avatar?: string;
  }>;
  currentUserId?: string;
  showTop?: number;
  onUserClick?: (userId: string) => void;
}

// Card Component Props
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Button Component Props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input Component Props
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
}

// Progress Component Props
export interface ProgressProps extends BaseComponentProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  animated?: boolean;
  showValue?: boolean;
}

// Badge Component Props
export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

// Modal Component Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
}

// Toast Component Props
export interface ToastProps extends BaseComponentProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Loading Component Props
export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  overlay?: boolean;
}

// Error Boundary Props
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

// Chart Component Props
export interface ChartProps extends BaseComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'scatter';
  width?: number;
  height?: number;
  responsive?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  colors?: string[];
}

// Map Component Props
export interface MapProps extends BaseComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    description?: string;
    color?: string;
  }>;
  routes?: Array<{
    path: Array<{ lat: number; lng: number }>;
    color?: string;
    width?: number;
  }>;
  onMarkerClick?: (marker: any) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

// Table Component Props
export interface TableProps extends BaseComponentProps {
  data: any[];
  columns: Array<{
    key: string;
    title: string;
    dataIndex: string;
    render?: (value: any, record: any, index: number) => ReactNode;
    sortable?: boolean;
    width?: number;
  }>;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  loading?: boolean;
  onRowClick?: (record: any, index: number) => void;
}

// Form Component Props
export interface FormProps extends BaseComponentProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
  validationSchema?: any;
  loading?: boolean;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
}

// Search Component Props
export interface SearchProps extends BaseComponentProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  loading?: boolean;
  debounceMs?: number;
}

// Filter Component Props
export interface FilterProps extends BaseComponentProps {
  filters: Array<{
    key: string;
    label: string;
    type: 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'boolean';
    options?: Array<{ label: string; value: any }>;
    placeholder?: string;
  }>;
  values: any;
  onChange: (values: any) => void;
  onReset?: () => void;
  showReset?: boolean;
}
