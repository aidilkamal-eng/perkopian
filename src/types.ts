import type { Database } from "./lib/database.types";

type CafeRow = Database['public']['Views']['cafe_with_review_summary']['Row'];
type ReviewRow = Database['public']['Tables']['reviews']['Row'];

export interface Cafe {
  id: string;
  name: string;
  description: string;
  address: string;
  neighborhood: string;
  imageUrl: string;
  photos: string[];
  hours: string;
  googleMapsEmbedUrl: string | null;
  overallRating: number;
  wifiRating: number;
  powerOutlets: number;
  noiseLevel: number;
  comfort: number;
  priceLevel: string | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CafeFilters {
  wifiQuality: number;
  powerOutlets: number;
  noiseLevel: number;
  priceLevel: string;
  comfort: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Review {
  id: string;
  cafeId: string;
  cafeName?: string;
  user: User;
  date: string;
  comment: string;
  overallRating: number;
  wifiRating: number;
  powerOutlets: number;
  noiseLevel: number;
  comfort: number;
  priceLevel?: string;
  photos?: string[];
  helpfulCount: number;
}

// Helper functions to convert between formats
export function supabaseCafeToLocal(cafe: CafeRow): Cafe {
  return {
    id: cafe.id ?? '',
    name: cafe.name ?? '',
    description: cafe.description ?? '',
    address: cafe.address ?? '',
    neighborhood: cafe.neighborhood ?? '',
    imageUrl: cafe.image_url || '/default_cafe_image.jpg',
    photos: cafe.photos ?? [],
    hours: cafe.hours ?? '',
    googleMapsEmbedUrl: cafe.google_maps_embed_url || null,
    priceLevel: cafe.price_level || '',
    overallRating: cafe.overall_rating ?? 0,
    wifiRating: cafe.wifi_rating ?? 0,
    powerOutlets: cafe.power_outlets ?? 0,
    noiseLevel: cafe.noise_level ?? 0,
    comfort: cafe.comfort ?? 0,
    reviewCount: cafe.review_count ?? 0,
    createdAt: cafe.created_at ?? '',
    updatedAt: cafe.updated_at ?? '',
  };
}

export interface SupabaseProfile {
  name: string | null;
  avatar_url: string | null;
}

export type SupabaseReviewWithJoins = ReviewRow & {
  cafes?: { name: string } | null;
};

export function supabaseReviewToLocal(
  review: SupabaseReviewWithJoins,
  user: SupabaseProfile | null
): Review {
  return {
    id: review.id,
    cafeId: review.cafe_id || '',
    cafeName: review.cafes?.name ?? 'Unknown Cafe',
    user: {
      id: review.user_id || '',
      name: user?.name || 'Anonymous',
      avatar: user?.avatar_url || '/disposable-coffee-paper-cup-icon.png',
    },
    date: review.created_at ?? '',
    comment: review.comment || '',
    overallRating: review.overall_rating || 0,
    wifiRating: review.wifi_rating || 0,
    powerOutlets: review.power_outlets || 0,
    noiseLevel: review.noise_level || 0,
    comfort: review.comfort || 0,
    priceLevel: review.price_level || undefined,
    photos: review.photos ?? [],
    helpfulCount: review.helpful_count ?? 0,
  };
}