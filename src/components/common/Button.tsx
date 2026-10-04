import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-900 shadow-soft-sm hover:shadow-soft-md',
    secondary: 'bg-brand-accent text-white hover:bg-blue-700 focus:ring-blue-600 shadow-soft-sm hover:shadow-glow',
    outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-50 focus:ring-navy-900 bg-transparent',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600 shadow-soft-sm',
    ghost: 'text-navy-700 hover:bg-navy-50 hover:text-navy-900 focus:ring-navy-400 bg-transparent',
    gold: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-soft-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
