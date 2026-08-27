import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Session (temporary login)
export const supabaseSession = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: sessionStorage,
    storageKey: 'sb-session-auth-token',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Local (remember me login)
export const supabaseLocal = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    storageKey: 'sb-local-auth-token',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

let activeClient = supabaseSession;

export function setActiveSupabaseClient(client: SupabaseClient<Database>) {
  activeClient = client;
}

export function getActiveSupabaseClient() {
  return activeClient;
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
          price_level: string | null
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
          price_level?: string | null
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
          price_level?: string | null
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

    Views: {
      cafe_with_review_summary: {
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
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
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
          review_count: number
          created_at: string
          updated_at: string
        }
        Update: {
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
          review_count: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}