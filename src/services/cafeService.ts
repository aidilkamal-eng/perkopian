import { getActiveSupabaseClient } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Cafe = Database['public']['Tables']['cafes']['Row'];
type CafeInsert = Database['public']['Tables']['cafes']['Insert'];
type CafeUpdate = Database['public']['Tables']['cafes']['Update'];

const VALID_PRICE_LEVELS = ['$', '$$', '$$$'];
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
  async getCafes(): Promise<Cafe[]> {
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
  async getCafeById(id: string): Promise<Cafe | null> {
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
  async searchCafes(query: string, location?: string): Promise<Cafe[]> {
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

  // Filter cafes
  async filterCafes(filters: {
    wifiQuality?: number;
    powerOutlets?: number;
    noiseLevel?: number;
    priceLevel?: string;
    crowdedness?: number;
    comfort?: number;
  }): Promise<Cafe[]> {
    let queryBuilder = supabase.from('cafes').select('*');

    if (filters.wifiQuality && filters.wifiQuality > 0) {
      queryBuilder = queryBuilder.gte('wifi_rating', filters.wifiQuality);
    }

    if (filters.powerOutlets && filters.powerOutlets > 0) {
      queryBuilder = queryBuilder.gte('power_outlets', filters.powerOutlets);
    }

    if (filters.noiseLevel) {
      if (filters.noiseLevel === 1) {
        queryBuilder = queryBuilder.lte('noise_level', 2);
      } else if (filters.noiseLevel === 2) {
        queryBuilder = queryBuilder.gte('noise_level', 2).lte('noise_level', 3.5);
      } else if (filters.noiseLevel === 3) {
        queryBuilder = queryBuilder.gte('noise_level', 3.5);
      }
    }

    if (filters.priceLevel && VALID_PRICE_LEVELS.includes(filters.priceLevel)) {
      queryBuilder = queryBuilder.eq('price_level', filters.priceLevel);
    }

    if (filters.comfort && filters.comfort > 0) {
      queryBuilder = queryBuilder.gte('comfort', filters.comfort);
    }

    const { data, error } = await queryBuilder.order('overall_rating', { ascending: false });

    if (error) {
      console.error('Error filtering cafes:', error);
      throw error;
    }

    return data || [];
  },

  // Create a cafe
  async createCafe(cafe: CafeInsert): Promise<Cafe> {
    const { data, error } = await supabase
      .from('cafes')
      .insert({
        ...cafe,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating cafe:', error);
      throw error;
    }

    return data;
  },

  // Update a cafe
  async updateCafe(id: string, updates: CafeUpdate): Promise<Cafe> {
    const { data, error } = await supabase
      .from('cafes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating cafe:', error);
      throw error;
    }

    return data;
  },

  // Delete a cafe
  async deleteCafe(id: string): Promise<void> {
    const { error } = await supabase
      .from('cafes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting cafe:', error);
      throw error;
    }
  },

  // Add sample data
  async addSampleData(): Promise<void> {
    const now = new Date().toISOString();
    const sampleCafes: CafeInsert[] = [
      {
        name: 'Brew & Co.',
        description: 'A spacious café with industrial decor, plenty of seating, and a quiet atmosphere perfect for focused work.',
        address: '123 Main St, San Francisco, CA 94105',
        neighborhood: 'SoMa',
        image_url: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
        photos: [
          'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
          'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg'
        ],
        hours: 'Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm',
        price_level: '$$',
        overall_rating: 4.7,
        wifi_rating: 4.8,
        wifi_notes: 'Fast and reliable WiFi',
        power_outlets: 1,
        power_notes: 'Power outlets at most tables',
        noise_level: 2.1,
        noise_notes: 'Generally quiet',
        comfort: 4.6,
        comfort_notes: 'Comfortable seating',
        coffee_quality: 4.9,
        crowdedness: 2.8,
        review_count: 42,
        created_at: now,
        updated_at: now
      },
      {
        name: 'Digital Grounds',
        description: 'A tech-friendly café designed with remote workers in mind.',
        address: '456 Market St, San Francisco, CA 94105',
        neighborhood: 'Financial District',
        image_url: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
        photos: [
          'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg'
        ],
        hours: 'Mon-Fri: 6am-8pm, Sat-Sun: 7am-7pm',
        price_level: '$$$',
        overall_rating: 4.9,
        wifi_rating: 5.0,
        wifi_notes: 'Enterprise-grade WiFi',
        power_outlets: 5.0,
        power_notes: 'USB-C and standard outlets at every seat',
        noise_level: 1.8,
        noise_notes: 'Sound-dampening design',
        comfort: 4.8,
        comfort_notes: 'Ergonomic chairs',
        coffee_quality: 4.7,
        crowdedness: 3.2,
        review_count: 38,
        created_at: now,
        updated_at: now
      }
    ];

    await Promise.all(
      sampleCafes.map(async (cafe) => {
        try {
          await this.createCafe(cafe);
          console.log(`Added sample cafe: ${cafe.name}`);
        } catch (error) {
          console.warn(`Cafe ${cafe.name} might already exist or failed:`, error);
        }
      })
    );
  }
};