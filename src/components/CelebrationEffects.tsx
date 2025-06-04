
import React from 'react';

interface CelebrationEffectsProps {
  isActive: boolean;
  type: 'order' | 'bonus' | 'target' | 'daily';
  onComplete?: () => void;
}

export const CelebrationEffects = ({ isActive, type, onComplete }: CelebrationEffectsProps) => {
  // Disable all celebration effects - return null immediately
  if (onComplete) {
    // Call onComplete immediately to clean up any pending celebrations
    setTimeout(() => onComplete(), 0);
  }
  
  return null;
};
