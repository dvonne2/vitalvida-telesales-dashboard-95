
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Package, Clock, DollarSign, AlertCircle } from 'lucide-react';

export const OrdersInProgress = () => {
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5" />
            ORDERS IN PROGRESS - MOVE FAST! 🚨
          </h3>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{pendingOrders.length} PENDING</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">{completedOrders.length} CLOSED</span>
            </div>
          </div>
        </div>
        <p className="text-orange-100 text-sm mt-1">
          💰 Each pending order = Lost money! Call now! ⏰
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-600">Order ID</TableHead>
              <TableHead className="font-medium text-gray-600">Customer</TableHead>
              <TableHead className="font-medium text-gray-600">Product</TableHead>
              <TableHead className="font-medium text-gray-600">Assigned Time</TableHead>
              <TableHead className="font-medium text-gray-600">Call Time</TableHead>
              <TableHead className="font-medium text-gray-600">DA Assigned</TableHead>
              <TableHead className="font-medium text-gray-600">Payment Time</TableHead>
              <TableHead className="font-medium text-gray-600">Delivered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersInProgress.map((order) => (
              <TableRow 
                key={order.orderId} 
                className={`hover:bg-gray-50 ${order.status === "pending" ? "bg-red-50 border-l-4 border-red-500" : ""}`}
              >
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    {order.status === "pending" && <Clock className="w-4 h-4 text-red-500" />}
                    {order.orderId}
                  </div>
                </TableCell>
                <TableCell className={order.status === "pending" ? "font-semibold text-red-700" : "text-gray-700"}>
                  {order.customer}
                </TableCell>
                <TableCell className="text-gray-700">{order.product}</TableCell>
                <TableCell className="text-gray-700">{order.assignedTime}</TableCell>
                <TableCell className={order.callTime === "—" ? "text-red-600 font-bold" : "text-gray-700"}>
                  {order.callTime}
                </TableCell>
                <TableCell className={order.daAssigned === "—" ? "text-red-600 font-bold" : "text-gray-700"}>
                  {order.daAssigned}
                </TableCell>
                <TableCell className={order.paymentTime === "—" ? "text-red-600 font-bold" : "text-gray-700"}>
                  {order.paymentTime}
                </TableCell>
                <TableCell className={order.delivered === "—" ? "text-red-600 font-bold" : "text-gray-700"}>
                  {order.delivered}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {pendingOrders.length > 0 && (
        <div className="bg-red-50 border-t border-red-200 p-3">
          <div className="text-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
              🔥 {pendingOrders.length} ORDER(S) WAITING! CALL NOW! 🔥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
