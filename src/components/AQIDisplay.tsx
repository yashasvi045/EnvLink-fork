import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AQIDisplayProps {
  value: number;
  location: string;
  trend?: "up" | "down" | "stable";
  size?: "small" | "large";
}

export function AQIDisplay({ value, location, trend = "stable", size = "large" }: AQIDisplayProps) {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return { bg: "bg-[#10B981]", text: "text-[#10B981]", label: "Good" };
    if (aqi <= 100) return { bg: "bg-[#3B82F6]", text: "text-[#3B82F6]", label: "Moderate" };
    if (aqi <= 150) return { bg: "bg-[#F59E0B]", text: "text-[#F59E0B]", label: "Unhealthy for Sensitive Groups" };
    if (aqi <= 200) return { bg: "bg-orange-600", text: "text-orange-600", label: "Unhealthy" };
    if (aqi <= 300) return { bg: "bg-purple-600", text: "text-purple-600", label: "Very Unhealthy" };
    return { bg: "bg-red-700", text: "text-red-700", label: "Hazardous" };
  };

  const aqiInfo = getAQIColor(value);
  const isLarge = size === "large";

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={`${isLarge ? "space-y-4" : "space-y-2"}`}>
      <div className="flex items-baseline gap-3">
        <div className={`${aqiInfo.bg} ${isLarge ? "w-32 h-32" : "w-16 h-16"} rounded-2xl flex items-center justify-center shadow-lg`}>
          <span className={`${isLarge ? "text-5xl" : "text-2xl"} text-white`}>{value}</span>
        </div>
        {trend && (
          <TrendIcon className={`${isLarge ? "w-8 h-8" : "w-5 h-5"} ${aqiInfo.text}`} />
        )}
      </div>
      <div>
        <p className={`${isLarge ? "text-2xl" : "text-base"} text-[#1F2937]`}>{location}</p>
        <p className={`${isLarge ? "text-lg" : "text-sm"} ${aqiInfo.text}`}>{aqiInfo.label}</p>
      </div>
    </div>
  );
}
