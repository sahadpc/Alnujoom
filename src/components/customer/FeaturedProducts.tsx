import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { ProductCard } from './ProductCard';
import { Button } from '../common/Button';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, categories } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Active products
  const activeProducts = products.filter((p) => p.is_active);

  // Filter based on selected category tab
  const filteredList =
    selectedCategory === 'all'
      ? activeProducts
      : activeProducts.filter((p) => p.category_id === selectedCategory);

  // Take up to 6 products
  const displayList = filteredList.slice(0, 6);

  // Unique categories that have active products
  const availableCategories = categories.filter(
    (c) => c.is_active && activeProducts.some((p) => p.category_id === c.id)
  );

  return (
    <section className="py-20 md:py-24 bg-slate-50/70 border-t border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-accent mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>HANDPICKED SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
              Featured Eyewear Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              Authentic designer frames, luxury sunglasses, and computer lenses in stock for immediate fitting.
            </p>
          </div>

          <Link to="/products">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="bg-white border-gray-200 shadow-soft-sm hover:border-navy-900"
            >
              View All ({activeProducts.length} Items)
            </Button>
          </Link>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-navy-900 text-white border-navy-900 shadow-soft-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-slate-50'
            }`}
          >
            All Featured
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-navy-900 text-white border-navy-900 shadow-soft-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayList.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="shadow-soft-lg hover:shadow-soft-xl px-8"
            >
              Explore Complete Optical Catalog
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
