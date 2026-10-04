import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { Product } from '../../types';
import { calculateStockStatus, formatCurrency } from '../../lib/utils';
import { StockBadge } from '../../components/common/StockBadge';
import { Button } from '../../components/common/Button';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { StockAdjustmentModal } from '../../components/admin/StockAdjustmentModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Boxes,
  Star,
  Eye,
  EyeOff,
  Filter,
  CheckCircle,
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, removeProduct, updateProduct } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Product Management | AlNujoom Opticals';
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);

      // Category
      const matchesCategory =
        selectedCategory === 'all' || p.category_id === selectedCategory;

      // Stock status
      const status = calculateStockStatus(p.stock_quantity, p.low_stock_threshold);
      const matchesStock =
        selectedStockStatus === 'all' || status === selectedStockStatus;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedStockStatus]);

  const handleToggleFeatured = async (product: Product) => {
    await updateProduct({
      ...product,
      is_featured: !product.is_featured,
    });
  };

  const handleToggleActive = async (product: Product) => {
    await updateProduct({
      ...product,
      is_active: !product.is_active,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await removeProduct(deletingProduct.id);
      setDeletingProduct(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Product Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage eyeglasses, sunglasses, lenses, catalog visibility, and pricing.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingProduct(null);
            setIsFormModalOpen(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Product
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft-sm grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <div className="md:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name, SKU, brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          >
            <option value="all">All Stock Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table (Desktop & Tablet) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Cost Price</th>
                <th className="px-6 py-4">Selling Price</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Featured</th>
                <th className="px-6 py-4 text-center">Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Product Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-navy-900 text-sm leading-tight">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          <strong className="text-brand-accent">{p.brand}</strong> • SKU:{' '}
                          <code className="text-gray-700 font-mono">{p.sku}</code>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {p.category_name || 'Eyewear'}
                    </span>
                  </td>

                  {/* Cost Price */}
                  <td className="px-6 py-4 font-mono font-medium text-gray-500">
                    {formatCurrency(p.purchase_price)}
                  </td>

                  {/* Selling Price */}
                  <td className="px-6 py-4 font-mono font-bold text-navy-900 text-sm">
                    {formatCurrency(p.selling_price)}
                  </td>

                  {/* Stock Quantity */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-navy-900 flex items-center gap-1.5">
                      <span>{p.stock_quantity} units</span>
                      <button
                        onClick={() => setAdjustingProduct(p)}
                        title="Quick Stock Adjustment"
                        className="text-gray-400 hover:text-navy-900 p-1 rounded-md hover:bg-gray-100"
                      >
                        <Boxes className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Alert at ≤ {p.low_stock_threshold}
                    </div>
                  </td>

                  {/* Stock Status Badge */}
                  <td className="px-6 py-4">
                    <StockBadge quantity={p.stock_quantity} threshold={p.low_stock_threshold} size="sm" />
                  </td>

                  {/* Featured Toggle */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      title={p.is_featured ? 'Remove from featured' : 'Make featured'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.is_featured
                          ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${p.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>

                  {/* Active Toggle */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(p)}
                      title={p.is_active ? 'Active on store' : 'Hidden from store'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.is_active
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsFormModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-navy-900 hover:bg-gray-100 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingProduct(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-xs">
            No products match the selected criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
      />

      {/* Quick Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={Boolean(adjustingProduct)}
        onClose={() => setAdjustingProduct(null)}
        product={adjustingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Optical Product?"
        message={`Are you sure you want to delete "${deletingProduct?.name}" (SKU: ${deletingProduct?.sku})? This action cannot be undone.`}
        confirmText="Yes, Delete Product"
      />
    </div>
  );
};
