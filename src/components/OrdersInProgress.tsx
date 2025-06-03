import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Package, Clock, DollarSign, AlertCircle, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const OrdersInProgress = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { playSound } = useSoundEffects();

  const ordersInProgress = [
    {
      orderId: "10057",
      customer: "Adam J.",
      product: "Multivitamin Pack",
      assignedTime: "09:36",
      callTime: "09:50",
      daAssigned: "10:11",
      paymentTime: "10:21",
      delivered: "12:18",
      status: "delivered",
      urgency: "low"
    },
    {
      orderId: "10056",
      customer: "Omololu A.",
      product: "Omega 3 Softgels",
      assignedTime: "08:00",
      callTime: "08:28",
      daAssigned: "08:48",
      paymentTime: "09:07",
      delivered: "11:14",
      status: "delivered",
      urgency: "low"
    },
    {
      orderId: "10055",
      customer: "Bayo T.",
      product: "Vitamin D Chews",
      assignedTime: "07:22",
      callTime: "07:38",
      daAssigned: "07:59",
      paymentTime: "08:16",
      delivered: "10:48",
      status: "delivered",
      urgency: "low"
    },
    {
      orderId: "10054",
      customer: "Biola A.",
      product: "Probiotic Capsules",
      assignedTime: "07:00",
      callTime: "07:20",
      daAssigned: "07:41",
      paymentTime: "08:01",
      delivered: "10:30",
      status: "delivered",
      urgency: "low"
    },
    {
      orderId: "10053",
      customer: "Chima R.",
      product: "Collagen Powder",
      assignedTime: "06:38",
      callTime: "06:53",
      daAssigned: "07:16",
      paymentTime: "07:30",
      delivered: "09:54",
      status: "delivered",
      urgency: "low"
    },
    {
      orderId: "10052",
      customer: "Kemi O.",
      product: "Electrolyte Drink",
      assignedTime: "06:01",
      callTime: "—",
      daAssigned: "—",
      paymentTime: "—",
      delivered: "—",
      status: "pending",
      urgency: "high"
    }
  ];

  const pendingOrders = ordersInProgress.filter(order => order.status === "pending");
  const completedOrders = ordersInProgress.filter(order => order.status === "delivered");

  const handleCallNow = (customerName: string) => {
    playSound('success');
    alert(`📞 Calling ${customerName} now! Money dey come! 💰`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Mobile-optimized header */}
      <div className={`p-3 sm:p-4 ${
        pendingOrders.length > 0 
          ? 'bg-gradient-to-r from-red-600 to-red-700'
          : 'bg-gradient-to-r from-green-600 to-green-700'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            {pendingOrders.length > 0 ? (
              <>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                🚨 PRESSURE DEY - {pendingOrders.length} ORDER(S) WAITING!
              </>
            ) : (
              <>
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                ✅ ALL ORDERS ON TRACK!
              </>
            )}
          </h3>
          <div className="flex items-center gap-2 sm:gap-4 text-white text-sm">
            <div className="flex items-center gap-1">
              <AlertCircle className={`w-3 h-3 sm:w-4 sm:h-4 ${
                pendingOrders.length > 0 ? 'text-yellow-300' : 'text-green-300'
              }`} />
              <span className="font-medium">
                {pendingOrders.length} PENDING
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-300" />
              <span className="font-medium">{completedOrders.length} DONE</span>
            </div>
          </div>
        </div>
        <p className="text-white text-xs sm:text-sm mt-1">
          {pendingOrders.length > 0 
            ? '🔥 Call now-now or money go run! ⏰'
            : '💰 You dey try! Keep the momentum going! 🚀'
          }
        </p>
        
        {/* Mobile expand/collapse button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="sm:hidden w-full mt-2 flex items-center justify-center gap-2 text-white text-sm font-medium"
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile-first table view */}
      <div className={`${!isExpanded ? 'hidden sm:block' : 'block'}`}>
        {/* Mobile card view */}
        <div className="sm:hidden space-y-3 p-3">
          {ordersInProgress.map((order) => (
            <div 
              key={order.orderId}
              className={`rounded-lg p-3 border-l-4 ${
                order.status === "pending" 
                  ? "bg-red-50 border-red-500"
                  : "bg-green-50 border-green-500"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {order.status === "pending" && (
                      <Clock className="w-4 h-4 text-red-500" />
                    )}
                    {order.orderId}
                  </div>
                  <div className={`font-semibold ${
                    order.status === "pending" ? "text-red-700" : "text-gray-700"
                  }`}>
                    {order.customer}
                  </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded ${
                  order.status === "pending" 
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}>
                  {order.status === "pending" ? "PENDING" : "DONE"}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">{order.product}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Assigned: {order.assignedTime}</div>
                <div>Call: {order.callTime}</div>
                <div>DA: {order.daAssigned}</div>
                <div>Payment: {order.paymentTime}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Order ID</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Customer</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Product</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Assigned</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Call Time</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">DA Assigned</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Payment</TableHead>
                <TableHead className="font-medium text-gray-900 text-xs lg:text-sm">Delivered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersInProgress.map((order) => (
                <TableRow 
                  key={order.orderId} 
                  className={`hover:bg-gray-50 ${
                    order.status === "pending" 
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "bg-green-50 border-l-4 border-green-500"
                  }`}
                >
                  <TableCell className="font-medium text-gray-900 text-xs lg:text-sm">
                    <div className="flex items-center gap-2">
                      {order.status === "pending" && (
                        <Clock className="w-4 h-4 text-red-500" />
                      )}
                      {order.orderId}
                    </div>
                  </TableCell>
                  <TableCell className={`text-xs lg:text-sm ${
                    order.status === "pending" 
                      ? "font-semibold text-red-700" 
                      : "text-gray-700"
                  }`}>
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-gray-700 text-xs lg:text-sm">{order.product}</TableCell>
                  <TableCell className="text-gray-700 text-xs lg:text-sm">{order.assignedTime}</TableCell>
                  <TableCell className={`text-xs lg:text-sm ${
                    order.callTime === "—" 
                      ? "text-red-700 font-bold"
                      : "text-gray-700"
                  }`}>
                    {order.callTime}
                  </TableCell>
                  <TableCell className={`text-xs lg:text-sm ${
                    order.daAssigned === "—" 
                      ? "text-red-700 font-bold" 
                      : "text-gray-700"
                  }`}>
                    {order.daAssigned}
                  </TableCell>
                  <TableCell className={`text-xs lg:text-sm ${
                    order.paymentTime === "—" 
                      ? "text-red-700 font-bold" 
                      : "text-gray-700"
                  }`}>
                    {order.paymentTime}
                  </TableCell>
                  <TableCell className={`text-xs lg:text-sm ${
                    order.delivered === "—" 
                      ? "text-red-700 font-bold" 
                      : "text-green-700 font-semibold"
                  }`}>
                    {order.delivered === "—" ? "PENDING" : order.delivered}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Mobile-optimized action sections */}
      {pendingOrders.length > 0 && (
        <div className="bg-red-50 border-t-4 border-red-500 p-3 sm:p-4">
          <div className="text-center space-y-3">
            <div className="bg-red-600 text-white px-3 py-2 rounded-full font-bold text-xs sm:text-sm inline-block">
              🔥 {pendingOrders.length} ORDER(S) DEY WAIT! CALL NOW-NOW! 🔥
            </div>
            <p className="text-red-800 text-xs sm:text-sm font-medium">
              💸 Every second = Lost money! No dull yourself!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              {pendingOrders.map((order) => (
                <InteractiveButton
                  key={order.orderId}
                  variant="danger"
                  size="sm"
                  onClick={() => handleCallNow(order.customer)}
                  className="text-xs sm:text-sm px-3 py-2 min-h-[44px]"
                >
                  📞 Call {order.customer} NOW!
                </InteractiveButton>
              ))}
            </div>
          </div>
        </div>
      )}

      {pendingOrders.length === 0 && (
        <div className="bg-green-50 border-t-4 border-green-500 p-3 text-center">
          <p className="text-green-800 font-semibold text-sm">
            ✅ All orders on track! You dey try! Keep the momentum! 🚀
          </p>
        </div>
      )}
    </div>
  );
};
