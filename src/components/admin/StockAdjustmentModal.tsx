import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Product, InventoryChangeType } from '../../types';
import { useShop } from '../../contexts/ShopContext';
import { useAuth } from '../../contexts/AuthContext';
import { calculateStockStatus } from '../../lib/utils';
import { StockBadge } from '../common/StockBadge';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { adjustStock } = useShop();
  const { user } = useAuth();

  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [changeType, setChangeType] = useState<InventoryChangeType>('Stock Added');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setNewQuantity(product.stock_quantity);
      setChangeType('Stock Added');
      setNotes('');
    }
  }, [product, isOpen]);

  if (!product) return null;

  const previousQuantity = product.stock_quantity;
  const quantityChanged = newQuantity - previousQuantity;
  const newStatus = calculateStockStatus(newQuantity, product.low_stock_threshold);

  const handleQuickAdd = (amount: number) => {
    const updated = Math.max(0, newQuantity + amount);
    setNewQuantity(updated);
    if (amount > 0) {
      setChangeType('Stock Added');
    } else {
      setChangeType('Stock Removed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuantity < 0) return;

    setIsSubmitting(true);
    try {
      await adjustStock(
        product.id,
        newQuantity,
        changeType,
        notes.trim() || `Adjusted stock by ${quantityChanged > 0 ? '+' : ''}${quantityChanged}`,
        user?.email || 'admin@alnujoom.com'
      );
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Inventory Stock"
      description={`Update the on-hand stock count for ${product.brand} - ${product.name}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Product Summary Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 line-clamp-1">{product.name}</div>
              <div className="text-[11px] text-gray-500">
                SKU: <strong className="text-gray-700">{product.sku}</strong> • Low Threshold: {product.low_stock_threshold}
              </div>
            </div>
          </div>
          <div>
            <StockBadge quantity={product.stock_quantity} threshold={product.low_stock_threshold} size="sm" />
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            New On-Hand Stock Quantity
          </label>

          <div className="flex items-center justify-center gap-4 my-2">
            <button
              type="button"
              onClick={() => handleQuickAdd(-1)}
              disabled={newQuantity <= 0}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-900 flex items-center justify-center transition-colors disabled:opacity-40"
              aria-label="Decrease by 1"
            >
              <Minus className="w-5 h-5" />
            </button>

            <input
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-28 text-center text-3xl font-extrabold text-navy-900 border-b-2 border-navy-900 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => handleQuickAdd(1)}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-900 flex items-center justify-center transition-colors"
              aria-label="Increase by 1"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 font-medium">Quick:</span>
            <button
              type="button"
              onClick={() => handleQuickAdd(5)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-navy-900"
            >
              +5
            </button>
            <button
              type="button"
              onClick={() => handleQuickAdd(10)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-navy-900"
            >
              +10
            </button>
            <button
              type="button"
              onClick={() => handleQuickAdd(-5)}
              disabled={newQuantity < 5}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-navy-900 disabled:opacity-40"
            >
              -5
            </button>
          </div>

          {/* Stock difference indicator */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium">
            <span className="text-gray-500">Current: {previousQuantity}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <span className={quantityChanged >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
              New: {newQuantity} ({quantityChanged >= 0 ? `+${quantityChanged}` : quantityChanged})
            </span>
          </div>
        </div>

        {/* Change Type Selection */}
        <div>
          <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
            Reason / Movement Type <span className="text-rose-500">*</span>
          </label>
          <select
            value={changeType}
            onChange={(e) => setChangeType(e.target.value as InventoryChangeType)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
          >
            <option value="Stock Added">Stock Added (Supplier Restock)</option>
            <option value="Stock Removed">Stock Removed (Store Sale)</option>
            <option value="Manual Adjustment">Manual Adjustment (Inventory Audit)</option>
            <option value="Damaged">Damaged / Defective Stock</option>
          </select>
        </div>

        {/* Audit Notes */}
        <div>
          <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
            Audit Note / Reference (Optional)
          </label>
          <Input
            placeholder="e.g. PO-9812 from distributor or showroom audit"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Confirm Stock Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};
