
import React from 'react';
import { TrendingUp, Target } from 'lucide-react';

export const SalesForecastCard = () => {
  const currentPace = 32; // orders this week
  const weeklyTarget = 45;
  const projectedWeekly = 41;
  const status = projectedWeekly >= weeklyTarget ? 'ahead' : projectedWeekly >= weeklyTarget * 0.8 ? 'ontrack' : 'behind';

  const getStatusColor = () => {
    switch (status) {
      case 'ahead': return 'from-green-500 to-emerald-500';
      case 'ontrack': return 'from-yellow-500 to-orange-500';
      case 'behind': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'ahead': return '🔥 You dey lead the pack!';
      case 'ontrack': return '💪 You dey try, keep pushing!';
      case 'behind': return '⚠️ Hustle harder, champion!';
      default: return '📊 Let\'s check your pace';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'ahead': return '🟢';
      case 'ontrack': return '🟡';
      case 'behind': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getStatusColor()} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-bold">📊 SALES FORECAST</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{projectedWeekly}</div>
          <div className="text-sm opacity-80">Projected This Week</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{getStatusIcon()}</div>
          <div className="text-sm opacity-80">Status</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4" />
          <span className="text-sm font-medium">Weekly Progress</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000"
            style={{ width: `${(currentPace / weeklyTarget) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-80">
          <span>{currentPace} done</span>
          <span>{weeklyTarget} target</span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-medium text-lg">{getStatusText()}</p>
        <p className="text-sm opacity-80 mt-1">
          You're on track to close {projectedWeekly} orders this week
        </p>
      </div>
    </div>
  );
};
