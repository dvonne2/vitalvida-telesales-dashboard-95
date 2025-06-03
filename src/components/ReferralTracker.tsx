
import React from 'react';
import { Users, Gift, TrendingUp, Star } from 'lucide-react';

export const ReferralTracker = () => {
  const referralBonuses = [
    { type: "Customer Referral", count: 3, bonus: 1500, icon: "👥" },
    { type: "Customer Upgrade", count: 2, bonus: 800, icon: "⬆️" },
    { type: "Repeat Customer", count: 5, bonus: 2000, icon: "🔄" },
    { type: "Rep Referral", count: 1, bonus: 5000, icon: "🤝" }
  ];

  const totalBonus = referralBonuses.reduce((sum, item) => sum + item.bonus, 0);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Gift className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-bold">🎁 REFERRAL & RECRUIT TRACKER</h3>
      </div>

      <div className="bg-white/10 rounded-lg p-4 mb-4 text-center">
        <div className="text-3xl font-bold text-yellow-300">₦{totalBonus.toLocaleString()}</div>
        <div className="text-sm opacity-80">Total Referral Bonus This Month</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {referralBonuses.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{item.count}</span>
              <span className="text-sm font-bold text-yellow-300">+₦{item.bonus}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full font-bold hover:from-yellow-300 hover:to-orange-300 transition-all">
          🚀 REFER MORE & EARN!
        </button>
      </div>
    </div>
  );
};
