import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useShop } from '../../contexts/ShopContext';
import { Menu, LogOut, User, Store, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobileSidebar }) => {
  const { user, logout, isDemoMode } = useAuth();
  const { settings } = useShop();

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & breadcrumb title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-navy-900 hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-navy-900">{settings.shop_name}</span>
          <span className="hidden sm:inline-block text-xs text-gray-400">/</span>
          <span className="hidden sm:inline-block text-xs font-semibold text-gray-500">
            Control Center
          </span>
          {isDemoMode && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              Demo Mode Active
            </span>
          )}
        </div>
      </div>

      {/* Right: Actions, user info, logout */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-navy-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Customer Site</span>
        </Link>

        {/* User badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-navy-900 leading-tight">
              {user?.name || 'Store Admin'}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">
              {user?.email || 'admin@alnujoom.com'}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          title="Sign out of Admin Dashboard"
          className="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
