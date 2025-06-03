
import React, { useState, useEffect } from 'react';
import { Star, Zap, Heart, DollarSign } from 'lucide-react';

interface CelebrationEffectsProps {
  isActive: boolean;
  type: 'order' | 'bonus' | 'target' | 'daily';
  onComplete?: () => void;
}

export const CelebrationEffects = ({ isActive, type, onComplete }: CelebrationEffectsProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; icon: React.ReactNode; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        icon: getIconForType(type),
        delay: Math.random() * 0.5
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, type, onComplete]);

  const getIconForType = (celebrationType: string) => {
    switch (celebrationType) {
      case 'order': return <Star className="w-5 h-5 text-amber-500" />;
      case 'bonus': return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case 'target': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'daily': return <Heart className="w-5 h-5 text-rose-500" />;
      default: return <Star className="w-5 h-5 text-amber-500" />;
    }
  };

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        >
          <div className="animate-pulse">
            {particle.icon}
          </div>
        </div>
      ))}
      
      {/* Subtle confetti overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 via-transparent to-emerald-100/30 animate-pulse" />
    </div>
  );
};
