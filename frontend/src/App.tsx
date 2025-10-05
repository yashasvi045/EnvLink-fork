import React, { Suspense, lazy } from "react";
import { AppProvider, useApp } from "./contexts/AppContext";
import { Navigation } from "./components/Navigation";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./components/LoadingProvider";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./components/Dashboard").then(m => ({ default: m.Dashboard })));
const TripPlanner = lazy(() => import("./components/TripPlanner").then(m => ({ default: m.TripPlanner })));
const Chatbot = lazy(() => import("./components/Chatbot").then(m => ({ default: m.Chatbot })));
const EarthToday = lazy(() => import("./components/EarthToday").then(m => ({ default: m.EarthToday })));
const AQILab = lazy(() => import("./components/AQILab").then(m => ({ default: m.AQILab })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
  <p className="text-lg font-medium text-gray-600">Loading EnvLink...</p>
      </div>
    </div>
  );
}

// Main App Content with Routing
function AppContent() {
  const { state, dispatch } = useApp();

  const handleNavigate = (page: string) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case "home":
        return <Dashboard onNavigate={handleNavigate} />;
      case "trip":
        return <TripPlanner />;
      case "chat":
        return <Chatbot />;
      case "earth":
        return <EarthToday />;
      case "lab":
        return <AQILab />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ErrorBoundary>
        {/* Navigation Bar */}
        <Navigation
          currentPage={state.currentPage}
          onNavigate={handleNavigate}
          userStats={state.userStats}
        />

        {/* Main Content with Loading State */}
        <main className="w-full">
          <Suspense fallback={<PageLoader />}>
            <LoadingProvider isLoading={state.isLoading}>
              {renderPage()}
            </LoadingProvider>
          </Suspense>
        </main>

        {/* Offline Indicator */}
        {!state.isOnline && (
          <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <span className="text-sm font-medium">
              ⚠️ You're offline. Some features may not work.
            </span>
          </div>
        )}

        {/* Update Available Notification */}
        {state.updateAvailable && (
          <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-[#10B981] text-white px-4 py-3 rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">
                🎉 New version available!
              </span>
              <button
                onClick={() => window.location.reload()}
                className="text-xs bg-white text-[#10B981] px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

// Root App Component with Providers
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
