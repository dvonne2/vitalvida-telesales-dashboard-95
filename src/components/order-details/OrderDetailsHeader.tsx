
import React from 'react';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Eye } from 'lucide-react';

export const OrderDetailsHeader = () => {
  return (
    <DialogHeader className="pb-4">
      <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <Eye className="w-5 h-5 text-blue-600" />
        ORDER DETAILS
      </DialogTitle>
    </DialogHeader>
  );
};
