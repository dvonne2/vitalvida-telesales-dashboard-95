
import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { DAUploadModal } from '../DAUploadModal';
import { ActionStatus, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { ErrorBoundary } from '../ErrorBoundary';

interface AssignDAActionProps {
  status: ActionStatus;
  disabled: boolean;
  orderId: string;
  customerName: string;
  onUpdateStatus: (status: ActionStatus) => void;
  onDisableButton: () => void;
  onShowWhisper: (type: string | null) => void;
  onActionComplete: (action: string, orderId: string) => void;
}

export const AssignDAAction = ({
  status,
  disabled,
  orderId,
  customerName,
  onUpdateStatus,
  onDisableButton,
  onShowWhisper,
  onActionComplete
}: AssignDAActionProps) => {
  const [showDAUploadModal, setShowDAUploadModal] = useState(false);
  const { playSound } = useSoundEffects();

  console.log('AssignDAAction render:', { orderId, status, disabled, showDAUploadModal });

  const handleAssignDA = () => {
    if (disabled) {
      console.log('AssignDAAction: Button disabled, ignoring click');
      return;
    }
    
    console.log('AssignDAAction: Opening DA upload modal');
    setShowDAUploadModal(true);
    onShowWhisper('assign');
    playSound('alert_ping');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handleDAUploadComplete = () => {
    console.log('AssignDAAction: DA upload completed');
    setShowDAUploadModal(false);
    onUpdateStatus('completed');
    onDisableButton();
    playSound('success');
    logAction('🚚 DA ASSIGNMENT PROOF UPLOADED', orderId, onActionComplete);
  };

  return (
    <ErrorBoundary>
      <ActionButton
        title="🚚 ASSIGN DA"
        icon={Truck}
        iconColor="text-purple-600"
        status={status}
        onClick={handleAssignDA}
        disabled={disabled}
        buttonText="🚚 Assign DA"
        completedText="✅ Assigned"
        variant="primary"
      />

      <ErrorBoundary>
        <DAUploadModal
          isOpen={showDAUploadModal}
          onClose={() => setShowDAUploadModal(false)}
          orderId={orderId}
          customerName={customerName}
          onUploadComplete={handleDAUploadComplete}
        />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};
