
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { InteractiveButton } from '../InteractiveButton';
import { getStatusIcon, getStatusIconColor, getStatusEmoji, ActionStatus } from '../../utils/ctaUtils';

interface ActionButtonProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  status: ActionStatus;
  onClick: () => void;
  disabled: boolean;
  buttonText: string;
  completedText: string;
  variant?: 'primary' | 'success' | 'danger';
  countdown?: string;
  isCountdownActive?: boolean;
  whisperMessage?: string;
}

export const ActionButton = ({
  title,
  icon: Icon,
  iconColor,
  status,
  onClick,
  disabled,
  buttonText,
  completedText,
  variant = 'primary',
  countdown,
  isCountdownActive,
  whisperMessage
}: ActionButtonProps) => {
  const StatusIcon = getStatusIcon(status);
  const statusIconColor = getStatusIconColor(status);
  const statusEmoji = getStatusEmoji(status);

  return (
    <div className={`bg-white rounded-lg p-3 border ${
      isCountdownActive 
        ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 animate-pulse' 
        : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="font-semibold text-sm">{title}</span>
          {StatusIcon && <StatusIcon className={`w-4 h-4 ${statusIconColor}`} />}
          <span className="text-lg">{statusEmoji}</span>
        </div>
        {countdown && (
          <span className={`text-xs ml-auto font-mono ${
            isCountdownActive ? 'text-red-600 font-bold' : 'text-gray-500'
          }`}>
            {countdown}
          </span>
        )}
      </div>

      {whisperMessage && isCountdownActive && (
        <div className="bg-blue-600 text-white rounded p-2 text-xs font-medium mb-2">
          💭 {whisperMessage}
        </div>
      )}
      
      <InteractiveButton
        onClick={onClick}
        variant={variant}
        size="sm"
        disabled={disabled || status === 'completed'}
        className="w-full text-xs"
      >
        {status === 'completed' ? completedText : buttonText}
      </InteractiveButton>
    </div>
  );
};
