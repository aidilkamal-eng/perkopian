import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export type { Database }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const isBrowser = typeof window !== 'undefined'

// Session (temporary login)
export const supabaseSession = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: isBrowser ? sessionStorage : undefined,
    storageKey: 'sb-session-auth-token',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: isBrowser,
  },
});

// Local (remember me login)
export const supabaseLocal = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: isBrowser ? localStorage : undefined,
    storageKey: 'sb-local-auth-token',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: isBrowser,
  },
});

let activeClient = supabaseSession;

export function setActiveSupabaseClient(client: SupabaseClient<Database>) {
  activeClient = client;
}

export function getActiveSupabaseClient() {
  return activeClient;
};