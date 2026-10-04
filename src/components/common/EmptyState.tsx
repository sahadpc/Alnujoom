import React from 'react';
import { Button } from './Button';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-soft-sm max-w-lg mx-auto my-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-navy-50 text-navy-800 mb-4">
        {icon || <PackageOpen className="w-8 h-8 text-navy-700" />}
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} icon={actionIcon} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
