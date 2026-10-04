import { Product, Category, ShopSettings, InventoryMovement, EyeTestBooking, InventoryChangeType } from '../types';
import { initialProducts, initialCategories, initialSettings, initialMovements } from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PRODUCTS: 'alnujoom_products_v1',
  CATEGORIES: 'alnujoom_categories_v1',
  SETTINGS: 'alnujoom_settings_v1',
  MOVEMENTS: 'alnujoom_movements_v1',
  BOOKINGS: 'alnujoom_bookings_v1',
};

// Initialize LocalStorage with seed data if not present
function initializeLocalStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MOVEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(initialMovements));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
}

initializeLocalStorage();

// ========================
// PRODUCTS SERVICE
// ========================
export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          ...item,
          category_name: item.categories?.name,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch products error, using local fallback:', err);
    }
  }

  // Fallback to local storage
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (stored) {
    try {
      const prods: Product[] = JSON.parse(stored);
      // Link category name
      const cats = await getCategories();
      const catMap = new Map(cats.map(c => [c.id, c.name]));
      return prods.map(p => ({
        ...p,
        category_name: p.category_id ? catMap.get(p.category_id) || p.category_name || 'General' : 'General',
      }));
    } catch {
      return initialProducts;
    }
  }
  return initialProducts;
}

export async function saveProduct(product: Partial<Product> & { name: string; sku: string; brand: string }): Promise<Product> {
  const isNew = !product.id;
  const newId = product.id || `prod-${Date.now()}`;
  const now = new Date().toISOString();

  const completeProduct: Product = {
    id: newId,
    name: product.name,
    sku: product.sku,
    brand: product.brand,
    category_id: product.category_id || 'cat-1',
    category_name: product.category_name || '',
    description: product.description || '',
    purchase_price: Number(product.purchase_price) || 0,
    selling_price: Number(product.selling_price) || 0,
    stock_quantity: Math.max(0, Number(product.stock_quantity) || 0),
    low_stock_threshold: Math.max(1, Number(product.low_stock_threshold) || 5),
    image_url: product.image_url || 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    is_featured: Boolean(product.is_featured),
    is_active: product.is_active !== undefined ? product.is_active : true,
    specifications: product.specifications || {},
    created_at: product.created_at || now,
    updated_at: now,
  };

  // Try Supabase if configured
  if (isSupabaseConfigured) {
    try {
      const payload = {
        name: completeProduct.name,
        sku: completeProduct.sku,
        brand: completeProduct.brand,
        category_id: completeProduct.category_id,
        description: completeProduct.description,
        purchase_price: completeProduct.purchase_price,
        selling_price: completeProduct.selling_price,
        stock_quantity: completeProduct.stock_quantity,
        low_stock_threshold: completeProduct.low_stock_threshold,
        image_url: completeProduct.image_url,
        is_featured: completeProduct.is_featured,
        is_active: completeProduct.is_active,
        specifications: completeProduct.specifications,
      };

      if (isNew) {
        await supabase.from('products').insert([payload]);
      } else {
        await supabase.from('products').update(payload).eq('id', product.id);
      }
    } catch (err) {
      console.warn('Supabase saveProduct error, syncing locally:', err);
    }
  }

  // Update local storage
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  let list: Product[] = stored ? JSON.parse(stored) : [...initialProducts];

  if (isNew) {
    list.unshift(completeProduct);
  } else {
    list = list.map(item => item.id === newId ? { ...item, ...completeProduct } : item);
  }

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
  return completeProduct;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('products').delete().eq('id', productId);
    } catch (err) {
      console.warn('Supabase deleteProduct error, updating local:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (stored) {
    const list: Product[] = JSON.parse(stored);
    const updated = list.filter(item => item.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }
  return true;
}

// ========================
// INVENTORY UPDATE & MOVEMENTS
// ========================
export async function updateProductStock(
  productId: string,
  newQuantity: number,
  changeType: InventoryChangeType,
  notes?: string,
  adminEmail: string = 'admin@alnujoom.com'
): Promise<{ product: Product; movement: InventoryMovement }> {
  const safeQuantity = Math.max(0, newQuantity);
  const products = await getProducts();
  const targetProduct = products.find(p => p.id === productId);

  if (!targetProduct) {
    throw new Error('Product not found');
  }

  const previousQuantity = targetProduct.stock_quantity;
  const quantityChanged = safeQuantity - previousQuantity;
  const now = new Date().toISOString();

  // Create movement record
  const movement: InventoryMovement = {
    id: `mov-${Date.now()}`,
    product_id: productId,
    product_name: targetProduct.name,
    product_sku: targetProduct.sku,
    previous_quantity: previousQuantity,
    new_quantity: safeQuantity,
    quantity_changed: quantityChanged,
    change_type: changeType,
    notes: notes || `Stock updated to ${safeQuantity}`,
    admin_email: adminEmail,
    created_at: now,
  };

  // Update product
  targetProduct.stock_quantity = safeQuantity;
  targetProduct.updated_at = now;

  // Supabase update
  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('products')
        .update({ stock_quantity: safeQuantity, updated_at: now })
        .eq('id', productId);

      await supabase.from('inventory_movements').insert([{
        product_id: productId,
        previous_quantity: previousQuantity,
        new_quantity: safeQuantity,
        quantity_changed: quantityChanged,
        change_type: changeType,
        notes: notes || '',
        admin_email: adminEmail,
      }]);
    } catch (err) {
      console.warn('Supabase inventory update error, saving locally:', err);
    }
  }

  // Update local storage
  const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (storedProducts) {
    const list: Product[] = JSON.parse(storedProducts);
    const updated = list.map(p => p.id === productId ? { ...p, stock_quantity: safeQuantity, updated_at: now } : p);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }

  const storedMovements = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
  const movements: InventoryMovement[] = storedMovements ? JSON.parse(storedMovements) : [...initialMovements];
  movements.unshift(movement);
  localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));

  return { product: targetProduct, movement };
}

