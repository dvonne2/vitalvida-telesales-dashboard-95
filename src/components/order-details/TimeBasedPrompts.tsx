
import React, { useState, useEffect } from 'react';
import { Clock, Phone, Upload, Truck, DollarSign, Shield } from 'lucide-react';
import { InteractiveButton } from '../InteractiveButton';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface TimeBasedPromptsProps {
  orderAssignedTime: Date;
  orderId: string;
  customerName: string;
  actionStates: {
    call: 'pending' | 'in-progress' | 'completed' | 'failed';
    upload: 'pending' | 'in-progress' | 'completed' | 'failed';
    assign: 'pending' | 'in-progress' | 'completed' | 'failed';
    payment: 'pending' | 'in-progress' | 'completed' | 'failed';
  };
  onPromptAction: (promptType: string, action: string) => void;
}

interface TimeBasedPrompt {
  id: string;
  type: 'call' | 'upload' | 'assign_da' | 'payment' | 'otp';
  title: string;
  icon: React.ComponentType<any>;
  triggerMinutes: number;
  repeatMinutes?: number;
  maxHours?: number;
  whisper: string;
  soundType: 'alert_ping' | 'success' | 'whoosh' | 'cash_register';
  isActive: boolean;
  timeRemaining?: string;
}

export const TimeBasedPrompts = ({ 
  orderAssignedTime, 
  orderId, 
  customerName, 
  actionStates,
  onPromptAction 
}: TimeBasedPromptsProps) => {
  const [activePrompts, setActivePrompts] = useState<TimeBasedPrompt[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { playSound } = useSoundEffects();

  const promptTemplates: Omit<TimeBasedPrompt, 'isActive' | 'timeRemaining'>[] = [
    {
      id: 'call',
      type: 'call',
      title: '📞 CALL NOW',
      icon: Phone,
      triggerMinutes: 10,
      whisper: 'Na now be the time o! Bonus dey ride this call.',
      soundType: 'alert_ping'
    },
    {
      id: 'upload',
      type: 'upload',
      title: '🎙️ UPLOAD CALL PROOF',
      icon: Upload,
      triggerMinutes: 15,
      whisper: 'No proof, no pay. Upload fast!',
      soundType: 'success'
    },
    {
      id: 'assign_da',
      type: 'assign_da',
      title: '🚚 UPLOAD PROOF OF DA ASSIGNMENT',
      icon: Truck,
      triggerMinutes: 20,
      whisper: 'Fast DA = fast bonus. You dey do well!',
      soundType: 'whoosh'
    },
    {
      id: 'payment',
      type: 'payment',
      title: '💰 UPLOAD PROOF OF PAYMENT',
      icon: DollarSign,
      triggerMinutes: 300, // 5 hours
      repeatMinutes: 60, // Every hour
      maxHours: 10,
      whisper: 'If dem don pay, confirm am sharp sharp.',
      soundType: 'cash_register'
    },
    {
      id: 'otp',
      type: 'otp',
      title: '🔐 UPLOAD OTP SCREENSHOT',
      icon: Shield,
      triggerMinutes: 330, // 5.5 hours
      repeatMinutes: 90, // Every 1.5 hours
      maxHours: 10,
      whisper: 'We need OTP to close matter. Upload before e late!',
      soundType: 'alert_ping'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = currentTime;
    const timeSinceAssigned = Math.floor((now.getTime() - orderAssignedTime.getTime()) / (1000 * 60)); // minutes
    const hoursSinceAssigned = timeSinceAssigned / 60;

    const newActivePrompts: TimeBasedPrompt[] = [];

    promptTemplates.forEach(template => {
      let shouldShow = false;
      let timeRemaining = '';

      // Check if prompt should be active based on timing and action state
      if (template.type === 'call' && actionStates.call === 'pending') {
        const timeToTrigger = template.triggerMinutes - timeSinceAssigned;
        if (timeToTrigger <= 0) {
          shouldShow = true;
        } else {
          timeRemaining = `${Math.ceil(timeToTrigger)} min remaining`;
        }
      } else if (template.type === 'upload' && actionStates.call === 'completed' && actionStates.upload === 'pending') {
        const timeToTrigger = template.triggerMinutes - timeSinceAssigned;
        if (timeToTrigger <= 0) {
          shouldShow = true;
        } else {
          timeRemaining = `${Math.ceil(timeToTrigger)} min remaining`;
        }
      } else if (template.type === 'assign_da' && actionStates.upload === 'completed' && actionStates.assign === 'pending') {
        const timeToTrigger = template.triggerMinutes - timeSinceAssigned;
        if (timeToTrigger <= 0) {
          shouldShow = true;
        } else {
          timeRemaining = `${Math.ceil(timeToTrigger)} min remaining`;
        }
      } else if (template.type === 'payment' && actionStates.assign === 'completed' && actionStates.payment === 'pending') {
        if (hoursSinceAssigned >= 5 && hoursSinceAssigned <= 10) {
          shouldShow = true;
        } else if (hoursSinceAssigned < 5) {
          const hoursRemaining = 5 - hoursSinceAssigned;
          timeRemaining = `${Math.ceil(hoursRemaining * 60)} min remaining`;
        }
      } else if (template.type === 'otp' && actionStates.assign === 'completed') {
        if (hoursSinceAssigned >= 5.5 && hoursSinceAssigned <= 10) {
          shouldShow = true;
        } else if (hoursSinceAssigned < 5.5) {
          const hoursRemaining = 5.5 - hoursSinceAssigned;
          timeRemaining = `${Math.ceil(hoursRemaining * 60)} min remaining`;
        }
      }

      if (shouldShow || timeRemaining) {
        newActivePrompts.push({
          ...template,
          isActive: shouldShow,
          timeRemaining
        });
      }
    });

    setActivePrompts(newActivePrompts);
  }, [currentTime, orderAssignedTime, actionStates]);

  const handlePromptAction = (prompt: TimeBasedPrompt, action: string) => {
    playSound(prompt.soundType);
    onPromptAction(prompt.type, action);
    
    // Log the action with timestamp
    if ((window as any).logAgentAction) {
      const actionText = `${prompt.title} - ${action}`;
      (window as any).logAgentAction(prompt.type, customerName, orderId);
    }
  };

  const formatTimeRemaining = (timeStr: string) => {
    if (timeStr.includes('min')) {
      return `⏰ ${timeStr}`;
    }
    return timeStr;
  };

  if (activePrompts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900 text-center flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        ⏰ TIME-BASED PROMPTS
      </h3>
      
      {activePrompts.map((prompt) => {
        const IconComponent = prompt.icon;
        
        return (
          <div 
            key={prompt.id}
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
              {prompt.timeRemaining && (
                <span className="text-xs text-gray-500 ml-auto">
                  {formatTimeRemaining(prompt.timeRemaining)}
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
                        onClick={() => handlePromptAction(prompt, 'Start Call')}
                        variant="success"
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        ✅ Start Call
                      </InteractiveButton>
                      <InteractiveButton
                        onClick={() => handlePromptAction(prompt, "Couldn't Reach")}
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
                      onClick={() => handlePromptAction(prompt, 'Upload Completed')}
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
      })}
    </div>
  );
};
