
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
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
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
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, type, onComplete]);

  const getIconForType = (celebrationType: string) => {
    switch (celebrationType) {
      case 'order': return <Star className="w-6 h-6 text-yellow-400" />;
      case 'bonus': return <DollarSign className="w-6 h-6 text-green-400" />;
      case 'target': return <Zap className="w-6 h-6 text-blue-400" />;
      case 'daily': return <Heart className="w-6 h-6 text-red-400" />;
      default: return <Star className="w-6 h-6 text-yellow-400" />;
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
      
      {/* Confetti overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 via-transparent to-green-400/20 animate-pulse" />
    </div>
  );
};
