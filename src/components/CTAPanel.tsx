
import React, { useState } from 'react';
import { CallAction } from './cta/CallAction';
import { UploadAction } from './cta/UploadAction';
import { AssignDAAction } from './cta/AssignDAAction';
import { PaymentAction } from './cta/PaymentAction';
import { ActionState, whisperMessages } from '../utils/ctaUtils';

interface CTAPanelProps {
  orderId: string;
  customerName: string;
  phone: string;
  product: string;
  onActionComplete: (action: string, orderId: string) => void;
}

export const CTAPanel = ({ orderId, customerName, phone, product, onActionComplete }: CTAPanelProps) => {
  const [actionStates, setActionStates] = useState<ActionState>({
    call: 'pending',
    upload: 'pending',
    assign: 'pending',
    payment: 'pending'
  });
  
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [disabledButtons, setDisabledButtons] = useState<Set<string>>(new Set());
  const [showWhisper, setShowWhisper] = useState<string | null>(null);

  const updateActionStatus = (action: keyof ActionState, status: ActionState[keyof ActionState]) => {
    setActionStates(prev => ({ ...prev, [action]: status }));
  };

  const disableButtonTemporarily = (action: string) => {
    setDisabledButtons(prev => new Set(prev).add(action));
    setTimeout(() => {
      setDisabledButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(action);
        return newSet;
      });
    }, 10000); // 10 seconds
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mt-3">
      {/* Whisper Coaching */}
      {showWhisper && (
        <div className="bg-blue-600 text-white rounded-lg p-3 mb-4 text-sm font-medium animate-pulse">
          {whisperMessages[showWhisper as keyof typeof whisperMessages]}
        </div>
      )}

      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        🎯 ACTION PANEL - Order #{orderId}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CallAction
          status={actionStates.call}
          activeAction={activeAction}
          customerName={customerName}
          phone={phone}
          orderId={orderId}
          disabled={disabledButtons.has('call')}
          onSetActiveAction={setActiveAction}
          onUpdateStatus={(status) => updateActionStatus('call', status)}
          onDisableButton={() => disableButtonTemporarily('call')}
          onShowWhisper={setShowWhisper}
          onActionComplete={onActionComplete}
        />

        <UploadAction
          status={actionStates.upload}
          disabled={disabledButtons.has('upload')}
          orderId={orderId}
          onUpdateStatus={(status) => updateActionStatus('upload', status)}
          onDisableButton={() => disableButtonTemporarily('upload')}
          onShowWhisper={setShowWhisper}
          onActionComplete={onActionComplete}
        />

        <AssignDAAction
          status={actionStates.assign}
          disabled={disabledButtons.has('assign')}
          orderId={orderId}
          customerName={customerName}
          onUpdateStatus={(status) => updateActionStatus('assign', status)}
          onDisableButton={() => disableButtonTemporarily('assign')}
          onShowWhisper={setShowWhisper}
          onActionComplete={onActionComplete}
        />

        <PaymentAction
          status={actionStates.payment}
          disabled={disabledButtons.has('payment')}
          orderId={orderId}
          customerName={customerName}
          onUpdateStatus={(status) => updateActionStatus('payment', status)}
          onDisableButton={() => disableButtonTemporarily('payment')}
          onShowWhisper={setShowWhisper}
          onActionComplete={onActionComplete}
        />
      </div>
    </div>
  );
};
