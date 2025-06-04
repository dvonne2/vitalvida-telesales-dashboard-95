
import { Phone, Upload, Truck, DollarSign, Shield } from 'lucide-react';
import { TimeBasedPrompt } from '../types/timeBasedPrompts';

export const promptTemplates: Omit<TimeBasedPrompt, 'isActive' | 'countdown'>[] = [
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
