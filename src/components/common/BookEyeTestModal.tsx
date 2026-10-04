import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { useShop } from '../../contexts/ShopContext';
import { generateWhatsAppLink } from '../../lib/utils';
import { Calendar, Clock, User, Phone, CheckCircle, MessageSquare } from 'lucide-react';

interface BookEyeTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookEyeTestModal: React.FC<BookEyeTestModalProps> = ({ isOpen, onClose }) => {
  const { settings, bookEyeTest } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: 'Morning (10:00 AM - 01:00 PM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    'Morning (10:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM)',
    'Evening (05:00 PM - 09:00 PM)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) return;

    setIsSubmitting(true);
    try {
      await bookEyeTest({
        customer_name: formData.name,
        customer_phone: formData.phone,
        preferred_date: formData.date,
        preferred_time: formData.timeSlot,
        notes: formData.notes,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const message = `Hello AlNujoom Opticals, I would like to book an Eye Test appointment.\n\nName: ${formData.name || 'Customer'}\nPhone: ${formData.phone || 'N/A'}\nPreferred Date: ${formData.date}\nTime Slot: ${formData.timeSlot}${formData.notes ? `\nNotes: ${formData.notes}` : ''}`;
    const link = generateWhatsAppLink(settings.whatsapp_number, message);
    window.open(link, '_blank');
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: 'Morning (10:00 AM - 01:00 PM)',
      notes: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Book a Professional Eye Test"
      description="Comprehensive visual acuity, refractive error, and eye wellness screening by licensed optometrists."
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-navy-900">Appointment Request Received!</h4>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Thank you, <strong className="text-navy-900">{formData.name}</strong>. Our optometrist team will contact you at <strong className="text-navy-900">{formData.phone}</strong> shortly to confirm your booking for <strong>{formData.date} ({formData.timeSlot})</strong>.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" onClick={handleWhatsAppBooking} icon={<MessageSquare className="w-4 h-4" />}>
              Open in WhatsApp
            </Button>
            <Button variant="outline" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <Input
            label="Full Name"
            placeholder="e.g. Tariq Mansoor"
            required
            leftIcon={<User className="w-4 h-4" />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Phone / Mobile Number"
            type="tel"
            placeholder="e.g. +971 50 123 4567"
            required
            leftIcon={<Phone className="w-4 h-4" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              leftIcon={<Calendar className="w-4 h-4" />}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
                Preferred Time Slot <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
              Specific Concerns or Vision Needs (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Computer eye strain, updating prescription, first time contact lenses..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
            />
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end items-center">
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 p-2"
            >
              <MessageSquare className="w-4 h-4" />
              Book Directly on WhatsApp
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button type="button" variant="ghost" onClick={resetAndClose} className="w-1/2 sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-1/2 sm:w-auto">
                Confirm Booking
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
