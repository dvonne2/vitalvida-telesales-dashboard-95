import React, { useState, useEffect, useRef } from 'react';
import { CelebrationEffects } from './CelebrationEffects';
import { AchievementNotification } from './AchievementNotification';
import { MotivationalPopup } from './MotivationalPopup';
import { CallPromptPopup } from './CallPromptPopup';
import { CallUploadPrompt } from './CallUploadPrompt';

interface Achievement {
  id: string;
  title: string;
  message: string;
  type: 'milestone' | 'bonus' | 'streak' | 'target';
  naira: number; // Changed from points to naira
}

interface MotivationalMessage {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'motivational' | 'tip' | 'celebration' | 'fomo' | 'reassignment';
  emoji: string;
}

export const InteractiveSystem = () => {
  const [celebration, setCelebration] = useState<{ isActive: boolean; type: 'order' | 'bonus' | 'target' | 'daily' }>({ isActive: false, type: 'order' });
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [currentMessage, setCurrentMessage] = useState<MotivationalMessage | null>(null);
  const [showCallPrompt, setShowCallPrompt] = useState<{ show: boolean; customer: string; orderId: string; product: string } | null>(null);
  const [showUploadPrompt, setShowUploadPrompt] = useState<{ show: boolean; customer: string; orderId: string } | null>(null);
  
  // Track shown messages to prevent repeats
  const shownMessages = useRef<Set<string>>(new Set());
  const shownAchievements = useRef<Set<string>>(new Set());

  // Updated achievements with Naira instead of points
  const achievements: Achievement[] = [
    {
      id: 'first_order',
      title: 'First Blood! 🩸',
      message: 'You just closed your first order today! The hustle begins!',
      type: 'milestone',
      naira: 500
    },
    {
      id: 'bonus_tier_1000',
      title: 'Bonus Beast Mode! 💰',
      message: 'You hit ₦1,000 bonus tier! Money dey enter your account!',
      type: 'bonus',
      naira: 1000
    },
    {
      id: 'bonus_tier_5000',
      title: '🎉 You dey try! You just passed ₦5K today!',
      message: 'Big Milestone Hit! ₦5,000 daily bonus unlocked!',
      type: 'bonus',
      naira: 5000
    },
    {
      id: 'fast_upload',
      title: '✅ You earned ₦X!',
      message: 'Call uploaded on time! Speed = Money!',
      type: 'streak',
      naira: 300
    },
    {
      id: 'weekly_bonus',
      title: '🏆 Weekly bonus just got fatter!',
      message: 'You dey fire this week! Keep the momentum!',
      type: 'target',
      naira: 2500
    }
  ];

  const motivationalMessages: MotivationalMessage[] = [
    {
      id: 'call_kemi_urgent',
      title: '📞 Call Kemi Now!',
      message: 'Kemi O. is waiting for your call! That\'s ₦2,000 bonus hanging there!',
      type: 'urgent',
      emoji: '📞'
    },
    {
      id: 'upload_slow_warning',
      title: '⏰ That one slow o. Try faster next one.',
      message: 'Speed up your call uploads to earn full bonus!',
      type: 'motivational',
      emoji: '⏰'
    },
    {
      id: 'fomo_peer_wins',
      title: '🔥 Joy just closed 6 orders & made ₦4,500 bonus today',
      message: 'Your colleague is making serious money! Don\'t get left behind!',
      type: 'fomo',
      emoji: '🔥'
    },
    {
      id: 'order_reassigned',
      title: '⚠️ This customer is yours now. Don\'t dull!',
      message: 'Order reassigned from another rep. Time to show your skills!',
      type: 'reassignment',
      emoji: '⚠️'
    },
    {
      id: 'delivery_rate_surge',
      title: '👏👏👏 You\'re closing more!',
      message: 'Your delivery rate is improving! Keep the momentum going!',
      type: 'celebration',
      emoji: '👏'
    },
    {
      id: 'end_of_day_wrap',
      title: '🌅 You closed 2 of 10 today',
      message: 'Not bad, but tomorrow we go harder! What can you do better?',
      type: 'motivational',
      emoji: '🌅'
    },
    {
      id: 'missed_calls_pressure',
      title: '📞 Pressure dey here — follow up now!',
      message: 'Your missed calls need immediate attention! Don\'t lose that money!',
      type: 'urgent',
      emoji: '📞'
    },
    {
      id: 'pending_uploads_red_zone',
      title: '🚨 Red zone: Upload your recording now!',
      message: 'Time is ticking! Upload that call recording before you lose your bonus!',
      type: 'urgent',
      emoji: '🚨'
    }
  ];

  // Simulate new order assignment (triggers call prompt)
  useEffect(() => {
    const callPromptInterval = setInterval(() => {
      if (!showCallPrompt && !showUploadPrompt && !currentMessage && !currentAchievement) {
        const random = Math.random();
        if (random < 0.15) { // 15% chance every 20 seconds
          setShowCallPrompt({
            show: true,
            customer: 'Kemi O.',
            orderId: '10058',
            product: 'Vitamin D Chews'
          });
        }
      }
    }, 20000);

    return () => clearInterval(callPromptInterval);
  }, [showCallPrompt, showUploadPrompt, currentMessage, currentAchievement]);

  // Reduced frequency for other events
  useEffect(() => {
    const eventInterval = setInterval(() => {
      // Don't trigger new events if something is already showing
      if (currentAchievement || currentMessage || celebration.isActive || showCallPrompt || showUploadPrompt) {
        return;
      }

      const random = Math.random();
      
      if (random < 0.12) {
        // Show motivational message
        const availableMessages = motivationalMessages.filter(msg => !shownMessages.current.has(msg.id));
        if (availableMessages.length > 0) {
          const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
          shownMessages.current.add(randomMessage.id);
          setCurrentMessage(randomMessage);
        }
      } else if (random < 0.18) {
        // Show achievement
        const availableAchievements = achievements.filter(ach => !shownAchievements.current.has(ach.id));
        if (availableAchievements.length > 0) {
          const randomAchievement = availableAchievements[Math.floor(Math.random() * availableAchievements.length)];
          shownAchievements.current.add(randomAchievement.id);
          setCurrentAchievement(randomAchievement);
        }
      } else if (random < 0.22) {
        // Trigger celebration
        const celebrationTypes: Array<'order' | 'bonus' | 'target' | 'daily'> = ['order', 'bonus', 'target', 'daily'];
        const randomType = celebrationTypes[Math.floor(Math.random() * celebrationTypes.length)];
        setCelebration({ isActive: true, type: randomType });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(eventInterval);
  }, [currentAchievement, currentMessage, celebration.isActive, showCallPrompt, showUploadPrompt]);

  const handleStartCall = () => {
    // Show upload prompt after call starts
    setTimeout(() => {
      setShowUploadPrompt({
        show: true,
        customer: 'Kemi O.',
        orderId: '10058'
      });
    }, 2000); // Wait 2 seconds before showing upload prompt
  };

  const handleUploadCall = (onTime: boolean) => {
    if (onTime) {
      // Show success achievement
      setCurrentAchievement({
        id: 'call_uploaded_success',
        title: '✅ Good job! You moved fast!',
        message: 'Call uploaded on time! Bonus earned!',
        type: 'bonus',
        naira: 300
      });
    } else {
      // Show warning message
      setCurrentMessage({
        id: 'upload_late_warning',
        title: '⏰ That one slow o. Try quicker next time.',
        message: 'Late upload = No bonus. Speed up next time!',
        type: 'motivational',
        emoji: '⏰'
      });
    }
  };

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

      {showCallPrompt && (
        <CallPromptPopup
          customerName={showCallPrompt.customer}
          orderId={showCallPrompt.orderId}
          product={showCallPrompt.product}
          onStartCall={handleStartCall}
          onDismiss={() => setShowCallPrompt(null)}
        />
      )}

      {showUploadPrompt && (
        <CallUploadPrompt
          customerName={showUploadPrompt.customer}
          orderId={showUploadPrompt.orderId}
          onUploadCall={handleUploadCall}
          onDismiss={() => setShowUploadPrompt(null)}
        />
      )}
    </>
  );
};
