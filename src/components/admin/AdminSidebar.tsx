import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Glasses,
  FolderTree,
  Boxes,
  History,
  CalendarCheck,
  Settings,
  ExternalLink,
  X,
  ShieldAlert,
} from 'lucide-react';
import { useShop } from '../../contexts/ShopContext';
import { calculateStockStatus } from '../../lib/utils';

interface AdminSidebarProps {
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const { products, bookings } = useShop();

  // Count low and out of stock products for badge
  const lowOrOutStockCount = products.filter((p) => {
    const status = calculateStockStatus(p.stock_quantity, p.low_stock_threshold);
    return status === 'Low Stock' || status === 'Out of Stock';
  }).length;

  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      to: '/admin/products',
      label: 'Products',
      icon: <Glasses className="w-4 h-4" />,
    },
    {
      to: '/admin/inventory',
      label: 'Inventory',
      icon: <Boxes className="w-4 h-4" />,
      badge: lowOrOutStockCount > 0 ? `${lowOrOutStockCount}` : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      to: '/admin/history',
      label: 'Stock History',
      icon: <History className="w-4 h-4" />,
    },
    {
      to: '/admin/categories',
      label: 'Categories',
      icon: <FolderTree className="w-4 h-4" />,
    },
    {
      to: '/admin/bookings',
      label: 'Eye Test Bookings',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: pendingBookingsCount > 0 ? `${pendingBookingsCount}` : undefined,
      badgeColor: 'bg-brand-accent text-white',
    },
    {
      to: '/admin/settings',
      label: 'Shop Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-navy-950 text-white flex flex-col h-full border-r border-navy-900 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-900 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center text-white shadow-soft-sm">
            <Glasses className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white leading-tight">
              AlNujoom
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-blue-400 font-bold">
              ADMIN CONSOLE
            </div>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand-accent text-white shadow-soft-sm font-bold'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Low stock warning chip in sidebar */}
      {lowOrOutStockCount > 0 && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Inventory Alert</div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              {lowOrOutStockCount} item{lowOrOutStockCount > 1 ? 's require' : ' requires'} attention.
            </div>
          </div>
        </div>
      )}

      {/* Bottom Store Link */}
      <div className="p-3 border-t border-navy-900">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-navy-900 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>View Public Store</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </aside>
  );
};
