
import { CheckCircle, AlertCircle } from 'lucide-react';

export type ActionStatus = 'pending' | 'completed' | 'failed';

export interface ActionState {
  call: ActionStatus;
  upload: ActionStatus;
  assign: ActionStatus;
  payment: ActionStatus;
}

export const getStatusIcon = (status: ActionStatus) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'failed': return AlertCircle;
    default: return null; // Remove static clock icon for pending
  }
};

export const getStatusEmoji = (status: ActionStatus) => {
  switch (status) {
    case 'completed': return '✅';
    case 'failed': return '🔴';
    default: return '⏳';
  }
};

export const getStatusIconColor = (status: ActionStatus) => {
  switch (status) {
    case 'completed': return 'text-green-600';
    case 'failed': return 'text-red-600';
    default: return 'text-yellow-600';
  }
};

export const logAction = (actionText: string, orderId: string, onActionComplete: (action: string, orderId: string) => void) => {
  const timestamp = new Date().toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short'
  });
  
  if ((window as any).logAgentAction) {
    (window as any).logAgentAction('cta_action', `${actionText} for Order #${orderId} at ${timestamp}`, orderId);
  }
  
  onActionComplete(actionText, orderId);
};

export const whisperMessages = {
  call: '🧠 Calls are randomly monitored. Use the script. Your bonus depends on this call quality.',
  upload: '🧠 NO RECORDING PROOF = NO PAY! Upload evidence that you made this call. Don\'t lose your bonus!',
  assign: '🧠 Fast DA assignment = faster delivery = bigger bonus. Move quick!',
  payment: '🧠 Payment confirmed? Prove it fast! Your bonus is waiting for this final step.'
};
