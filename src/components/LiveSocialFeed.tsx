
import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export const LiveSocialFeed = () => {
  const [currentFeed, setCurrentFeed] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const feeds = [
    "🔥 Joy just closed ₦215k Family Save bundle! - 2 mins ago",
    "⚡ Emeka uploaded proof in 6 mins – fastest today! - 5 mins ago", 
    "💰 Kemi hit ₦50k bonus milestone this week! - 8 mins ago",
    "🚀 Tunde made 15 calls in 1 hour - Machine mode! - 12 mins ago",
    "🎯 Grace got 98% delivery rate this month! - 15 mins ago"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentFeed((prev) => (prev + 1) % feeds.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [feeds.length]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-green-600 to-blue-600 text-white p-2 sm:p-3 shadow-lg">
      <div className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'}`}>
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <p className="text-xs sm:text-sm font-medium animate-pulse truncate">
            📢 LIVE UPDATES: {feeds[currentFeed]}
          </p>
        </div>
      </div>
    </div>
  );
};
