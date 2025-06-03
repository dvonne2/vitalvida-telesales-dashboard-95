
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Package } from 'lucide-react';

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
      delivered: "12:18"
    },
    {
      orderId: "10056",
      customer: "Omololu A.",
      product: "Omega 3 Softgels",
      assignedTime: "08:00",
      callTime: "08:28",
      daAssigned: "08:48",
      paymentTime: "09:07",
      delivered: "11:14"
    },
    {
      orderId: "10055",
      customer: "Bayo T.",
      product: "Vitamin D Chews",
      assignedTime: "07:22",
      callTime: "07:38",
      daAssigned: "07:59",
      paymentTime: "08:16",
      delivered: "10:48"
    },
    {
      orderId: "10054",
      customer: "Biola A.",
      product: "Probiotic Capsules",
      assignedTime: "07:00",
      callTime: "07:20",
      daAssigned: "07:41",
      paymentTime: "08:01",
      delivered: "10:30"
    },
    {
      orderId: "10053",
      customer: "Chima R.",
      product: "Collagen Powder",
      assignedTime: "06:38",
      callTime: "06:53",
      daAssigned: "07:16",
      paymentTime: "07:30",
      delivered: "09:54"
    },
    {
      orderId: "10052",
      customer: "Kemi O.",
      product: "Electrolyte Drink",
      assignedTime: "06:01",
      callTime: "—",
      daAssigned: "—",
      paymentTime: "—",
      delivered: "—"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5" />
          ORDERS IN PROGRESS
        </h3>
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
              <TableRow key={order.orderId} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{order.orderId}</TableCell>
                <TableCell className="text-gray-700">{order.customer}</TableCell>
                <TableCell className="text-gray-700">{order.product}</TableCell>
                <TableCell className="text-gray-700">{order.assignedTime}</TableCell>
                <TableCell className="text-gray-700">{order.callTime}</TableCell>
                <TableCell className="text-gray-700">{order.daAssigned}</TableCell>
                <TableCell className="text-gray-700">{order.paymentTime}</TableCell>
                <TableCell className="text-gray-700">{order.delivered}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
