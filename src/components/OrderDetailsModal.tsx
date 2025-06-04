
import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { CTAPanel } from './CTAPanel';
import { OrderDetailsHeader } from './order-details/OrderDetailsHeader';
import { OrderInformation } from './order-details/OrderInformation';
import { DeliveryConfirmation } from './order-details/DeliveryConfirmation';
import { StopCallButton } from './order-details/StopCallButton';

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
  const { stopSound } = useSoundEffects();

  if (!orderDetails) return null;

  const handleClose = () => {
    stopSound();
    setCurrentAction(null);
    onClose();
  };

  const handleActionComplete = (action: string, orderId: string) => {
    // Log the action completion
    if ((window as any).logAgentAction) {
      (window as any).logAgentAction('cta_action_complete', action, orderId);
    }
  };

  const handleDeliveryActionComplete = (action: string) => {
    stopSound();
    setCurrentAction(null);
  };

  const handleStopCall = () => {
    stopSound();
    setCurrentAction(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <OrderDetailsHeader />

        <div className="space-y-4">
          <OrderInformation orderDetails={orderDetails} />

          <CTAPanel
            orderId={orderDetails.orderId}
            customerName={orderDetails.name}
            phone={orderDetails.phone1}
            product={orderDetails.product}
            onActionComplete={handleActionComplete}
          />

          <DeliveryConfirmation
            orderId={orderDetails.orderId}
            customerName={orderDetails.name}
            currentAction={currentAction}
            onActionComplete={handleDeliveryActionComplete}
          />

          {currentAction === 'calling' && (
            <StopCallButton onStopCall={handleStopCall} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
