import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Navigation, Clock, TrendingDown, Sparkles, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { AchievementToast } from "./AchievementToast";
import { motion } from "motion/react";

export function TripPlanner() {
  const [origin, setOrigin] = useState("San Francisco, CA");
  const [destination, setDestination] = useState("Oakland, CA");
  const [showAchievement, setShowAchievement] = useState(false);
  const [routePlanned, setRoutePlanned] = useState(false);
  const [tripAdvice, setTripAdvice] = useState("Consider starting your trip early to avoid high AQI zones.");
  
  // Backend-ready: daily tip/advice/message
  // To be fetched from backend API in production
  const mockDailyTip = {
    message: "Remember to wear a mask if AQI is above 100. Stay hydrated and avoid outdoor activities during peak pollution hours.",
    advice: "Plan your outdoor activities in the morning when air quality is usually better.",
    healthTip: "Drink plenty of water to help your body cope with air pollution.",
  };
  
  const [dailyTip, setDailyTip] = useState(mockDailyTip);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  // Backend-ready: fetch daily tip from API
  useEffect(() => {
    // Example: fetch('/api/daily-tip').then(...)
    // setDailyTip(response.data)
    // For now, use mockDailyTip
    setDailyTip(mockDailyTip);
  }, []);
  
  // Backend-ready: send daily tip to email
  const handleSendTipToEmail = async () => {
    setSending(true);
    setSent(false);
    // Example API call:
    // await fetch('/api/send-tip', { method: 'POST', body: JSON.stringify({ tip: dailyTip }) })
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200); // Simulate network delay
  };

  // Auto-locate user using browser geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setOrigin(`Lat: ${latitude.toFixed(3)}, Lon: ${longitude.toFixed(3)}`);
      });
    }
  }, []);

  const handlePlanRoute = () => {
    setRoutePlanned(true);
    setShowAchievement(true);
    setTripAdvice("Great choice! Your route avoids high pollution areas. Stay hydrated and check AQI updates before departure.");
  };

  const routeSegments = [
    { location: "San Francisco (Start)", aqi: 42, time: "9:00 AM", duration: "0 min" },
    { location: "Bay Bridge", aqi: 55, time: "9:15 AM", duration: "15 min" },
    { location: "Emeryville", aqi: 48, time: "9:30 AM", duration: "30 min" },
    { location: "Oakland (End)", aqi: 45, time: "9:45 AM", duration: "45 min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 md:pb-8 px-4" style={{ paddingTop: '140px' }}>
      {showAchievement && (
        <AchievementToast
          title="Eco Explorer"
          description="You planned an eco-friendly route!"
          points={25}
          onClose={() => setShowAchievement(false)}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-[#1F2937] mb-2">Trip Planner</h1>
        <p className="text-[#6B7280] mb-8">Plan your route with real-time AQI data</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card className="p-6 bg-white shadow-lg border-0 h-[500px] flex flex-col">
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">From</label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">To</label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-gray-300"
                />
              </div>
              <Button 
                onClick={handlePlanRoute}
                className="w-full bg-[#10B981] hover:bg-[#059669] relative overflow-hidden group"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Find Best Route
                {routePlanned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  </motion.div>
                )}
              </Button>
            </div>
            {/* Map Visualization */}
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl relative overflow-hidden">
              {/* Mock map with route */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 400 300" className="p-8">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#10B981", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#F59E0B", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#10B981", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50,150 Q 150,100 250,140 T 350,150"
                    stroke="url(#routeGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="150" r="12" fill="#10B981" />
                  <circle cx="50" cy="150" r="6" fill="white" />
                  <circle cx="150" cy="115" r="8" fill="#F59E0B" />
                  <circle cx="250" cy="140" r="8" fill="#10B981" />
                  <circle cx="350" cy="150" r="12" fill="#10B981" />
                  <circle cx="350" cy="150" r="6" fill="white" />
                </svg>
              </div>
            </div>
          </Card>
          {/* Route Details */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#1F2937]">Route Details</h3>
              <div className="flex items-center gap-2 text-[#10B981]">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm">Optimal Route</span>
              </div>
            </div>
            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Average AQI</p>
                  <p className="text-2xl text-[#10B981]">47</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Duration</p>
                  <p className="text-2xl text-[#1F2937]">45m</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Distance</p>
                  <p className="text-2xl text-[#1F2937]">12mi</p>
                </div>
              </div>
            </div>
            {/* Trip Advice (backend-ready) */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="p-4 bg-blue-50 border border-blue-200 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                  <span className="font-semibold text-[#1F2937]">Daily Health Tip</span>
                </div>
                <p className="text-[#2563EB] text-base">{dailyTip.message}</p>
                <p className="text-[#059669] text-sm">Advice: {dailyTip.advice}</p>
                <p className="text-[#F59E0B] text-sm">Health Tip: {dailyTip.healthTip}</p>
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
            </div>
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="text-[#1F2937] mb-2">Trip Advice</h4>
              <p className="text-[#3B82F6] text-lg">{tripAdvice}</p>
            </div>
            {/* Step by step */}
            <div className="space-y-4">
              <h4 className="text-[#1F2937]">Step-by-Step Guide</h4>
              {routeSegments.map((segment, idx) => {
                // Dynamic color based on AQI level - automatically changes with backend data
                let borderColor = "border-[#10B981]"; // Good
                let bgColor = "bg-green-50";
                let textColor = "text-[#10B981]";
                
                if (segment.aqi > 50 && segment.aqi <= 100) {
                  borderColor = "border-[#3B82F6]"; // Moderate
                  bgColor = "bg-blue-50";
                  textColor = "text-[#3B82F6]";
                }
                if (segment.aqi > 100 && segment.aqi <= 150) {
                  borderColor = "border-[#F59E0B]"; // Unhealthy for Sensitive
                  bgColor = "bg-orange-50";
                  textColor = "text-[#F59E0B]";
                }
                if (segment.aqi > 150 && segment.aqi <= 200) {
                  borderColor = "border-[#EF4444]"; // Unhealthy
                  bgColor = "bg-red-50";
                  textColor = "text-[#EF4444]";
                }
                if (segment.aqi > 200 && segment.aqi <= 300) {
                  borderColor = "border-[#8B5CF6]"; // Very Unhealthy
                  bgColor = "bg-purple-50";
                  textColor = "text-[#8B5CF6]";
                }
                if (segment.aqi > 300) {
                  borderColor = "border-[#7C2D12]"; // Hazardous
                  bgColor = "bg-red-900";
                  textColor = "text-[#7C2D12]";
                }
                
                return (
                  <div key={idx} className={`p-4 rounded-xl border-l-4 ${borderColor} ${bgColor}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-[#6B7280]" />
                          <p className="text-[#1F2937]">{segment.location}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{segment.time}</span>
                          </div>
                          <span>{segment.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#6B7280]">AQI</p>
                        <p className={`text-lg font-semibold ${textColor}`}>
                          {segment.aqi}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
