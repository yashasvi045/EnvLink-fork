import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, Star, Target, Leaf, Map, MessageCircle, TrendingUp, Award, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Leaderboard } from "./Leaderboard";
import { StreakTracker } from "./StreakTracker";
import { useEffect, useState } from "react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
  progress?: number;
  total?: number;
}

interface UserStats {
  points: number;
  level: number;
  streak: number;
  nextLevelPoints: number;
}

interface GamificationPanelProps {
  compact?: boolean;
  showLeaderboard?: boolean;
  achievements?: Achievement[];
  userStats?: UserStats;
}

export function GamificationPanel({ compact = false, showLeaderboard = true, achievements: achievementsProp, userStats: userStatsProp }: GamificationPanelProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(achievementsProp || []);
  const [userStats, setUserStats] = useState<UserStats>(userStatsProp || {
    points: 1250,
    level: 5,
    streak: 7,
    nextLevelPoints: 1500,
  });

  // Fetch achievements and stats from backend API if not provided
  useEffect(() => {
    if (!achievementsProp || !userStatsProp) {
      fetch("/api/gamification")
        .then(res => res.json())
        .then(data => {
          if (data.achievements) setAchievements(data.achievements);
          if (data.userStats) setUserStats(data.userStats);
        })
        .catch(() => {
          // fallback to mock data if API fails
          setAchievements([
            {
              id: 1,
              title: "Air Quality Champion",
              description: "Checked AQI 30 days in a row",
              icon: Trophy,
              earned: true,
              color: "text-[#F59E0B]",
              bgColor: "bg-orange-50",
              borderColor: "border-[#F59E0B]",
            },
            {
              id: 2,
              title: "Eco Explorer",
              description: "Planned 10 eco-friendly routes",
              icon: Map,
              earned: true,
              color: "text-[#10B981]",
              bgColor: "bg-green-50",
              borderColor: "border-[#10B981]",
            },
            {
              id: 3,
              title: "Earth Guardian",
              description: "Read 50 Earth Today updates",
              icon: Leaf,
              earned: false,
              color: "text-[#3B82F6]",
              bgColor: "bg-blue-50",
              borderColor: "border-[#3B82F6]",
              progress: 35,
              total: 50,
            },
            {
              id: 4,
              title: "Data Master",
              description: "Analyzed AQI data 100 times",
              icon: TrendingUp,
              earned: false,
              color: "text-[#8B5CF6]",
              bgColor: "bg-purple-50",
              borderColor: "border-purple-500",
              progress: 78,
              total: 100,
            },
          ]);
          setUserStats({
            points: 1250,
            level: 5,
            streak: 7,
            nextLevelPoints: 1500,
          });
        });
    }
  }, [achievementsProp, userStatsProp]);

  const dailyGoals = [
    { task: "Check AQI", completed: true, points: 10 },
    { task: "Plan a trip", completed: true, points: 25 },
    { task: "Read Earth Today", completed: false, points: 15 },
    { task: "Use Chatbot", completed: true, points: 20 },
  ];

  const completedGoals = dailyGoals.filter(g => g.completed).length;
  const totalGoals = dailyGoals.length;

  if (compact) {
    return (
      <Card className="p-5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Your Progress</p>
              <p className="text-xl">Level {userStats.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl">{userStats.points}</p>
            <p className="text-xs opacity-90">points</p>
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">Daily Goals</span>
            <span>{completedGoals}/{totalGoals}</span>
          </div>
          <Progress value={(completedGoals / totalGoals) * 100} className="h-2 bg-white bg-opacity-20" />
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-white border-opacity-20">
          <Zap className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-sm">{userStats.streak} day streak! Keep it up! 🔥</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      <Card className="p-6 bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Your Level</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl">Level {userStats.level}</h2>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Trophy className="w-8 h-8 text-[#F59E0B]" />
              </motion.div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl mb-1">{userStats.points}</p>
            <p className="text-sm opacity-90">Total Points</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">Progress to Level {userStats.level + 1}</span>
            <span>{userStats.points}/{userStats.nextLevelPoints}</span>
          </div>
          <Progress 
            value={(userStats.points / userStats.nextLevelPoints) * 100} 
            className="h-3 bg-white bg-opacity-20"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg">
            <Zap className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <p className="text-xs opacity-90">Streak</p>
              <p className="text-lg">{userStats.streak} days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg">
            <Star className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <p className="text-xs opacity-90">Achievements</p>
              <p className="text-lg">{achievements.filter(a => a.earned).length}/{achievements.length}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Streak Tracker */}
      <StreakTracker />

      {/* Daily Goals */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F2937]">Daily Goals</h3>
          <Badge className="bg-[#3B82F6]">
            {completedGoals}/{totalGoals} Complete
          </Badge>
        </div>
        <div className="space-y-3">
          {dailyGoals.map((goal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                goal.completed
                  ? "bg-green-50 border-[#10B981]"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    goal.completed 
                      ? "bg-[#10B981] border-[#10B981]" 
                      : "border-gray-300"
                  }`}>
                    {goal.completed && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                  <span className={goal.completed ? "text-[#1F2937]" : "text-[#6B7280]"}>
                    {goal.task}
                  </span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  goal.completed
                    ? "bg-[#10B981] text-white"
                    : "bg-gray-200 text-[#6B7280]"
                }`}>
                  +{goal.points} pts
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-[#F59E0B]" />
          <h3 className="text-[#1F2937]">Achievements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: achievement.earned ? 1.05 : 1 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? `${achievement.bgColor} ${achievement.borderColor} cursor-pointer`
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.earned ? achievement.bgColor : "bg-gray-100"
                  }`}>
                    <Icon className={`w-6 h-6 ${achievement.earned ? achievement.color : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={achievement.earned ? "text-[#1F2937]" : "text-[#6B7280]"}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-[#6B7280] mt-1">{achievement.description}</p>
                    {!achievement.earned && achievement.progress && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / (achievement.total ?? 1)) * 100}
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Motivational Prompt */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-[#3B82F6] shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-[#1F2937] mb-2">Daily Challenge</h4>
            <p className="text-[#6B7280] mb-3">
              Reduce your carbon footprint today! Plan an eco-friendly route and earn bonus points.
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F59E0B] hover:bg-[#F59E0B]">+50 Bonus Points</Badge>
              <Badge className="bg-[#10B981] hover:bg-[#10B981]">Limited Time</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Leaderboard */}
      {showLeaderboard && <Leaderboard />}
    </div>
  );
}