export async function getInventoryMovements(): Promise<InventoryMovement[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('inventory_movements')
        .select('*, products(name, sku)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          ...item,
          product_name: item.products?.name,
          product_sku: item.products?.sku,
        }));
      }
    } catch (err) {
      console.warn('Supabase getMovements error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
  return stored ? JSON.parse(stored) : initialMovements;
}

// ========================
// CATEGORIES SERVICE
// ========================
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getCategories error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return stored ? JSON.parse(stored) : initialCategories;
}

export async function saveCategory(category: Partial<Category> & { name: string }): Promise<Category> {
  const isNew = !category.id;
  const newId = category.id || `cat-${Date.now()}`;
  const slug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const completeCategory: Category = {
    id: newId,
    name: category.name,
    slug: slug,
    description: category.description || '',
    image_url: category.image_url || 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    is_active: category.is_active !== undefined ? category.is_active : true,
    display_order: category.display_order || 99,
  };

  if (isSupabaseConfigured) {
    try {
      const payload = {
        name: completeCategory.name,
        slug: completeCategory.slug,
        description: completeCategory.description,
        image_url: completeCategory.image_url,
        is_active: completeCategory.is_active,
        display_order: completeCategory.display_order,
      };

      if (isNew) {
        await supabase.from('categories').insert([payload]);
      } else {
        await supabase.from('categories').update(payload).eq('id', category.id);
      }
    } catch (err) {
      console.warn('Supabase saveCategory error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  let list: Category[] = stored ? JSON.parse(stored) : [...initialCategories];

  if (isNew) {
    list.push(completeCategory);
  } else {
    list = list.map(c => c.id === newId ? completeCategory : c);
  }

  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
  return completeCategory;
}

export async function deleteCategory(categoryId: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('categories').delete().eq('id', categoryId);
    } catch (err) {
      console.warn('Supabase deleteCategory error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (stored) {
    const list: Category[] = JSON.parse(stored);
    const updated = list.filter(c => c.id !== categoryId);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  }
  return true;
}

// ========================
// SHOP SETTINGS SERVICE
// ========================
export async function getShopSettings(): Promise<ShopSettings> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('shop_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getSettings error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored ? JSON.parse(stored) : initialSettings;
}

export async function updateShopSettings(settings: ShopSettings): Promise<ShopSettings> {
  if (isSupabaseConfigured) {
    try {
      if (settings.id) {
        await supabase.from('shop_settings').update(settings).eq('id', settings.id);
      } else {
        await supabase.from('shop_settings').upsert([settings]);
      }
    } catch (err) {
      console.warn('Supabase updateSettings error:', err);
    }
  }

  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return settings;
}

// ========================
// EYE TEST BOOKINGS SERVICE
// ========================
export async function getBookings(): Promise<EyeTestBooking[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('eye_test_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getBookings error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return stored ? JSON.parse(stored) : [];
}

export async function createBooking(booking: Omit<EyeTestBooking, 'id' | 'created_at' | 'status'>): Promise<EyeTestBooking> {
  const newBooking: EyeTestBooking = {
    id: `book-${Date.now()}`,
    ...booking,
    status: 'Pending',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      await supabase.from('eye_test_bookings').insert([{
        customer_name: booking.customer_name,
        customer_phone: booking.customer_phone,
        customer_email: booking.customer_email,
        preferred_date: booking.preferred_date,
        preferred_time: booking.preferred_time,
        notes: booking.notes,
        status: 'Pending',
      }]);
    } catch (err) {
      console.warn('Supabase createBooking error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  const list: EyeTestBooking[] = stored ? JSON.parse(stored) : [];
  list.unshift(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
  return newBooking;
}

export async function updateBookingStatus(bookingId: string, status: EyeTestBooking['status']): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('eye_test_bookings').update({ status }).eq('id', bookingId);
    } catch (err) {
      console.warn('Supabase updateBookingStatus error:', err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (stored) {
    const list: EyeTestBooking[] = JSON.parse(stored);
    const updated = list.map(b => b.id === bookingId ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  }
}

// Reset data to defaults
export function resetToDemoData(): void {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
  localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(initialMovements));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
}
