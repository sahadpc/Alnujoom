import React from 'react';
import { ShieldCheck, UserCheck, Tag, HeartHandshake, Sparkles, Check } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      title: 'Certified Genuine Eyewear',
      description:
        'Directly authorized retail partner for leading Italian and German designer houses. Each pair comes with certified international authenticity cards.',
      badge: '100% Genuine',
      points: ['Official Brand Warranty', 'Serialized Authenticity', 'Zero Counterfeits'],
      glowColor: 'group-hover:border-blue-300',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Licensed Clinical Optometrists',
      description:
        'Certified eye specialists conducting 12-point clinical examinations, pupillary distance alignment, and bespoke astigmatism axis corrections.',
      badge: 'Clinical Care',
      points: ['Computer Refraction', 'Bespoke PD Fitting', 'Pediatric & Adult'],
      glowColor: 'group-hover:border-emerald-300',
    },
    {
      icon: <Tag className="w-6 h-6 text-amber-600" />,
      title: 'Transparent Fair Pricing',
      description:
        'Direct wholesale frame sourcing allows us to offer luxury optical styles without designer boutique markups. Comprehensive quotes upfront.',
      badge: 'Best Value',
      points: ['Free In-Store Fitting', 'No Hidden Fees', 'Flexible Packages'],
      glowColor: 'group-hover:border-amber-300',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
      title: 'Lifetime Aftercare Service',
      description:
        'Your eyewear journey doesn’t end at checkout. Drop by anytime for free ultrasonic frame sanitation, nose pad replacements, and screw tightening.',
      badge: 'Dedicated Care',
      points: ['Ultrasonic Cleaning', 'Nose Pad Renewal', 'Temple Adjustments'],
      glowColor: 'group-hover:border-indigo-300',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-accent mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>THE ALNUJOOM STANDARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Why Dubai Chooses AlNujoom Opticals
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Uncompromising clinical standards combined with personalized luxury eyecare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-7 rounded-3xl bg-slate-50/60 hover:bg-white border border-gray-100 ${feature.glowColor} card-glow-hover flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Subtle top accent gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 p-3 rounded-2xl bg-white shadow-soft-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-soft-md transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900 bg-white px-2.5 py-1 rounded-full border border-gray-200/80 shadow-soft-sm">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-2.5 group-hover:text-brand-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {/* Feature bullet list */}
              <div className="pt-3 border-t border-gray-200/70 space-y-1.5 text-[11px] font-semibold text-slate-700">
                {feature.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
