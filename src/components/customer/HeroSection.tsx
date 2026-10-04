import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { BookEyeTestModal } from '../common/BookEyeTestModal';
import {
  Glasses,
  Calendar,
  ShieldCheck,
  Award,
  ArrowRight,
  Eye,
  CheckCircle2,
  Sparkles,
  Zap,
  Star,
  MessageCircle,
} from 'lucide-react';

interface HeroFrameOption {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  tag: string;
  image: string;
  badgeText: string;
}

export const HeroSection: React.FC = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const frameOptions: HeroFrameOption[] = [
    {
      id: 'tortoise',
      name: 'Verona Italian Acetate',
      colorName: 'Havana Amber',
      colorHex: '#854d0e',
      tag: 'Flagship Edition',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      badgeText: 'Hand-Polished Japanese Titanium Hinges',
    },
    {
      id: 'black',
      name: 'AeroLight Titanium Rim',
      colorName: 'Midnight Matte',
      colorHex: '#0f172a',
      tag: 'Ultra-Featherweight (14g)',
      image:
        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
      badgeText: 'Laser-Etched Zero-Pressure Temples',
    },
    {
      id: 'gold',
      name: 'Royal Aviator Polarized',
      colorName: 'Brushed Champagne Gold',
      colorHex: '#d97706',
      tag: '100% UV400 Polarized',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
      badgeText: 'Zeiss Anti-Reflective Dual Coating',
    },
  ];

  const [activeFrame, setActiveFrame] = useState<HeroFrameOption>(frameOptions[0]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-14 md:py-20 lg:py-24 border-b border-gray-100">
        {/* Dynamic ambient background orbs with smooth pulse */}
        <div className="ambient-orb absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-200/40 animate-pulse-glow" />
        <div className="ambient-orb absolute bottom-0 left-10 w-80 h-80 bg-amber-100/50 animate-float-slow" />
        <div className="ambient-orb absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-100/30 animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge Pill with live beacon */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200/90 shadow-soft-sm text-navy-900 text-xs font-bold mx-auto lg:mx-0 group hover:border-brand-accent transition-colors">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-brand-accent font-extrabold tracking-wide uppercase">
                  AlNujoom Opticals Dubai
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 font-medium">Licensed Clinical Optometrists</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.12]">
                See the World with{' '}
                <span className="relative inline-block text-navy-900">
                  <span className="relative z-10 text-brand-accent">Uncompromised</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-blue-100/80 -z-0 rounded-sm -rotate-1" />
                </span>{' '}
                Clarity & Luxury
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Premium designer frames, precision German ophthalmic lenses, and comprehensive computer-guided eye evaluations. Crafted for your unique facial ergonomics and lifestyle.
              </p>

              {/* Key Bullet Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-xs font-bold text-navy-800">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Licensed Clinical Optometrists</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Genuine Designer Brands</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Same-Day Lens Mounting</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                {/* Prominent Eye Test CTA */}
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setIsBookModalOpen(true)}
                  icon={<Calendar className="w-5 h-5 text-amber-950" />}
                  className="w-full sm:w-auto shadow-soft-lg hover:shadow-soft-xl font-bold transform hover:-translate-y-0.5 transition-all text-amber-950"
                >
                  Book In-Store Eye Test
                </Button>

                {/* Primary Collection CTA */}
                <Link to="/products" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="w-full sm:w-auto shadow-soft-md hover:shadow-soft-lg"
                  >
                    Explore Frame Catalog
                  </Button>
                </Link>

                {/* Direct WhatsApp Quick Chat */}
                <a
                  href="https://wa.me/971501234567?text=Hello%20AlNujoom%20Opticals,%20I%20would%20like%20to%20know%20more%20about%20your%20available%20eyewear%20and%20lens%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<MessageCircle className="w-4 h-4 text-emerald-600" />}
                    className="w-full sm:w-auto border-gray-300 text-gray-700 hover:text-emerald-700 hover:border-emerald-500"
                  >
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* Social Proof / Stats Strip */}
              <div className="pt-6 border-t border-gray-200/70 grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    1,500+
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Frames in Stock</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    100%
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Prescription Match</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    15+
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Years in Dubai</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-accent tracking-tight">
                    &lt; 24h
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Lens Turnaround</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Column with Interactive Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring around the showcase card */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-accent via-amber-400 to-blue-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                {/* Main Card Frame */}
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-soft-xl border border-gray-100 p-3 sm:p-4">
                  {/* Image Display */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      key={activeFrame.id}
                      src={activeFrame.image}
                      alt={activeFrame.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700 animate-fade-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                    {/* Lens reflection highlight */}
                    <div className="absolute inset-0 lens-reflection pointer-events-none" />

                    {/* Card Bottom Meta */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-300 bg-navy-950/80 px-2 py-0.5 rounded-full border border-amber-300/30">
                          {activeFrame.tag}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          Color: {activeFrame.colorName}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold leading-tight text-white">
                        {activeFrame.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {activeFrame.badgeText}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Color/Style Switcher Bar */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-500">Preview Available Finishes:</span>
                    <div className="flex items-center gap-2">
                      {frameOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setActiveFrame(opt)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
                            activeFrame.id === opt.id
                              ? 'bg-navy-900 text-white border-navy-900 shadow-soft-sm'
                              : 'bg-slate-50 text-gray-600 border-gray-200 hover:bg-slate-100'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white"
                            style={{ backgroundColor: opt.colorHex }}
                          />
                          <span>{opt.colorName.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Optical Badge 1: Zeiss Lab Certified (Top Left) */}
                <div className="absolute -top-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-xl border border-gray-100 flex items-center gap-3 animate-float select-none">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center shadow-soft-sm">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-navy-900">Zeiss Optical Lab</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">Digital Pupil Calibration</div>
                  </div>
                </div>

                {/* Floating Optical Badge 2: Google Reviews Rating (Bottom Right) */}
                <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-xl border border-gray-100 flex items-center gap-3 animate-float-delayed select-none">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-soft-sm">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-navy-900">4.9 / 5.0 Star Rating</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold">1,280+ Verified Dubai Clients</div>
                  </div>
                </div>
              </div>
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
