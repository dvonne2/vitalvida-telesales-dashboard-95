
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { PaymentUploadModal } from '../PaymentUploadModal';
import { ActionStatus, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface PaymentActionProps {
  status: ActionStatus;
  disabled: boolean;
  orderId: string;
  customerName: string;
  onUpdateStatus: (status: ActionStatus) => void;
  onDisableButton: () => void;
  onShowWhisper: (type: string | null) => void;
  onActionComplete: (action: string, orderId: string) => void;
}

export const PaymentAction = ({
  status,
  disabled,
  orderId,
  customerName,
  onUpdateStatus,
  onDisableButton,
  onShowWhisper,
  onActionComplete
}: PaymentActionProps) => {
  const [showPaymentUploadModal, setShowPaymentUploadModal] = useState(false);
  const { playSound } = useSoundEffects();

  const handlePaymentConfirmed = () => {
    if (disabled) return;
    
    setShowPaymentUploadModal(true);
    onShowWhisper('payment');
    playSound('alert_ping');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handlePaymentUploadComplete = () => {
    setShowPaymentUploadModal(false);
    onUpdateStatus('completed');
    onDisableButton();
    playSound('cash_register');
    logAction('💰 PAYMENT PROOF UPLOADED', orderId, onActionComplete);
  };

  return (
    <>
      <ActionButton
        title="💰 PAYMENT"
        icon={DollarSign}
        iconColor="text-green-600"
        status={status}
        onClick={handlePaymentConfirmed}
        disabled={disabled}
        buttonText="💰 Confirm Payment"
        completedText="✅ Confirmed"
        variant="success"
      />

      <PaymentUploadModal
        isOpen={showPaymentUploadModal}
        onClose={() => setShowPaymentUploadModal(false)}
        orderId={orderId}
        customerName={customerName}
        onUploadComplete={handlePaymentUploadComplete}
      />
    </>
  );
};
