import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yunndukwecnuirfoagmw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bm5kdWt3ZWNudWlyZm9hZ213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjU2MDAsImV4cCI6MjAyNTQwMTYwMH0.qDlZHVdt3koBMsNwa2L1wz0pVlXWHcmDV9DPY7Qk1Hs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})