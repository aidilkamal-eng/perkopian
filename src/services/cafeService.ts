import { getActiveSupabaseClient } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type CafeView = Database['public']['Views']['cafe_with_review_summary']['Row'];

const supabase = getActiveSupabaseClient();

export const cafeService = {
  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cafes')
        .select('id')
        .limit(1);
      return !error;
    } catch (err) {
      console.error('Supabase connection failed:', err);
      return false;
    }
  },

  // Get all cafes
  async getCafes(): Promise<CafeView[]> {
    const { data, error } = await supabase
      .from('cafe_with_review_summary')
      .select('*')
      .order('overall_rating', { ascending: false });

    if (error) {
      console.error('Error fetching cafes:', error);
      throw error;
    }

    return data || [];
  },

  // Get a cafe by ID
  async getCafeById(id: string): Promise<CafeView | null> {
    const { data, error } = await supabase
      .from('cafe_with_review_summary')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('Error fetching cafe by ID:', error);
      throw error;
    }

    return data;
  },

  // Search cafes
  async searchCafes(query: string, location?: string): Promise<CafeView[]> {
    let queryBuilder = supabase.from('cafe_with_review_summary').select('*');

    const filters: string[] = [];

    if (query) {
      filters.push(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (location) {
      filters.push(`neighborhood.ilike.%${location}%,address.ilike.%${location}%`);
    }

    if (filters.length > 0) {
      queryBuilder = queryBuilder.or(filters.join(','));
    }

    const { data, error } = await queryBuilder.order('overall_rating', { ascending: false });

    if (error) {
      console.error('Error searching cafes:', error);
      throw error;
    }

    return data || [];
  },
};