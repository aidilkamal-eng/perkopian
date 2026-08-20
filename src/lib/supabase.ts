import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Session (temporary login)
export const supabaseSession = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: sessionStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Local (remember me login)
export const supabaseLocal = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function getActiveSupabaseClient() {
  const localSession = localStorage.getItem('supabase.auth.token');
  const sessionSession = sessionStorage.getItem('supabase.auth.token');

  if (localSession) return supabaseLocal;
  if (sessionSession) return supabaseSession;

  // Default fallback
  return supabaseSession;
};


// Database types
export interface Database {
  public: {
    Tables: {
      cafes: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          neighborhood: string | null
          image_url: string | null
          photos: string[]
          hours: string | null
          google_maps_embed_url: string | null
          price_level: string | null
          overall_rating: number
          wifi_rating: number
          power_outlets: number
          noise_level: number
          comfort: number
          coffee_quality: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address?: string | null
          neighborhood?: string | null
          image_url?: string | null
          photos?: string[]
          hours?: string | null
          google_maps_embed_url?: string | null
          price_level?: string | null
          overall_rating?: number
          wifi_rating?: number
          power_outlets?: number
          noise_level?: number
          comfort?: number
          coffee_quality?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          neighborhood?: string | null
          image_url?: string | null
          photos?: string[]
          hours?: string | null
          google_maps_embed_url?: string | null
          price_level?: string | null
          overall_rating?: number
          wifi_rating?: number
          power_outlets?: number
          noise_level?: number
          comfort?: number
          coffee_quality?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          name: string | null
          bio: string | null
          location: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          cafe_id: string | null
          user_id: string | null
          comment: string | null
          overall_rating: number | null
          wifi_rating: number | null
          power_outlets: number | null
          noise_level: number | null
          comfort: number | null
          photos: string[]
          helpful_count: number
          created_at: string
        }
        Insert: {
          id?: string
          cafe_id?: string | null
          user_id?: string | null
          comment?: string | null
          overall_rating?: number | null
          wifi_rating?: number | null
          power_outlets?: number | null
          noise_level?: number | null
          comfort?: number | null
          photos?: string[]
          helpful_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          cafe_id?: string | null
          user_id?: string | null
          comment?: string | null
          overall_rating?: number | null
          wifi_rating?: number | null
          power_outlets?: number | null
          noise_level?: number | null
          comfort?: number | null
          photos?: string[]
          helpful_count?: number
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string | null
          cafe_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          cafe_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          cafe_id?: string | null
          created_at?: string
        }
      }
    }
  }
}