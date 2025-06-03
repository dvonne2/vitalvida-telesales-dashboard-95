
import React, { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, X, AlertTriangle, Phone } from 'lucide-react';
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
      
      // Play appropriate sound based on message type
      switch (message.type) {
        case 'urgent':
        case 'reassignment':
          playSound('alert_ping');
          break;
        case 'fomo':
          playSound('airhorn');
          break;
        case 'celebration':
          playSound('cash_register');
          break;
        default:
          playSound('success');
      }
      
      const timer = setTimeout(() => {
        handleClose();
      }, message.type === 'urgent' ? 5000 : 3500); // Urgent messages stay longer
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    stopSound(); // Stop any playing sound
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'urgent': return <Phone className="w-6 h-6 text-red-400 animate-bounce" />;
      case 'reassignment': return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      case 'fomo': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'motivational': return <Zap className="w-6 h-6 text-purple-400" />;
      case 'tip': return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'celebration': return <Zap className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getBgColor = () => {
    switch (message.type) {
      case 'urgent': return 'from-red-700 to-rose-800';
      case 'reassignment': return 'from-orange-700 to-red-800';
      case 'fomo': return 'from-amber-700 to-orange-800';
      case 'motivational': return 'from-purple-700 to-indigo-800';
      case 'tip': return 'from-blue-700 to-cyan-800';
      case 'celebration': return 'from-emerald-700 to-green-800';
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-2xl p-8 text-white shadow-xl max-w-md border border-white/20 relative overflow-hidden`}>
          {/* Enhanced background effect for urgent messages */}
          <div className={`absolute inset-0 rounded-2xl ${message.type === 'urgent' || message.type === 'fomo' ? 'bg-white/10 animate-pulse' : 'bg-white/5'}`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getIcon()}
                <span className="text-2xl">{message.emoji}</span>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold mb-3">{message.title}</h3>
            <p className="text-white/90 text-lg leading-relaxed">{message.message}</p>
            
            {(message.type === 'urgent' || message.type === 'reassignment') && (
              <div className="mt-4 bg-red-600/30 rounded-lg p-3 border border-red-500/50">
                <p className="text-center font-bold">⚡ ACTION NEEDED NOW! ⚡</p>
              </div>
            )}

            {message.type === 'fomo' && (
              <div className="mt-4 bg-amber-600/30 rounded-lg p-3 border border-amber-500/50">
                <p className="text-center font-bold">🔥 DON'T GET LEFT BEHIND! 🔥</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
