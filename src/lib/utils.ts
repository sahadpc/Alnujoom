import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StockStatus } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'AED'): string {
  try {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency || 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency || 'AED'} ${amount.toFixed(2)}`;
  }
}

export function calculateStockStatus(quantity: number, threshold: number): StockStatus {
  if (quantity <= 0) {
    return 'Out of Stock';
  }
  if (quantity <= threshold) {
    return 'Low Stock';
  }
  return 'In Stock';
}

export function formatCustomerStock(quantity: number): { label: string; inStock: boolean } {
  if (quantity > 0) {
    return { label: 'In Stock', inStock: true };
  }
  return { label: 'Currently Unavailable', inStock: false };
}

export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  // Strip non-numeric characters except leading plus if any, or normalize for wa.me
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateOnly(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
