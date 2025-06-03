
import React, { useState, useEffect } from 'react';
import { Zap, Star } from 'lucide-react';

export const BonusProgressBar = () => {
  const [currentBonus, setCurrentBonus] = useState(3800);
  const [showCelebration, setShowCelebration] = useState(false);

  const tiers = [
    { amount: 500, label: "Starter" },
    { amount: 1000, label: "Hustler" },
    { amount: 5000, label: "Champion" },
    { amount: 10000, label: "DANGOTE" }
  ];

  const currentTierIndex = tiers.findIndex(tier => currentBonus < tier.amount);
  const nextTier = currentTierIndex !== -1 ? tiers[currentTierIndex] : tiers[tiers.length - 1];
  const progress = currentTierIndex !== -1 ? (currentBonus / nextTier.amount) * 100 : 100;

  useEffect(() => {
    if (progress >= 90) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [progress]);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-2xl relative overflow-hidden">
      {showCelebration && (
        <div className="absolute inset-0 bg-yellow-400 opacity-50 animate-pulse z-10"></div>
      )}
      
      <div className="relative z-20">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-yellow-300 animate-bounce" />
          <h2 className="text-xl font-bold">💰 BONUS PROGRESS</h2>
          <Star className="w-6 h-6 text-yellow-300" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Current: ₦{currentBonus.toLocaleString()}</span>
            <span className="text-lg font-bold">Next: ₦{nextTier.amount.toLocaleString()}</span>
          </div>
          
          <div className="w-full bg-purple-700 rounded-full h-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-green-400 h-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-yellow-200 mb-2">Close 2 more to enter next bonus tier! 🚀</p>
          {showCelebration && (
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold animate-bounce text-lg">
              🎉 PAY HIM! BONUS UNLOCKED! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
