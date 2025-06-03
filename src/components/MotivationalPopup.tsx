
import React, { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface MotivationalMessage {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'motivational' | 'tip' | 'celebration';
  emoji: string;
}

interface MotivationalPopupProps {
  message: MotivationalMessage | null;
  onDismiss: () => void;
}

export const MotivationalPopup = ({ message, onDismiss }: MotivationalPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      playSound(message.type === 'urgent' ? 'warning' : 'success');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss, playSound]);

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'urgent': return <Clock className="w-6 h-6 text-red-400" />;
      case 'motivational': return <Zap className="w-6 h-6 text-yellow-400" />;
      case 'tip': return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'celebration': return <Zap className="w-6 h-6 text-green-400" />;
    }
  };

  const getBgColor = () => {
    switch (message.type) {
      case 'urgent': return 'from-red-600 to-orange-600';
      case 'motivational': return 'from-purple-600 to-pink-600';
      case 'tip': return 'from-blue-600 to-cyan-600';
      case 'celebration': return 'from-green-600 to-emerald-600';
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-2xl p-8 text-white shadow-2xl max-w-md border-2 border-white/20 relative overflow-hidden`}>
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getIcon()}
                <span className="text-3xl">{message.emoji}</span>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold mb-3">{message.title}</h3>
            <p className="text-white/90 text-lg leading-relaxed">{message.message}</p>
            
            {message.type === 'urgent' && (
              <div className="mt-4 bg-red-500/30 rounded-lg p-3 border border-red-400/50">
                <p className="text-center font-bold animate-pulse">⚡ ACTION NEEDED NOW! ⚡</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
