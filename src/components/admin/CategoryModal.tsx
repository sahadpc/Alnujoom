import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Category } from '../../types';
import { useShop } from '../../contexts/ShopContext';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const { addCategory, updateCategory } = useShop();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description || '');
      setImageUrl(category.image_url || '');
      setIsActive(category.is_active);
      setDisplayOrder(category.display_order || 1);
    } else {
      setName('');
      setSlug('');
      setDescription('');
      setImageUrl('https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80');
      setIsActive(true);
      setDisplayOrder(1);
    }
    setError('');
  }, [category, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!category) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description.trim(),
        image_url: imageUrl.trim(),
        is_active: isActive,
        display_order: Number(displayOrder) || 1,
      };

      if (category) {
        await updateCategory({ ...payload, id: category.id });
      } else {
        await addCategory(payload);
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
      title={category ? 'Edit Optical Category' : 'Create Optical Category'}
      description="Define the category title, slug, cover image, and catalog visibility."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <Input
          label="Category Name"
          placeholder="e.g. Eyeglasses, Sunglasses, Sports"
          required
          error={error}
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />

        <Input
          label="URL Slug"
          placeholder="e.g. eyeglasses"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <div>
          <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            rows={2}
            placeholder="Short customer-facing description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <Input
          label="Cover Image URL"
          placeholder="https://images.unsplash.com/..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Display Order"
            type="number"
            min="1"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
          />

          <div className="flex items-center pt-6">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900 select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
              />
              <span>Category Active</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {category ? 'Save Changes' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
