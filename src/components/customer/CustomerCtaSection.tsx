import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { BookEyeTestModal } from '../common/BookEyeTestModal';
import { Calendar, PhoneCall, Sparkles, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { useShop } from '../../contexts/ShopContext';
import { generateWhatsAppLink } from '../../lib/utils';

export const CustomerCtaSection: React.FC = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const { settings } = useShop();

  const whatsappMessage =
    'Hello AlNujoom Opticals, I would like to book a consultation and visit your showroom.';
  const whatsappUrl = generateWhatsAppLink(settings.whatsapp_number, whatsappMessage);

  return (
    <>
      <section className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
        {/* Glow backdrop elements */}
        <div className="ambient-orb absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-accent/25 animate-pulse-glow" />
        <div className="ambient-orb absolute bottom-0 right-10 w-96 h-96 bg-amber-500/15 animate-float-slow" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/90 border border-navy-800 text-amber-300 text-xs font-bold mb-6 shadow-soft-md backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Elevate Your Daily Vision & Personal Style</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Ready to Find Your <span className="text-gradient-gold">Signature Pair</span>?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Experience bespoke eyecare in Dubai. Book a comprehensive clinical vision evaluation or walk right into our optical showroom today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={() => setIsBookModalOpen(true)}
              icon={<Calendar className="w-5 h-5 text-amber-950" />}
              className="w-full sm:w-auto shadow-glow-gold hover:shadow-soft-xl font-extrabold text-amber-950 text-base px-8 py-4"
            >
              Book Clinical Eye Test
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                icon={<MessageCircle className="w-5 h-5 text-emerald-400" />}
                className="w-full sm:w-auto border-slate-700 bg-navy-900/80 text-white hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all text-base px-7 py-4"
              >
                WhatsApp Direct Chat
              </Button>
            </a>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                icon={<PhoneCall className="w-4 h-4" />}
                className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-white hover:text-navy-950 hover:border-white transition-all text-base px-6 py-4"
              >
                Store Directions
              </Button>
            </Link>
          </div>

          {/* Quick pill stats */}
          <div className="mt-12 pt-8 border-t border-navy-900/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Walk-ins Welcome Daily 09:30 AM – 10:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Complimentary Eye Test with Frame Purchases</span>
            </div>
          </div>
        </div>
      </section>

      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
