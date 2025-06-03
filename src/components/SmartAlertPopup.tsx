
import React, { useState, useEffect } from 'react';
import { Phone, Upload, Truck, DollarSign, Package, X, Clock } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { InteractiveButton } from './InteractiveButton';

interface SmartAlert {
  id: string;
  type: 'call' | 'upload' | 'assign_da' | 'payment' | 'delivery';
  customer: string;
  orderId: string;
  product?: string;
  triggerTime: Date;
  message: string;
  urgency: 'normal' | 'urgent' | 'critical';
}

interface SmartAlertPopupProps {
  alert: SmartAlert | null;
  onActionConfirmed: (alertType: SmartAlert['type'], customer: string, orderId: string) => void;
  onDismiss: () => void;
}

export const SmartAlertPopup = ({ alert, onActionConfirmed, onDismiss }: SmartAlertPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('');
  const { playSound, stopSound } = useSoundEffects();

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
      
      // Play appropriate sound based on alert type and urgency
      switch (alert.type) {
        case 'call':
          playSound(alert.urgency === 'critical' ? 'airhorn' : 'alert_ping');
          break;
        case 'upload':
          playSound('ticking');
          break;
        case 'assign_da':
          playSound('success');
          break;
        case 'payment':
          playSound('cash_register');
          break;
        case 'delivery':
          playSound('success');
          break;
      }

      // Update elapsed time
      const updateTime = () => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - alert.triggerTime.getTime()) / 1000 / 60);
        setTimeElapsed(`${elapsed} mins ago`);
      };
      
      updateTime();
      const timer = setInterval(updateTime, 60000);

      return () => clearInterval(timer);
    }
  }, [alert, playSound]);

  const handleActionClick = () => {
    if (!alert) return;
    
    // Stop the sound immediately
    stopSound();
    
    // Log the action via global function
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction(alert.type, alert.customer, alert.orderId);
    }
    
    // Notify parent component
    onActionConfirmed(alert.type, alert.customer, alert.orderId);
    
    // Close the popup
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const handleClose = () => {
    stopSound();
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!alert) return null;

  const getIcon = () => {
    switch (alert.type) {
      case 'call': return <Phone className="w-6 h-6 text-white animate-bounce" />;
      case 'upload': return <Upload className="w-6 h-6 text-white" />;
      case 'assign_da': return <Truck className="w-6 h-6 text-white" />;
      case 'payment': return <DollarSign className="w-6 h-6 text-white" />;
      case 'delivery': return <Package className="w-6 h-6 text-white" />;
    }
  };

  const getBgColor = () => {
    switch (alert.urgency) {
      case 'critical': return 'from-red-600 to-red-700';
      case 'urgent': return 'from-orange-600 to-red-600';
      case 'normal': return 'from-blue-600 to-indigo-700';
    }
  };

  const getActionText = () => {
    switch (alert.type) {
      case 'call': return '📞 I\'M CALLING NOW!';
      case 'upload': return '🎙️ I\'M UPLOADING NOW!';
      case 'assign_da': return '🚚 I\'M ASSIGNING NOW!';
      case 'payment': return '💰 I\'M CHECKING NOW!';
      case 'delivery': return '📦 I\'M CONFIRMING NOW!';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className={`bg-gradient-to-r ${getBgColor()} rounded-2xl p-6 text-white shadow-2xl max-w-md border border-white/20 relative overflow-hidden`}>
          
          {/* Pulsing background for urgent alerts */}
          {alert.urgency !== 'normal' && (
            <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
          )}
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getIcon()}
                <span className="text-2xl">⚡</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/70">{timeElapsed}</span>
                <button 
                  onClick={handleClose}
                  className="text-white/70 hover:text-white transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-center">SMART ALERT!</h2>
            <h3 className="text-2xl font-bold mb-4 text-center text-yellow-300">
              {alert.message}
            </h3>
            
            <div className={`rounded-lg p-4 mb-6 border ${
              alert.urgency === 'critical' 
                ? 'bg-red-700/40 border-red-400/50'
                : alert.urgency === 'urgent'
                ? 'bg-orange-700/40 border-orange-400/50' 
                : 'bg-blue-700/40 border-blue-400/50'
            }`}>
              <div className="text-center mb-2">
                <p className="font-semibold">Customer: {alert.customer}</p>
                <p className="text-sm opacity-90">Order #{alert.orderId}</p>
                {alert.product && <p className="text-xs opacity-80">{alert.product}</p>}
              </div>
              
              {alert.urgency === 'critical' && (
                <div className="bg-red-600/30 rounded p-2 mt-2 animate-pulse">
                  <p className="text-center text-sm font-bold">🚨 CRITICAL DELAY - SUPERVISOR ALERTED!</p>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <InteractiveButton
                onClick={handleActionClick}
                variant={alert.urgency === 'critical' ? 'danger' : 'success'}
                size="lg"
                className="w-full text-lg font-bold py-4"
              >
                {getActionText()}
              </InteractiveButton>
              
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-white/90 text-sm">
                  ⚡ Sound will stop when you click the button ⚡
                </p>
                <p className="text-white/70 text-xs mt-1">
                  🧾 Your action will be logged and tracked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
