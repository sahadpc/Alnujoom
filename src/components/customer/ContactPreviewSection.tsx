import React from 'react';
import { useShop } from '../../contexts/ShopContext';
import { generateWhatsAppLink } from '../../lib/utils';
import { MapPin, Phone, MessageCircle, Clock, Mail, ExternalLink } from 'lucide-react';

export const ContactPreviewSection: React.FC = () => {
  const { settings } = useShop();

  const whatsappMessage = 'Hello AlNujoom Opticals, I would like to know more about your products and visit your store.';
  const whatsappUrl = generateWhatsAppLink(settings.whatsapp_number, whatsappMessage);

  return (
    <section className="py-16 md:py-20 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            Store Location & Hours
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-1">
            Visit Our Optical Showroom
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Conveniently located with dedicated customer parking and walk-in consultation availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address */}
            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Our Address
                </h4>
                <p className="text-sm font-semibold text-navy-900 leading-snug">
                  {settings.address}
                </p>
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Call Us
                  </h4>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-sm font-bold text-navy-900 hover:text-brand-accent transition-colors block"
                  >
                    {settings.phone}
                  </a>
                  <span className="text-[11px] text-gray-500">Fast assistance</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    WhatsApp
                  </h4>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-600 hover:underline block"
                  >
                    {settings.whatsapp_number}
                  </a>
                  <span className="text-[11px] text-gray-500">Instant chat</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Opening Hours
                </h4>
                <p className="text-sm font-semibold text-navy-900 leading-relaxed">
                  {settings.opening_hours}
                </p>
              </div>
            </div>

            {/* Email */}
            {settings.email && (
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-semibold text-navy-900 hover:text-brand-accent transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-7 h-full min-h-[360px] rounded-3xl overflow-hidden shadow-soft-md border border-gray-200 relative bg-slate-100">
            <iframe
              title="AlNujoom Opticals Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.28929971842!2d55.2428804684904!3d25.265742187317765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-gray-100 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-navy-900">AlNujoom Opticals Showroom</div>
                <div className="text-[11px] text-gray-500">Al Mina Road, Dubai</div>
              </div>
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-brand-accent transition-colors whitespace-nowrap"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
