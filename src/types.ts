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

// Supabase types
export interface SupabaseCafe {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  neighborhood: string | null;
  image_url: string | null;
  photos: string[];
  hours: string | null;
  google_maps_embed_url: string | null;
  price_level: string | null;
  overall_rating: number;
  wifi_rating: number;
  power_outlets: number;
  noise_level: number;
  comfort: number;
  coffee_quality: number;
  crowdedness: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseReview {
  id: string;
  cafe_id: string | null;
  user_id: string | null;
  comment: string | null;
  overall_rating: number | null;
  wifi_rating: number | null;
  power_outlets: number | null;
  noise_level: number | null;
  comfort: number | null;
  price_level: string | null;
  photos: string[];
  helpful_count: number;
  created_at: string;
}

// Helper functions to convert between formats
export function supabaseCafeToLocal(cafe: SupabaseCafe): Cafe {
  return {
    id: cafe.id,
    name: cafe.name,
    description: cafe.description || '',
    address: cafe.address || '',
    neighborhood: cafe.neighborhood || '',
    imageUrl: cafe.image_url || '/default_cafe_image.jpg',
    photos: cafe.photos,
    hours: cafe.hours || '',
    googleMapsEmbedUrl: cafe.google_maps_embed_url || null,
    priceLevel: cafe.price_level || '',
    overallRating: cafe.overall_rating,
    wifiRating: cafe.wifi_rating,
    powerOutlets: cafe.power_outlets,
    noiseLevel: cafe.noise_level,
    comfort: cafe.comfort,
    reviewCount: cafe.review_count,
    createdAt: cafe.created_at,
    updatedAt: cafe.updated_at,
  };
}

export function supabaseReviewToLocal(review: any, user: any): Review {
  return {
    id: review.id,
    cafeId: review.cafe_id || '',
    cafeName: review.cafes?.name ?? 'Unknown Cafe',
    user: {
      id: review.user_id || '',
      name: user?.name || 'Anonymous',
      avatar: user?.avatar_url || '/disposable-coffee-paper-cup-icon.png',
    },
    date: review.created_at,
    comment: review.comment || '',
    overallRating: review.overall_rating || 0,
    wifiRating: review.wifi_rating || 0,
    powerOutlets: review.power_outlets || 0,
    noiseLevel: review.noise_level || 0,
    comfort: review.comfort || 0,
    priceLevel: review.price_level || undefined,
    photos: review.photos,
    helpfulCount: review.helpful_count,
  };
}