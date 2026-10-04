import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Create Supabase client if credentials are present, otherwise a safe dummy client that won't crash
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

export interface DatabaseStatus {
  isConfigured: boolean;
  url: string;
  hasKey: boolean;
}

export function getDatabaseStatus(): DatabaseStatus {
  return {
    isConfigured: isSupabaseConfigured,
    url: supabaseUrl ? supabaseUrl.replace(/https:\/\/(.*)\.supabase\.co.*/, 'https://$1.supabase.co') : 'Not Configured',
    hasKey: Boolean(supabaseAnonKey),
  };
}
