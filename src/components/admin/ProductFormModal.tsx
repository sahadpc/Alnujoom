import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Product } from '../../types';
import { useShop } from '../../contexts/ShopContext';
import { Image, Sparkles } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null; // If null, mode is ADD, if present, mode is EDIT
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { categories, addProduct, updateProduct } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    brand: '',
    category_id: '',
    description: '',
    purchase_price: 100,
    selling_price: 250,
    stock_quantity: 10,
    low_stock_threshold: 4,
    image_url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    is_featured: false,
    is_active: true,
    frame_material: 'Titanium / Acetate',
    frame_shape: 'Rectangular',
    warranty: '1 Year Warranty',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optical frame image presets for quick selection
  const imagePresets = [
    { label: 'Modern Classic Glasses', url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tortoiseshell Eyeglasses', url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80' },
    { label: 'Gold Aviator Sunglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
    { label: 'Minimalist Titanium Frame', url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80' },
    { label: 'Blue-Light Computer Frame', url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80' },
    { label: 'Kids Flexible Eyewear', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80' },
    { label: 'Contact Lenses Pack', url: 'https://images.unsplash.com/photo-1629851608688-e25fa9ff2e8c?auto=format&fit=crop&w=800&q=80' },
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        brand: product.brand,
        category_id: product.category_id,
        description: product.description,
        purchase_price: product.purchase_price,
        selling_price: product.selling_price,
        stock_quantity: product.stock_quantity,
        low_stock_threshold: product.low_stock_threshold,
        image_url: product.image_url,
        is_featured: product.is_featured,
        is_active: product.is_active,
        frame_material: product.specifications?.frame_material || 'Titanium / Acetate',
        frame_shape: product.specifications?.frame_shape || 'Rectangular',
        warranty: product.specifications?.warranty || '1 Year Warranty',
      });
    } else {
      setFormData({
        name: '',
        sku: `OPT-${Math.floor(1000 + Math.random() * 9000)}`,
        brand: '',
        category_id: categories[0]?.id || 'cat-1',
        description: '',
        purchase_price: 100,
        selling_price: 250,
        stock_quantity: 10,
        low_stock_threshold: 4,
        image_url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
        is_featured: false,
        is_active: true,
        frame_material: 'Titanium / Acetate',
        frame_shape: 'Rectangular',
        warranty: '1 Year Warranty',
      });
    }
    setErrors({});
  }, [product, categories, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU / Code is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand name is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (Number(formData.selling_price) <= 0) newErrors.selling_price = 'Selling price must be greater than 0';
    if (Number(formData.stock_quantity) < 0) newErrors.stock_quantity = 'Stock quantity cannot be negative';
    if (Number(formData.low_stock_threshold) < 1) newErrors.low_stock_threshold = 'Threshold must be at least 1';
    if (!formData.image_url.trim()) newErrors.image_url = 'Product image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const selectedCat = categories.find((c) => c.id === formData.category_id);
      const payload = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        brand: formData.brand.trim(),
        category_id: formData.category_id,
        category_name: selectedCat?.name || '',
        description: formData.description.trim(),
        purchase_price: Number(formData.purchase_price),
        selling_price: Number(formData.selling_price),
        stock_quantity: Math.max(0, Number(formData.stock_quantity)),
        low_stock_threshold: Math.max(1, Number(formData.low_stock_threshold)),
        image_url: formData.image_url.trim(),
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        specifications: {
          frame_material: formData.frame_material,
          frame_shape: formData.frame_shape,
          warranty: formData.warranty,
          prescription_ready: true,
        },
      };

      if (product) {
        await updateProduct({ ...payload, id: product.id });
      } else {
        await addProduct(payload);
      }
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
      title={product ? 'Edit Optical Product' : 'Add New Optical Product'}
      description="Enter the eyewear product specifications, pricing, inventory stock, and catalog visibility."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-1">
        {/* Core Product Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            placeholder="e.g. Ray-Ban RB3025 Aviator"
            required
            error={errors.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="SKU / Product Code"
            placeholder="e.g. RB-3025-001"
            required
            error={errors.sku}
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand"
            placeholder="e.g. Ray-Ban, Titan, Oakley"
            required
            error={errors.brand}
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Stock Fields */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-gray-100">
          <Input
            label="Purchase Cost"
            type="number"
            min="0"
            step="0.01"
            value={formData.purchase_price}
            onChange={(e) => setFormData({ ...formData, purchase_price: Number(e.target.value) })}
          />

          <Input
            label="Selling Price"
            type="number"
            min="0"
            step="0.01"
            required
            error={errors.selling_price}
            value={formData.selling_price}
            onChange={(e) => setFormData({ ...formData, selling_price: Number(e.target.value) })}
          />

          <Input
            label="Initial Stock"
            type="number"
            min="0"
            required
            error={errors.stock_quantity}
            value={formData.stock_quantity}
            onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
          />

          <Input
            label="Low Threshold"
            type="number"
            min="1"
            required
            error={errors.low_stock_threshold}
            value={formData.low_stock_threshold}
            onChange={(e) => setFormData({ ...formData, low_stock_threshold: Number(e.target.value) })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
            Product Description
          </label>
          <textarea
            rows={3}
            placeholder="Detailed description of frame craftsmanship, hinges, aesthetics, and fit..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        {/* Image URL & Live Preview */}
        <div>
          <Input
            label="Product Image URL"
            placeholder="https://..."
            required
            error={errors.image_url}
            leftIcon={<Image className="w-4 h-4" />}
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />

          {/* Quick preset selector */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Presets:
            </span>
            {imagePresets.slice(0, 4).map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFormData({ ...formData, image_url: preset.url })}
                className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Image Preview Box */}
          {formData.image_url && (
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={formData.image_url}
                  alt="Product Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="text-xs text-gray-500">
                <strong className="text-navy-900 block font-semibold">Image Preview</strong>
                <span>This image will be displayed on the customer website and product detail page.</span>
              </div>
            </div>
          )}
        </div>

        {/* Checkboxes: Featured & Active */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900 select-none">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="rounded text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
            />
            <span>Mark as Featured Product</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900 select-none">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
            />
            <span>Active (Visible on Website)</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {product ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
