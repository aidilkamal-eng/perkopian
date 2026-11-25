'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, Clock, Wifi, Battery, VolumeX, Tag, ExternalLink, Coffee, 
  ThumbsUp, Share2, Bookmark, Star, Plus, ChevronDown, ChevronUp, Edit, Trash2,
  Section
} from 'lucide-react';
import SectionFrame from '../components/SectionFrame';
import { useAuth } from '../hooks/useAuth';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { bookmarkService } from '../services/bookmarkService';
import { useCafe } from '../hooks/useCafes';
import { useReviews } from '../hooks/useReviews';

const RatingRow = ({
  icon: Icon,
  label,
  value,
  stars,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  stars: number;
}) => (
  <div className="flex items-center justify-between gap-3">
    <span className="flex items-center font-heading text-lg text-espresso">
      <Icon className="h-5 w-5 mr-3 text-espresso/70" />
      {label}
    </span>
    <div className="flex items-center">
      <RatingStars rating={stars} size="sm" />
      <span className="ml-2 w-8 font-body font-bold text-espresso">{value.toFixed(1)}</span>
    </div>
  </div>
);

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const { cafe, loading: cafeLoading, error: cafeError } = useCafe(id!);
  const { reviews, userReview, loading: reviewsLoading, addReview, updateReview, deleteReview, checkUserReview } = useReviews(id!);

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if user has already reviewed this cafe
  useEffect(() => {
    if (user && cafe?.id) {
      checkUserReview(user.id);
    }
  }, [user, cafe?.id, checkUserReview]);

  // 🧠 useEffect to check bookmark status
  useEffect(() => {
    const checkBookmark = async () => {
      if (user && cafe?.id) {
        try {
          const bookmarked = await bookmarkService.isBookmarked(user.id, cafe.id);
          setIsBookmarked(bookmarked);
        } catch (err) {
          console.error('Failed to fetch bookmark status:', err);
        }
      }
    };

    checkBookmark();
  }, [user, cafe]);
  
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calculateAverage = (
    key: 'overallRating' | 'wifiRating' | 'powerOutlets' | 'noiseLevel' | 'comfort'
  ) =>
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + (r[key] || 0), 0) / reviews.length
      : 0;

  const avgWifi = calculateAverage('wifiRating');
  const avgPower = calculateAverage('powerOutlets');
  const avgNoise = calculateAverage('noiseLevel');
  const avgComfort = calculateAverage('comfort');
  const avgOverall = calculateAverage('overallRating');

  const getMostCommonPriceLevel = () => {
    const counts: Record<string, number> = {};

    for (const review of reviews) {
      const price = review.priceLevel || '';
      counts[price] = (counts[price] || 0) + 1;
    }

    let mostCommon = '';
    let maxCount = 0;
    for (const price in counts) {
      if (counts[price] > maxCount) {
        maxCount = counts[price];
        mostCommon = price;
      }
    }

    return mostCommon || '-';
  };

  const handleReviewSubmit = async (reviewData: {
    overallRating: number;
    wifiRating: number;
    powerOutlets: number;
    noiseLevel: number;
    comfort: number;
    priceLevel: string;
    comment: string;
  }) => {
    if (!user) return;

    try {
      setSubmitError('');
      if (isEditingReview && userReview) {
        await updateReview(userReview.id, reviewData);
        setIsEditingReview(false);
      } else {
        await addReview(reviewData, user.id);
      }
      setShowReviewForm(false);
      // Refresh user review status
      await checkUserReview(user.id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save review');
    }
  };

  const handleEditReview = () => {
    setIsEditingReview(true);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async () => {
    if (!userReview || !user) return;
    
    if (window.confirm('Apakah Anda yakin ingin menghapus review ini?')) {
      try {
        await deleteReview(userReview.id);
        await checkUserReview(user.id);
      } catch (err) {
        console.error('Failed to delete review:', err);
      }
    }
  };
  
  if (cafeLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="bg-gray-200 h-48 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-200 h-32 rounded-lg"></div>
              <div className="bg-gray-200 h-24 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cafeError || !cafe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-red-600 text-lg mb-4">
          {cafeError || 'Warkop tidak ditemukan'}
        </p>
        <Link href="/cafes" className="text-amber-600 hover:text-amber-800">
          Kembali ke daftar warkop
        </Link>
      </div>
    );
  }
  
  const handleWriteReview = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setIsEditingReview(false);
    setShowReviewForm(true);
  };
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  
  const toggleBookmark = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      if (!user || !cafe) return;
      const newStatus = await bookmarkService.toggleBookmark(user.id, cafe.id);
      setIsBookmarked(newStatus);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cafe.name} ${cafe.address}`
  )}`;
  
  return (
    <div className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero card */}
        <div className="bg-[url('/detail-hero-frame.png')] bg-[length:100%_100%] bg-no-repeat p-6 md:p-10 mb-10">
          <nav className="font-body text-xs text-espresso/60 mb-4 px-1">
            <Link href="/" className="hover:text-caramel">Home</Link>
            <span className="mx-2">{`>`}</span>
            <Link href="/cafes" className="hover:text-caramel">Warkop</Link>
            <span className="mx-2">{`>`}</span>
            <span className="text-espresso">{cafe.name}</span>
          </nav>

          <div className="relative h-72 md:h-80 rounded-xl overflow-hidden">
            <img
              src={cafe.imageUrl}
              alt={cafe.name}
              className="absolute inset-y-0 right-0 w-[70%] h-full object-cover"
            />
            <div className="absolute inset-y-0 right-0 w-[70%] bg-gradient-to-r from-[#fdebc9] via-cream-light/40 via-25% to-transparent to-50%" />

            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10">
              <span className="inline-flex items-center self-start rounded-full border border-caramel/50 bg-cream-light/70 px-3 py-1 font-body text-sm text-espresso">
                <Coffee className="h-4 w-4 mr-1.5 text-caramel" />
                Warkop
              </span>
              <h1 className="mt-3 font-heading text-4xl md:text-5xl text-espresso">{cafe.name}</h1>
              <p className="mt-3 flex items-center font-heading text-xl text-espresso">
                <MapPin className="h-5 w-5 mr-2" />
                {cafe.neighborhood}
              </p>
              <div className="mt-4 flex items-center font-body">
                <span className="flex items-center rounded-md bg-caramel px-3 py-1.5 text-white font-semibold">
                  <Star className="h-4 w-4 mr-1.5 fill-white" />
                  {avgOverall.toFixed(1)}
                </span>
                <span className="ml-4 text-espresso">
                  ({reviews.length} review)
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex gap-3 font-body text-sm">
              <button className="flex items-center rounded-lg bg-cream-light px-4 py-2 text-espresso hover:bg-white transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={toggleBookmark}
                className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
                  isBookmarked ? 'bg-caramel text-white' : 'bg-cream-light text-espresso hover:bg-white'
                }`}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-white' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* 01 Tentang */}
            <SectionFrame number="01" title="Tentang">
              {cafe.description && (
                <p className="font-body text-espresso/80 mb-5">{cafe.description}</p>
              )}
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="flex items-center font-heading text-base text-espresso/70 mb-1.5">
                    <MapPin className="h-4 w-4 mr-2" /> Alamat
                  </p>
                  <p className="font-heading text-base text-espresso">{cafe.address}</p>
                </div>
                <div>
                  <p className="flex items-center font-heading text-base text-espresso/70 mb-1.5">
                    <Clock className="h-4 w-4 mr-2" /> Jam Buka
                  </p>
                  <p className="font-heading text-base text-espresso">{cafe.hours}</p>
                </div>
                <div>
                  <p className="flex items-center font-heading text-base text-espresso/70 mb-1.5">
                    <Tag className="h-4 w-4 mr-2" /> Harga
                  </p>
                  <p className="font-heading text-base text-espresso">{getMostCommonPriceLevel()}</p>
                </div>
              </div>
            </SectionFrame>

            {/* 02 Rating */}
            <SectionFrame number="02" title="Rating">
              <div className="grid md:grid-cols-2 gap-6 md:gap-0">
                <div className="space-y-4 md:pr-8 md:border-r md:border-caramel/30">
                  <RatingRow icon={Wifi} label="Kualitas WiFi" value={avgWifi} stars={avgWifi} />
                  <RatingRow icon={Battery} label="Soket Listrik" value={avgPower} stars={avgPower} />
                  <RatingRow icon={VolumeX} label="Kebisingan" value={avgNoise} stars={6 - avgNoise} />
                </div>
                <div className="md:pl-8">
                  <RatingRow icon={ThumbsUp} label="Kenyamanan" value={avgComfort} stars={avgComfort} />
                </div>
              </div>
            </SectionFrame>

            {/* 03 Review */}
            <SectionFrame
              number="03"
              title="Review"
              action={
                userReview ? (
                  <div className="flex gap-2 font-body text-sm">
                    <button
                      onClick={handleEditReview}
                      className="flex items-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteReview}
                      className="flex items-center rounded-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleWriteReview}
                    className="flex items-center rounded-lg bg-caramel hover:bg-caramel/90 text-white px-5 py-2 font-body text-sm font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tulis Review
                  </button>
                )
              }
            >
              {showReviewForm && (
                <div className="mb-6 rounded-lg bg-cream-light p-6 border border-caramel/20">
                  <h3 className="font-heading text-xl text-espresso mb-4">
                    {isEditingReview ? 'Edit Review' : 'Tambahkan Review'}
                  </h3>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{submitError}</div>
                  )}
                  <ReviewForm
                    initialData={isEditingReview && userReview ? {
                      overallRating: userReview.overallRating,
                      wifiRating: userReview.wifiRating,
                      powerOutlets: userReview.powerOutlets,
                      noiseLevel: userReview.noiseLevel,
                      comfort: userReview.comfort,
                      priceLevel: userReview.priceLevel || '',
                      comment: userReview.comment,
                    } : undefined}
                    isEditing={isEditingReview}
                    onSubmit={handleReviewSubmit}
                    onCancel={() => {
                      setShowReviewForm(false);
                      setIsEditingReview(false);
                    }}
                  />
                </div>
              )}

              {reviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-cream-dark rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-cream-dark rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-cream-dark rounded w-full mb-2"></div>
                          <div className="h-3 bg-cream-dark rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedReviews.length > 0 ? (
                <div>
                  {userReview && (
                    <div className="mb-6 border-2 border-caramel/30 rounded-lg">
                      <div className="bg-cream-dark px-4 py-2 rounded-t-lg">
                        <span className="font-body text-sm font-medium text-espresso">Review Anda</span>
                      </div>
                      <div className="p-4">
                        <ReviewCard review={userReview} />
                      </div>
                    </div>
                  )}

                  {displayedReviews.map((review) =>
                    review.id !== userReview?.id && (
                      <ReviewCard key={review.id} review={review} />
                    )
                  )}

                  {reviews.length > 3 && (
                    <button
                      className="mt-4 font-body text-sm text-caramel hover:text-espresso flex items-center"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? (
                        <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
                      ) : (
                        <>View all {reviews.length} review <ChevronDown className="h-4 w-4 ml-1" /></>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-body text-espresso/60 mb-4">
                    {userReview ? 'Belum ada review lain.' : 'Belum ada review. Jadilah yang pertama!'}
                  </p>
                  {!userReview && (
                    <button onClick={handleWriteReview} className="font-body text-caramel hover:text-espresso">
                      Tulis Review
                    </button>
                  )}
                </div>
              )}
            </SectionFrame>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[url('/detail-side-map-card.png')] bg-[length:100%_100%] bg-no-repeat p-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center font-heading text-2xl text-espresso">
                  <MapPin className="h-5 w-5 mr-2" />
                  Lokasi
                </h3>
              </div>

              {cafe.googleMapsEmbedUrl ? (
                <div className="rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={cafe.googleMapsEmbedUrl}
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="bg-cream-dark h-48 rounded-lg flex items-center justify-center mb-4">
                  <p className="font-body text-espresso/60">Peta belum tersedia</p>
                </div>
              )}

              <p className="flex font-body text-sm text-espresso">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                {cafe.address}
              </p>
            </div>

            <div className="bg-[url('/detail-side-open-hours-card.png')] bg-[length:100%_100%] bg-no-repeat p-7">
              <h3 className="flex items-center font-heading text-2xl text-espresso mb-2">
                <Clock className="h-5 w-5 mr-2" />
                Jam Buka
              </h3>
              <p className="font-heading text-base text-espresso">{cafe.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetailPage;