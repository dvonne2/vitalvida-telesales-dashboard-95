
import { useState, useEffect, useRef } from 'react';

interface BonusAlertData {
  currentBonus: number;
  targetBonus: number;
  ordersNeeded: number;
  lastShownDate: string;
  lastBonusAmount: number;
}

export const useWeeklyBonusAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<BonusAlertData | null>(null);
  const hasShownToday = useRef(false);

  // Simulate weekly bonus data
  const currentBonus = 2500;
  const targetBonus = 16200;
  const ordersNeeded = 9;

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('weeklyBonusAlert');
    
    let shouldShowAlert = false;
    
    if (storedData) {
      const parsed: BonusAlertData = JSON.parse(storedData);
      
      // Show if bonus increased or if it's a new day and haven't shown today
      if (currentBonus > parsed.lastBonusAmount || 
          (parsed.lastShownDate !== today && !hasShownToday.current)) {
        shouldShowAlert = true;
      }
    } else {
      // First time - show the alert
      shouldShowAlert = true;
    }

    if (shouldShowAlert && !hasShownToday.current) {
      setAlertData({
        currentBonus,
        targetBonus,
        ordersNeeded,
        lastShownDate: today,
        lastBonusAmount: currentBonus
      });
      setShowAlert(true);
      hasShownToday.current = true;

      // Store the data
      localStorage.setItem('weeklyBonusAlert', JSON.stringify({
        currentBonus,
        targetBonus,
        ordersNeeded,
        lastShownDate: today,
        lastBonusAmount: currentBonus
      }));
    }
  }, [currentBonus, targetBonus, ordersNeeded]);

  const closeAlert = () => {
    setShowAlert(false);
    setAlertData(null);
  };

  return {
    showAlert,
    alertData,
    closeAlert
  };
};
