
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
  variant = 'primary'
}: ActionButtonProps) => {
  const StatusIcon = getStatusIcon(status);
  const statusIconColor = getStatusIconColor(status);
  const statusEmoji = getStatusEmoji(status);

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="font-semibold text-sm">{title}</span>
          <StatusIcon className={`w-4 h-4 ${statusIconColor}`} />
          <span className="text-lg">{statusEmoji}</span>
        </div>
      </div>
      
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
