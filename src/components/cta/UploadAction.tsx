
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
    playSound('success');
    logAction('🎙️ CALL PROOF UPLOADED', orderId, onActionComplete);
    
    alert('🎉 Call proof uploaded! Bonus dey cook!');
  };

  return (
    <>
      <ActionButton
        title="🎙️ UPLOAD CALL PROOF"
        icon={Upload}
        iconColor="text-green-600"
        status={status}
        onClick={handleUploadProof}
        disabled={disabled}
        buttonText="📤 Upload Call Proof"
        completedText="✅ Call Proof Uploaded"
        variant="success"
        countdown={countdown}
        isCountdownActive={isCountdownActive}
        whisperMessage={isCountdownActive ? "No proof, no pay. Upload fast!" : undefined}
      />

      {/* Upload Modal for Call Proof */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">🎙️ Upload Call Recorded Proof</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-600 text-white rounded-lg p-3 text-sm font-medium">
                🧠 No proof, no pay. Upload fast make alert stop.
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload voice note or screenshot</p>
              </div>
              
              <div className="flex gap-2">
                <InteractiveButton
                  onClick={handleUploadComplete}
                  variant="success"
                  size="lg"
                  className="flex-1"
                >
                  📤 Upload & Confirm
                </InteractiveButton>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
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
