
import React from 'react';
import { Target, Flame, Truck } from 'lucide-react';

export const TodayMissionCard = () => {
  const progress = 75; // 9 out of 12 orders
  const deliveryRate = 80; // Current delivery rate

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-8 h-8 text-yellow-200" />
        <h2 className="text-xl font-bold">🎯 TODAY'S MISSION</h2>
        <Flame className="w-6 h-6 text-yellow-200" />
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">Close 3 More Orders to Earn ₦2,000! 🔥</h3>
        <p className="text-orange-100">You don dey near the target, champion! 💪</p>
        
        {/* Enhanced delivery rate visibility */}
        <div className="bg-orange-500/30 rounded-lg p-3 mt-3 border border-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-yellow-200" />
              <span className="text-white font-semibold">Delivery Rate Target:</span>
            </div>
            <span className="text-yellow-200 font-bold text-lg">{deliveryRate}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress: 9/12 Orders</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-orange-500 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-300 to-green-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/10"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
          🚀 3 MORE TO GO! CHOP KNUCKLE! 🚀
        </span>
      </div>
    </div>
  );
};
