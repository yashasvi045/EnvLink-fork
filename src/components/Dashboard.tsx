import { AQIDisplay } from "./AQIDisplay";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Wind, Droplets, Sun, TrendingDown, MapPin, Sparkles, Globe, Map, X, Mail } from "lucide-react";
import { GamificationPanel } from "./GamificationPanel";
import { motion } from "motion/react";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Backend-ready: daily tip/advice/message
  const mockDailyTip = {
    message: "Remember to wear a mask if AQI is above 100. Stay hydrated and avoid outdoor activities during peak pollution hours.",
    advice: "Plan your outdoor activities in the morning when air quality is usually better.",
    healthTip: "Drink plenty of water to help your body cope with air pollution.",
  };
  const [showTipPopup, setShowTipPopup] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Dummy email handler
  const handleSendTipToEmail = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 md:pb-8 relative">
      {/* Top Header Bar - Glassmorphism, matches Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          background: 'rgba(255,255,255,0.35)',
          boxShadow: '0 16px 48px 0 rgba(31,38,135,0.37)',
          borderBottom: '2px solid rgba(255,255,255,0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center" style={{ height: '7rem' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1F2937]">EnvLink</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 pr-12">
              <span className="text-lg text-[#6B7280] font-medium">Dashboard</span>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div style={{ height: '7rem' }} />
      {/* Daily Tip Popup (backend-ready, overlays dashboard) */}
      {showTipPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-36 left-1/2 transform -translate-x-1/2 z-50 px-2"
        >
          <Card className="p-3 bg-blue-50 border border-blue-200 shadow-xl relative flex flex-col gap-1" style={{ width: '30vw', minWidth: '220px' }}>
            {/* AQI Stat with Advice */}
            <div className="flex flex-col items-center mb-2">
              <AQIDisplay value={42} location="San Francisco, CA" trend="down" size="small" />
            </div>
            <button
              className="absolute top-2 right-2 text-[#6B7280] hover:text-[#EF4444]"
              onClick={() => setShowTipPopup(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#3B82F6]" />
              <span className="font-semibold text-[#1F2937]">Daily Health Tip</span>
            </div>
            <p className="text-[#2563EB] text-base">{mockDailyTip.message}</p>
            <p className="text-[#059669] text-sm">Advice: {mockDailyTip.advice}</p>
            <p className="text-[#F59E0B] text-sm">Health Tip: {mockDailyTip.healthTip}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={handleSendTipToEmail}
                disabled={sending}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              >
                <Mail className="w-4 h-4 mr-1" />
                {sending ? "Sending..." : "Send to Email"}
              </Button>
              {sent && <span className="text-green-600 text-sm">Sent!</span>}
            </div>
          </Card>
        </motion.div>
      )}
      
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl text-[#1F2937] mt-8 mb-8 font-extrabold">Air Quality Dashboard</h1>
          <p className="text-2xl md:text-3xl text-[#6B7280] font-bold mb-12">Real-time AQI Forecast, Trip Planning & Earth Insights</p>
        </div>

    {/* Main AQI Display */}
  <Card className="p-6 md:p-8 bg-white shadow-lg border border-gray-200 flex flex-col gap-4 mb-8">
      <AQIDisplay value={42} location="San Francisco, CA" trend="down" size="large" />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-[#3B82F6]" />
          <div>
            <p className="text-sm text-[#6B7280]">Wind</p>
            <p className="text-[#1F2937]">12 mph</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-[#3B82F6]" />
          <div>
            <p className="text-sm text-[#6B7280]">Humidity</p>
            <p className="text-[#1F2937]">65%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[#F59E0B]" />
          <div>
            <p className="text-sm text-[#6B7280]">UV Index</p>
            <p className="text-[#1F2937]">5</p>
          </div>
        </div>
      </div>
    </Card>

    {/* Spacer */}
    <div style={{ height: '2rem' }} />

    {/* 7-Day Forecast */}
  <Card className="p-6 bg-white shadow-md border border-gray-200 flex flex-col gap-4 mb-8">
      <h3 className="text-[#1F2937] mb-2">7-Day AQI Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {[
          { day: "Mon", aqi: 42, temp: 72 },
          { day: "Tue", aqi: 38, temp: 75 },
          { day: "Wed", aqi: 45, temp: 74 },
          { day: "Thu", aqi: 52, temp: 70 },
          { day: "Fri", aqi: 48, temp: 68 },
          { day: "Sat", aqi: 35, temp: 71 },
          { day: "Sun", aqi: 40, temp: 73 },
        ].map((day, idx) => {
          // Dynamic color based on AQI level - automatically changes with backend data
          let color = "bg-[#10B981]"; // Good (0-50)
          if (day.aqi > 50 && day.aqi <= 100) color = "bg-[#3B82F6]"; // Moderate
          if (day.aqi > 100 && day.aqi <= 150) color = "bg-[#F59E0B]"; // Unhealthy for Sensitive
          if (day.aqi > 150 && day.aqi <= 200) color = "bg-[#EF4444]"; // Unhealthy
          if (day.aqi > 200 && day.aqi <= 300) color = "bg-[#8B5CF6]"; // Very Unhealthy
          if (day.aqi > 300) color = "bg-[#7C2D12]"; // Hazardous
          
          return (
            <div key={idx} className="text-center">
              <p className="text-sm text-[#6B7280] mb-2">{day.day}</p>
              <div className={`${color} rounded-lg p-2 mb-2`}>
                <span className="text-white">{day.aqi}</span>
              </div>
              <p className="text-sm text-[#6B7280]">{day.temp}°</p>
            </div>
          );
        })}
      </div>
    </Card>

    {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Earth Today Snapshot */}
  <Card className="p-6 bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer flex flex-col gap-4" onClick={() => onNavigate("earth")}> 
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#3B82F6] bg-opacity-10 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <h3 className="text-[#1F2937]">Earth Today</h3>
        </div>
        <p className="text-[#6B7280] mb-4">Global CO₂ levels decreased by 0.3% this week</p>
        <div className="flex items-center gap-2 text-[#10B981] mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">View satellite data</span>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[#EF4444] font-semibold mb-2">Climate change is impacting millions. Take action today!</p>
          <a href="https://www.earthday.org/take-action-now/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#10B981] text-white hover:bg-[#059669] px-6 py-2 rounded-lg font-bold shadow-md transition-all">
              Support Environmental Action
            </Button>
          </a>
        </div>
      </Card>

      {/* Daily Advice */}
  <Card className="p-6 bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-md border border-green-200 flex flex-col gap-4">
        <h3 className="mb-2">Daily Advice</h3>
        <p className="mb-2 opacity-90">Perfect day for outdoor activities! The air quality is excellent and the weather is ideal.</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-sm">Low pollen count</span>
        </div>
      </Card>

      {/* Trip Planner CTA */}
  <Card className="p-6 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white shadow-md border border-blue-200 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Map className="w-6 h-6" />
          </div>
          <h3>Plan Your Trip</h3>
        </div>
        <p className="mb-2 opacity-90">Get AQI forecasts along your route and find the cleanest path</p>
        <Button 
          onClick={() => onNavigate("trip")}
          className="w-full bg-white text-[#3B82F6] hover:bg-gray-100"
        >
          Start Planning
        </Button>
      </Card>
    </div>

    {/* Compact Gamification Panel - Mobile/Tablet Only */}
    <div className="lg:hidden">
      <GamificationPanel compact={true} />
    </div>
      </div>
    </div>
  );
}
