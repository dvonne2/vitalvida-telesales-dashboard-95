
import React from 'react';
import { CheckCircle, Phone, TrendingUp, Target } from 'lucide-react';

export const EndOfDayCard = () => {
  const dayStats = {
    ordersCompleted: 2,
    ordersAssigned: 10,
    bonusEarned: 3600,
    potentialBonus: 16200,
    missedCalls: 4
  };

  const getMotivationalMessage = () => {
    if (dayStats.ordersCompleted >= 5) {
      return "🔥 BOOM! You dey fire today!";
    } else if (dayStats.ordersCompleted >= 3) {
      return "💪 You dey try! Keep pushing!";
    } else {
      return "⚡ E go be! Tomorrow na your day!";
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 rounded-xl p-6 text-white shadow-2xl animate-fade-in border-2 border-purple-400">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          🌇 END OF DAY WRAP-UP – JSS3 SURVIVAL MODE
        </h2>
        <p className="text-purple-200 font-medium">Time to check wetin you achieve today, champ! 📊</p>
      </div>

      <div className="space-y-5 mb-6">
        {/* Orders Closed Section */}
        <div className="bg-white/10 rounded-lg p-5 border border-purple-300">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-7 h-7 text-green-300" />
            <span className="text-xl font-bold text-green-300">📦 Orders Closed</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-green-300 mb-2">
              {dayStats.ordersCompleted}/{dayStats.ordersAssigned}
            </div>
            <p className="text-lg font-bold mb-1">📦 You closed: {dayStats.ordersCompleted} orders out of {dayStats.ordersAssigned} today</p>
            <p className="text-purple-200 italic text-sm">
              {dayStats.ordersCompleted < 3 ? "(Wetin dey occur? Buckle up o!)" : "(You dey try! Keep the energy up!)"}
            </p>
          </div>
        </div>

        {/* Bonus Secured Section */}
        <div className="bg-white/10 rounded-lg p-5 border border-purple-300">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-7 h-7 text-yellow-300" />
            <span className="text-xl font-bold text-yellow-300">💰 Bonus Secured</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-300 mb-2">
              ₦{dayStats.bonusEarned.toLocaleString()}
            </div>
            <p className="text-lg font-bold mb-1">💰 You made: ₦{dayStats.bonusEarned.toLocaleString()} bonus today</p>
            <p className="text-purple-200 italic text-sm mb-2">
              (If say you close {dayStats.ordersAssigned - 1}, you for get ₦{dayStats.potentialBonus.toLocaleString()} as bonus!)
            </p>
            <p className="text-yellow-300 font-bold text-sm">
              **(You still fit close them tomorrow — Ji ma sun!)**
            </p>
          </div>
        </div>

        {/* Follow-Up Reminder Section */}
        <div className="bg-white/10 rounded-lg p-5 border border-purple-300">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-7 h-7 text-orange-300" />
            <span className="text-xl font-bold text-orange-300">☎️ Follow-Up Reminder</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-orange-300 mb-2">
              {dayStats.missedCalls}
            </div>
            <p className="text-lg font-bold mb-1">📞 {dayStats.missedCalls} people no pick or delay</p>
            <p className="text-purple-200 italic text-sm">
              (Call them now. If dem no still pick — call again tomorrow. No let money waste!)
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 mb-4">
          <p className="text-2xl font-bold text-white">
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      {/* Final Hype Bar - Big Yellow CTA */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-6 text-center shadow-lg">
        <div className="text-black font-black text-xl mb-3 leading-tight">
          🎉 WHAT COULD YOU HAVE DONE BETTER TODAY? WRITE IT DOWN! 🎉
        </div>
        <p className="text-black/80 font-bold text-sm">
          Rest small. Tomorrow? We go again. Bigger money dey wait.
        </p>
      </div>

      {/* Achievement Badge */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-purple-300">
          <Target className="w-5 h-5 text-purple-200" />
          <span className="text-purple-200 font-medium text-sm">
            Tomorrow target: {dayStats.ordersAssigned} orders = ₦{dayStats.potentialBonus.toLocaleString()} bonus!
          </span>
        </div>
      </div>
    </div>
  );
};
