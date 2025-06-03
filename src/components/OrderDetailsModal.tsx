
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Eye, Phone, Upload, Truck, DollarSign, Package, X } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface OrderDetails {
  orderId: string;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  product: string;
  quantity: string;
  discount: string;
  heardFrom: string;
  canDeliverToday: boolean;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

export const OrderDetailsModal = ({ isOpen, onClose, orderDetails }: OrderDetailsModalProps) => {
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const { playSound, playDialToneLoop, stopSound } = useSoundEffects();

  if (!orderDetails) return null;

  const handleCallNow = () => {
    setCurrentAction('calling');
    playDialToneLoop();
    
    // Log the action via global function
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('call', orderDetails.name, orderDetails.orderId);
    }
  };

  const handleUploadProof = () => {
    stopSound();
    setCurrentAction('uploading');
    playSound('success'); // Camera shutter sound
    
    // Log the action
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('upload', orderDetails.name, orderDetails.orderId);
    }
    
    setTimeout(() => {
      setCurrentAction(null);
      alert('📤 Voice note uploaded successfully!');
    }, 1500);
  };

  const handleAssignDA = () => {
    stopSound();
    setCurrentAction('assigning');
    playSound('success');
    
    // Log the action
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('assign_da', orderDetails.name, orderDetails.orderId);
    }
    
    setTimeout(() => {
      setCurrentAction(null);
      alert('🚚 Order assigned to DA successfully!');
    }, 1000);
  };

  const handlePaymentConfirmed = () => {
    stopSound();
    setCurrentAction('payment');
    playSound('cash_register'); // Cha-ching sound
    
    // Log the action
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('check_payment', orderDetails.name, orderDetails.orderId);
    }
    
    setTimeout(() => {
      setCurrentAction(null);
      alert('💰 Payment confirmed! Money dey come!');
    }, 1000);
  };

  const handleDeliveryOTP = () => {
    if (otpInput.length !== 4) {
      alert('Please enter the 4-digit OTP');
      return;
    }
    
    stopSound();
    setCurrentAction('delivered');
    playSound('celebration'); // "Delivered!" bell
    
    // Log the action
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('confirm_delivery', orderDetails.name, orderDetails.orderId);
    }
    
    setTimeout(() => {
      setCurrentAction(null);
      setOtpInput('');
      alert('📦 Delivery confirmed! Bonus unlocked! 🎉');
    }, 1000);
  };

  const handleClose = () => {
    stopSound();
    setCurrentAction(null);
    setOtpInput('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Eye className="w-5 h-5 text-blue-600" />
            ORDER DETAILS
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <span className="font-bold text-gray-900">Order #: {orderDetails.orderId}</span>
            </div>
            
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-lg">👤</span>
                <span><strong>Name:</strong> {orderDetails.name}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <span><strong>Address:</strong> {orderDetails.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span><strong>Phone 1:</strong> {orderDetails.phone1}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span><strong>Phone 2:</strong> {orderDetails.phone2}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-lg">📧</span>
                <span><strong>Email:</strong> {orderDetails.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">🎁</span>
                <span><strong>Product:</strong> {orderDetails.product}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">🔢</span>
                <span><strong>Quantity:</strong> {orderDetails.quantity}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">💸</span>
                <span><strong>Discount:</strong> {orderDetails.discount}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">🧠</span>
                <span><strong>Heard from:</strong> {orderDetails.heardFrom}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">🚚</span>
                <span><strong>Can deliver today:</strong> 
                  <span className={`ml-1 font-bold ${orderDetails.canDeliverToday ? 'text-green-600' : 'text-red-600'}`}>
                    {orderDetails.canDeliverToday ? 'YES' : 'NO'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-center">🟡 TAKE ACTION</h3>
            
            <InteractiveButton
              onClick={handleCallNow}
              variant="success"
              size="lg"
              className="w-full text-lg font-bold py-4"
              disabled={currentAction === 'calling'}
            >
              {currentAction === 'calling' ? (
                '📞 CALLING NOW... (STOP TO END)'
              ) : (
                '📞 CALL NOW'
              )}
            </InteractiveButton>

            <InteractiveButton
              onClick={handleUploadProof}
              variant="success"
              size="lg"
              className="w-full text-lg font-bold py-4"
              disabled={currentAction === 'uploading'}
            >
              {currentAction === 'uploading' ? (
                '🎙️ UPLOADING...'
              ) : (
                '🎙️ UPLOAD CALL PROOF'
              )}
            </InteractiveButton>

            <InteractiveButton
              onClick={handleAssignDA}
              variant="success"
              size="lg"
              className="w-full text-lg font-bold py-4"
              disabled={currentAction === 'assigning'}
            >
              {currentAction === 'assigning' ? (
                '🚚 ASSIGNING...'
              ) : (
                '🚚 ASSIGN TO DA'
              )}
            </InteractiveButton>

            <InteractiveButton
              onClick={handlePaymentConfirmed}
              variant="success"
              size="lg"
              className="w-full text-lg font-bold py-4"
              disabled={currentAction === 'payment'}
            >
              {currentAction === 'payment' ? (
                '💰 CONFIRMING...'
              ) : (
                '💰 PAYMENT CONFIRMED'
              )}
            </InteractiveButton>

            {/* OTP Input for Delivery */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.slice(0, 4))}
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg font-mono"
                maxLength={4}
              />
              <InteractiveButton
                onClick={handleDeliveryOTP}
                variant="success"
                size="lg"
                className="w-full text-lg font-bold py-4"
                disabled={currentAction === 'delivered' || otpInput.length !== 4}
              >
                {currentAction === 'delivered' ? (
                  '📦 CONFIRMING DELIVERY...'
                ) : (
                  '📦 DELIVERED (OTP VERIFIED)'
                )}
              </InteractiveButton>
            </div>
          </div>

          {/* Stop Call Button */}
          {currentAction === 'calling' && (
            <InteractiveButton
              onClick={() => {
                stopSound();
                setCurrentAction(null);
              }}
              variant="danger"
              size="lg"
              className="w-full text-lg font-bold py-4"
            >
              ✋ STOP CALL
            </InteractiveButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
