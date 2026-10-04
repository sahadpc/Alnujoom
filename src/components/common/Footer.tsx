import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { generateWhatsAppLink } from '../../lib/utils';
import { BookEyeTestModal } from './BookEyeTestModal';
import {
  Glasses,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { settings } = useShop();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const whatsappUrl = generateWhatsAppLink(
    settings.whatsapp_number,
    'Hello AlNujoom Opticals, I would like to enquire about your optical products.'
  );

  return (
    <>
      <footer className="bg-navy-950 text-white pt-16 pb-24 md:pb-12 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-900">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center shadow-soft-sm">
                  <Glasses className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-white font-sans leading-none">
                    AlNujoom
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-blue-400 leading-none mt-1">
                    OPTICALS
                  </span>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Your premier destination for luxury prescription eyewear, UV-blocking sunglasses, precision vision testing, and certified optical care.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900 border border-navy-800 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  100% Authentic Brands
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900 border border-navy-800 text-slate-300">
                  Clinical Precision
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About AlNujoom
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact & Location
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Customer Services
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => setIsBookModalOpen(true)}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Book Eye Test
                  </button>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Enquiries
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    Call Us: {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Get Directions
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours & Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Store Hours
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">{settings.opening_hours}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">{settings.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 AlNujoom Opticals. All rights reserved.</p>

            <div className="flex items-center gap-6">
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Admin login discreet entry */}
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors py-1 px-2.5 rounded-md hover:bg-navy-900"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
