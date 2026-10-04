import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { calculateStockStatus, formatCurrency, formatDate } from '../../lib/utils';
import { StockBadge } from '../../components/common/StockBadge';
import { Button } from '../../components/common/Button';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { StockAdjustmentModal } from '../../components/admin/StockAdjustmentModal';
import { Product } from '../../types';
import {
  Glasses,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  History,
  Layers,
  ArrowUpRight,
  RefreshCw,
  FolderTree,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, categories, movements, settings, refreshData } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductForStock, setSelectedProductForStock] = useState<Product | null>(null);

  useEffect(() => {
    document.title = 'Admin Dashboard | AlNujoom Opticals';
  }, []);

  // Compute metrics
  const totalProducts = products.length;
  const inStockCount = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'In Stock'
  ).length;

  const lowStockProducts = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'Low Stock'
  );

  const outOfStockProducts = products.filter(
    (p) => calculateStockStatus(p.stock_quantity, p.low_stock_threshold) === 'Out of Stock'
  );

  const totalRetailValue = products.reduce((acc, p) => acc + p.selling_price * p.stock_quantity, 0);
  const totalCostValue = products.reduce((acc, p) => acc + p.purchase_price * p.stock_quantity, 0);

  // Category distribution
  const categoryCounts = categories.map((cat) => ({
    name: cat.name,
    count: products.filter((p) => p.category_id === cat.id).length,
  }));

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Store Performance & Inventory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time stock analytics, catalog metrics, and optical inventory movements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Data
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Total Products
            </span>
            <div className="text-3xl font-extrabold text-navy-900">{totalProducts}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Across {categories.length} optical categories
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-accent flex items-center justify-center">
            <Glasses className="w-6 h-6" />
          </div>
        </div>

        {/* In Stock */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              In Stock
            </span>
            <div className="text-3xl font-extrabold text-emerald-600">{inStockCount}</div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              {totalProducts ? Math.round((inStockCount / totalProducts) * 100) : 0}% of catalog healthy
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Low Stock Alerts
            </span>
            <div className="text-3xl font-extrabold text-amber-600">
              {lowStockProducts.length}
            </div>
            <span className="text-[11px] text-amber-700 font-medium mt-1 block">
              At or below threshold
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Out of Stock */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-soft-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Out of Stock
            </span>
            <div className="text-3xl font-extrabold text-rose-600">
              {outOfStockProducts.length}
            </div>
            <span className="text-[11px] text-rose-700 font-medium mt-1 block">
              Needs immediate reorder
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Stock Health & Category Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Inventory Breakdown Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900">Inventory Status Distribution</h3>
                <p className="text-xs text-gray-500">Live proportion of frames and optical items</p>
              </div>
              <span className="text-xs font-semibold text-navy-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                Total Units: {products.reduce((acc, p) => acc + p.stock_quantity, 0)}
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex my-4">
              <div
                style={{ width: `${(inStockCount / (totalProducts || 1)) * 100}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`In Stock: ${inStockCount}`}
              />
              <div
                style={{ width: `${(lowStockProducts.length / (totalProducts || 1)) * 100}%` }}
                className="bg-amber-400 h-full transition-all"
                title={`Low Stock: ${lowStockProducts.length}`}
              />
              <div
                style={{ width: `${(outOfStockProducts.length / (totalProducts || 1)) * 100}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`Out of Stock: ${outOfStockProducts.length}`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-500" />
                <span className="text-gray-600">In Stock ({inStockCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-400" />
                <span className="text-gray-600">Low Stock ({lowStockProducts.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-rose-500" />
                <span className="text-gray-600">Out of Stock ({outOfStockProducts.length})</span>
              </div>
            </div>
          </div>

          {/* Value Summary Strip */}
          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-500 uppercase block">
                Total Inventory Retail Value
              </span>
              <span className="text-lg font-extrabold text-navy-900">
                {formatCurrency(totalRetailValue, settings.currency_symbol)}
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-500 uppercase block">
                Estimated Inventory Cost
              </span>
              <span className="text-lg font-extrabold text-navy-900">
                {formatCurrency(totalCostValue, settings.currency_symbol)}
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900">Categories Breakdown</h3>
              <p className="text-xs text-gray-500">Products per optical department</p>
            </div>
            <Link to="/admin/categories" className="text-xs font-semibold text-brand-accent hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {categoryCounts.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-navy-900 font-semibold">
                  <FolderTree className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="bg-navy-800 h-full rounded-full"
                      style={{ width: `${(cat.count / (totalProducts || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-gray-700 w-8 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low & Out of Stock Urgent Attention Table */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-soft-sm overflow-hidden">
          <div className="p-5 bg-amber-50/50 border-b border-amber-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900">Urgent Inventory Attention Required</h3>
                <p className="text-xs text-gray-600">
                  {lowStockProducts.length + outOfStockProducts.length} product(s) have reached low stock or run out completely.
                </p>
              </div>
            </div>
            <Link to="/admin/inventory">
              <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                View Full Inventory
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">SKU</th>
                  <th className="px-6 py-3">Current Stock</th>
                  <th className="px-6 py-3">Threshold</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...outOfStockProducts, ...lowStockProducts].slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/20">
                    <td className="px-6 py-3 font-semibold text-navy-900 flex items-center gap-2.5">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-8 h-8 rounded-lg object-contain bg-slate-50 border border-gray-200 p-0.5"
                      />
                      <span>{p.name}</span>
                    </td>
                    <td className="px-6 py-3 font-mono text-gray-500">{p.sku}</td>
                    <td className="px-6 py-3 font-bold text-navy-900">{p.stock_quantity} units</td>
                    <td className="px-6 py-3 text-gray-500">{p.low_stock_threshold} units</td>
                    <td className="px-6 py-3">
                      <StockBadge quantity={p.stock_quantity} threshold={p.low_stock_threshold} size="sm" />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedProductForStock(p)}
                      >
                        Adjust Stock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Inventory Movements Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900">Recent Stock Movements</h3>
              <p className="text-xs text-gray-500">Live audit log of store sales, restocks, and adjustments</p>
            </div>
          </div>
          <Link to="/admin/history">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
              View All History
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Date / Time</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Change Type</th>
                <th className="px-6 py-3">Quantity Changed</th>
                <th className="px-6 py-3">New Balance</th>
                <th className="px-6 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {movements.slice(0, 5).map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-medium text-gray-500">{formatDate(m.created_at)}</td>
                  <td className="px-6 py-3 font-semibold text-navy-900">{m.product_name || 'Optical Item'}</td>
                  <td className="px-6 py-3">
                    <span className="font-semibold text-navy-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                      {m.change_type}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-bold">
                    <span className={m.quantity_changed >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {m.quantity_changed >= 0 ? `+${m.quantity_changed}` : m.quantity_changed}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-bold text-navy-900">{m.new_quantity}</td>
                  <td className="px-6 py-3 text-gray-500 max-w-xs truncate">{m.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <StockAdjustmentModal
        isOpen={Boolean(selectedProductForStock)}
        onClose={() => setSelectedProductForStock(null)}
        product={selectedProductForStock}
      />
    </div>
  );
};
