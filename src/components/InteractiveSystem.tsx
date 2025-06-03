
import React, { useState, useEffect, useRef } from 'react';
import { CelebrationEffects } from './CelebrationEffects';
import { AchievementNotification } from './AchievementNotification';
import { MotivationalPopup } from './MotivationalPopup';

interface Achievement {
  id: string;
  title: string;
  message: string;
  type: 'milestone' | 'bonus' | 'streak' | 'target';
  points: number;
}

interface MotivationalMessage {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'motivational' | 'tip' | 'celebration';
  emoji: string;
}

export const InteractiveSystem = () => {
  const [celebration, setCelebration] = useState<{ isActive: boolean; type: 'order' | 'bonus' | 'target' | 'daily' }>({ isActive: false, type: 'order' });
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [currentMessage, setCurrentMessage] = useState<MotivationalMessage | null>(null);
  
  // Track shown messages to prevent repeats
  const shownMessages = useRef<Set<string>>(new Set());
  const shownAchievements = useRef<Set<string>>(new Set());

  // Sample achievements and messages that could be triggered
  const achievements: Achievement[] = [
    {
      id: 'first_order',
      title: 'First Blood! 🩸',
      message: 'You just closed your first order today! The hustle begins!',
      type: 'milestone',
      points: 100
    },
    {
      id: 'bonus_tier',
      title: 'Bonus Beast Mode! 💰',
      message: 'You hit the next bonus tier! Money dey enter your account!',
      type: 'bonus',
      points: 500
    },
    {
      id: 'fast_response',
      title: 'Lightning Fast! ⚡',
      message: 'Under 5 minutes response time! You dey fire!',
      type: 'streak',
      points: 250
    },
    {
      id: 'daily_target',
      title: 'Target Crusher! 🎯',
      message: 'You smashed your daily target! Champion energy!',
      type: 'target',
      points: 750
    },
    {
      id: 'week_streak',
      title: 'Week Warrior! 🔥',
      message: 'Five days straight of hitting targets! Unstoppable!',
      type: 'streak',
      points: 1000
    }
  ];

  const motivationalMessages: MotivationalMessage[] = [
    {
      id: 'pending_order',
      title: 'Order Alert! 🚨',
      message: 'Kemi O. is waiting for your call! That\'s ₦2,000 bonus hanging there!',
      type: 'urgent',
      emoji: '📞'
    },
    {
      id: 'daily_motivation',
      title: 'Champion Energy! 💪',
      message: 'You\'re 3 orders away from beating yesterday\'s record. Keep pushing!',
      type: 'motivational',
      emoji: '🔥'
    },
    {
      id: 'tip_of_day',
      title: 'Pro Tip! 💡',
      message: 'Call customers within 10 minutes - 85% higher close rate!',
      type: 'tip',
      emoji: '🎯'
    },
    {
      id: 'end_of_day_push',
      title: 'Final Sprint! 🏃‍♂️',
      message: 'Last 2 hours! One more order can change your day!',
      type: 'motivational',
      emoji: '⚡'
    },
    {
      id: 'bonus_reminder',
      title: 'Money Alert! 💸',
      message: 'You\'re ₦1,500 away from next bonus tier! Keep grinding!',
      type: 'celebration',
      emoji: '💰'
    }
  ];

  // Simulate random events - reduced frequency and no overlaps
  useEffect(() => {
    const eventInterval = setInterval(() => {
      // Don't trigger new events if something is already showing
      if (currentAchievement || currentMessage || celebration.isActive) {
        return;
      }

      const random = Math.random();
      
      if (random < 0.2) {
        // Show motivational message - but only if not shown before
        const availableMessages = motivationalMessages.filter(msg => !shownMessages.current.has(msg.id));
        if (availableMessages.length > 0) {
          const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
          shownMessages.current.add(randomMessage.id);
          setCurrentMessage(randomMessage);
        }
      } else if (random < 0.3) {
        // Show achievement - but only if not shown before
        const availableAchievements = achievements.filter(ach => !shownAchievements.current.has(ach.id));
        if (availableAchievements.length > 0) {
          const randomAchievement = availableAchievements[Math.floor(Math.random() * availableAchievements.length)];
          shownAchievements.current.add(randomAchievement.id);
          setCurrentAchievement(randomAchievement);
        }
      } else if (random < 0.35) {
        // Trigger celebration
        const celebrationTypes: Array<'order' | 'bonus' | 'target' | 'daily'> = ['order', 'bonus', 'target', 'daily'];
        const randomType = celebrationTypes[Math.floor(Math.random() * celebrationTypes.length)];
        setCelebration({ isActive: true, type: randomType });
      }
    }, 25000); // Every 25 seconds to give more breathing room

    return () => clearInterval(eventInterval);
  }, [currentAchievement, currentMessage, celebration.isActive]);

  return (
    <>
      <CelebrationEffects 
        isActive={celebration.isActive}
        type={celebration.type}
        onComplete={() => setCelebration({ isActive: false, type: 'order' })}
      />
      
      <AchievementNotification 
        achievement={currentAchievement}
        onDismiss={() => setCurrentAchievement(null)}
      />
      
      <MotivationalPopup 
        message={currentMessage}
        onDismiss={() => setCurrentMessage(null)}
      />
    </>
  );
};
