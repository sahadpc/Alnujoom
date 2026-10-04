import React, { useState, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { getDatabaseStatus } from '../../lib/supabase';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import {
  Settings,
  Store,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Database,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../../components/common/SocialIcons';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDemo } = useShop();

  const [form, setForm] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const dbStatus = getDatabaseStatus();

  useEffect(() => {
    document.title = 'Store Settings | AlNujoom Opticals';
    setForm(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(form);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmReset = () => {
    resetToDemo();
    setIsResetDialogOpen(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Shop & System Settings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Configure business details, store hours, WhatsApp contact, and database integrations.
        </p>
      </div>

      {/* Database Connection Status Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              dbStatus.isConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-navy-900">Database Engine</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  dbStatus.isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {dbStatus.isConfigured ? 'Supabase Connected' : 'Hybrid Local Storage (Active)'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {dbStatus.isConfigured
                  ? `Connected to remote Supabase endpoint: ${dbStatus.url}`
                  : 'Operating in self-contained offline-first mode. All modifications persist across reloads.'}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetDialogOpen(true)}
            icon={<RotateCcw className="w-3.5 h-3.5 text-rose-600" />}
            className="text-rose-700 border-rose-200 hover:bg-rose-50"
          >
            Reset Demo Data
          </Button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-navy-900 mb-1 flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-accent" />
            <span>Store Identity & Announcements</span>
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Changes update live across the customer website header, hero, and footer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Shop Name"
              required
              value={form.shop_name}
              onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
            />

            <Input
              label="Brand Tagline"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <Input
              label="Top Banner Announcement"
              placeholder="e.g. Free eye tests with every frame purchase!"
              value={form.announcement_text || ''}
              onChange={(e) => setForm({ ...form, announcement_text: e.target.value })}
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold text-navy-900 mb-1 flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-600" />
            <span>Direct Communication Channels</span>
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Configure the phone number for mobile calling and WhatsApp for direct customer enquiries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Store Phone"
              required
              leftIcon={<Phone className="w-4 h-4" />}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <Input
              label="WhatsApp Number (with country code)"
              required
              leftIcon={<MessageCircle className="w-4 h-4" />}
              value={form.whatsapp_number}
              onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
            />

            <Input
              label="Customer Support Email"
              type="email"
              leftIcon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        {/* Physical Showroom Location & Timings */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold text-navy-900 mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span>Showroom Location & Timings</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
                Physical Address
              </label>
              <textarea
                rows={2}
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Opening Hours Description"
                required
                leftIcon={<Clock className="w-4 h-4" />}
                value={form.opening_hours}
                onChange={(e) => setForm({ ...form, opening_hours: e.target.value })}
              />

              <Input
                label="Google Maps URL"
                required
                value={form.google_maps_url}
                onChange={(e) => setForm({ ...form, google_maps_url: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Social Links & Currency */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold text-navy-900 mb-1">Social Media & Currency</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <Input
              label="Instagram URL"
              leftIcon={<InstagramIcon className="w-4 h-4" />}
              value={form.instagram_url}
              onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
            />

            <Input
              label="Facebook URL"
              leftIcon={<FacebookIcon className="w-4 h-4" />}
              value={form.facebook_url}
              onChange={(e) => setForm({ ...form, facebook_url: e.target.value })}
            />

            <Input
              label="Currency Code"
              value={form.currency_symbol}
              onChange={(e) => setForm({ ...form, currency_symbol: e.target.value })}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            className="px-8 shadow-soft-md"
          >
            Save All Settings
          </Button>
        </div>
      </form>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset to Sample Demo Data?"
        message="This will re-initialize the optical products, categories, stock levels, and store settings with the realistic default dataset. Any custom items added during demo testing will be replaced."
        confirmText="Yes, Reset Data"
      />
    </div>
  );
};
