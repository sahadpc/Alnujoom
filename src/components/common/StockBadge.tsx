import React from 'react';
import { calculateStockStatus } from '../../lib/utils';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StockBadgeProps {
  quantity: number;
  threshold?: number;
  forCustomer?: boolean;
  size?: 'sm' | 'md';
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity,
  threshold = 5,
  forCustomer = false,
  size = 'md',
}) => {
  if (forCustomer) {
    const isAvailable = quantity > 0;
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs'
        } ${
          isAvailable
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
          }`}
        />
        {isAvailable ? 'In Stock' : 'Currently Unavailable'}
      </span>
    );
  }

  const status = calculateStockStatus(quantity, threshold);

  const config = {
    'In Stock': {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      dot: 'bg-emerald-500',
    },
    'Low Stock': {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
      dot: 'bg-amber-500',
    },
    'Out of Stock': {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
      dot: 'bg-rose-500',
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};
