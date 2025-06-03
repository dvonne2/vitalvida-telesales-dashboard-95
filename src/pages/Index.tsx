
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
import { InteractiveSystem } from '../components/InteractiveSystem';

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
      {/* Interactive System - handles all sound and visual effects */}
      <InteractiveSystem />
      
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
        {/* 1. Today's Mission Card - Can be RED or GREEN based on urgency */}
        <TodayMissionCard />
        
        {/* ROW 1: Performance Summary - 🟢 GREEN + 🔵 BLUE (calm & proud) */}
        <KPICardsRow 
          title="📈 PERFORMANCE SUMMARY" 
          cards={[
            { title: "Today's Orders", value: "8/12", subtitle: "Assigned / Delivered", color: "bg-green-500" },
            { title: "This Week", value: "32/45", subtitle: "Orders closed", color: "bg-blue-500" },
            { title: "This Month", value: "110/150", subtitle: "Target progress", color: "bg-indigo-500" }
          ]}
        />

        {/* ROW 2: Bonus & Urgency - 🟡 YELLOW + 🔴 RED (reward + action) */}
        <KPICardsRow 
          title="💰 BONUS & URGENT ACTIONS" 
          cards={[
            { title: "Daily Bonus", value: "₦3,800", subtitle: "You dey try! 🔥", color: "bg-yellow-500" },
            { title: "Weekly Bonus", value: "₦14,200", subtitle: "Money dey come!", color: "bg-yellow-600" },
            { title: "Avg Response", value: "7 mins", subtitle: "Speed up small!", color: "bg-orange-500" }
          ]}
        />

        {/* ROW 3: Insights & Delivery - 🔵 BLUE + 🟢 GREEN (feedback & success) */}
        <KPICardsRow 
          title="🚚 DELIVERY & SUCCESS" 
          cards={[
            { title: "Fast Delivery", value: "15", subtitle: "Orders <6hrs", color: "bg-blue-500" },
            { title: "Today's Rate", value: "67%", subtitle: "Delivery success", color: "bg-green-500" },
            { title: "Week's Rate", value: "74%", subtitle: "Keep pushing!", color: "bg-green-600" }
          ]}
        />

        {/* Orders in Progress - HIGH PRIORITY - RED/GREEN tiered system */}
        <OrdersInProgress />

        {/* 🟡 YELLOW - Glowing Bonus Progress Bar */}
        <BonusProgressBar />

        {/* ⚫️ GRAY - Agent Audit Card (neutral/informational) */}
        <AgentAuditCard />

        {/* Your Orders Table */}
        <OrdersTable />

        {/* Follow-Up Zone */}
        <FollowUpZone />

        {/* Sales Forecast Card */}
        <SalesForecastCard />

        {/* Referral & Recruit Tracker */}
        <ReferralTracker />

        {/* Street Smart Learning Strip */}
        <LearningStrip />

        {/* End of Day Wrap Card */}
        {isEndOfDay && <EndOfDayCard />}
      </div>

      {/* Live Social Feed - Fixed at bottom */}
      <LiveSocialFeed />
    </div>
  );
};

export default Index;
