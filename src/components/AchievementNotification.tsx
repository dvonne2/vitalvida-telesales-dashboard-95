
import React, { useState, useEffect } from 'react';
import { Trophy, Target, Zap, DollarSign, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface Achievement {
  id: string;
  title: string;
  message: string;
  type: 'milestone' | 'bonus' | 'streak' | 'target';
  points: number;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export const AchievementNotification = ({ achievement, onDismiss }: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      playSound('celebration');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss, playSound]);

  if (!achievement) return null;

  const getIcon = () => {
    switch (achievement.type) {
      case 'milestone': return <Trophy className="w-7 h-7 text-amber-500" />;
      case 'bonus': return <DollarSign className="w-7 h-7 text-emerald-600" />;
      case 'streak': return <Zap className="w-7 h-7 text-blue-600" />;
      case 'target': return <Target className="w-7 h-7 text-rose-600" />;
    }
  };

  const getBgColor = () => {
    switch (achievement.type) {
      case 'milestone': return 'from-amber-600 to-orange-700';
      case 'bonus': return 'from-emerald-600 to-green-700';
      case 'streak': return 'from-blue-600 to-indigo-700';
      case 'target': return 'from-rose-600 to-pink-700';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-xl p-6 text-white shadow-xl max-w-sm border border-white/20`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {getIcon()}
              <div>
                <h3 className="font-bold text-lg">🎉 ACHIEVEMENT!</h3>
                <p className="text-white/90 text-sm">{achievement.title}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-white/90 mb-4">{achievement.message}</p>
          
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-amber-200">
              +{achievement.points} POINTS! 🔥
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
