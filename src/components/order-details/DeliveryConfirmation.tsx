
import React, { useState } from 'react';
import { InteractiveButton } from '../InteractiveButton';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface DeliveryConfirmationProps {
  orderId: string;
  customerName: string;
  currentAction: string | null;
  onActionComplete: (action: string) => void;
}

export const DeliveryConfirmation = ({ 
  orderId, 
  customerName, 
  currentAction, 
  onActionComplete 
}: DeliveryConfirmationProps) => {
  const [otpInput, setOtpInput] = useState('');
  const { playSound } = useSoundEffects();

  const handleDeliveryOTP = () => {
    if (otpInput.length !== 4) {
      alert('Please enter the 4-digit OTP');
      return;
    }
    
    onActionComplete('delivered');
    playSound('celebration');
    
    // Log the action
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('confirm_delivery', customerName, orderId);
    }
    
    setTimeout(() => {
      setOtpInput('');
      alert('📦 Delivery confirmed! Bonus unlocked! 🎉');
    }, 1000);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-bold text-gray-900 text-center">📦 DELIVERY CONFIRMATION</h3>
      <input
        type="text"
        placeholder="Enter 4-digit OTP"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value.slice(0, 4))}
        className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg font-mono"
        maxLength={4}
      />
      <InteractiveButton
        onClick={handleDeliveryOTP}
        variant="success"
        size="lg"
        className="w-full text-lg font-bold py-4"
        disabled={currentAction === 'delivered' || otpInput.length !== 4}
      >
        {currentAction === 'delivered' ? (
          '📦 CONFIRMING DELIVERY...'
        ) : (
          '📦 DELIVERED (OTP VERIFIED)'
        )}
      </InteractiveButton>
    </div>
  );
};
