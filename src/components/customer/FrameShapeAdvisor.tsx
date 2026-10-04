import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Glasses, Smile, Zap } from 'lucide-react';

interface FaceShape {
  id: string;
  name: string;
  subtitle: string;
  iconLabel: string;
  bestFrames: string[];
  avoidFrames: string;
  description: string;
  stylistTip: string;
  recommendedCategory: string;
  sampleImg: string;
}

export const FrameShapeAdvisor: React.FC = () => {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('oval');

  const shapes: FaceShape[] = [
    {
      id: 'oval',
      name: 'Oval Face',
      subtitle: 'Naturally Balanced Proportions',
      iconLabel: '🥚',
      bestFrames: ['Aviator', 'Wayfarer', 'Geometric', 'Round Acetate'],
      avoidFrames: 'Oversized frames that cover brow lines',
      description:
        'Characterized by gently rounded curves with cheekbones slightly wider than the forehead and jaw. Your symmetrical proportions suit almost any frame silhouette.',
      stylistTip:
        'Choose frames that are as wide as the broadest part of your face to preserve natural balance.',
      recommendedCategory: 'eyeglasses',
      sampleImg:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'round',
      name: 'Round Face',
      subtitle: 'Soft Contours & Equal Width/Height',
      iconLabel: '⚪',
      bestFrames: ['Rectangular', 'Square Bold Frames', 'Cat-Eye', 'Browline'],
      avoidFrames: 'Small round or rimless circular frames',
      description:
        'Features soft, circular jawlines and cheeks of equal width and height. Angular, sharp geometric frames create flattering contrast and elongate the facial profile.',
      stylistTip:
        'Crisp rectangular silhouettes add structure and visually slim the cheeks.',
      recommendedCategory: 'eyeglasses',
      sampleImg:
        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'square',
      name: 'Square Face',
      subtitle: 'Strong Jawline & Broad Forehead',
      iconLabel: '⏹️',
      bestFrames: ['Round Titanium', 'Oval Wire', 'Pilot Eyewear', 'Curved Thin Rim'],
      avoidFrames: 'Sharp angular, boxy square shapes',
      description:
        'Defined by an imposing jawline, prominent cheekbones, and a broad forehead. Rounded, softer contours soften the angles and provide effortless sophistication.',
      stylistTip:
        'Opt for curved, thinner wire frames with subtle pastel or metallic finishes.',
      recommendedCategory: 'sunglasses',
      sampleImg:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'heart',
      name: 'Heart Face',
      subtitle: 'Broad Forehead & Delicate Tapered Chin',
      iconLabel: '🤍',
      bestFrames: ['Lightweight Aviator', 'Oval', 'Low-Bridge Round', 'Clear Acetate'],
      avoidFrames: 'Top-heavy decorative or dark thick browlines',
      description:
        'Wider at the brow with high cheekbones tapering smoothly down to a pointed chin. Bottom-heavy or crystal-clear acetate frames balance the lower facial half.',
      stylistTip:
        'Choose transparent crystal or light titanium frames that don’t overwhelm the temples.',
      recommendedCategory: 'eyeglasses',
      sampleImg:
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'diamond',
      name: 'Diamond Face',
      subtitle: 'High Dramatic Cheekbones',
      iconLabel: '💎',
      bestFrames: ['Cat-Eye', 'Oval Horn Rim', 'Rimless Semi', 'Soft Rectangular'],
      avoidFrames: 'Extremely narrow or flat-topped box frames',
      description:
        'The rarest facial geometry, highlighting dramatic, high cheekbones paired with a narrow forehead and chin. Cat-eye and delicate oval shapes accentuate your eyes.',
      stylistTip:
        'Frames with distinctive brow lines or cat-eye upsweeps draw natural focus to the eyes.',
      recommendedCategory: 'sunglasses',
      sampleImg:
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const currentShape = shapes.find((s) => s.id === selectedShapeId) || shapes[0];

  return (
    <section className="py-20 md:py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Subtle backdrop orbs */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-blue-200/60 text-brand-accent text-xs font-bold mb-3 shadow-soft-sm">
              <Glasses className="w-3.5 h-3.5" />
              <span>BESPOKE STYLING CONSULTATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Find the Perfect Frame for Your Face
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              Don’t guess your fit. Select your facial silhouette to discover curated frame styles scientifically matched by our optical consultants.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-gray-500 bg-slate-50 px-4 py-2 rounded-2xl border border-gray-200/80">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Over 1,500+ Designer Frames in Stock</span>
          </div>
        </div>

        {/* Face Shape Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {shapes.map((shape) => {
            const isSelected = shape.id === selectedShapeId;
            return (
              <button
                key={shape.id}
                onClick={() => setSelectedShapeId(shape.id)}
                className={`p-4 rounded-2xl text-center transition-all duration-300 relative border flex flex-col items-center group ${
                  isSelected
                    ? 'bg-navy-900 text-white border-navy-900 shadow-soft-lg -translate-y-1'
                    : 'bg-slate-50 hover:bg-white text-navy-900 border-gray-200/80 hover:border-navy-300 shadow-soft-sm'
                }`}
              >
                <div
                  className={`text-2xl mb-2 transition-transform duration-300 group-hover:scale-125 ${
                    isSelected ? 'scale-110' : ''
                  }`}
                >
                  {shape.iconLabel}
                </div>
                <span className="font-bold text-sm leading-tight block">
                  {shape.name}
                </span>
                <span
                  className={`text-[10px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-blue-200' : 'text-gray-400'
                  }`}
                >
                  {shape.subtitle}
                </span>
                {isSelected && (
                  <span className="absolute -bottom-1.5 w-3 h-3 bg-navy-900 rotate-45 transform" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Frame Shape Recommendation Card */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-accent">
                  Optical Stylist Analysis
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> High Match Accuracy
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Recommended for {currentShape.name}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {currentShape.description}
              </p>
            </div>

            {/* Recommended Frame Tags */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                Top Silhouette Matches:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentShape.bestFrames.map((frame, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-soft-sm text-xs font-bold text-navy-900"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{frame}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Stylist Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Optometrist's Advice:</span>
                <span>{currentShape.stylistTip}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/products?category=${currentShape.recommendedCategory}`}
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy-900 hover:bg-brand-accent text-white text-sm font-bold shadow-soft-md hover:shadow-soft-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>Browse Recommended Frames</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <span className="text-xs text-gray-400">
                Or visit our showroom for personal trial
              </span>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg border border-gray-200 aspect-[4/3] bg-slate-100 group">
              <img
                src={currentShape.sampleImg}
                alt={`${currentShape.name} Eyewear Styling`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Curated Match
                </span>
                <div className="text-base font-bold text-white leading-snug">
                  {currentShape.bestFrames[0]} & {currentShape.bestFrames[1]}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Available in store with custom prescription lenses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
