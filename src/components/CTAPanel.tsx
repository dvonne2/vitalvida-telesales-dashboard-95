
import React, { useState, useEffect } from 'react';
import { Phone, Upload, Truck, DollarSign, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface CTAPanelProps {
  orderId: string;
  customerName: string;
  phone: string;
  product: string;
  onActionComplete: (action: string, orderId: string) => void;
}

type ActionStatus = 'pending' | 'completed' | 'failed';

interface ActionState {
  call: ActionStatus;
  upload: ActionStatus;
  assign: ActionStatus;
  payment: ActionStatus;
}

export const CTAPanel = ({ orderId, customerName, phone, product, onActionComplete }: CTAPanelProps) => {
  const [actionStates, setActionStates] = useState<ActionState>({
    call: 'pending',
    upload: 'pending',
    assign: 'pending',
    payment: 'pending'
  });
  
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [disabledButtons, setDisabledButtons] = useState<Set<string>>(new Set());
  const [showWhisper, setShowWhisper] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDADropdown, setShowDADropdown] = useState(false);
  const [showPaymentUpload, setShowPaymentUpload] = useState(false);
  
  const { playSound, playDialToneLoop, stopSound } = useSoundEffects();

  const updateActionStatus = (action: keyof ActionState, status: ActionStatus) => {
    setActionStates(prev => ({ ...prev, [action]: status }));
  };

  const disableButtonTemporarily = (action: string) => {
    setDisabledButtons(prev => new Set(prev).add(action));
    setTimeout(() => {
      setDisabledButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(action);
        return newSet;
      });
    }, 10000); // 10 seconds
  };

  const logAction = (actionText: string) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });
    
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('cta_action', `${actionText} for Order #${orderId} at ${timestamp}`, orderId);
    }
    
    onActionComplete(actionText, orderId);
  };

  const handleCallAction = () => {
    if (disabledButtons.has('call')) return;
    
    setActiveAction('call');
    playDialToneLoop(); // Start phone ring sound
    setShowWhisper('call');
    
    // Auto-hide whisper after 5 seconds
    setTimeout(() => setShowWhisper(null), 5000);
  };

  const handleStartCall = () => {
    stopSound();
    updateActionStatus('call', 'completed');
    disableButtonTemporarily('call');
    logAction('📞 CALL STARTED');
    setActiveAction(null);
    setShowWhisper(null);
  };

  const handleCouldntReach = () => {
    stopSound();
    updateActionStatus('call', 'failed');
    disableButtonTemporarily('call');
    logAction('📞 COULDN\'T REACH - Moved to Follow-Up');
    setActiveAction(null);
    setShowWhisper(null);
  };

  const handleUploadProof = () => {
    if (disabledButtons.has('upload')) return;
    
    setShowUploadModal(true);
    setShowWhisper('upload');
    playSound('alert_ping');
    
    setTimeout(() => setShowWhisper(null), 5000);
  };

  const handleUploadComplete = () => {
    setShowUploadModal(false);
    updateActionStatus('upload', 'completed');
    disableButtonTemporarily('upload');
    playSound('success');
    logAction('🎙️ PROOF UPLOADED');
    
    // Show success popup
    alert('🎉 Proof uploaded! Bonus dey cook!');
  };

  const handleAssignDA = () => {
    if (disabledButtons.has('assign')) return;
    
    setShowDADropdown(true);
    setShowWhisper('assign');
    playSound('alert_ping');
    
    setTimeout(() => setShowWhisper(null), 5000);
  };

  const handleDASelected = (daName: string) => {
    setShowDADropdown(false);
    updateActionStatus('assign', 'completed');
    disableButtonTemporarily('assign');
    playSound('success');
    logAction(`🚚 DA ${daName} ASSIGNED`);
  };

  const handlePaymentConfirmed = () => {
    if (disabledButtons.has('payment')) return;
    
    setShowPaymentUpload(true);
    setShowWhisper('payment');
    playSound('alert_ping');
    
    setTimeout(() => setShowWhisper(null), 5000);
  };

  const handlePaymentComplete = () => {
    setShowPaymentUpload(false);
    updateActionStatus('payment', 'completed');
    disableButtonTemporarily('payment');
    playSound('cash_register');
    logAction('💰 PAYMENT CONFIRMED');
  };

  const getStatusIcon = (status: ActionStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusEmoji = (status: ActionStatus) => {
    switch (status) {
      case 'completed': return '✅';
      case 'failed': return '🔴';
      default: return '⏳';
    }
  };

  const whisperMessages = {
    call: '🧠 Calls are randomly monitored. Use the script. Na your bonus dey ride this call.',
    upload: '🧠 No proof, no pay. Upload fast make alert stop.',
    assign: '🧠 Fast DA = fast delivery = fast bonus.',
    payment: '🧠 If them pay, your job na to prove am. Don\'t dull.'
  };

  const availableDAs = ['Samuel O.', 'Kemi A.', 'Chike N.', 'Bola M.', 'Tunde R.'];

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mt-3">
      {/* Whisper Coaching */}
      {showWhisper && (
        <div className="bg-blue-600 text-white rounded-lg p-3 mb-4 text-sm font-medium animate-pulse">
          {whisperMessages[showWhisper as keyof typeof whisperMessages]}
        </div>
      )}

      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        🎯 ACTION PANEL - Order #{orderId}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Call Action */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-sm">📞 CALL NOW</span>
              {getStatusIcon(actionStates.call)}
              <span className="text-lg">{getStatusEmoji(actionStates.call)}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 mb-2">
            📞 Call: {customerName} – {phone}
          </div>

          {activeAction === 'call' ? (
            <div className="space-y-2">
              <div className="bg-red-100 border border-red-300 rounded p-2 text-center">
                <div className="text-red-700 font-bold text-sm">📞 CALLING...</div>
                <div className="text-red-600 text-xs">Ring tone playing</div>
              </div>
              <div className="flex gap-2">
                <InteractiveButton
                  onClick={handleStartCall}
                  variant="success"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  ✅ Start Call
                </InteractiveButton>
                <InteractiveButton
                  onClick={handleCouldntReach}
                  variant="danger"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  ❌ Couldn't Reach
                </InteractiveButton>
              </div>
            </div>
          ) : (
            <InteractiveButton
              onClick={handleCallAction}
              variant="primary"
              size="sm"
              disabled={disabledButtons.has('call') || actionStates.call === 'completed'}
              className="w-full text-xs"
            >
              {actionStates.call === 'completed' ? '✅ Called' : '📞 Start Call'}
            </InteractiveButton>
          )}
        </div>

        {/* Upload Action */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-sm">🎙️ UPLOAD PROOF</span>
              {getStatusIcon(actionStates.upload)}
              <span className="text-lg">{getStatusEmoji(actionStates.upload)}</span>
            </div>
          </div>
          
          <InteractiveButton
            onClick={handleUploadProof}
            variant="success"
            size="sm"
            disabled={disabledButtons.has('upload') || actionStates.upload === 'completed'}
            className="w-full text-xs"
          >
            {actionStates.upload === 'completed' ? '✅ Uploaded' : '📤 Upload Proof'}
          </InteractiveButton>
        </div>

        {/* Assign DA Action */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-sm">🚚 ASSIGN DA</span>
              {getStatusIcon(actionStates.assign)}
              <span className="text-lg">{getStatusEmoji(actionStates.assign)}</span>
            </div>
          </div>
          
          {showDADropdown ? (
            <div className="space-y-1">
              {availableDAs.map((da) => (
                <button
                  key={da}
                  onClick={() => handleDASelected(da)}
                  className="w-full text-left px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                >
                  {da}
                </button>
              ))}
            </div>
          ) : (
            <InteractiveButton
              onClick={handleAssignDA}
              variant="primary"
              size="sm"
              disabled={disabledButtons.has('assign') || actionStates.assign === 'completed'}
              className="w-full text-xs"
            >
              {actionStates.assign === 'completed' ? '✅ Assigned' : '🚚 Assign DA'}
            </InteractiveButton>
          )}
        </div>

        {/* Payment Action */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-sm">💰 PAYMENT</span>
              {getStatusIcon(actionStates.payment)}
              <span className="text-lg">{getStatusEmoji(actionStates.payment)}</span>
            </div>
          </div>
          
          {showPaymentUpload ? (
            <div className="space-y-2">
              <div className="text-xs text-gray-600">Upload Moniepoint screenshot:</div>
              <div className="flex gap-2">
                <InteractiveButton
                  onClick={handlePaymentComplete}
                  variant="success"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  ✅ Confirm Paid
                </InteractiveButton>
                <button
                  onClick={() => setShowPaymentUpload(false)}
                  className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                >
                  ❌
                </button>
              </div>
            </div>
          ) : (
            <InteractiveButton
              onClick={handlePaymentConfirmed}
              variant="success"
              size="sm"
              disabled={disabledButtons.has('payment') || actionStates.payment === 'completed'}
              className="w-full text-xs"
            >
              {actionStates.payment === 'completed' ? '✅ Confirmed' : '💰 Confirm Payment'}
            </InteractiveButton>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">🎙️ Upload Call Proof</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
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
    </div>
  );
};
