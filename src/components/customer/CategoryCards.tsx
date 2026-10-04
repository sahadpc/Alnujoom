import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const { categories, products } = useShop();
  const activeCategories = categories.filter((c) => c.is_active);

  // Helper to count active products per category
  const getProductCount = (catId: string) => {
    return products.filter((p) => p.category_id === catId && p.is_active).length;
  };

  return (
    <section className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-accent mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>CURATED COLLECTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
              Explore by Eyewear Category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              From featherlight Japanese titanium to polarized fashion sunglasses and pediatric frames.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-navy-900 text-navy-900 hover:text-white border border-gray-200 text-sm font-bold transition-all duration-300 group shadow-soft-sm"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeCategories.map((category) => {
            const count = getProductCount(category.id);
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-slate-50 border border-gray-100 shadow-soft-sm hover:shadow-soft-xl hover:border-brand-accent/40 card-glow-hover transition-all duration-500 flex flex-col"
              >
                {/* Image container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-white bg-navy-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {count > 0 ? `${count}+ Styles` : 'Featured'}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-navy-900 group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-soft-md">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title overlay on bottom of image for punchy visual appeal */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold leading-tight text-white group-hover:text-amber-300 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-accent">
                    <span className="group-hover:underline">Explore {category.name} Catalog</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
