import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

interface Brand {
  name: string;
  tagline: string;
  badge?: string;
}

export const BrandTicker: React.FC = () => {
  const brands: Brand[] = [
    { name: 'RAY-BAN', tagline: 'Iconic Italian Heritage', badge: 'Best Seller' },
    { name: 'ZEISS', tagline: 'German Precision Optics', badge: 'Certified Lab' },
    { name: 'GUCCI', tagline: 'Luxury Milan Fashion' },
    { name: 'TOM FORD', tagline: 'Contemporary Haute Eyewear' },
    { name: 'OAKLEY', tagline: 'Prizm™ Sports Performance' },
    { name: 'PRADA', tagline: 'Milano High Fashion' },
    { name: 'ESSILOR', tagline: 'World Leader in Lenses', badge: 'Official Partner' },
    { name: 'SILHOUETTE', tagline: 'Austrian Titanium Ultralight' },
    { name: 'PERSOL', tagline: 'Handmade in Italy since 1917' },
    { name: 'BURBERRY', tagline: 'British Luxury Eyewear' },
    { name: 'CARTIER', tagline: 'Prestige Precious Eyewear' },
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...brands, ...brands];

  return (
    <div className="relative py-6 bg-navy-950 border-y border-navy-900 overflow-hidden text-white">
      {/* Subtle ambient light glows */}
      <div className="absolute -top-10 left-1/4 w-72 h-32 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top micro-badge */}
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wider uppercase text-[11px] text-slate-300">
            Authorized Genuine Optical Stockist
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 100% Authenticity Guaranteed
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> International Manufacturer Warranty
          </span>
        </div>
      </div>

      {/* Marquee Container with fade edge masks */}
      <div className="relative w-full overflow-hidden marquee-container">
        {/* Left and right edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max items-center animate-marquee marquee-track gap-8 sm:gap-12 py-2">
          {marqueeList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-navy-900/60 hover:bg-navy-900 border border-navy-800/80 hover:border-brand-accent/50 transition-all duration-300 cursor-default select-none shadow-soft-sm"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-widest text-slate-100 group-hover:text-white font-sans transition-colors">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {brand.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors tracking-tight">
                  {brand.tagline}
                </span>
              </div>
              <Sparkles className="w-3 h-3 text-slate-600 group-hover:text-brand-accent transition-colors ml-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
