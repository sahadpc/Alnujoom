import React from 'react';
import {
  Sparkles,
  Stethoscope,
  Smile,
  ShieldCheck,
  Eye,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      num: '01',
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      title: '100% Guaranteed Authenticity',
      description:
        'All optical frames and lenses are sourced directly from authorized luxury manufacturers with certified serial numbers and international warranties.',
      tag: 'Original Stock',
    },
    {
      num: '02',
      icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
      title: 'Clinical Optometry Diagnosis',
      description:
        'Our licensed optometrists perform in-depth refractive evaluations, corneal curvatures, and digital pupil distance alignment using precision lab diagnostics.',
      tag: 'Certified Doctors',
    },
    {
      num: '03',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Haute Fashion & Minimalist Frames',
      description:
        'From featherweight Japanese titanium to handcrafted Italian acetate wayfarers, our curated collection reflects contemporary aesthetic elegance.',
      tag: '1,500+ Curated Styles',
    },
    {
      num: '04',
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      title: 'Precision German Lens Technologies',
      description:
        'Anti-reflective, anti-fatigue blue shield, ultra-thin high-index, and polarized coatings custom-cut in our in-house optical edging laboratory.',
      tag: 'In-House Edging Lab',
    },
    {
      num: '05',
      icon: <Sliders className="w-6 h-6 text-cyan-600" />,
      title: 'Fair & Transparent Pricing',
      description:
        'Direct relationship with optical lens labs eliminates unnecessary distributor margins. You receive luxury optical craftsmanship at fair, honest prices.',
      tag: 'Zero Hidden Costs',
    },
    {
      num: '06',
      icon: <Smile className="w-6 h-6 text-rose-500" />,
      title: 'Lifetime Complimentary Aftercare',
      description:
        'Enjoy lifetime complimentary ultrasonic deep cleaning, nose-pad replacements, and frame temple recalibration anytime you visit our showroom.',
      tag: 'Lifetime Free Care',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background subtle decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-accent mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>THE ALNUJOOM ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mt-1">
            Why Discerning Clients Choose AlNujoom
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
            We unite clinical optometry excellence with the personal warmth, attentiveness, and style guidance of your trusted luxury eyewear boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-slate-50/60 hover:bg-white border border-gray-100 hover:border-brand-accent/30 shadow-soft-sm card-glow-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Number watermark */}
              <div className="absolute top-6 right-6 text-3xl font-black text-gray-200/70 group-hover:text-brand-accent/20 transition-colors select-none font-mono">
                {reason.num}
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-soft-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-soft-md transition-all duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2.5 group-hover:text-brand-accent transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {reason.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between text-xs">
                <span className="font-bold text-navy-800 bg-white px-2.5 py-1 rounded-lg border border-gray-200/80 shadow-soft-sm text-[11px]">
                  {reason.tag}
                </span>
                <span className="text-brand-accent font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
