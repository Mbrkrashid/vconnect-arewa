import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yunndukwecnuirfoagmw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bm5kdWt3ZWNudWlyZm9hZ213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjY1NzAsImV4cCI6MjAyNTQwMjU3MH0.qDlZHnHGDqK-JxLLHYpxfPb8YrEPzaoXVVJyltBICbk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'vendors-connect-storage-key',
  },
});