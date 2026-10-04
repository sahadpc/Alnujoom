import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  Category,
  ShopSettings,
  InventoryMovement,
  EyeTestBooking,
  InventoryChangeType
} from '../types';
import * as storage from '../lib/storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ShopContextType {
  products: Product[];
  categories: Category[];
  settings: ShopSettings;
  movements: InventoryMovement[];
  bookings: EyeTestBooking[];
  isLoading: boolean;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
  
  // Product actions
  addProduct: (product: Partial<Product> & { name: string; sku: string; brand: string }) => Promise<Product>;
  updateProduct: (product: Partial<Product> & { name: string; sku: string; brand: string }) => Promise<Product>;
  removeProduct: (productId: string) => Promise<boolean>;
  
  // Inventory actions
  adjustStock: (
    productId: string,
    newQuantity: number,
    changeType: InventoryChangeType,
    notes?: string,
    adminEmail?: string
  ) => Promise<void>;
  
  // Category actions
  addCategory: (category: Partial<Category> & { name: string }) => Promise<Category>;
  updateCategory: (category: Partial<Category> & { name: string }) => Promise<Category>;
  removeCategory: (categoryId: string) => Promise<boolean>;
  
  // Settings & Bookings
  updateSettings: (newSettings: ShopSettings) => Promise<void>;
  bookEyeTest: (booking: Omit<EyeTestBooking, 'id' | 'created_at' | 'status'>) => Promise<EyeTestBooking>;
  updateBookingStatus: (bookingId: string, status: EyeTestBooking['status']) => Promise<void>;
  resetToDemo: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<ShopSettings>({
    shop_name: 'AlNujoom Opticals',
    tagline: 'Quality Eyewear & Trusted Eye Care',
    phone: '+971 4 398 2211',
    whatsapp_number: '+971501234567',
    email: 'care@alnujoomopticals.com',
    address: 'Al Mina Road, Shop #4, Ground Floor, Dubai, UAE',
    opening_hours: 'Sat - Thu: 09:30 AM - 10:30 PM | Fri: 04:30 PM - 10:30 PM',
    google_maps_url: 'https://maps.google.com/?q=AlNujoom+Opticals',
    instagram_url: 'https://instagram.com/alnujoomopticals',
    facebook_url: 'https://facebook.com/alnujoomopticals',
    currency_symbol: 'AED',
  });
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [bookings, setBookings] = useState<EyeTestBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [fetchedProducts, fetchedCategories, fetchedSettings, fetchedMovements, fetchedBookings] = await Promise.all([
        storage.getProducts(),
        storage.getCategories(),
        storage.getShopSettings(),
        storage.getInventoryMovements(),
        storage.getBookings(),
      ]);

      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setSettings(fetchedSettings);
      setMovements(fetchedMovements);
      setBookings(fetchedBookings);
    } catch (err) {
      console.error('Failed to load store data:', err);
      showToast('Error loading store data. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Product actions
  const addProduct = async (productData: Partial<Product> & { name: string; sku: string; brand: string }): Promise<Product> => {
    const created = await storage.saveProduct(productData);
    setProducts(prev => [created, ...prev]);
    showToast(`Product "${created.name}" created successfully.`, 'success');
    return created;
  };

  const updateProduct = async (productData: Partial<Product> & { name: string; sku: string; brand: string }): Promise<Product> => {
    const updated = await storage.saveProduct(productData);
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully.`, 'success');
    return updated;
  };

  const removeProduct = async (productId: string): Promise<boolean> => {
    const success = await storage.deleteProduct(productId);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast('Product deleted successfully.', 'info');
    }
    return success;
  };

  // Stock Adjustment
  const adjustStock = async (
    productId: string,
    newQuantity: number,
    changeType: InventoryChangeType,
    notes?: string,
    adminEmail?: string
  ): Promise<void> => {
    const { product: updated, movement } = await storage.updateProductStock(
      productId,
      newQuantity,
      changeType,
      notes,
      adminEmail
    );

    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setMovements(prev => [movement, ...prev]);
    showToast(`Stock updated for ${updated.name} (Now: ${newQuantity} units).`, 'success');
  };

  // Category Actions
  const addCategory = async (catData: Partial<Category> & { name: string }): Promise<Category> => {
    const created = await storage.saveCategory(catData);
    setCategories(prev => [...prev, created]);
    showToast(`Category "${created.name}" created.`, 'success');
    return created;
  };

  const updateCategory = async (catData: Partial<Category> & { name: string }): Promise<Category> => {
    const updated = await storage.saveCategory(catData);
    setCategories(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast(`Category "${updated.name}" updated.`, 'success');
    return updated;
  };

  const removeCategory = async (categoryId: string): Promise<boolean> => {
    const success = await storage.deleteCategory(categoryId);
    if (success) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      showToast('Category deleted.', 'info');
    }
    return success;
  };

  // Settings
  const updateSettings = async (newSettings: ShopSettings): Promise<void> => {
    const updated = await storage.updateShopSettings(newSettings);
    setSettings(updated);
    showToast('Shop settings updated successfully.', 'success');
  };

  // Bookings
  const bookEyeTest = async (booking: Omit<EyeTestBooking, 'id' | 'created_at' | 'status'>): Promise<EyeTestBooking> => {
    const created = await storage.createBooking(booking);
    setBookings(prev => [created, ...prev]);
    showToast('Eye test appointment request sent successfully!', 'success');
    return created;
  };

  const updateBookingStatus = async (bookingId: string, status: EyeTestBooking['status']): Promise<void> => {
    await storage.updateBookingStatus(bookingId, status);
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Appointment status updated to ${status}.`, 'info');
  };

  const resetToDemo = () => {
    storage.resetToDemoData();
    refreshData();
    showToast('Reset to demo sample data successfully.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        settings,
        movements,
        bookings,
        isLoading,
        toasts,
        showToast,
        removeToast,
        refreshData,
        addProduct,
        updateProduct,
        removeProduct,
        adjustStock,
        addCategory,
        updateCategory,
        removeCategory,
        updateSettings,
        bookEyeTest,
        updateBookingStatus,
        resetToDemo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
