import { getActiveSupabaseClient } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];
const supabase = getActiveSupabaseClient();

export interface ReviewWithUser extends Review {
  user_profiles: {
    name: string | null;
    avatar_url: string | null;
  } | null;
}

export const reviewService = {
  // Check if user has already reviewed a cafe
  async hasUserReviewedCafe(userId: string, cafeId: string): Promise<Review | null> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user_profiles (
          name,
          avatar_url
        )
      `)
      .eq('user_id', userId)
      .eq('cafe_id', cafeId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  },

  // Get reviews for a cafe
  async getReviewsByCafeId(cafeId: string): Promise<ReviewWithUser[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user_profiles (
          name,
          avatar_url
        )
      `)
      .eq('cafe_id', cafeId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  },

  // Get reviews by user
  async getReviewsByUserId(userId: string): Promise<(ReviewWithUser & { cafes: { name: string } })[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user_profiles (
          name,
          avatar_url
        ),
        cafes (
          name
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  },

  // Create review
  async createReview(review: ReviewInsert): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Update review
  async updateReview(id: string, updates: ReviewUpdate): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Delete review
  async deleteReview(id: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  },

  // Update helpful count
  async updateHelpfulCount(id: string, increment: boolean): Promise<void> {
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('helpful_count')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const newCount = increment 
      ? review.helpful_count + 1 
      : Math.max(0, review.helpful_count - 1);

    const { error } = await supabase
      .from('reviews')
      .update({ helpful_count: newCount })
      .eq('id', id);

    if (error) {
      throw error;
    }
  },

  // Add vote
  async markHelpful(reviewId: string, userId: string) {
    const { error } = await supabase
      .from('review_helpfuls')
      .insert({
        review_id: reviewId,
        user_id: userId
      });

    if (error) throw error;
  },

  // Remove vote
  async unmarkHelpful(reviewId: string, userId: string) {
    const { error } = await supabase
      .from('review_helpfuls')
      .delete()
      .eq('review_id', reviewId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  // Count votes
  async getHelpfulCount(reviewId: string) {
    const { count, error } = await supabase
      .from('review_helpfuls')
      .select('*', { count: 'exact', head: true })
      .eq('review_id', reviewId);

    if (error) throw error;

    return count ?? 0;
  },

  async hasUserVoted(reviewId: string, userId: string) {
    const { data, error } = await supabase
      .from('review_helpfuls')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;

    return !!data;
  },
};