
import React from 'react';
import { PhoneCall, Clock, ArrowUp } from 'lucide-react';

export const FollowUpZone = () => {
  const followUps = [
    { customer: "Bola Ikoyi", reason: "Didn't pick", urgency: "high", time: "2 hrs ago" },
    { customer: "Tunde VI", reason: "Call back today", urgency: "medium", time: "4 hrs ago" },
    { customer: "Grace Surulere", reason: "Pending upgrade", urgency: "low", time: "1 day ago" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💭';
      default: return '📋';
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <PhoneCall className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-bold">📞 FOLLOW-UP ZONE</h3>
      </div>

      <div className="space-y-3">
        {followUps.map((followUp, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getUrgencyIcon(followUp.urgency)}</span>
                <span className="font-medium">{followUp.customer}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${getUrgencyColor(followUp.urgency)}`}>
                {followUp.urgency.toUpperCase()}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-100">{followUp.reason}</span>
              <div className="flex items-center gap-1 text-orange-200">
                <Clock className="w-3 h-3" />
                {followUp.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors">
          🚀 START CALLING NOW!
        </button>
      </div>
    </div>
  );
};
