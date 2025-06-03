
import React, { useState, useEffect } from 'react';
import { Upload, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { InteractiveButton } from './InteractiveButton';

interface CallUploadPromptProps {
  customerName: string;
  orderId: string;
  onUploadCall: (onTime: boolean) => void;
  onDismiss: () => void;
}

export const CallUploadPrompt = ({ customerName, orderId, onUploadCall, onDismiss }: CallUploadPromptProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isLate, setIsLate] = useState(false);
  const { fadeDialTone, playSound } = useSoundEffects();

  useEffect(() => {
    setIsVisible(true);
    fadeDialTone(); // Fade the dial tone to low
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsLate(true);
          playSound('ticking'); // Start ticking sound when late
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [fadeDialTone, playSound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpload = (onTime: boolean) => {
    if (onTime) {
      playSound('cash_register');
    } else {
      playSound('ticking');
    }
    
    setIsVisible(false);
    setTimeout(() => {
      onUploadCall(onTime);
      onDismiss();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className={`bg-gradient-to-r ${isLate ? 'from-orange-600 to-red-700' : 'from-blue-600 to-indigo-700'} rounded-2xl p-6 text-white shadow-2xl max-w-md border border-white/20`}>
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-7 h-7 text-white" />
            <h2 className="text-xl font-bold">Upload Call Recording</h2>
            <Clock className="w-6 h-6 text-yellow-300" />
          </div>
          
          <div className="mb-4">
            <p className="text-lg mb-2">Call with <strong>{customerName}</strong> (#{orderId})</p>
            <div className={`text-center p-3 rounded-lg ${isLate ? 'bg-red-600/40' : 'bg-blue-600/40'}`}>
              <div className="text-2xl font-bold">
                {isLate ? '⏰ TIME UP!' : formatTime(timeLeft)}
              </div>
              <div className="text-sm">
                {isLate ? 'Upload late = No bonus' : 'Upload before time = Bonus!'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <InteractiveButton
              onClick={() => handleUpload(!isLate)}
              variant={isLate ? "warning" : "success"}
              size="lg"
              className="w-full text-lg font-bold py-3"
            >
              {isLate ? '📤 Upload Late (No Bonus)' : '📤 Upload Call & Earn Bonus! 💰'}
            </InteractiveButton>
            
            {isLate && (
              <div className="bg-orange-600/30 rounded-lg p-3 text-center">
                <p className="text-orange-200 text-sm">
                  ⏰ That one slow o. Try faster next one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
