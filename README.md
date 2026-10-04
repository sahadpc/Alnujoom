# 👓 AlNujoom Opticals — Complete Production Web Application

A modern, conversion-focused web application and inventory control system for **AlNujoom Opticals**, built with React, TypeScript, Tailwind CSS, and Supabase.

---

## 🌟 Key Features

### 1. Customer-Facing Website (Conversion-Focused)
* **Hero Section:** High-impact optical imagery, brand mission (*"See the World with Confidence"*), dual CTAs, and trust metrics.
* **Trust & Quality Pillars:** 4 feature cards (*Quality Eyewear, Expert Guidance, Affordable Prices, Personalized Service*).
* **Category Collections:** Eyeglasses, Sunglasses, Contact Lenses, Kids Eyewear, Computer Glasses, and Accessories.
* **Featured Products:** Database-backed showcase displaying authentic frames with *"In Stock"* or *"Currently Unavailable"* customer badges (internal quantities are never exposed).
* **Direct WhatsApp Inquiries:** Automatic pre-filled messages specifying the product name and SKU when inquiring on WhatsApp (e.g. `Hello AlNujoom Opticals, I am interested in Ray-Ban RB3025...`).
* **Interactive Eye Test Booking:** Modal permitting visitors to book professional clinical eye tests with date, preferred time slot, and vision notes.
* **Mobile Quick Action Bar:** Mobile-first sticky bottom bar offering one-tap calling, appointment booking, and WhatsApp messaging.
* **Interactive Store Locator & Hours:** Embedded Google Maps, contact cards, and FAQ accordion.

### 2. Staff & Inventory Admin Dashboard
* **Protected Routes:** Secure authentication route guard (`/admin/*`) redirecting unauthenticated traffic to `/admin/login`.
* **Dashboard Overview:** Metric cards for Total Products, Products In Stock, Low-Stock Warnings, Out-of-Stock Alerts, and Total Inventory Value.
* **Visual Inventory Breakdown:** Proportion chart visualizing current stock health across the catalog.
* **Product Management (`/admin/products`):** Full CRUD for frames and optical items with SKU, brand, category, purchase price, selling price, stock count, low-stock threshold, image preview, featured toggle, and active toggle. Safe confirmation dialogs before deletion.
* **Stock & Threshold Control (`/admin/inventory`):** Color-coded status badges:
  * 🟢 **In Stock:** `quantity > low_stock_threshold`
  * 🟠 **Low Stock:** `quantity > 0 && quantity <= low_stock_threshold`
  * 🔴 **Out of Stock:** `quantity === 0`
* **Inventory Audit Trail (`/admin/history`):** Complete immutable log capturing previous quantity, new quantity, net change, movement reason (*Stock Added, Stock Removed, Manual Adjustment, Restock, Damaged*), and timestamp.
* **Category Management (`/admin/categories`):** Add, edit, delete, and toggle categories with live product count counters.
* **Appointment Requests (`/admin/bookings`):** View, confirm, complete, or cancel customer eye test bookings with one-click WhatsApp client contact.
* **Dynamic Shop Settings (`/admin/settings`):** Live synchronization of store phone, WhatsApp number, address, opening hours, announcements, and Google Maps URL across the entire public website.

---

## 🛠️ Technology Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Icons:** Lucide React & Custom SVG Brand Icons
* **Routing:** React Router v7
* **Database & Auth:** Supabase (PostgreSQL with Row Level Security & Triggers)
* **Offline-First Resilience:** Seamless local storage synchronization so the application runs 100% out-of-the-box even before Supabase keys are configured.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd alnujoom-opticals
npm install
```

### 2. Configure Environment Variables (Optional for Supabase)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
> **Note:** If no `.env` is configured, the application automatically launches in **Offline-First Demo Mode** with realistic optical datasets, preserving changes across browser sessions.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Default Admin Credentials

* **URL:** `/admin/login`
* **Email:** `admin@alnujoom.com`
* **Password:** `Admin@123`
*(A convenient "One-Click Store Manager Access" button is provided on the login page for rapid evaluation)*

---

## 🗄️ Database Setup (Supabase)

To link your live Supabase project:
1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Copy and run the entire SQL script from `supabase/schema.sql`.
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repository.
3. Add the environment variables:
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
4. The included `vercel.json` automatically manages client-side routing.
5. Click **Deploy**.

---

© 2026 AlNujoom Opticals. All rights reserved.
