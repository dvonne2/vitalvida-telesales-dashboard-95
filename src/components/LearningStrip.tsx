
import React, { useState } from 'react';
import { Play, Volume2, BookOpen } from 'lucide-react';

export const LearningStrip = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const memes = [
    "Your bonus is hanging because you never call the customer 😂",
    "That one call fit give you ₦5k extra, no be joke! 💰",
    "Customer say 'I go call you back' - that na lie, call am now! 📞",
    "Upload proof fast fast before network go disappoint you! 📸"
  ];

  const audioTips = [
    "Why that one call fit give you ₦5k extra",
    "How to close deal in 5 minutes",
    "Street smart way to handle difficult customers"
  ];

  return (
    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-bold">🧠 STREET SMART LEARNING</h3>
      </div>

      {/* Memes Section */}
      <div className="mb-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          😂 Daily Memes
        </h4>
        <div className="bg-white/10 rounded-lg p-3 mb-2">
          <p className="text-sm italic">"{memes[0]}"</p>
        </div>
      </div>

      {/* Audio Tips Section */}
      <div>
        <h4 className="font-medium mb-2 flex items-center gap-2">
          🎧 Audio Tips (WhatsApp Style)
        </h4>
        <div className="space-y-2">
          {audioTips.map((tip, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-all">
              <button 
                className="bg-green-500 rounded-full p-2 hover:bg-green-600 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="flex-1">
                <p className="text-sm">{tip}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="bg-white/30 h-1 rounded-full flex-1"></div>
                  <span className="text-xs opacity-70">2:34</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs opacity-80">💡 New tips every day to boost your sales game!</p>
      </div>
    </div>
  );
};
