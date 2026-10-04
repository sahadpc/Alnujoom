import React, { useState, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { EyeTestBooking } from '../../types';
import { formatDateOnly, generateWhatsAppLink } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import {
  CalendarCheck,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Search,
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, settings } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    document.title = 'Eye Test Bookings | AlNujoom Opticals';
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.customer_name.toLowerCase().includes(q) ||
      b.customer_phone.toLowerCase().includes(q) ||
      (b.notes && b.notes.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: EyeTestBooking['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Pending':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse';
    }
  };

  const handleContactCustomer = (booking: EyeTestBooking) => {
    const msg = `Hello ${booking.customer_name}, this is AlNujoom Opticals regarding your requested Eye Test appointment on ${booking.preferred_date} (${booking.preferred_time}). We look forward to welcoming you at our showroom!`;
    const link = generateWhatsAppLink(booking.customer_phone, msg);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Eye Examination Appointments
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review customer consultation requests, confirm slots, and contact patients via WhatsApp.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft-sm grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        <div className="sm:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by customer name, phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Appointment Schedule</th>
                <th className="px-6 py-4">Customer Notes</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Contact</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-navy-900 text-sm flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{b.customer_name}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5 pl-6">
                      {b.customer_phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{b.preferred_date}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{b.preferred_time}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {b.notes || 'Routine checkup'}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleContactCustomer(b)}
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-colors border border-emerald-200 inline-flex items-center gap-1 text-xs font-semibold"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== 'Completed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                          className="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-xs">
            No eye test appointment bookings found. New requests from the public site will appear here.
          </div>
        )}
      </div>
    </div>
  );
};
