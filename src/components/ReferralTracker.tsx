
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Repeat, ArrowUp, Handshake } from 'lucide-react';

interface ReferralEntry {
  amount: number;
  name: string;
  product: string;
  date: string;
}

interface ReferralCategory {
  title: string;
  icon: React.ReactNode;
  totalAmount: number;
  count: number;
  entries: ReferralEntry[];
}

export const ReferralTracker = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: ReferralCategory[] = [
    {
      title: "👥 New Customers",
      icon: <Users className="w-5 h-5" />,
      totalAmount: 1500,
      count: 3,
      entries: [
        { amount: 500, name: "Adebayo A.", product: "Fulani Hair Gro Starter", date: "May 27" },
        { amount: 500, name: "Nkechi B.", product: "Family Save Combo", date: "May 29" },
        { amount: 500, name: "Fatima O.", product: "Self-Love B2GOF Bundle", date: "June 2" }
      ]
    },
    {
      title: "🔁 Old Customers Returned",
      icon: <Repeat className="w-5 h-5" />,
      totalAmount: 1200,
      count: 3,
      entries: [
        { amount: 400, name: "Kemi O.", product: "Vitamin D Refill", date: "May 30" },
        { amount: 400, name: "Bola T.", product: "Omega 3 Reorder", date: "June 1" },
        { amount: 400, name: "Ahmed S.", product: "Multivitamin Pack", date: "June 3" }
      ]
    },
    {
      title: "⬆️ Upgraded Customers",
      icon: <ArrowUp className="w-5 h-5" />,
      totalAmount: 800,
      count: 2,
      entries: [
        { amount: 400, name: "Chioma M.", product: "Premium Health Pack", date: "May 28" },
        { amount: 400, name: "Ibrahim L.", product: "Executive Wellness Bundle", date: "June 1" }
      ]
    },
    {
      title: "🤝 Recruited Reps",
      icon: <Handshake className="w-5 h-5" />,
      totalAmount: 5000,
      count: 1,
      entries: [
        { amount: 5000, name: "Blessing C.", product: "New Rep Onboarding", date: "May 25" }
      ]
    }
  ];

  const totalEarned = categories.reduce((sum, category) => sum + category.totalAmount, 0);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-700 via-purple-800 to-violet-900 rounded-xl p-6 text-white shadow-xl border border-indigo-500/50">
      {/* Title Bar */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
          🪙 REFERRAL & RECRUIT TRACKER
        </h3>
        <p className="text-indigo-200 text-sm font-medium">
          🔊 Every person you brought. Every kobo you earned.
        </p>
      </div>

      {/* Big Total with Glow Effect */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-6 mb-6 text-center shadow-lg">
        <div className="text-4xl font-black text-white mb-2">
          ₦{totalEarned.toLocaleString()}
        </div>
        <div className="text-white font-bold text-lg">
          💥 Referral Bonus Earned This Month
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="space-y-4 mb-6">
        {categories.map((category) => (
          <div key={category.title} className="bg-white/10 rounded-lg overflow-hidden border border-indigo-400/30">
            <div 
              className="p-4 cursor-pointer hover:bg-white/20 transition-all duration-200"
              onClick={() => toggleCategory(category.title)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <div>
                    <div className="font-bold text-lg">{category.title}</div>
                    <div className="text-amber-300 font-bold">
                      ₦{category.totalAmount.toLocaleString()} from {category.count} people
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-full text-sm font-bold transition-colors">
                    Show Who Paid You
                  </button>
                  {expandedCategory === category.title ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
              </div>
            </div>

            {/* Expanded Table */}
            {expandedCategory === category.title && (
              <div className="bg-black/20 p-4 border-t border-indigo-400/30">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-400/30">
                        <th className="text-left py-2 px-3 font-bold text-amber-300">💸 Amount</th>
                        <th className="text-left py-2 px-3 font-bold text-amber-300">👤 Name</th>
                        <th className="text-left py-2 px-3 font-bold text-amber-300">🛍️ What They Bought</th>
                        <th className="text-left py-2 px-3 font-bold text-amber-300">📅 Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.entries.map((entry, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-indigo-400/20 hover:bg-indigo-600/20 transition-colors"
                        >
                          <td className="py-3 px-3 font-bold text-emerald-300 text-lg">
                            ₦{entry.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-3 font-medium">{entry.name}</td>
                          <td className="py-3 px-3">{entry.product}</td>
                          <td className="py-3 px-3 text-indigo-200">{entry.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button 
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
          onClick={() => alert("Send someone to buy or join — when they do, you get paid.")}
        >
          🚀 REFER MORE & EARN!
        </button>
      </div>
    </div>
  );
};
