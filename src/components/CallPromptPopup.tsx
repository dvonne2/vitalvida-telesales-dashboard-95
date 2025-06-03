
import React, { useState, useEffect } from 'react';
import { Phone, X, Clock, DollarSign } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { InteractiveButton } from './InteractiveButton';

interface CallPromptPopupProps {
  customerName: string;
  orderId: string;
  product: string;
  onStartCall: () => void;
  onDismiss: () => void;
}

export const CallPromptPopup = ({ customerName, orderId, product, onStartCall, onDismiss }: CallPromptPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { playDialToneLoop, stopSound, isLooping } = useSoundEffects();

  useEffect(() => {
    setIsVisible(true);
    // Start the dial tone loop immediately
    playDialToneLoop();
    
    return () => {
      stopSound(); // Clean up on unmount
    };
  }, [playDialToneLoop, stopSound]);

  const handleStartCall = () => {
    stopSound(); // Stop the looping dial tone
    setIsVisible(false);
    setTimeout(() => {
      onStartCall();
      onDismiss();
    }, 300);
  };

  const handleClose = () => {
    stopSound(); // Stop the looping dial tone
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white shadow-2xl max-w-md border border-white/20 relative overflow-hidden">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Phone className="w-8 h-8 text-white animate-bounce" />
                <span className="text-3xl">📞</span>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-center">CALL NOW!</h2>
            <h3 className="text-3xl font-bold mb-4 text-center text-yellow-300">
              📞 Call {customerName} Now!
            </h3>
            
            <div className="bg-red-700/40 rounded-lg p-4 mb-6 border border-red-400/50">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Order #{orderId}</span>
              </div>
              <p className="text-red-100 text-sm mb-1">Product: {product}</p>
              <p className="text-yellow-300 font-bold">💰 Every second = Lost money!</p>
            </div>

            {isLooping && (
              <div className="bg-yellow-600/30 rounded-lg p-3 mb-4 border border-yellow-500/50 animate-pulse">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-200 font-bold">📞 Dial tone playing... Take action!</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <InteractiveButton
                onClick={handleStartCall}
                variant="success"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-xl font-bold py-4"
              >
                📞 START CALL NOW! 💰
              </InteractiveButton>
              
              <p className="text-center text-red-100 text-sm">
                ⚡ Sound will stop when you click "Start Call" ⚡
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
