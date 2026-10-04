import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { Button } from './Button';
import { BookEyeTestModal } from './BookEyeTestModal';
import {
  Menu,
  X,
  Phone,
  Glasses,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings } = useShop();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact & Store', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-navy-950 text-white text-xs py-2 px-4 border-b border-navy-900/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{settings.announcement_text || 'Complimentary Comprehensive Eye Test with any frame purchase!'}</span>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified Licensed Optometrists</span>
            </span>
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-amber-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft-md py-3.5 border-b border-gray-100'
            : 'bg-white py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-soft-sm group-hover:bg-brand-accent transition-colors duration-300">
              <Glasses className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-navy-900 font-sans leading-none">
                AlNujoom
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-accent leading-none mt-1">
                OPTICALS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'text-navy-900 bg-navy-50 font-bold'
                      : 'text-gray-600 hover:text-navy-900 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookModalOpen(true)}
              icon={<Calendar className="w-4 h-4 text-brand-accent" />}
              className="border-gray-200 hover:border-navy-900"
            >
              Book an Eye Test
            </Button>
            <Link to="/products">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Browse Frames
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-navy-50 text-navy-900 rounded-lg border border-navy-200"
            >
              Eye Test
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-navy-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-soft-xl animate-fade-in">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      active
                        ? 'bg-navy-900 text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-navy-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <Button
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookModalOpen(true);
                }}
                icon={<Calendar className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Book an Eye Test
              </Button>

              <div className="pt-2 text-center text-xs text-gray-500">
                Call Store: <strong className="text-navy-900">{settings.phone}</strong>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Booking Modal */}
      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
