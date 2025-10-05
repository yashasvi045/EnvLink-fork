import { motion } from "motion/react";
import { Trophy, X } from "lucide-react";
import { useState, useEffect } from "react";

interface AchievementToastProps {
  title: string;
  description: string;
  points: number;
  onClose: () => void;
}

export function AchievementToast({ title, description, points, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-24 right-4 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white rounded-xl shadow-2xl p-4 border-2 border-[#F59E0B]">
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <Trophy className="w-6 h-6" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Achievement Unlocked!</h4>
            <p className="text-sm mb-1">{title}</p>
            <p className="text-xs opacity-90">{description}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                +{points} Points
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
