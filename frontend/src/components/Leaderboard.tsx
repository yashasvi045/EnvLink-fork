import { Card } from "./ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { motion } from "motion/react";

export function Leaderboard() {
  const topUsers = [
    { rank: 1, name: "EcoWarrior2024", points: 2450, level: 8, icon: Trophy, color: "text-[#F59E0B]" },
    { rank: 2, name: "AirQualityPro", points: 2180, level: 7, icon: Medal, color: "text-gray-400" },
    { rank: 3, name: "GreenGuardian", points: 1980, level: 7, icon: Award, color: "text-amber-700" },
    { rank: 4, name: "CleanAirChamp", points: 1750, level: 6, icon: null, color: "" },
    { rank: 5, name: "You", points: 1250, level: 5, icon: null, color: "", isCurrentUser: true },
    { rank: 6, name: "EarthHero88", points: 1120, level: 5, icon: null, color: "" },
    { rank: 7, name: "SkyWatcher", points: 980, level: 4, icon: null, color: "" },
  ];

  return (
    <Card className="p-6 bg-white shadow-lg border-0">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-[#F59E0B]" />
        <h3 className="text-[#1F2937]">Global Leaderboard</h3>
      </div>
      <div className="space-y-2">
        {topUsers.map((user, idx) => {
          const Icon = user.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3 rounded-xl transition-all ${
                user.isCurrentUser
                  ? "bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    user.isCurrentUser ? "bg-white bg-opacity-20" : "bg-white"
                  }`}>
                    {Icon ? (
                      <Icon className={`w-5 h-5 ${user.color}`} />
                    ) : (
                      <span className={user.isCurrentUser ? "text-white" : "text-[#6B7280]"}>
                        {user.rank}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`${user.isCurrentUser ? "text-white" : "text-[#1F2937]"}`}>
                      {user.name}
                    </p>
                    <p className={`text-sm ${user.isCurrentUser ? "text-white opacity-90" : "text-[#6B7280]"}`}>
                      Level {user.level}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${user.isCurrentUser ? "text-white" : "text-[#1F2937]"}`}>
                    {user.points.toLocaleString()}
                  </p>
                  <p className={`text-xs ${user.isCurrentUser ? "text-white opacity-90" : "text-[#6B7280]"}`}>
                    points
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-[#3B82F6] text-center">
          Earn more points to climb the leaderboard! 🚀
        </p>
      </div>
    </Card>
  );
}
