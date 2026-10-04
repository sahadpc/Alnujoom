import React, { useState } from 'react';
import { Button } from '../common/Button';
import { BookEyeTestModal } from '../common/BookEyeTestModal';
import {
  Laptop,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface LensMode {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  description: string;
  badge: string;
  stats: { label: string; value: string }[];
  filterStyle: React.CSSProperties;
  unfilteredStyle: React.CSSProperties;
  badgeColor: string;
}

export const LensSimulatorSection: React.FC = () => {
  const [selectedModeId, setSelectedModeId] = useState<string>('blue-light');
  const [isLensApplied, setIsLensApplied] = useState<boolean>(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(55); // percentage for split slider

  const modes: LensMode[] = [
    {
      id: 'blue-light',
      name: 'BlueGuard™ Digital Filter',
      tagline: 'Ideal for Office, Computers & Smartphones',
      icon: <Laptop className="w-5 h-5" />,
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      description:
        'Selectively filters harmful 400–455nm high-energy blue-violet light emitted by digital screens, drastically cutting digital eye fatigue, headaches, and sleep disruption.',
      stats: [
        { label: 'Harmful Blue Cut', value: '99.4%' },
        { label: 'Eye Strain Relief', value: '85%' },
        { label: 'Clarity Index', value: '99.8%' },
      ],
      filterStyle: {
        filter: 'sepia(0.28) saturate(1.15) contrast(1.05) brightness(0.97)',
      },
      unfilteredStyle: {
        filter: 'none',
      },
    },
    {
      id: 'polarized',
      name: 'HD Polarized Shield',
      tagline: 'Precision for Driving & UAE Sunshine',
      icon: <Sun className="w-5 h-5" />,
      badge: 'High Performance',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      description:
        'Vertical polarizing filter eliminates blinding horizontal glare reflected off roads, car hoods, water, and desert sands. Enhances true-color depth perception and contrast.',
      stats: [
        { label: 'Blinding Glare Cut', value: '99.9%' },
        { label: 'UV400 Absorption', value: '100%' },
        { label: 'Contrast Boost', value: '+45%' },
      ],
      filterStyle: {
        filter: 'contrast(1.35) saturate(1.3) brightness(0.9)',
      },
      unfilteredStyle: {
        filter: 'contrast(0.9) brightness(1.2) blur(0.3px)',
      },
    },
    {
      id: 'photochromic',
      name: 'Transitions® Light Adaptive',
      tagline: 'Clear Indoors, Deep Tint Outdoors',
      icon: <Moon className="w-5 h-5" />,
      badge: 'Smart Adaptive',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      description:
        'Billions of photochromic molecules rapidly calibrate tint darkness within seconds depending on ambient UV exposure. One pair for both day and night.',
      stats: [
        { label: 'Indoor Clarity', value: '99.7%' },
        { label: 'Sunlight UV Tint', value: 'Category 3' },
        { label: 'Reaction Speed', value: '< 25 Sec' },
      ],
      filterStyle: {
        filter: 'brightness(0.68) contrast(1.12) sepia(0.25)',
      },
      unfilteredStyle: {
        filter: 'none',
      },
    },
    {
      id: 'anti-reflective',
      name: 'Diamond Anti-Reflective C-Coat',
      tagline: 'Flawless Transparency & Night Driving',
      icon: <Sparkles className="w-5 h-5" />,
      badge: 'Crystal Clear',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      description:
        'Nine nanometer layers of anti-reflective coating eliminate ghost reflections, halo rings around headlights during night driving, and provide 9H scratch resistance.',
      stats: [
        { label: 'Light Transmittance', value: '99.6%' },
        { label: 'Halo Glare Cut', value: '95%' },
        { label: 'Scratch Shield', value: '9H Diamond' },
      ],
      filterStyle: {
        filter: 'contrast(1.15) brightness(1.04) drop-shadow(0 0 1px rgba(255,255,255,0.2))',
      },
      unfilteredStyle: {
        filter: 'contrast(0.95) brightness(1.05) blur(0.5px)',
      },
    },
  ];

  const currentMode = modes.find((m) => m.id === selectedModeId) || modes[0];

  return (
    <>
      <section className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-navy-800 text-blue-300 text-xs font-semibold mb-4 shadow-soft-sm">
              <Layers className="w-3.5 h-3.5 text-brand-accent" />
              <span>INTERACTIVE OPTICAL LAB SIMULATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Experience the Vision Clarity{' '}
              <span className="text-gradient-gold">Before You Buy</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Explore how AlNujoom’s German-certified ophthalmic lens coatings transform your everyday visual comfort. Select a coating below to simulate real-time performance.
            </p>
          </div>

          {/* Interactive Mode Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {modes.map((mode) => {
              const active = mode.id === selectedModeId;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedModeId(mode.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 relative border ${
                    active
                      ? 'bg-navy-900 border-brand-accent/80 shadow-glow'
                      : 'bg-navy-900/50 border-navy-800/80 hover:bg-navy-900/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        active
                          ? 'bg-brand-accent text-white shadow-soft-sm'
                          : 'bg-navy-800 text-slate-400'
                      }`}
                    >
                      {mode.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${mode.badgeColor}`}
                    >
                      {mode.badge}
                    </span>
                  </div>
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${
                      active ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {mode.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {mode.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Main Visual Simulator Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-900/70 border border-navy-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-soft-xl">
            {/* Left: Interactive Visual Simulation Viewport */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-navy-950 border border-navy-700 shadow-soft-xl select-none group">
                {/* Background Test Imagery */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85"
                    alt="Vision Clarity Simulation"
                    className="w-full h-full object-cover transition-all duration-700"
                    style={isLensApplied ? currentMode.filterStyle : currentMode.unfilteredStyle}
                  />
                  {/* Subtle glare reflection overlay when lens is OFF */}
                  {!isLensApplied && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-blue-200/20 pointer-events-none mix-blend-screen" />
                  )}
                </div>

                {/* Glasses Optical Frame Silhouette Overlay to give realistic viewport */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
                  <div className="w-full h-full border-8 border-navy-950/80 rounded-2xl relative shadow-inner">
                    {/* Lens reflection sheen */}
                    <div className="absolute inset-0 lens-reflection opacity-40" />
                  </div>
                </div>

                {/* Top Interactive HUD Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <div className="flex items-center gap-2 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-navy-700 text-xs font-semibold">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLensApplied ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-slate-200">
                      {isLensApplied ? `Active: ${currentMode.name}` : 'Unprotected Standard Vision'}
                    </span>
                  </div>

                  <div className="bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-navy-700 text-xs font-bold text-amber-300">
                    Live Lens Simulation
                  </div>
                </div>

                {/* Bottom Toggle Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center z-20">
                  <div className="bg-navy-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-navy-700 flex items-center gap-1 shadow-soft-lg pointer-events-auto">
                    <button
                      onClick={() => setIsLensApplied(false)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        !isLensApplied
                          ? 'bg-rose-600 text-white shadow-soft-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Raw View (Without Lens)
                    </button>
                    <button
                      onClick={() => setIsLensApplied(true)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isLensApplied
                          ? 'bg-brand-accent text-white shadow-soft-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>AlNujoom Lens Applied</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick tip underneath */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brand-accent" />
                  Toggle between raw view and treated lens to see the instant clarity difference.
                </span>
                <span className="font-semibold text-emerald-400">German Quality Tested</span>
              </div>
            </div>

            {/* Right: Technical Optical Specifications & Booking */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  Clinical Lens Specifications
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {currentMode.name}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {currentMode.description}
                </p>
              </div>

              {/* Real-time Metric Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {currentMode.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-navy-950/80 border border-navy-800 text-center"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-white text-gradient-gold">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quality Assurances */}
              <div className="space-y-2 pt-2 border-t border-navy-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom calibrated to your clinical pupillary distance (PD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ultra-thin high index 1.60 / 1.67 / 1.74 available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Year comprehensive coating anti-peel warranty</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setIsBookModalOpen(true)}
                  icon={<Calendar className="w-4 h-4 text-amber-950" />}
                  className="w-full justify-center font-bold shadow-soft-lg"
                >
                  Consult an Optometrist
                </Button>
                <a
                  href={`https://wa.me/971501234567?text=${encodeURIComponent(
                    `Hello AlNujoom Opticals, I am interested in ordering lenses with the ${currentMode.name}. Could you advise on pricing and frame compatibility?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center border-slate-700 text-slate-200 hover:text-white hover:bg-navy-800"
                  >
                    WhatsApp Inquire
                  </Button>
                </a>
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
