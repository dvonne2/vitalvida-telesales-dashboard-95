
import { useState, useEffect } from 'react';
import { TimeBasedPrompt, TimeBasedPromptsProps } from '../types/timeBasedPrompts';
import { promptTemplates } from '../constants/promptTemplates';
import { formatCountdown } from '../utils/timeUtils';

export const useActivePrompts = (
  currentTime: Date,
  orderAssignedTime: Date,
  actionStates: TimeBasedPromptsProps['actionStates']
) => {
  const [activePrompts, setActivePrompts] = useState<TimeBasedPrompt[]>([]);

  useEffect(() => {
    const now = currentTime;
    const timeSinceAssigned = Math.floor((now.getTime() - orderAssignedTime.getTime()) / (1000 * 60)); // minutes
    const hoursSinceAssigned = timeSinceAssigned / 60;

    const newActivePrompts: TimeBasedPrompt[] = [];

    promptTemplates.forEach(template => {
      let shouldShow = false;
      let countdown = '';

      // Check if prompt should be active based on timing and action state
      if (template.type === 'call' && actionStates.call === 'pending') {
        const secondsToTrigger = (template.triggerMinutes * 60) - (timeSinceAssigned * 60);
        shouldShow = true;
        countdown = formatCountdown(Math.max(0, secondsToTrigger));
      } else if (template.type === 'upload' && actionStates.call === 'completed' && actionStates.upload === 'pending') {
        const secondsToTrigger = (template.triggerMinutes * 60) - (timeSinceAssigned * 60);
        shouldShow = true;
        countdown = formatCountdown(Math.max(0, secondsToTrigger));
      } else if (template.type === 'assign_da' && actionStates.upload === 'completed' && actionStates.assign === 'pending') {
        const secondsToTrigger = (template.triggerMinutes * 60) - (timeSinceAssigned * 60);
        shouldShow = true;
        countdown = formatCountdown(Math.max(0, secondsToTrigger));
      } else if (template.type === 'payment' && actionStates.assign === 'completed' && actionStates.payment === 'pending') {
        if (hoursSinceAssigned <= 10) {
          const secondsToTrigger = (template.triggerMinutes * 60) - (timeSinceAssigned * 60);
          shouldShow = true;
          countdown = formatCountdown(Math.max(0, secondsToTrigger));
        }
      } else if (template.type === 'otp' && actionStates.assign === 'completed') {
        if (hoursSinceAssigned <= 10) {
          const secondsToTrigger = (template.triggerMinutes * 60) - (timeSinceAssigned * 60);
          shouldShow = true;
          countdown = formatCountdown(Math.max(0, secondsToTrigger));
        }
      }

      if (shouldShow) {
        newActivePrompts.push({
          ...template,
          isActive: countdown === "NOW!",
          countdown
        });
      }
    });

    setActivePrompts(newActivePrompts);
  }, [currentTime, orderAssignedTime, actionStates]);

  return activePrompts;
};
