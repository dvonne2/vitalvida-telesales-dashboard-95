
import React, { useState, useEffect } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { TimeBasedPromptsProps } from './types/timeBasedPrompts';
import { useActivePrompts } from './hooks/useActivePrompts';
import { PromptCard } from './components/PromptCard';

export const TimeBasedPrompts = ({ 
  orderAssignedTime, 
  orderId, 
  customerName, 
  actionStates,
  onPromptAction 
}: TimeBasedPromptsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { playSound } = useSoundEffects();
  
  const activePrompts = useActivePrompts(currentTime, orderAssignedTime, actionStates);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePromptAction = (prompt: any, action: string) => {
    playSound(prompt.soundType);
    onPromptAction(prompt.type, action);
    
    // Log the action with timestamp
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction(prompt.type, customerName, orderId);
    }
  };

  if (activePrompts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900 text-center flex items-center justify-center gap-2">
        ⏰ TIME-BASED PROMPTS
      </h3>
      
      {activePrompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onPromptAction={handlePromptAction}
        />
      ))}
    </div>
  );
};
