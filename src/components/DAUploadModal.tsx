
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Upload, X, Truck, CheckCircle } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface DAUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  customerName: string;
  onUploadComplete: () => void;
}

export const DAUploadModal = ({ isOpen, onClose, orderId, customerName, onUploadComplete }: DAUploadModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playSound } = useSoundEffects();

  console.log('DAUploadModal render:', { isOpen, orderId, isUploading, isCompleted });

  const handleUpload = () => {
    console.log('DAUploadModal: Starting upload process');
    setIsUploading(true);
    playSound('whoosh');
    
    // Simulate upload process
    setTimeout(() => {
      console.log('DAUploadModal: Upload completed');
      setIsUploading(false);
      setIsCompleted(true);
      
      // Log the action
      if ((window as any).logAgentAction) {
        (window as any).logAgentAction('assign_da', customerName, orderId);
      }
      
      // Show success message
      setTimeout(() => {
        alert('✅ DA Proof Uploaded! Order dey move.');
        onUploadComplete();
        handleClose();
      }, 500);
    }, 1500);
  };

  const handleClose = () => {
    console.log('DAUploadModal: Closing modal');
    setIsUploading(false);
    setIsCompleted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full mx-4">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Truck className="w-5 h-5 text-purple-600" />
              🚚 Upload Proof of DA Assignment
            </DialogTitle>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-sm text-gray-600">
            Upload screenshot or document that shows order #{orderId} was assigned to a delivery agent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Whisper Coaching */}
          <div className="bg-blue-600 text-white rounded-lg p-3 text-sm font-medium">
            🧠 Fast DA = Fast delivery = Fast money.
          </div>

          {/* Instruction */}
          <div className="text-center text-gray-600 text-sm">
            Upload screenshot or doc that shows order was assigned to a delivery agent.
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            {isCompleted ? (
              <div className="space-y-3">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <div className="text-green-600 font-bold">✅ DA Proof Uploaded!</div>
                <div className="text-green-600 text-sm">Order dey move.</div>
              </div>
            ) : isUploading ? (
              <div className="space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <div className="text-purple-600 font-bold">🚚 Uploading...</div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 font-medium">Choose file to upload</p>
                  <p className="text-gray-500 text-xs mt-1">JPG, PNG, PDF, MP3 - Max 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isCompleted && (
            <div className="space-y-2">
              <InteractiveButton
                onClick={handleUpload}
                variant="success"
                size="lg"
                disabled={isUploading}
                className="w-full text-lg font-bold py-4"
              >
                {isUploading ? '🚚 Uploading...' : '📤 Upload Proof'}
              </InteractiveButton>
              
              <button
                onClick={handleClose}
                disabled={isUploading}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
