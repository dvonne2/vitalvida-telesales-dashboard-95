
import React, { useState, useEffect } from 'react';
import { Target, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface WeeklyBonusAlertProps {
  currentBonus: number;
  targetBonus: number;
  ordersNeeded: number;
  onClose: () => void;
}

export const WeeklyBonusAlert = ({ 
  currentBonus, 
  targetBonus, 
  ordersNeeded, 
  onClose 
}: WeeklyBonusAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bonusAnimated, setBonusAnimated] = useState(false);
  const { playSound, stopSound } = useSoundEffects();

  useEffect(() => {
    // Show the alert with animation
    setIsVisible(true);
    
    // Play the cash register sound once
    playSound('cash_register');
    
    // Animate the bonus amount after a short delay
    const timer = setTimeout(() => {
      setBonusAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [playSound]);

  const handleClose = () => {
    // Stop the sound and fade out
    stopSound();
    
    // Fade out animation
    setIsVisible(false);
    
    // Call onClose after animation completes
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div 
      className={`fixed top-28 left-1/2 transform -translate-x-1/2 z-[70] w-11/12 max-w-md transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-[#00c853] to-[#009624] rounded-xl p-6 text-white shadow-2xl relative">
        {/* Close Button - Higher z-index and better positioning */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors z-20 shadow-lg border-2 border-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Alert Content */}
        <div className="space-y-3 pr-4">
          {/* Header Message */}
          <div className="text-center">
            <p className="text-lg font-medium">💰 You dey fire this week! Keep the momentum!</p>
          </div>

          {/* Bonus Amount with Animation */}
          <div className="text-center">
            <p className="text-xl">
              📥 
              <span 
                className={`font-bold ml-2 transition-all duration-500 ${
                  bonusAnimated ? 'animate-pulse' : ''
                }`}
              >
                +₦{currentBonus.toLocaleString()}
              </span>
              <span className="font-bold ml-2">ENTER YOUR ACCOUNT!</span> 🏦
            </p>
          </div>

          {/* Progress Information */}
          <div className="text-center space-y-2">
            <p className="text-lg">
              🔥 Your Bonus This Week: 
              <span className="font-bold ml-2">₦{currentBonus.toLocaleString()} / ₦{targetBonus.toLocaleString()}</span>
            </p>
            
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              <p className="text-base">
                You fit hit ₦{targetBonus.toLocaleString()} if you close {ordersNeeded} more.
              </p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center">
            <p className="text-lg font-medium">💪 You dey try! Do more, get more!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
