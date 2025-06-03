import React, { useState, useEffect } from 'react';
import { TodayMissionCard } from '../components/TodayMissionCard';
import { KPICardsRow } from '../components/KPICardsRow';
import { BonusProgressBar } from '../components/BonusProgressBar';
import { AgentAuditCard } from '../components/AgentAuditCard';
import { OrdersTable } from '../components/OrdersTable';
import { OrdersInProgress } from '../components/OrdersInProgress';
import { FollowUpZone } from '../components/FollowUpZone';
import { SalesForecastCard } from '../components/SalesForecastCard';
import { ReferralTracker } from '../components/ReferralTracker';
import { LearningStrip } from '../components/LearningStrip';
import { LiveSocialFeed } from '../components/LiveSocialFeed';
import { EndOfDayCard } from '../components/EndOfDayCard';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isEndOfDay = currentTime.getHours() >= 18;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-yellow-500 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-lg">🚀 VITALVIDA TELESALES MODE</h1>
              <p className="text-green-100 text-sm">Make that money, champ! 💰</p>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">AGENT: EMEKA</div>
              <div className="text-green-100 text-sm font-medium">Monthly Rate: 74%</div>
              <div className="text-green-100 text-sm">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* 1. Today's Mission Card */}
        <TodayMissionCard />
        
        {/* 2-4. KPI Cards in 3 rows */}
        <KPICardsRow 
          title="📦 ORDER PERFORMANCE" 
          cards={[
            { title: "Today's Orders", value: "8/12", subtitle: "Assigned / Delivered", color: "bg-blue-500" },
            { title: "This Week", value: "32/45", subtitle: "Orders closed", color: "bg-purple-500" },
            { title: "This Month", value: "110/150", subtitle: "Target progress", color: "bg-indigo-500" }
          ]}
        />

        <KPICardsRow 
          title="💰 BONUS & RESPONSE" 
          cards={[
            { title: "Daily Bonus", value: "₦3,800", subtitle: "You dey try! 🔥", color: "bg-green-500" },
            { title: "Weekly Bonus", value: "₦14,200", subtitle: "Money dey come!", color: "bg-yellow-500" },
            { title: "Avg Response", value: "7 mins", subtitle: "After assignment", color: "bg-orange-500" }
          ]}
        />

        <KPICardsRow 
          title="🚚 DELIVERY PERFORMANCE" 
          cards={[
            { title: "Fast Delivery", value: "15", subtitle: "Orders <6hrs", color: "bg-teal-500" },
            { title: "Today's Rate", value: "67%", subtitle: "Delivery success", color: "bg-cyan-500" },
            { title: "Week's Rate", value: "74%", subtitle: "Keep pushing!", color: "bg-sky-500" }
          ]}
        />

        {/* 5. Glowing Bonus Progress Bar */}
        <BonusProgressBar />

        {/* 6. Agent Audit Card */}
        <AgentAuditCard />

        {/* 7. Your Orders Table */}
        <OrdersTable />

        {/* 8. Orders in Progress */}
        <OrdersInProgress />

        {/* 9. Follow-Up Zone */}
        <FollowUpZone />

        {/* 10. Sales Forecast Card */}
        <SalesForecastCard />

        {/* 11. Referral & Recruit Tracker */}
        <ReferralTracker />

        {/* 12. Street Smart Learning Strip */}
        <LearningStrip />

        {/* 14. End of Day Wrap Card */}
        {isEndOfDay && <EndOfDayCard />}
      </div>

      {/* 13. Live Social Feed - Fixed at bottom */}
      <LiveSocialFeed />
    </div>
  );
};

export default Index;
