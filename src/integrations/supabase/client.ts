import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://yunndukwecnuirfoagmw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bm5kdWt3ZWNudWlyZm9hZ213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTg0NjAsImV4cCI6MjAxODczNDQ2MH0.HfNtqEhQWbvs5AxzhvfMXvHE7HfqXFDqW1GM9bGrIQM';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    }
  }
);