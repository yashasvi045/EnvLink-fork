import { Card } from "./ui/card";
import { Flame, Calendar, Star } from "lucide-react";
import { motion } from "motion/react";

export function StreakTracker() {
  const streakDays = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: true },
    { day: "S", completed: true },
    { day: "S", completed: true },
  ];

  const currentStreak = 7;
  const longestStreak = 12;

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-[#F59E0B] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Flame className="w-6 h-6 text-[#F59E0B]" />
          </motion.div>
          <h3 className="text-[#1F2937]">Daily Streak</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#F59E0B]">{currentStreak}</p>
          <p className="text-xs text-[#6B7280]">days</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {streakDays.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-1 ${
              day.completed
                ? "bg-[#F59E0B] text-white"
                : "bg-white border-2 border-gray-200 text-[#6B7280]"
            }`}>
              {day.completed && <Star className="w-5 h-5 fill-current" />}
            </div>
            <span className="text-xs text-[#6B7280]">{day.day}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#6B7280]" />
          <span className="text-sm text-[#6B7280]">Longest Streak</span>
        </div>
        <span className="text-[#1F2937]">{longestStreak} days</span>
      </div>

      <p className="mt-3 text-sm text-[#6B7280] text-center">
        Keep checking daily to maintain your streak! 🔥
      </p>
    </Card>
  );
}
