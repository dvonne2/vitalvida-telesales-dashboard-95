
import React from 'react';
import { InteractiveButton } from '../InteractiveButton';

interface StopCallButtonProps {
  onStopCall: () => void;
}

export const StopCallButton = ({ onStopCall }: StopCallButtonProps) => {
  return (
    <InteractiveButton
      onClick={onStopCall}
      variant="danger"
      size="lg"
      className="w-full text-lg font-bold py-4"
    >
      ✋ STOP CALL
    </InteractiveButton>
  );
};
