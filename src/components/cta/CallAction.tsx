
import React from 'react';
import { Phone } from 'lucide-react';
import { InteractiveButton } from '../InteractiveButton';
import { ActionStatus, getStatusIcon, getStatusIconColor, getStatusEmoji, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface CallActionProps {
  status: ActionStatus;
  activeAction: string | null;
  customerName: string;
  phone: string;
  orderId: string;
  disabled: boolean;
  onSetActiveAction: (action: string | null) => void;
  onUpdateStatus: (status: ActionStatus) => void;
  onDisableButton: () => void;
  onShowWhisper: (type: string | null) => void;
  onActionComplete: (action: string, orderId: string) => void;
}

export const CallAction = ({
  status,
  activeAction,
  customerName,
  phone,
  orderId,
  disabled,
  onSetActiveAction,
  onUpdateStatus,
  onDisableButton,
  onShowWhisper,
  onActionComplete
}: CallActionProps) => {
  const { playDialToneLoop, stopSound } = useSoundEffects();
  const StatusIcon = getStatusIcon(status);
  const statusIconColor = getStatusIconColor(status);
  const statusEmoji = getStatusEmoji(status);

  const handleCallAction = () => {
    if (disabled) return;
    
    onSetActiveAction('call');
    playDialToneLoop();
    onShowWhisper('call');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handleStartCall = () => {
    stopSound();
    onUpdateStatus('completed');
    onDisableButton();
    logAction('📞 CALL STARTED', orderId, onActionComplete);
    onSetActiveAction(null);
    onShowWhisper(null);
  };

  const handleCouldntReach = () => {
    stopSound();
    onUpdateStatus('failed');
    onDisableButton();
    logAction('📞 COULDN\'T REACH - Moved to Follow-Up', orderId, onActionComplete);
    onSetActiveAction(null);
    onShowWhisper(null);
  };

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm">📞 CALL NOW</span>
          <StatusIcon className={`w-4 h-4 ${statusIconColor}`} />
          <span className="text-lg">{statusEmoji}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-600 mb-2">
        📞 Call: {customerName} – {phone}
      </div>

      {activeAction === 'call' ? (
        <div className="space-y-2">
          <div className="bg-red-100 border border-red-300 rounded p-2 text-center">
            <div className="text-red-700 font-bold text-sm">📞 CALLING...</div>
            <div className="text-red-600 text-xs">Ring tone playing</div>
          </div>
          <div className="flex gap-2">
            <InteractiveButton
              onClick={handleStartCall}
              variant="success"
              size="sm"
              className="flex-1 text-xs"
            >
              ✅ Start Call
            </InteractiveButton>
            <InteractiveButton
              onClick={handleCouldntReach}
              variant="danger"
              size="sm"
              className="flex-1 text-xs"
            >
              ❌ Couldn't Reach
            </InteractiveButton>
          </div>
        </div>
      ) : (
        <InteractiveButton
          onClick={handleCallAction}
          variant="primary"
          size="sm"
          disabled={disabled || status === 'completed'}
          className="w-full text-xs"
        >
          {status === 'completed' ? '✅ Called' : '📞 Start Call'}
        </InteractiveButton>
      )}
    </div>
  );
};
