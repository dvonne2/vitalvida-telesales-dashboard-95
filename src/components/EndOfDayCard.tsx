
import React from 'react';
import { CheckCircle, Phone, TrendingUp } from 'lucide-react';

export const EndOfDayCard = () => {
  const dayStats = {
    ordersCompleted: 9,
    bonusEarned: 3600,
    missedCalls: 4
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-2xl animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">🌅 END OF DAY WRAP-UP</h2>
        <p className="text-purple-200">Great work today, champion! 💪</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-green-300" />
            <span className="text-lg font-bold">Orders Closed</span>
          </div>
          <div className="text-3xl font-bold text-green-300">{dayStats.ordersCompleted}</div>
          <p className="text-sm text-purple-200">✅ You closed {dayStats.ordersCompleted} orders today!</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-300" />
            <span className="text-lg font-bold">Bonus Secured</span>
          </div>
          <div className="text-3xl font-bold text-yellow-300">₦{dayStats.bonusEarned.toLocaleString()}</div>
          <p className="text-sm text-purple-200">💰 ₦{dayStats.bonusEarned.toLocaleString()} bonus secured!</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-6 h-6 text-orange-300" />
            <span className="text-lg font-bold">Follow-up Tomorrow</span>
          </div>
          <div className="text-3xl font-bold text-orange-300">{dayStats.missedCalls}</div>
          <p className="text-sm text-purple-200">📞 {dayStats.missedCalls} customers didn't pick – follow up tomorrow</p>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold text-lg mb-2">
          🎉 WELL DONE, CHAMPION! 🎉
        </div>
        <p className="text-sm text-purple-200">Rest well, tomorrow we go make more money! 💪</p>
      </div>
    </div>
  );
};
