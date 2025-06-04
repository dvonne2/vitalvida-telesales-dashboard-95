
import React from 'react';

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

interface OrderInformationProps {
  orderDetails: OrderDetails;
}

export const OrderInformation = ({ orderDetails }: OrderInformationProps) => {
  return (
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
  );
};
