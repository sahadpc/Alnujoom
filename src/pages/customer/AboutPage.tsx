import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { BookEyeTestModal } from '../../components/common/BookEyeTestModal';
import {
  Glasses,
  Calendar,
  ShieldCheck,
  Award,
  Stethoscope,
  Eye,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'About Us | AlNujoom Opticals';
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: 'Clinical Precision',
      desc: 'Our optical examinations utilize digital autorefractors and slit-lamp biomicroscopes to ensure your prescription is measured with sub-millimeter precision.',
      icon: <Stethoscope className="w-6 h-6 text-brand-accent" />,
    },
    {
      title: 'Authentic Craftsmanship',
      desc: 'We never deal in replicas. Every single frame, screw, hinge, and ophthalmic lens in our showroom comes with genuine manufacturer warranty certification.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'Ergonomic Comfort',
      desc: 'Good vision is nothing without comfortable wear. We carefully calibrate bridge width, temple angle, and pantoscopic tilt so your glasses feel featherlight.',
      icon: <Eye className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Lifelong Vision Care',
      desc: 'We view every customer relationship as long-term. Visit us anytime for complimentary frame realignment, screw replacements, and ultrasonic hygiene cleans.',
      icon: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Our Story & Vision
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight mt-4 leading-tight">
                Dedicated to Clear Vision, Distinct Style, and Trusted Eye Care
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                Founded with a singular passion: to make world-class optical precision and luxury eyewear accessible, transparent, and welcoming for the entire community.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Visual Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="rounded-3xl overflow-hidden shadow-soft-xl border border-gray-100 bg-slate-100 aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80"
                    alt="AlNujoom Opticals Clinical Optometry Room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-navy-900 text-white p-5 rounded-2xl shadow-soft-lg max-w-xs">
                  <div className="text-2xl font-extrabold text-amber-300">15+ Years</div>
                  <div className="text-xs text-slate-300 font-medium">
                    Of optical expertise and community trust in Dubai.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  About AlNujoom Opticals
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                  Where Medical Science Meets Personal Style
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  At <strong>AlNujoom Opticals</strong>, we understand that eyewear is both a medical necessity and an expression of your individual personality. An incorrect lens angle can cause daily migraines, while the wrong frame shape can distort your facial harmony.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  That is why our optical boutique combines certified optometrists, precision computerised lens-edging laboratories, and an extensive catalog of handpicked international frames ranging from lightweight titanium to bold acetate wayfarers.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-navy-900 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>State-of-the-art digital eye examination suite</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-navy-900 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Fast turnaround prescription lens edging service</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-navy-900 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Authorized stockist for leading eyewear brands</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => setIsBookModalOpen(true)}
                    icon={<Calendar className="w-4 h-4 text-amber-100" />}
                  >
                    Schedule an Eye Test
                  </Button>
                  <Link to="/products">
                    <Button variant="outline" size="md">
                      Browse Frames
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars / Values Grid */}
        <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Our Core Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
                The Standards We Uphold Every Day
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft-sm hover:shadow-soft-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optometrist Promise Strip */}
        <section className="py-16 bg-navy-950 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 text-brand-accent flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-amber-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our 100% Optical Satisfaction Guarantee
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
              If your new prescription lenses require any adjustment or adaptation tolerance within 30 days of purchase, our optometrists will re-evaluate and swap them at zero extra cost.
            </p>
            <div className="pt-2">
              <Button
                variant="gold"
                size="md"
                onClick={() => setIsBookModalOpen(true)}
                icon={<Calendar className="w-4 h-4 text-amber-100" />}
              >
                Book Your Consultation Today
              </Button>
            </div>
          </div>
        </section>
      </div>

      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
