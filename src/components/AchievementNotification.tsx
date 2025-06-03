
import React, { useState, useEffect } from 'react';
import { Trophy, Target, Zap, DollarSign, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface Achievement {
  id: string;
  title: string;
  message: string;
  type: 'milestone' | 'bonus' | 'streak' | 'target';
  naira: number;
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
      
      // Play appropriate sound based on achievement type and amount
      if (achievement.type === 'bonus') {
        if (achievement.naira >= 5000) {
          playSound('airhorn'); // Big milestone - 🔴 RED level excitement
        } else {
          playSound('cash_register'); // Regular bonus - 🟢 GREEN success
        }
      } else {
        playSound('celebration'); // 🟢 GREEN success sound
      }
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 5000); // Show longer for achievements
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss, playSound]);

  if (!achievement) return null;

  const getIcon = () => {
    switch (achievement.type) {
      case 'milestone': return <Trophy className="w-7 h-7 text-white" />;
      case 'bonus': return <DollarSign className="w-7 h-7 text-white" />;
      case 'streak': return <Zap className="w-7 h-7 text-white" />;
      case 'target': return <Target className="w-7 h-7 text-white" />;
    }
  };

  const getBgColor = () => {
    // All achievements are success/praise = 🟢 GREEN
    switch (achievement.type) {
      case 'milestone': return 'from-green-600 to-green-700';
      case 'bonus': 
        // Big bonuses get more excitement
        return achievement.naira >= 5000 
          ? 'from-green-500 to-emerald-600' 
          : 'from-green-600 to-green-700';
      case 'streak': return 'from-green-600 to-green-700';
      case 'target': return 'from-green-600 to-green-700';
    }
  };

  const getEmoji = () => {
    if (achievement.naira >= 5000) return '🎉🔥'; // Big money
    if (achievement.naira >= 1000) return '💰🎉'; // Good money
    return '✅👏'; // Regular success
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      }`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-xl p-6 text-white shadow-xl max-w-sm border-4 border-green-300`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {getIcon()}
              <div>
                <h3 className="font-bold text-lg text-white">
                  {getEmoji()} YOU DID AM WELL!
                </h3>
                <p className="text-green-100 text-sm">{achievement.title}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-green-100 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-green-100 mb-4">{achievement.message}</p>
          
          <div className="bg-green-800/40 rounded-lg p-3 text-center border-2 border-green-300">
            <div className="text-xl font-bold text-green-100">
              +₦{achievement.naira} ENTER YOUR ACCOUNT! 🏦
            </div>
            <div className="text-sm text-green-200 mt-1">
              💪 You dey try! Do more, get more!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
