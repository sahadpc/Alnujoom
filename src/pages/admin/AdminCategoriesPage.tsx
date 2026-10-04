import React, { useState, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { Category } from '../../types';
import { Button } from '../../components/common/Button';
import { CategoryModal } from '../../components/admin/CategoryModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Glasses,
  CheckCircle,
} from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, products, removeCategory, updateCategory } = useShop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Category Management | AlNujoom Opticals';
  }, []);

  const handleToggleActive = async (category: Category) => {
    await updateCategory({
      ...category,
      is_active: !category.is_active,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await removeCategory(deletingCategory.id);
      setDeletingCategory(null);
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
            Product Categories
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize eyeglasses, sunglasses, lenses, and accessories into customer collections.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Category
        </Button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const productCount = products.filter((p) => p.category_id === category.id).length;

          return (
            <div
              key={category.id}
              className={`bg-white rounded-3xl border shadow-soft-sm overflow-hidden flex flex-col justify-between transition-all ${
                category.is_active ? 'border-gray-100 hover:border-navy-200' : 'border-gray-200 opacity-60'
              }`}
            >
              <div>
                {/* Category Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                        category.is_active
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-gray-700/90 text-white'
                      }`}
                    >
                      {category.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-navy-900 text-lg">{category.name}</h3>
                    <span className="text-xs font-semibold text-brand-accent bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {productCount} products
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-mono text-gray-400">/{category.slug}</p>

                  <p className="mt-3 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {category.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(category)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-navy-900"
                >
                  {category.is_active ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-navy-900 hover:bg-gray-200/60 transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeletingCategory(category)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Optical Category?"
        message={`Are you sure you want to delete "${deletingCategory?.name}"? Associated products will have their category reset to general.`}
        confirmText="Yes, Delete Category"
      />
    </div>
  );
};
