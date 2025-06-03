
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
        return 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white';
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
        font-bold rounded-lg shadow-lg
        transform transition-all duration-150
        ${isClicked ? 'scale-95 shadow-md' : 'scale-100 hover:scale-105 hover:shadow-xl'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        relative overflow-hidden
        ${className}
      `}
    >
      {isClicked && (
        <div className="absolute inset-0 bg-white/30 animate-pulse rounded-lg" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
