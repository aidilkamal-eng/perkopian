import { useState, useEffect } from 'react';
import { reviewService } from '../services/reviewService';
import { supabaseReviewToLocal } from '../types';
import type { Review } from '../types';
import type { ReviewWithUser } from '../services/reviewService';

export function useReviews(cafeId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cafeId) {
      loadReviews();
    }
  }, [cafeId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reviewService.getReviewsByCafeId(cafeId);
      const localReviews = data.map((review: ReviewWithUser) => 
        supabaseReviewToLocal(review, review.user_profiles)
      );
      setReviews(localReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkUserReview = async (userId: string) => {
    try {
      const existingReview = await reviewService.hasUserReviewedCafe(userId, cafeId);
      if (existingReview) {
        const localReview = supabaseReviewToLocal(existingReview, existingReview.user_profiles);
        setUserReview(localReview);
      } else {
        setUserReview(null);
      }
    } catch (err) {
      console.error('Error checking user review:', err);
    }
  };

  const addReview = async (reviewData: {
    overallRating: number;
    wifiRating: number;
    powerOutlets: number;
    noiseLevel: number;
    comfort: number;
    priceLevel: string;
    comment: string;
  }, userId: string) => {
    try {
      await reviewService.createReview({
        cafe_id: cafeId,
        user_id: userId,
        comment: reviewData.comment,
        overall_rating: reviewData.overallRating,
        wifi_rating: reviewData.wifiRating,
        power_outlets: reviewData.powerOutlets,
        noise_level: reviewData.noiseLevel,
        comfort: reviewData.comfort,
        price_level: reviewData.priceLevel,
      });
      
      // Reload reviews after adding
      await loadReviews();
    } catch (err) {
      throw err;
    }
  };

  const updateReview = async (reviewId: string, reviewData: {
    overallRating: number;
    wifiRating: number;
    powerOutlets: number;
    noiseLevel: number;
    comfort: number;
    priceLevel: string;
    comment: string;
  }) => {
    try {
      await reviewService.updateReview(reviewId, {
        comment: reviewData.comment,
        overall_rating: reviewData.overallRating,
        wifi_rating: reviewData.wifiRating,
        power_outlets: reviewData.powerOutlets,
        noise_level: reviewData.noiseLevel,
        comfort: reviewData.comfort,
        price_level: reviewData.priceLevel,
      });
      
      // Reload reviews after updating
      await loadReviews();
    } catch (err) {
      throw err;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await reviewService.deleteReview(reviewId);
      
      // Reload reviews after deleting
      await loadReviews();
      setUserReview(null);
    } catch (err) {
      throw err;
    }
  };

  const refreshReviews = () => {
    loadReviews();
  };

  const updateHelpfulCount = async (reviewId: string, increment: boolean) => {
    try {
      await reviewService.updateHelpfulCount(reviewId, increment);
      await loadReviews();
    } catch (err) {
      console.error('Failed to update helpful count:', err);
    }
  };

  return {
    reviews,
    userReview,
    loading,
    error,
    addReview,
    updateReview,
    deleteReview,
    checkUserReview,
    refreshReviews,
    updateHelpfulCount,
  };
}

export function useUserReviews(userId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadUserReviews();
    }
  }, [userId]);

  const loadUserReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reviewService.getReviewsByUserId(userId);
      const localReviews = data.map((review: ReviewWithUser) => 
        supabaseReviewToLocal(review, review.user_profiles)
      );
      setReviews(localReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user reviews');
      console.error('Error loading user reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    refreshReviews: loadUserReviews,
  };
}