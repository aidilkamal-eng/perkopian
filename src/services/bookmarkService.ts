import { getActiveSupabaseClient } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
type BookmarkInsert = Database['public']['Tables']['bookmarks']['Insert'];
type CafeSummary = Database['public']['Views']['cafe_with_review_summary']['Row'];

const supabase = getActiveSupabaseClient();

export interface BookmarkWithCafe {
  cafe_id: string;
  cafe_with_review_summary: CafeSummary;
}

export const bookmarkService = {
  // Get user's bookmarks
  async getUserBookmarks(userId: string) {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('cafe_id')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Get cafe details for each bookmarked cafe
    const cafeIds = data.map(bookmark => bookmark.cafe_id);
    
    const { data: cafes, error: cafeError } = await supabase
      .from('cafe_with_review_summary')
      .select('*')
      .in('id', cafeIds);

    if (cafeError) {
      throw cafeError;
    }

    return cafes || [];
  },

  // Check if cafe is bookmarked by user
  async isBookmarked(userId: string, cafeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('cafe_id', cafeId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return !!data;
  },

  // Add bookmark
  async addBookmark(userId: string, cafeId: string): Promise<Bookmark> {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: userId,
        cafe_id: cafeId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Remove bookmark
  async removeBookmark(userId: string, cafeId: string): Promise<void> {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('cafe_id', cafeId);

    if (error) {
      throw error;
    }
  },

  // Toggle bookmark
  async toggleBookmark(userId: string, cafeId: string): Promise<boolean> {
    const isCurrentlyBookmarked = await this.isBookmarked(userId, cafeId);

    if (isCurrentlyBookmarked) {
      await this.removeBookmark(userId, cafeId);
      return false;
    } else {
      await this.addBookmark(userId, cafeId);
      return true;
    }
  },
};