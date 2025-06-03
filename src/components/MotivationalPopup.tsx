import React, { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, X, AlertTriangle, Phone, Bell } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface MotivationalMessage {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'motivational' | 'tip' | 'celebration' | 'fomo' | 'reassignment';
  emoji: string;
}

interface MotivationalPopupProps {
  message: MotivationalMessage | null;
  onDismiss: () => void;
}

export const MotivationalPopup = ({ message, onDismiss }: MotivationalPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { playSound, stopSound } = useSoundEffects();

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      
      // Play appropriate sound based on message type with tiered system
      switch (message.type) {
        case 'urgent':
        case 'reassignment':
          playSound('alert_ping'); // 🔴 RED = Urgent ringtone-style
          break;
        case 'fomo':
          playSound('airhorn'); // 🔴 RED = Major FOMO alert
          break;
        case 'celebration':
          playSound('cash_register'); // 🟢 GREEN = Success chime
          break;
        case 'motivational':
        case 'tip':
          playSound('success'); // 🟡 YELLOW = Notification ping
          break;
      }
      
      const timer = setTimeout(() => {
        handleClose();
      }, message.type === 'urgent' ? 6000 : 4000); // Urgent messages stay longer
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    stopSound(); // Stop any playing sound when dismissed
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'urgent': return <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'reassignment': return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'fomo': return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'motivational': return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case 'tip': return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case 'celebration': return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    }
  };

  const getBgColor = () => {
    switch (message.type) {
      case 'urgent': 
      case 'fomo': 
      case 'reassignment': 
        return 'from-red-600 to-red-700'; // 🔴 RED = Urgency/Action Now
      case 'motivational': 
      case 'tip': 
        return 'from-yellow-500 to-yellow-600'; // 🟡 YELLOW = Warning/Action Soon
      case 'celebration': 
        return 'from-green-600 to-green-700'; // 🟢 GREEN = Success/Praise
    }
  };

  const getTextColor = () => {
    switch (message.type) {
      case 'urgent': 
      case 'fomo': 
      case 'reassignment': 
      case 'celebration':
        return 'text-white'; // White text on dark backgrounds
      case 'motivational': 
      case 'tip': 
        return 'text-black'; // Black text on yellow background for contrast
    }
  };

  const getActionText = () => {
    switch (message.type) {
      case 'urgent':
      case 'reassignment':
        return '⚡ DO AM NOW-NOW! ⚡';
      case 'fomo':
        return '🔥 NO DULL YOURSELF! 🔥';
      case 'motivational':
      case 'tip':
        return '💡 NOTED! NEXT TIME I GO TRY AM!';
      case 'celebration':
        return '🎉 THANK YOU! I DEY TRY! 🎉';
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4 w-full max-w-md">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-4 ${
          message.type === 'urgent' || message.type === 'fomo' || message.type === 'reassignment'
            ? 'border-red-300' 
            : message.type === 'celebration'
            ? 'border-green-300'
            : 'border-yellow-300'
        } relative overflow-hidden`}>
          
          {/* Enhanced background effect for urgent messages */}
          <div className={`absolute inset-0 rounded-2xl ${
            (message.type === 'urgent' || message.type === 'fomo' || message.type === 'reassignment') 
              ? 'bg-white/10' 
              : 'bg-white/5'
          }`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                {getIcon()}
                <span className="text-xl sm:text-2xl lg:text-3xl">{message.emoji}</span>
              </div>
              <button 
                onClick={handleClose}
                className={`${getTextColor()} opacity-70 hover:opacity-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center`}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${getTextColor()}`}>
              {message.title}
            </h3>
            <p className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 ${getTextColor()} ${
              message.type === 'motivational' || message.type === 'tip' ? 'opacity-90' : 'opacity-95'
            }`}>
              {message.message}
            </p>
            
            {/* Action button with appropriate styling */}
            <div className={`rounded-lg p-2 sm:p-3 border-2 text-center ${
              message.type === 'urgent' || message.type === 'fomo' || message.type === 'reassignment'
                ? 'bg-red-800/40 border-red-300'
                : message.type === 'celebration'
                ? 'bg-green-800/40 border-green-300' 
                : 'bg-yellow-700/40 border-yellow-300'
            }`}>
              <p className={`font-bold text-sm sm:text-base ${getTextColor()}`}>
                {getActionText()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
