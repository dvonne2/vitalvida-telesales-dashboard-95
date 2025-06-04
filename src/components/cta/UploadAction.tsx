
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { InteractiveButton } from '../InteractiveButton';
import { ActionStatus, logAction } from '../../utils/ctaUtils';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface UploadActionProps {
  status: ActionStatus;
  disabled: boolean;
  orderId: string;
  countdown?: string;
  onUpdateStatus: (status: ActionStatus) => void;
  onDisableButton: () => void;
  onShowWhisper: (type: string | null) => void;
  onActionComplete: (action: string, orderId: string) => void;
}

export const UploadAction = ({
  status,
  disabled,
  orderId,
  countdown,
  onUpdateStatus,
  onDisableButton,
  onShowWhisper,
  onActionComplete
}: UploadActionProps) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { playSound } = useSoundEffects();

  const isCountdownActive = countdown === "NOW!";

  const handleUploadProof = () => {
    if (disabled) return;
    
    setShowUploadModal(true);
    onShowWhisper('upload');
    playSound('alert_ping');
    
    setTimeout(() => onShowWhisper(null), 5000);
  };

  const handleUploadComplete = () => {
    setShowUploadModal(false);
    onUpdateStatus('completed');
    onDisableButton();
    playSound('camera_shutter');
    logAction('🎙️ CALL RECORDING PROOF UPLOADED', orderId, onActionComplete);
    
    alert('🎉 Call recording proof uploaded! Your bonus is secured!');
  };

  return (
    <>
      <ActionButton
        title="🎙️ UPLOAD CALL RECORDING PROOF"
        icon={Upload}
        iconColor="text-green-600"
        status={status}
        onClick={handleUploadProof}
        disabled={disabled}
        buttonText="📤 Upload Recording Proof"
        completedText="✅ Recording Proof Uploaded"
        variant="success"
        countdown={countdown}
        isCountdownActive={isCountdownActive}
        whisperMessage={isCountdownActive ? "NO RECORDING PROOF = NO PAY! Upload NOW!" : undefined}
      />

      {/* Upload Modal for Call Recording Proof */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-600">🎙️ URGENT: Upload Call Recording Proof</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-600 text-white rounded-lg p-3 text-sm font-bold">
                ⚠️ NO RECORDING PROOF = NO PAY! Upload evidence that you made this call.
              </div>
              
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm">
                <p className="font-semibold text-yellow-800">Required Proof Types:</p>
                <ul className="mt-1 text-yellow-700 text-xs">
                  <li>• Voice note of call conversation</li>
                  <li>• Screenshot of call duration/log</li>
                  <li>• Photo of phone showing call record</li>
                </ul>
              </div>
              
              <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center bg-red-50">
                <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-red-700">Upload Your Call Recording Proof</p>
                <p className="text-xs text-red-600 mt-1">Show that you actually made this call</p>
              </div>
              
              <div className="flex gap-2">
                <InteractiveButton
                  onClick={handleUploadComplete}
                  variant="success"
                  size="lg"
                  className="flex-1 font-bold"
                >
                  📤 UPLOAD PROOF & SECURE BONUS
                </InteractiveButton>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
