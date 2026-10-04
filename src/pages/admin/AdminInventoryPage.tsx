import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { Product } from '../../types';
import { calculateStockStatus, formatDate } from '../../lib/utils';
import { StockBadge } from '../../components/common/StockBadge';
import { Button } from '../../components/common/Button';
import { StockAdjustmentModal } from '../../components/admin/StockAdjustmentModal';
import {
  Boxes,
  Search,
  AlertTriangle,
  History,
  CheckCircle2,
  XCircle,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminInventoryPage: React.FC = () => {
  const { products } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('all');
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.title = 'Inventory Management | AlNujoom Opticals';
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);

      const status = calculateStockStatus(p.stock_quantity, p.low_stock_threshold);
      const matchesStatus = selectedStatus === 'all' || status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [products, searchQuery, selectedStatus]);

  // Status summaries
  const inStockCount = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'In Stock'
  ).length;

  const lowStockCount = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'Low Stock'
  ).length;

  const outOfStockCount = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'Out of Stock'
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitor real-time warehouse counts, threshold indicators, and restock logs.
          </p>
        </div>

        <Link to="/admin/history">
          <Button
            variant="outline"
            size="sm"
            icon={<History className="w-4 h-4" />}
          >
            Audit Stock History
          </Button>
        </Link>
      </div>

      {/* Quick Status Cards / Filter Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedStatus(selectedStatus === 'In Stock' ? 'all' : 'In Stock')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'In Stock'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-white border-gray-100 hover:border-gray-200 shadow-soft-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Healthy Stock
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700">{inStockCount}</div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Above safety threshold</span>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'Low Stock' ? 'all' : 'Low Stock')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'Low Stock'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20'
              : 'bg-white border-gray-100 hover:border-gray-200 shadow-soft-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Low Stock Warning
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-700">{lowStockCount}</div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Needs replenishment</span>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'Out of Stock' ? 'all' : 'Out of Stock')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'Out of Stock'
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20'
              : 'bg-white border-gray-100 hover:border-gray-200 shadow-soft-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Out of Stock
            </span>
            <XCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-700">{outOfStockCount}</div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Zero units available</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search frame by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedStatus !== 'all' && (
            <button
              onClick={() => setSelectedStatus('all')}
              className="text-xs font-semibold text-navy-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
            >
              Clear Status Filter ({selectedStatus})
            </button>
          )}
          <span className="text-xs text-gray-400">
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Low Stock Threshold</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const status = calculateStockStatus(p.stock_quantity, p.low_stock_threshold);
                return (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      status === 'Out of Stock'
                        ? 'bg-rose-50/20 hover:bg-rose-50/40'
                        : status === 'Low Stock'
                        ? 'bg-amber-50/20 hover:bg-amber-50/40'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 p-0.5 flex items-center justify-center shrink-0">
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-navy-900 text-sm leading-tight">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {p.brand}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-6 py-4 font-mono font-medium text-gray-700">
                      {p.sku}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {p.category_name || 'Eyewear'}
                    </td>

                    {/* Current Stock */}
                    <td className="px-6 py-4">
                      <span className="font-extrabold text-navy-900 text-sm">
                        {p.stock_quantity}
                      </span>{' '}
                      <span className="text-[11px] text-gray-400">units</span>
                    </td>

                    {/* Low Stock Threshold */}
                    <td className="px-6 py-4 font-medium text-gray-500">
                      {p.low_stock_threshold} units
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StockBadge quantity={p.stock_quantity} threshold={p.low_stock_threshold} size="sm" />
                    </td>

                    {/* Last Updated */}
                    <td className="px-6 py-4 text-gray-400 text-[11px]">
                      {formatDate(p.updated_at || p.created_at)}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setAdjustingProduct(p)}
                        icon={<Boxes className="w-3.5 h-3.5" />}
                      >
                        Adjust Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-xs">
            No inventory records found.
          </div>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={Boolean(adjustingProduct)}
        onClose={() => setAdjustingProduct(null)}
        product={adjustingProduct}
      />
    </div>
  );
};
