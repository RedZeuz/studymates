
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Use the Supabase URL and anon key from the project
const supabaseUrl = "https://tfqxeorgdtgrrfxmadsy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcXhlb3JnZHRncnJmeG1hZHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NzAxMzEsImV4cCI6MjA1OTA0NjEzMX0.My4K-XI47QouiYFVt1xbk19fbZ_nTSlPxiBFae240TQ"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
})
