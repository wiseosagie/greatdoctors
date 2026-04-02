import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a real client if keys exist, otherwise a dummy that won't crash
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured yet.' } }),
        signUp: async () => ({ error: { message: 'Supabase not configured yet.' } }),
        signOut: async () => {},
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase not configured yet.' } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
        insert: async () => ({ error: null }),
      }),
    }

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || ''
