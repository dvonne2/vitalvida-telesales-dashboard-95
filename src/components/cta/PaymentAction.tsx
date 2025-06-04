
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { PaymentUploadModal } from '../PaymentUploadModal';
import { ActionStatus, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { ErrorBoundary } from '../ErrorBoundary';

interface PaymentActionProps {
  status: ActionStatus;
  disabled: boolean;
  orderId: string;
  customerName: string;
  countdown?: string;
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
  countdown,
  onUpdateStatus,
  onDisableButton,
  onShowWhisper,
  onActionComplete
}: PaymentActionProps) => {
  const [showPaymentUploadModal, setShowPaymentUploadModal] = useState(false);
  const { playSound } = useSoundEffects();

  console.log('PaymentAction render:', { orderId, status, disabled, showPaymentUploadModal });

  const isCountdownActive = countdown === "NOW!";

  const handlePaymentConfirmed = () => {
    if (disabled) {
      console.log('PaymentAction: Button disabled, ignoring click');
      return;
    }
    
    console.log('PaymentAction: Opening payment upload modal');
    setShowPaymentUploadModal(true);
    onShowWhisper('payment');
    playSound('alert_ping');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handlePaymentUploadComplete = () => {
    console.log('PaymentAction: Payment upload completed');
    setShowPaymentUploadModal(false);
    onUpdateStatus('completed');
    onDisableButton();
    playSound('cash_register');
    logAction('💰 PAYMENT PROOF UPLOADED', orderId, onActionComplete);
  };

  return (
    <ErrorBoundary>
      <ActionButton
        title="💰 Upload Payment Proof"
        icon={DollarSign}
        iconColor="text-green-600"
        status={status}
        onClick={handlePaymentConfirmed}
        disabled={disabled}
        buttonText="📤 Upload Payment Proof"
        completedText="✅ Confirmed"
        variant="success"
        countdown={countdown}
        isCountdownActive={isCountdownActive}
        whisperMessage={isCountdownActive ? "If dem don pay, confirm am sharp sharp." : undefined}
      />

      <ErrorBoundary>
        <PaymentUploadModal
          isOpen={showPaymentUploadModal}
          onClose={() => setShowPaymentUploadModal(false)}
          orderId={orderId}
          customerName={customerName}
          onUploadComplete={handlePaymentUploadComplete}
        />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};
