import React, { useState } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { generateWhatsAppLink } from '../../lib/utils';
import { MessageCircle, Phone, Calendar, X } from 'lucide-react';
import { BookEyeTestModal } from './BookEyeTestModal';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useShop();
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const defaultMessage = 'Hello AlNujoom Opticals, I would like to know more about your products.';
  const whatsappUrl = generateWhatsAppLink(settings.whatsapp_number, defaultMessage);
  const phoneCallUrl = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <>
      {/* Mobile Sticky Quick Action Bar (Bottom of screen on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-between gap-2 shadow-soft-xl">
        <a
          href={phoneCallUrl}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-50 text-navy-900 font-semibold text-xs border border-navy-200 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-navy-800" />
          <span>Call Store</span>
        </a>

        <button
          onClick={() => setIsTestModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-900 text-white font-semibold text-xs shadow-soft-sm active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Eye Test</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-soft-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2 group">
        {isTooltipOpen && (
          <div className="bg-white text-navy-900 text-xs font-semibold px-3 py-2 rounded-xl shadow-soft-lg border border-gray-100 flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Chat with our Optician on WhatsApp!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsTooltipOpen(false);
              }}
              className="text-gray-400 hover:text-navy-900"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3.5 rounded-full shadow-soft-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="font-semibold text-sm tracking-wide pr-1">WhatsApp Us</span>
        </a>
      </div>

      <BookEyeTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </>
  );
};
