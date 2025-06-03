
import React, { useState, useEffect, useRef } from 'react';
import { SmartAlertPopup } from './SmartAlertPopup';

interface OrderData {
  id: string;
  customer: string;
  product: string;
  assignedTime: Date;
  status: {
    called: boolean;
    uploaded: boolean;
    assignedToDA: boolean;
    paymentChecked: boolean;
    delivered: boolean;
  };
  lastActionTimes: {
    call?: Date;
    upload?: Date;
    assign?: Date;
    payment?: Date;
    delivery?: Date;
  };
}

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

export const SmartAlertManager = () => {
  const [currentAlert, setCurrentAlert] = useState<SmartAlert | null>(null);
  const [orders] = useState<OrderData[]>([
    {
      id: '10058',
      customer: 'Kemi O.',
      product: 'Vitamin D Chews',
      assignedTime: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
      status: {
        called: false,
        uploaded: false,
        assignedToDA: false,
        paymentChecked: false,
        delivered: false
      },
      lastActionTimes: {}
    },
    {
      id: '10059',
      customer: 'Tunde A.',
      product: 'Immune Boost Pack',
      assignedTime: new Date(Date.now() - 45 * 60 * 1000), // 45 mins ago
      status: {
        called: true,
        uploaded: false,
        assignedToDA: false,
        paymentChecked: false,
        delivered: false
      },
      lastActionTimes: {
        call: new Date(Date.now() - 30 * 60 * 1000)
      }
    }
  ]);

  const alertQueue = useRef<SmartAlert[]>([]);
  const processedAlerts = useRef<Set<string>>(new Set());

  // Alert configuration based on your specification
  const alertConfig = {
    call: { delay: 10 * 60 * 1000, message: '📞 Call this customer NOW — time dey go o!', criticalDelay: 20 * 60 * 1000 },
    upload: { delay: 15 * 60 * 1000, message: '🎙️ Upload voice note now. You dey sharp? Show us.', criticalDelay: 30 * 60 * 1000 },
    assign_da: { delay: 20 * 60 * 1000, message: '🚚 Send this order to your DA. No dull am.', criticalDelay: 40 * 60 * 1000 },
    payment: { delay: 5 * 60 * 60 * 1000, message: '💰 Check for payment proof for this order.\nPayment no drop? Follow up sharp!', repeat: 60 * 60 * 1000, maxTime: 10 * 60 * 60 * 1000 },
    delivery: { delay: 5.5 * 60 * 60 * 1000, message: '📦 Ask for OTP — delivery fit don happen.\nConfirm delivery for bonus.', repeat: 1.5 * 60 * 60 * 1000, maxTime: 10 * 60 * 60 * 1000 }
  };

  const generateAlerts = () => {
    const now = new Date();
    const newAlerts: SmartAlert[] = [];

    orders.forEach(order => {
      const timeSinceAssigned = now.getTime() - order.assignedTime.getTime();
      
      // Call Alert
      if (!order.status.called) {
        const alertKey = `call-${order.id}`;
        if (timeSinceAssigned >= alertConfig.call.delay && !processedAlerts.current.has(alertKey)) {
          const urgency = timeSinceAssigned >= alertConfig.call.criticalDelay ? 'critical' : 'urgent';
          newAlerts.push({
            id: `call-${order.id}-${now.getTime()}`,
            type: 'call',
            customer: order.customer,
            orderId: order.id,
            product: order.product,
            triggerTime: now,
            message: alertConfig.call.message,
            urgency
          });
          processedAlerts.current.add(alertKey);
        }
      }

      // Upload Alert (only if called)
      if (order.status.called && !order.status.uploaded && order.lastActionTimes.call) {
        const timeSinceCall = now.getTime() - order.lastActionTimes.call.getTime();
        const alertKey = `upload-${order.id}`;
        if (timeSinceCall >= alertConfig.upload.delay && !processedAlerts.current.has(alertKey)) {
          const urgency = timeSinceCall >= alertConfig.upload.criticalDelay ? 'critical' : 'urgent';
          newAlerts.push({
            id: `upload-${order.id}-${now.getTime()}`,
            type: 'upload',
            customer: order.customer,
            orderId: order.id,
            triggerTime: now,
            message: alertConfig.upload.message,
            urgency
          });
          processedAlerts.current.add(alertKey);
        }
      }

      // DA Assignment Alert (only if uploaded)
      if (order.status.uploaded && !order.status.assignedToDA && order.lastActionTimes.upload) {
        const timeSinceUpload = now.getTime() - order.lastActionTimes.upload.getTime();
        const alertKey = `assign-${order.id}`;
        if (timeSinceUpload >= alertConfig.assign_da.delay && !processedAlerts.current.has(alertKey)) {
          const urgency = timeSinceUpload >= alertConfig.assign_da.criticalDelay ? 'critical' : 'normal';
          newAlerts.push({
            id: `assign-${order.id}-${now.getTime()}`,
            type: 'assign_da',
            customer: order.customer,
            orderId: order.id,
            triggerTime: now,
            message: alertConfig.assign_da.message,
            urgency
          });
          processedAlerts.current.add(alertKey);
        }
      }

      // Payment and Delivery alerts would follow similar patterns
      // For demo purposes, I'll add a simpler version
      if (order.status.assignedToDA && timeSinceAssigned >= alertConfig.payment.delay) {
        const alertKey = `payment-${order.id}-${Math.floor(timeSinceAssigned / alertConfig.payment.repeat!)}`;
        if (!processedAlerts.current.has(alertKey)) {
          newAlerts.push({
            id: `payment-${order.id}-${now.getTime()}`,
            type: 'payment',
            customer: order.customer,
            orderId: order.id,
            triggerTime: now,
            message: alertConfig.payment.message,
            urgency: 'normal'
          });
          processedAlerts.current.add(alertKey);
        }
      }
    });

    return newAlerts;
  };

  useEffect(() => {
    const checkAlerts = () => {
      if (currentAlert) return; // Don't generate new alerts if one is showing

      const newAlerts = generateAlerts();
      if (newAlerts.length > 0) {
        // Show the most urgent alert first
        const sortedAlerts = newAlerts.sort((a, b) => {
          const urgencyOrder = { critical: 3, urgent: 2, normal: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        });
        
        alertQueue.current.push(...sortedAlerts);
        
        if (!currentAlert && alertQueue.current.length > 0) {
          setCurrentAlert(alertQueue.current.shift()!);
        }
      }
    };

    const interval = setInterval(checkAlerts, 30000); // Check every 30 seconds
    checkAlerts(); // Initial check

    return () => clearInterval(interval);
  }, [currentAlert]);

  const handleActionConfirmed = (alertType: SmartAlert['type'], customer: string, orderId: string) => {
    console.log(`Action confirmed: ${alertType} for ${customer} (Order #${orderId})`);
    
    // Update order status based on action type
    // In a real app, this would update the backend
    
    setCurrentAlert(null);
    
    // Show next alert if any in queue
    setTimeout(() => {
      if (alertQueue.current.length > 0) {
        setCurrentAlert(alertQueue.current.shift()!);
      }
    }, 1000);
  };

  const handleDismiss = () => {
    setCurrentAlert(null);
    
    // Show next alert if any in queue after a delay
    setTimeout(() => {
      if (alertQueue.current.length > 0) {
        setCurrentAlert(alertQueue.current.shift()!);
      }
    }, 2000);
  };

  return (
    <SmartAlertPopup
      alert={currentAlert}
      onActionConfirmed={handleActionConfirmed}
      onDismiss={handleDismiss}
    />
  );
};
