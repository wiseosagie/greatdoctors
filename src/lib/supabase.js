import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xqqpiqxigsfvqnzvvzon.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcXBpcXhpZ3NmdnFuenZ2em9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MjU3MjIsImV4cCI6MjA5MTEwMTcyMn0.OLg4r8xgMn8sfO2_TmH1QU_GX1B59MU4yIecCpjJdT8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'wizzyquiztech@gmail.com'
