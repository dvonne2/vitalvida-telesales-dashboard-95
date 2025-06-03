
import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { DAUploadModal } from '../DAUploadModal';
import { ActionStatus, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';

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

  const handleAssignDA = () => {
    if (disabled) return;
    
    setShowDAUploadModal(true);
    onShowWhisper('assign');
    playSound('alert_ping');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handleDAUploadComplete = () => {
    setShowDAUploadModal(false);
    onUpdateStatus('completed');
    onDisableButton();
    playSound('success');
    logAction('🚚 DA ASSIGNMENT PROOF UPLOADED', orderId, onActionComplete);
  };

  return (
    <>
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

      <DAUploadModal
        isOpen={showDAUploadModal}
        onClose={() => setShowDAUploadModal(false)}
        orderId={orderId}
        customerName={customerName}
        onUploadComplete={handleDAUploadComplete}
      />
    </>
  );
};
