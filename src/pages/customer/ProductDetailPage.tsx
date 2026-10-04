import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { StockBadge } from '../../components/common/StockBadge';
import { Button } from '../../components/common/Button';
import { BookEyeTestModal } from '../../components/common/BookEyeTestModal';
import { ProductCard } from '../../components/customer/ProductCard';
import { formatCurrency, generateWhatsAppLink } from '../../lib/utils';
import {
  MessageCircle,
  Calendar,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  RotateCcw,
  Glasses,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, settings, showToast } = useShop();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      document.title = `${product.name} | AlNujoom Opticals`;
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-navy-800">
          <Glasses className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">
          The eyewear model you are looking for is no longer in our active catalog or has been moved.
        </p>
        <Link to="/products">
          <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to All Eyewear
          </Button>
        </Link>
      </div>
    );
  }

  // Pre-filled WhatsApp message as required by Section 12:
  // "Hello AlNujoom Opticals, I am interested in Ray-Ban RB3025."
  const whatsappMessage = `Hello AlNujoom Opticals, I am interested in ${product.brand} ${product.name} (SKU: ${product.sku}). Please let me know its availability and store trial options.`;
  const whatsappUrl = generateWhatsAppLink(settings.whatsapp_number, whatsappMessage);

  // Related products from same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.is_active && (p.category_id === product.category_id || p.brand === product.brand))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - AlNujoom Opticals`,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <>
      <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-navy-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-navy-900 transition-colors bg-white px-3 py-1.5 rounded-xl border border-gray-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Frame</span>
            </button>
          </div>

          {/* Product Detail Layout */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10">
              {/* Product Image Column */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-square max-w-lg rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-gray-100 p-6 sm:p-10 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[380px] transform hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <StockBadge quantity={product.stock_quantity} forCustomer={true} />
                  </div>
                  {product.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-900 text-white px-3 py-1 rounded-full shadow-soft-sm">
                        Featured Frame
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info & Purchase Column */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-blue-50 px-2.5 py-1 rounded-lg">
                      {product.brand}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">
                      SKU: <strong className="text-gray-700">{product.sku}</strong>
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {product.category_name || 'Eyewear'}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-snug">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-navy-900">
                      {formatCurrency(product.selling_price, settings.currency_symbol)}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Inclusive of In-Store Fitting
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Product Overview
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                      Frame & Lens Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block font-medium">Material</span>
                        <span className="font-semibold text-navy-900">
                          {product.specifications?.frame_material || 'Precision Alloy / Acetate'}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block font-medium">Shape</span>
                        <span className="font-semibold text-navy-900">
                          {product.specifications?.frame_shape || 'Classic Ergonomic'}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block font-medium">Lens Compatibility</span>
                        <span className="font-semibold text-navy-900">
                          {product.specifications?.prescription_ready !== false ? 'Prescription & BlueCut Ready' : 'Fashion / Non-Rx'}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block font-medium">Warranty</span>
                        <span className="font-semibold text-navy-900">
                          {product.specifications?.warranty || '1 Year Store Warranty'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion Buttons (WhatsApp Enquiry & Book Eye Test) */}
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-soft-md hover:shadow-glow transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setIsBookModalOpen(true)}
                      icon={<Calendar className="w-4 h-4 text-brand-accent" />}
                      className="w-full justify-center"
                    >
                      Book Eye Test with Frame
                    </Button>

                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border-2 border-gray-200 text-navy-900 font-semibold text-xs hover:border-navy-900 transition-colors"
                    >
                      <span>Call Store: {settings.phone}</span>
                    </a>
                  </div>

                  {/* Trust markers */}
                  <div className="pt-4 flex items-center justify-between text-[11px] text-gray-500 font-medium border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      100% Authentic Brand
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Free Ultrasonic Cleaning
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Free Store Try-on
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
