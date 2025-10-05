import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Home, MapPin, MessageCircle, Globe, FlaskConical, Trophy } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userStats?: any;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "trip", label: "Trip Planner", icon: MapPin },
    { id: "chat", label: "Chatbot", icon: MessageCircle },
    { id: "earth", label: "Earth Today", icon: Globe },
    { id: "lab", label: "AQILab", icon: FlaskConical },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <>
      {/* Desktop Navigation - Top with Glassmorphism */}
      <nav 
        className="hidden md:block fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          background: 'rgba(255, 255, 255, 0.35)',
          boxShadow: '0 16px 48px 0 rgba(31, 38, 135, 0.37)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="flex items-center"
            style={{ height: '7rem' }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1F2937]">EnvLink</span>
            </div>

            {/* Spacer to push nav items to the right */}
            <div className="flex-1" />

            {/* Navigation Items - Explicitly Right-Aligned */}
            <div className="flex items-center gap-1 pr-12">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-[#10B981] text-white shadow-md"
                        : "text-[#6B7280] hover:bg-white/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top with Branding and Hamburger */}
      <nav 
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          background: 'rgba(255, 255, 255, 0.35)',
          boxShadow: '0 16px 48px 0 rgba(31, 38, 135, 0.37)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        <div className="flex items-center justify-between px-4" style={{ height: '4rem' }}>
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[#1F2937]">EnvLink</span>
          </div>
          {/* Hamburger Menu Button */}
          <button
            className="p-2 rounded-lg text-[#1F2937] hover:bg-white/50 focus:outline-none"
            onClick={() => setShowMobileMenu((prev) => !prev)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
        {/* Mobile Nav Menu Dropdown/Modal */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-white/90 shadow-lg border-b border-gray-200 z-50">
            <div className="flex flex-col py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setShowMobileMenu(false); onNavigate(item.id); }}
                    className={`flex items-center gap-3 px-6 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive ? "bg-[#10B981] text-white" : "text-[#1F2937] hover:bg-[#F3F4F6]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
