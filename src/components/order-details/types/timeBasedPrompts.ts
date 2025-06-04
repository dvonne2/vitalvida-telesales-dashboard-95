
export interface TimeBasedPromptsProps {
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

export interface TimeBasedPrompt {
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
  countdown?: string;
}
