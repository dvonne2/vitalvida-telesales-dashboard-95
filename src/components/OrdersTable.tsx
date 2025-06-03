
import React, { useState } from 'react';
import { Clock, Phone, Truck, CheckCircle, Eye } from 'lucide-react';
import { OrderDetailsModal } from './OrderDetailsModal';

export const OrdersTable = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const orders = [
    {
      id: "VV001",
      customer: "Adunni Lagos",
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

  const getSelectedOrderDetails = () => {
    const order = orders.find(o => o.id === selectedOrderId);
    return order?.orderDetails || null;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📋 YOUR ORDERS TODAY
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.product}</div>
                      </div>
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">Assigned: {order.assignedTime}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {order.status === 'pending_call' && (
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call Now
                      </button>
                    )}
                    {order.status === 'delivering' && (
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        Track
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
