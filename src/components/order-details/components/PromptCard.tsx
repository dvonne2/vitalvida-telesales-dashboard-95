
import React from 'react';
import { InteractiveButton } from '../../InteractiveButton';
import { TimeBasedPrompt } from '../types/timeBasedPrompts';

interface PromptCardProps {
  prompt: TimeBasedPrompt;
  onPromptAction: (prompt: TimeBasedPrompt, action: string) => void;
}

export const PromptCard = ({ prompt, onPromptAction }: PromptCardProps) => {
  const IconComponent = prompt.icon;
  
  return (
    <div 
      className={`border rounded-lg p-3 ${
        prompt.isActive 
          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 animate-pulse' 
          : 'bg-gray-50 border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className={`w-4 h-4 ${prompt.isActive ? 'text-red-600' : 'text-gray-500'}`} />
        <span className={`font-bold text-sm ${prompt.isActive ? 'text-red-700' : 'text-gray-600'}`}>
          {prompt.title}
        </span>
        {prompt.countdown && (
          <span className={`text-xs ml-auto font-mono ${
            prompt.isActive ? 'text-red-600 font-bold' : 'text-gray-500'
          }`}>
            {prompt.countdown}
          </span>
        )}
      </div>

      {prompt.isActive && (
        <>
          <div className="bg-blue-600 text-white rounded p-2 text-xs font-medium mb-2">
            💭 {prompt.whisper}
          </div>
          
          <div className="flex gap-2">
            {prompt.type === 'call' && (
              <>
                <InteractiveButton
                  onClick={() => onPromptAction(prompt, 'Start Call')}
                  variant="success"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  ✅ Start Call
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => onPromptAction(prompt, "Couldn't Reach")}
                  variant="danger"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  ❌ Couldn't Reach
                </InteractiveButton>
              </>
            )}
            
            {(prompt.type === 'upload' || prompt.type === 'assign_da' || prompt.type === 'payment' || prompt.type === 'otp') && (
              <InteractiveButton
                onClick={() => onPromptAction(prompt, 'Upload Completed')}
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                📤 Upload & Confirm
              </InteractiveButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};
