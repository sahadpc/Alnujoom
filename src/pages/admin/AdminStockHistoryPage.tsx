import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { formatDate } from '../../lib/utils';
import { History, Search, ArrowUpRight, ArrowDownRight, RefreshCw, Filter } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AdminStockHistoryPage: React.FC = () => {
  const { movements, refreshData } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    document.title = 'Stock Movement History | AlNujoom Opticals';
  }, []);

  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (m.product_name && m.product_name.toLowerCase().includes(q)) ||
        (m.product_sku && m.product_sku.toLowerCase().includes(q)) ||
        (m.notes && m.notes.toLowerCase().includes(q));

      const matchesType = selectedType === 'all' || m.change_type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [movements, searchQuery, selectedType]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Inventory Audit History
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Complete traceability log for every inventory increase, sale reduction, and audit adjustment.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Refresh Log
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft-sm grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        <div className="sm:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by product name, SKU, or audit notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 focus:outline-none focus:border-navy-800"
          >
            <option value="all">All Movement Types</option>
            <option value="Stock Added">Stock Added</option>
            <option value="Stock Removed">Stock Removed</option>
            <option value="Manual Adjustment">Manual Adjustment</option>
            <option value="Restock">Restock</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Product Name & SKU</th>
                <th className="px-6 py-4">Movement Type</th>
                <th className="px-6 py-4">Previous Stock</th>
                <th className="px-6 py-4">Change</th>
                <th className="px-6 py-4">New Balance</th>
                <th className="px-6 py-4">Notes / Reason</th>
                <th className="px-6 py-4">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Timestamp */}
                  <td className="px-6 py-4 font-mono text-gray-500 whitespace-nowrap">
                    {formatDate(m.created_at)}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-navy-900 text-sm">
                      {m.product_name || 'Optical Item'}
                    </div>
                    {m.product_sku && (
                      <div className="text-[11px] text-gray-400 font-mono">
                        SKU: {m.product_sku}
                      </div>
                    )}
                  </td>

                  {/* Movement Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-md text-xs border ${
                        m.change_type === 'Stock Added' || m.change_type === 'Restock'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : m.change_type === 'Stock Removed'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {m.change_type}
                    </span>
                  </td>

                  {/* Previous Stock */}
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {m.previous_quantity} units
                  </td>

                  {/* Quantity Changed */}
                  <td className="px-6 py-4 font-bold">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        m.quantity_changed >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {m.quantity_changed >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {m.quantity_changed >= 0
                          ? `+${m.quantity_changed}`
                          : m.quantity_changed}
                      </span>
                    </span>
                  </td>

                  {/* New Balance */}
                  <td className="px-6 py-4 font-extrabold text-navy-900 text-sm">
                    {m.new_quantity} units
                  </td>

                  {/* Notes */}
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {m.notes || '—'}
                  </td>

                  {/* Admin User */}
                  <td className="px-6 py-4 text-gray-400 text-[11px]">
                    {m.admin_email || 'admin@alnujoom.com'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMovements.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-xs">
            No stock movement history records found.
          </div>
        )}
      </div>
    </div>
  );
};
