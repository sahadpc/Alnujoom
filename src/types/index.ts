export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type InventoryChangeType = 'Stock Added' | 'Stock Removed' | 'Manual Adjustment' | 'Restock' | 'Damaged';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  display_order?: number;
  product_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductSpecifications {
  frame_material?: string;
  frame_shape?: string;
  frame_color?: string;
  lens_type?: string;
  gender?: 'Men' | 'Women' | 'Unisex' | 'Kids';
  warranty?: string;
  prescription_ready?: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category_id: string;
  category_name?: string;
  description: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  specifications?: ProductSpecifications;
  created_at?: string;
  updated_at?: string;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  product_name?: string;
  product_sku?: string;
  previous_quantity: number;
  new_quantity: number;
  quantity_changed: number;
  change_type: InventoryChangeType;
  notes?: string;
  admin_email: string;
  created_at: string;
}

export interface ShopSettings {
  id?: string;
  shop_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  opening_hours: string;
  google_maps_url: string;
  instagram_url: string;
  facebook_url: string;
  currency_symbol: string;
  announcement_text?: string;
}

export interface EyeTestBooking {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  brand: string;
  stockStatus: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';
}
