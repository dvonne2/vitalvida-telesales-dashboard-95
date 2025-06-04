
import React, { useState, useEffect } from 'react';
import { Clock, Eye } from 'lucide-react';

interface ActionTimestamp {
  id: string;
  action: string;
  timestamp: Date;
  customer?: string;
  orderId?: string;
  type: 'call' | 'upload' | 'assign_da' | 'check_payment' | 'confirm_delivery' | 'otp' | 'cta_action_complete';
}

interface ActionTimestampTrackerProps {
  onActionLogged?: (action: ActionTimestamp) => void;
}

export const ActionTimestampTracker = ({ onActionLogged }: ActionTimestampTrackerProps) => {
  const [actions, setActions] = useState<ActionTimestamp[]>([]);

  // Function to log a new action
  const logAction = (actionType: ActionTimestamp['type'], customer?: string, orderId?: string) => {
    const actionTexts = {
      call: `started calling ${customer}`,
      upload: `uploaded call proof for ${customer}`,
      assign_da: `assigned order #${orderId} to DA`,
      check_payment: `checked payment for order #${orderId}`,
      confirm_delivery: `confirmed delivery for order #${orderId}`,
      otp: `uploaded OTP for order #${orderId}`,
      cta_action_complete: `completed CTA action for ${customer}`
    };

    const newAction: ActionTimestamp = {
      id: Date.now().toString(),
      action: actionTexts[actionType],
      timestamp: new Date(),
      customer,
      orderId,
      type: actionType
    };

    setActions(prev => [...prev, newAction].slice(-10)); // Keep last 10 actions
    onActionLogged?.(newAction);
  };

  // Expose the logAction function globally for other components to use
  useEffect(() => {
    (window as any).logAgentAction = logAction;
    return () => {
      delete (window as any).logAgentAction;
    };
  }, []);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getActionEmoji = (type: ActionTimestamp['type']) => {
    const emojis = {
      call: '📞',
      upload: '🎙️',
      assign_da: '🚚',
      check_payment: '💰',
      confirm_delivery: '📦',
      otp: '🔐',
      cta_action_complete: '✅'
    };
    return emojis[type] || '📝';
  };

  if (actions.length === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 bg-gray-100/90 border-t border-gray-200 px-3 py-2">
      <div className="flex items-center gap-2 mb-1">
        <Eye className="w-3 h-3 text-gray-600" />
        <span className="text-xs font-medium text-gray-700">SUPERVISOR TRACKING ACTIVE</span>
        <span className="text-xs text-gray-500">({actions.length} actions logged)</span>
      </div>
      <div className="space-y-1 max-h-20 overflow-y-auto">
        {actions.slice(-3).map((action) => (
          <div key={action.id} className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-3 h-3 text-gray-500" />
            <span>{getActionEmoji(action.type)}</span>
            <span>You {action.action} at {formatTimestamp(action.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
