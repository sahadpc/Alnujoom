-- ==============================================================================
-- AlNujoom Opticals - Production Supabase Database Schema
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    purchase_price NUMERIC(10, 2) DEFAULT 0.00,
    selling_price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    low_stock_threshold INT NOT NULL DEFAULT 5,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Inventory Movements Table (Audit Trail)
CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    quantity_changed INT NOT NULL,
    change_type VARCHAR(50) NOT NULL CHECK (change_type IN ('Stock Added', 'Stock Removed', 'Manual Adjustment', 'Restock', 'Damaged')),
    notes TEXT,
    admin_email VARCHAR(255) DEFAULT 'admin@alnujoom.com',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Shop Settings Table
CREATE TABLE IF NOT EXISTS public.shop_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_name VARCHAR(255) NOT NULL DEFAULT 'AlNujoom Opticals',
    tagline VARCHAR(255) DEFAULT 'Quality Eyewear & Trusted Eye Care',
    phone VARCHAR(50) DEFAULT '+971 4 123 4567',
    whatsapp_number VARCHAR(50) DEFAULT '+971501234567',
    email VARCHAR(100) DEFAULT 'contact@alnujoomopticals.com',
    address TEXT DEFAULT 'Al Mina Road, Near City Center, Al Nujoom Plaza, Ground Floor, Dubai, UAE',
    opening_hours TEXT DEFAULT 'Sat - Thu: 09:30 AM - 10:30 PM | Fri: 04:30 PM - 10:30 PM',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=AlNujoom+Opticals',
    instagram_url TEXT DEFAULT 'https://instagram.com/alnujoomopticals',
    facebook_url TEXT DEFAULT 'https://facebook.com/alnujoomopticals',
    currency_symbol VARCHAR(10) DEFAULT 'AED',
    announcement_text TEXT DEFAULT 'Complimentary Comprehensive Eye Test with any frame purchase this month!',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Eye Test Bookings Table
CREATE TABLE IF NOT EXISTS public.eye_test_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100),
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_shop_settings_updated_at BEFORE UPDATE ON public.shop_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eye_test_bookings ENABLE ROW LEVEL SECURITY;

-- Public can read active categories, active products, and shop settings
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public shop settings are viewable by everyone" ON public.shop_settings FOR SELECT USING (true);
CREATE POLICY "Public can insert eye test bookings" ON public.eye_test_bookings FOR INSERT WITH CHECK (true);

-- Authenticated Admin can perform full CRUD
CREATE POLICY "Authenticated users have full access to categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users have full access to products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users have full access to inventory_movements" ON public.inventory_movements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users have full access to shop_settings" ON public.shop_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users have full access to eye_test_bookings" ON public.eye_test_bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. Insert Initial Shop Settings Record
INSERT INTO public.shop_settings (
    shop_name, tagline, phone, whatsapp_number, email, address, opening_hours, google_maps_url, instagram_url, facebook_url, currency_symbol, announcement_text
) VALUES (
    'AlNujoom Opticals',
    'Quality Eyewear & Trusted Eye Care',
    '+971 4 398 2211',
    '+971501234567',
    'info@alnujoomopticals.com',
    'Al Mina Road, Shop #4, Ground Floor, Near Al Nujoom Tower, Dubai, United Arab Emirates',
    'Sat - Thu: 09:30 AM - 10:30 PM | Friday: 04:30 PM - 10:30 PM',
    'https://maps.google.com/?q=AlNujoom+Opticals+Dubai',
    'https://instagram.com/alnujoomopticals',
    'https://facebook.com/alnujoomopticals',
    'AED',
    'Complimentary Digital Eye Test with every frame purchase this month!'
) ON CONFLICT DO NOTHING;
