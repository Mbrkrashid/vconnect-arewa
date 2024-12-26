import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://yunndukwecnuirfoagmw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bm5kdWt3ZWNudWlyZm9hZ213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjY1NzAsImV4cCI6MjAyNTQwMjU3MH0.qDlZHVdt3kwFVvHoGBVJOsYZoUqYRGzxvBBEZzlE5Vc';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false
    }
  }
);