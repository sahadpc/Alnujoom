import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { ProductCard } from '../../components/customer/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Search,
  SlidersHorizontal,
  X,
  Glasses,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, categories, isLoading } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL search params if present
  const categoryParam = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest'>('featured');

  useEffect(() => {
    document.title = 'Eyewear Collections | AlNujoom Opticals';
    window.scrollTo(0, 0);
  }, []);

  // Update selectedCategory if URL search param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Extract unique brands for brand filter
  const brands = useMemo(() => {
    const list = products.filter((p) => p.is_active).map((p) => p.brand);
    return Array.from(new Set(list)).sort();
  }, [products]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.is_active);

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const catObj = categories.find((c) => c.slug === selectedCategory);
      if (catObj) {
        result = result.filter((p) => p.category_id === catObj.id);
      }
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Availability filter
    if (availabilityOnly) {
      result = result.filter((p) => p.stock_quantity > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.selling_price - b.selling_price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.selling_price - a.selling_price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort(
          (a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, categories, searchQuery, selectedCategory, selectedBrand, availabilityOnly, sortBy]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setAvailabilityOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    availabilityOnly ||
    sortBy !== 'featured';

  return (
    <div className="bg-slate-50/40 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-1.5">
            Store Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Eyewear & Optical Collection
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl">
            Browse our range of designer eyeglasses, polarized sunglasses, computer frames, and prescription-ready lenses.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-soft-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by brand, frame model, style or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Category Quick Chips & In-Stock Toggle */}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-navy-900 text-white shadow-soft-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories
                .filter((c) => c.is_active)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-navy-900 text-white shadow-soft-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900 select-none">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="rounded text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-medium">
          <div>
            Showing <strong className="text-navy-900">{filteredProducts.length}</strong> products
            {selectedCategory !== 'all' && (
              <span>
                {' '}
                in <strong className="text-brand-accent capitalize">{selectedCategory.replace('-', ' ')}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Updated with live inventory status</span>
          </div>
        </div>

        {/* Content State */}
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner label="Loading eyewear collection..." size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={<Glasses className="w-8 h-8 text-navy-800" />}
            title="No Matching Eyewear Found"
            description="We couldn't find any optical frames matching your current filter criteria. Try adjusting your search term or reset all filters."
            actionLabel="Reset All Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
