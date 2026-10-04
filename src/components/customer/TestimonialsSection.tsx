import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  role: string;
  rating: number;
  date: string;
  feedback: string;
  purchased: string;
  initials: string;
  avatarBg: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Tariq Al-Mansoor',
      location: 'Dubai Marina',
      role: 'Verified Customer',
      rating: 5,
      date: '2 weeks ago',
      feedback:
        'Dr. at AlNujoom conducted the most thorough eye test I’ve had in Dubai. My progressive lenses were fitted with surgical precision—no distortion or headaches from the very first hour!',
      purchased: 'Zeiss Progressive Digital Lenses + Lindberg Frame',
      initials: 'TA',
      avatarBg: 'bg-blue-600',
    },
    {
      name: 'Sarah Jenkins',
      location: 'Downtown Dubai',
      role: 'Verified Customer',
      rating: 5,
      date: '1 month ago',
      feedback:
        'As a software developer staring at multiple 4K monitors all day, their BlueGuard coating made an immediate difference. The eye strain and tension headaches are completely gone. Excellent service!',
      purchased: 'BlueGuard™ Anti-Fatigue Lenses + Ray-Ban Wayfarer',
      initials: 'SJ',
      avatarBg: 'bg-emerald-600',
    },
    {
      name: 'Mohammed Al-Hashimi',
      location: 'Jumeirah',
      role: 'Verified Customer',
      rating: 5,
      date: '3 weeks ago',
      feedback:
        'I needed prescription sunglasses before an international vacation. They cut and mounted the polarized lenses in under 24 hours. Genuine authentic designer frames and unbeatable customer aftercare.',
      purchased: 'Tom Ford Polarized Prescription Sunglasses',
      initials: 'MA',
      avatarBg: 'bg-amber-600',
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50/70 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative ambient orbs */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 text-navy-900 text-xs font-bold mb-4 shadow-soft-sm">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-navy-900">4.9 / 5.0 Rating</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-medium">1,280+ Verified Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            Loved by Over 15,000+{' '}
            <span className="text-brand-accent">Happy Eyes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            Read what our clients say about our clinical eye testing, designer frames, and lifetime optical aftercare in Dubai.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-soft-sm hover:shadow-soft-xl hover:border-navy-200 transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Header with Stars and Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Visit</span>
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "{item.feedback}"
                </p>
              </div>

              {/* Author & Purchase Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-soft-sm`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-navy-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {item.location} • <span className="text-slate-500">{item.date}</span>
                    </p>
                  </div>
                </div>

                {/* Purchased product pill */}
                <div className="mt-3 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-gray-100 truncate">
                  Purchased: <span className="text-navy-900 font-semibold">{item.purchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Assurance Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-soft-sm flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-navy-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Lifetime Free Frame Screw Adjustments & Ultrasonic Cleaning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-accent" />
            <span>100% Prescription Accuracy Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>Quick 1-on-1 Optician Assistance via WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
};
