
import React from 'react';
import { Target, Flame, Truck, Bell } from 'lucide-react';

export const TodayMissionCard = () => {
  const progress = 75; // 9 out of 12 orders
  const deliveryRate = 80; // Current delivery rate
  const isUrgent = progress < 80; // Red urgency if below 80%

  return (
    <div className={`rounded-xl p-6 text-white shadow-lg ${
      isUrgent 
        ? 'bg-gradient-to-r from-red-600 to-red-700' // 🔴 RED = Urgency
        : 'bg-gradient-to-r from-green-600 to-green-700' // 🟢 GREEN = On track
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {isUrgent ? (
          <Bell className="w-8 h-8 text-white" />
        ) : (
          <Target className="w-8 h-8 text-white" />
        )}
        <h2 className="text-xl font-bold flex items-center gap-2">
          {isUrgent ? '🚨 PRESSURE DEY!' : '🎯 YOU DEY TRY!'} TODAY'S MISSION
        </h2>
        <Flame className="w-6 h-6 text-amber-200" />
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">
          {isUrgent 
            ? '🔥 Pressure dey! 3 more orders or no bonus today!'
            : '✅ You dey fire! 3 more for ₦2,000 bonus!'
          }
        </h3>
        <p className={`text-sm mt-1 ${
          isUrgent ? 'text-red-100' : 'text-green-100'
        }`}>
          {isUrgent 
            ? '💸 Every minute = Lost money! Move fast!'
            : '💰 You don dey near the target, champion! 💪'
          }
        </p>
        
        {/* Enhanced delivery rate visibility */}
        <div className={`rounded-lg p-3 mt-3 border ${
          isUrgent 
            ? 'bg-red-700/40 border-red-400/50'
            : 'bg-green-700/40 border-green-400/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Delivery Rate:</span>
            </div>
            <span className="text-white font-bold text-lg">{deliveryRate}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white">
          <span>Progress: 9/12 Orders</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className={`w-full rounded-full h-4 overflow-hidden ${
          isUrgent ? 'bg-red-800' : 'bg-green-800'
        }`}>
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              isUrgent 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400' // 🟡 YELLOW = Progress warning
                : 'bg-gradient-to-r from-amber-300 to-emerald-400' // Normal progress
            }`}
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/10"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span className={`px-4 py-2 rounded-full font-bold text-sm ${
          isUrgent 
            ? 'bg-yellow-400 text-black' // 🟡 YELLOW for action needed - BLACK text for contrast
            : 'bg-green-400 text-black'
        }`}>
          {isUrgent 
            ? '⚡ MOVE FAST OR NO MONEY! ⚡'
            : '🚀 3 MORE TO GO! CHOP KNUCKLE! 🚀'
          }
        </span>
      </div>
    </div>
  );
};
