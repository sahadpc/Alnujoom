import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { StockBadge } from '../common/StockBadge';
import { formatCurrency, generateWhatsAppLink } from '../../lib/utils';
import { useShop } from '../../contexts/ShopContext';
import { MessageCircle, Eye, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { settings } = useShop();

  const isAvailable = product.stock_quantity > 0;
  const whatsappMessage = `Hello AlNujoom Opticals, I am interested in ${product.brand} - ${product.name} (SKU: ${product.sku}). Is it available in store?`;
  const whatsappUrl = generateWhatsAppLink(settings.whatsapp_number, whatsappMessage);

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-gray-100 hover:border-brand-accent/40 shadow-soft-sm card-glow-hover transition-all duration-300 overflow-hidden relative">
      {/* Top badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        <StockBadge quantity={product.stock_quantity} forCustomer={true} size="sm" />
        {product.is_featured && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-900 text-white px-2.5 py-1 rounded-full shadow-soft-sm">
            Featured
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block w-full aspect-[4/3] bg-gradient-to-b from-gray-50 to-white overflow-hidden p-4 group-hover:bg-slate-50 transition-colors"
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback optical glasses image if link is broken
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-navy-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white/95 text-navy-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-soft-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-brand-accent" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5 font-medium">
            <span className="uppercase tracking-wider font-semibold text-brand-accent">
              {product.brand}
            </span>
            <span>{product.category_name || 'Eyewear'}</span>
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="font-bold text-navy-900 text-base line-clamp-1 hover:text-brand-accent transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Price</span>
            <span className="text-base font-extrabold text-navy-900">
              {formatCurrency(product.selling_price, settings.currency_symbol)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp enquire */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-colors border border-emerald-200"
              title="Enquire on WhatsApp"
              aria-label={`Enquire on WhatsApp about ${product.name}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* View Details */}
            <Link
              to={`/products/${product.id}`}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-soft-sm transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
