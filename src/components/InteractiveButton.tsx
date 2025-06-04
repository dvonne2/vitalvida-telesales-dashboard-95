
import React, { useState } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const InteractiveButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false
}: InteractiveButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { playSound } = useSoundEffects();

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    playSound('click');
    
    setTimeout(() => setIsClicked(false), 150);
    
    onClick?.();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white';
      case 'success':
        return 'bg-green-600 text-white';
      case 'warning':
        return 'bg-orange-600 text-white';
      case 'danger':
        return 'bg-red-600 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'md': return 'px-4 py-2 text-base';
      case 'lg': return 'px-6 py-3 text-lg';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        font-semibold rounded-lg shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        relative overflow-hidden
        ${className}
      `}
    >
      {isClicked && (
        <div className="absolute inset-0 bg-white/20 rounded-lg" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
