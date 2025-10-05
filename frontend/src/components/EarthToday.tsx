import { Card } from "./ui/card";
import { TrendingDown, TrendingUp, Leaf, Droplets, Wind, Globe } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";

interface EarthTodayProps {
  problem?: string;
  impact?: string;
  motivation?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export function EarthToday({
  problem = "Global CO₂ levels are rising, contributing to climate change.",
  impact = "This impacts millions through extreme weather, rising sea levels, and health risks.",
  motivation = "Join the movement to protect our planet and future generations.",
  actionLabel = "Support Environmental Action",
  actionUrl = "https://www.earthday.org/take-action-now/"
}: EarthTodayProps) {
  const globalStats = [
    {
      title: "Global CO₂ Levels",
      value: "418.3 ppm",
      change: "-0.3%",
      trend: "down",
      icon: Leaf,
      color: "text-[#10B981]",
      bgColor: "bg-green-50",
    },
    {
      title: "Ocean Temperature",
      value: "+1.2°C",
      change: "+0.1°C",
      trend: "up",
      icon: Droplets,
      color: "text-[#3B82F6]",
      bgColor: "bg-blue-50",
    },
    {
      title: "Air Quality Index",
      value: "Global: 52",
      change: "Moderate",
      trend: "stable",
      icon: Wind,
      color: "text-[#F59E0B]",
      bgColor: "bg-orange-50",
    },
    {
      title: "Deforestation Rate",
      value: "-15%",
      change: "vs last year",
      trend: "down",
      icon: Globe,
      color: "text-[#10B981]",
      bgColor: "bg-green-50",
    },
  ];

  const recentUpdates = [
    {
      title: "Arctic Ice Coverage Increases",
      description: "Satellite data shows a 2.3% increase in Arctic ice coverage compared to last month.",
      time: "2 hours ago",
      category: "Climate",
    },
    {
      title: "Amazon Rainforest Recovery",
      description: "New reforestation efforts show positive results with 50,000 hectares restored.",
      time: "5 hours ago",
      category: "Conservation",
    },
    {
      title: "Global Air Quality Improvement",
      description: "Major cities report 8% improvement in air quality year-over-year.",
      time: "1 day ago",
      category: "Air Quality",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 md:pb-8 px-4" style={{ paddingTop: '140px' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-[#1F2937] mb-2">Earth Today</h1>
        <p className="text-[#6B7280] mb-8">Real-time environmental insights and satellite data</p>

        {/* Environmental Problem & Action Section (Backend Ready) */}
        <Card className="p-6 bg-white shadow-lg border-0 mb-8">
          <h3 className="text-[#EF4444] text-xl font-bold mb-2">{problem}</h3>
          <p className="text-[#6B7280] mb-2">{impact}</p>
          <p className="text-[#10B981] mb-4 font-semibold">{motivation}</p>
          <a href={actionUrl} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#10B981] text-white hover:bg-[#059669] px-6 py-2 rounded-lg font-bold shadow-md transition-all">
              {actionLabel}
            </button>
          </a>
        </Card>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {globalStats.map((stat, idx) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "down" ? TrendingDown : stat.trend === "up" ? TrendingUp : null;
            return (
              <Card key={idx} className={`p-6 ${stat.bgColor} border-0 shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center border border-opacity-20`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {TrendIcon && <TrendIcon className={`w-5 h-5 ${stat.color}`} />}
                </div>
                <h3 className="text-[#1F2937] mb-2">{stat.title}</h3>
                <p className={`text-2xl ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-sm text-[#6B7280]">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Satellite View */}
        <Card className="p-6 bg-white shadow-lg border-0 mb-8">
          <h3 className="text-[#1F2937] mb-4">Live Satellite View</h3>
          <div className="relative h-[400px] bg-gradient-to-br from-blue-900 via-blue-700 to-green-600 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Globe className="w-32 h-32 mb-4 mx-auto opacity-40 animate-pulse" />
                <p className="opacity-80">Earth Monitoring System</p>
                <p className="text-sm opacity-60 mt-2">Real-time data from NASA satellites</p>
              </div>
            </div>
            {/* Overlay with data points */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
              <p className="text-xs text-[#6B7280]">Last Updated</p>
              <p className="text-sm text-[#1F2937]">Oct 3, 2025 14:30 UTC</p>
            </div>
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
              <p className="text-xs text-[#6B7280]">Coverage</p>
              <p className="text-sm text-[#1F2937]">Global</p>
            </div>
          </div>
        </Card>

        {/* Recent Updates Feed */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <h3 className="text-[#1F2937] mb-6">Recent Environmental Updates</h3>
          <div className="space-y-4">
            {recentUpdates.map((update, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#1F2937] flex-1">{update.title}</h4>
                  <span className="px-3 py-1 bg-[#3B82F6] bg-opacity-10 text-[#3B82F6] rounded-full text-sm">
                    {update.category}
                  </span>
                </div>
                <p className="text-[#6B7280] mb-2">{update.description}</p>
                <p className="text-sm text-[#6B7280]">{update.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
