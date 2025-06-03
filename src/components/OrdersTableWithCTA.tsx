
import React, { useState } from 'react';
import { Clock, Phone, Truck, CheckCircle, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderDetailsModal } from './OrderDetailsModal';
import { CTAPanel } from './CTAPanel';

export const OrdersTableWithCTA = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const orders = [
    {
      id: "VV001",
      customer: "Adunni Lagos",
      phone: "08123456789",
      product: "Family Save",
      assignedTime: "09:30",
      callTime: "09:37",
      daAssignedTime: "10:15",
      paymentTime: "10:45",
      deliveredTime: null,
      status: "delivering",
      orderDetails: {
        orderId: "VV001",
        name: "Adunni Lagos",
        address: "24 Victoria Island Road, Lagos Island, Lagos",
        phone1: "08123456789",
        phone2: "07012345678",
        email: "adunni.lagos@gmail.com",
        product: "Family Save Package",
        quantity: "1 unit",
        discount: "₦12,500",
        heardFrom: "TV Commercial",
        canDeliverToday: true
      }
    },
    {
      id: "VV002", 
      customer: "Kemi Abuja",
      phone: "08198765432",
      product: "Health Plus",
      assignedTime: "10:20",
      callTime: null,
      daAssignedTime: null,
      paymentTime: null,
      deliveredTime: null,
      status: "pending_call",
      orderDetails: {
        orderId: "VV002",
        name: "Kemi Abuja",
        address: "Plot 45, Wuse District, Abuja FCT",
        phone1: "08198765432",
        phone2: "07065432198",
        email: "kemi.abuja@yahoo.com",
        product: "Health Plus Bundle",
        quantity: "2 units",
        discount: "₦8,900",
        heardFrom: "Radio Ad",
        canDeliverToday: true
      }
    },
    {
      id: "VV003",
      customer: "Chike Onitsha",
      phone: "08154321098",
      product: "Vita Bundle",
      assignedTime: "08:45",
      callTime: "08:52",
      daAssignedTime: "09:30",
      paymentTime: "10:00",
      deliveredTime: "14:30",
      status: "delivered",
      orderDetails: {
        orderId: "VV003",
        name: "Chike Onitsha",
        address: "33 Upper Iweka Road, Onitsha, Anambra",
        phone1: "08154321098",
        phone2: "07043210987",
        email: "chike.onitsha@outlook.com",
        product: "Vita Bundle Complete",
        quantity: "1 unit",
        discount: "₦15,750",
        heardFrom: "Newspaper",
        canDeliverToday: false
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'delivering': return 'bg-yellow-500';
      case 'pending_call': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return '✅ Delivered';
      case 'delivering': return '🚚 Delivering';
      case 'pending_call': return '📞 Call Now!';
      default: return '⏳ Pending';
    }
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleCTAAction = (action: string, orderId: string) => {
    console.log(`CTA Action logged: ${action} for Order ${orderId}`);
    // This will be handled by the ActionTimestampTracker
  };

  const getSelectedOrderDetails = () => {
    const order = orders.find(o => o.id === selectedOrderId);
    return order?.orderDetails || null;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📋 YOUR ORDERS TODAY - WITH ACTION PANELS
          </h3>
          <p className="text-blue-100 text-sm mt-1">
            🎯 Complete all 4 actions for each order to maximize your bonus!
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="hover:bg-gray-50">
              {/* Order Summary Row */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {order.id}
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">{order.product}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">Assigned: {order.assignedTime}</div>
                    </div>
                    
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Panel - Expanded */}
              {expandedOrders.has(order.id) && (
                <div className="px-4 pb-4">
                  <CTAPanel
                    orderId={order.id}
                    customerName={order.customer}
                    phone={order.phone}
                    product={order.product}
                    onActionComplete={handleCTAAction}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions Footer */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 border-t">
          <div className="text-center">
            <p className="text-orange-800 font-semibold text-sm mb-1">
              🎯 CLICK ⬇️ ON ANY ORDER TO SHOW ACTION PANEL
            </p>
            <p className="text-orange-700 text-xs">
              Complete all 4 actions for maximum bonus: 📞 Call → 🎙️ Upload → 🚚 Assign → 💰 Payment
            </p>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        isOpen={selectedOrderId !== null}
        onClose={() => setSelectedOrderId(null)}
        orderDetails={getSelectedOrderDetails()}
      />
    </>
  );
};
