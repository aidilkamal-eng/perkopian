import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Wifi, Battery, VolumeX, 
  ThumbsUp, Share2, Bookmark, Star, Plus, ChevronDown, ChevronUp, Edit, Trash2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { bookmarkService } from '../services/bookmarkService';
import { useCafe } from '../hooks/useCafes';
import { useReviews } from '../hooks/useReviews';

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
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
  
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calculateAverage = (key: keyof typeof reviews[0]) =>
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
        <Link to="/cafes" className="text-amber-600 hover:text-amber-800">
          Kembali ke daftar warkop
        </Link>
      </div>
    );
  }
  
  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsEditingReview(false);
    setShowReviewForm(true);
  };
  
  const displayedPhotos = showAllPhotos ? cafe.photos : cafe.photos.slice(0, 4);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  
  const toggleBookmark = async () => {
    if (!isAuthenticated) {
      navigate('/login');
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

  console.log('Embed URL:', cafe?.googleMapsEmbedUrl);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/cafes" className="hover:text-amber-600">Warkop</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{cafe.name}</span>
        </nav>
      </div>
      
      {/* Café Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img 
            src={cafe.imageUrl} 
            alt={cafe.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{cafe.name}</h1>
                <div className="flex items-center text-amber-200 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{cafe.neighborhood}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-amber-600 text-white px-2 py-1 rounded-md mr-3">
                    <Star className="h-4 w-4 mr-1 fill-white" />
                    <span className="font-bold">{avgOverall.toFixed(1)}</span>
                  </div>
                  <span className="text-white">({reviews.length} review)</span>
                </div>
              </div>
              
              <div className="flex mt-4 md:mt-0">
                <button className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center mr-2">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button 
                  className={`${isBookmarked ? 'bg-amber-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'} px-4 py-2 rounded-md flex items-center`}
                  onClick={toggleBookmark}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-white' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Photos */}
          {cafe.photos.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Foto</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {displayedPhotos.map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt={`${cafe.name} interior ${index + 1}`} 
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
                {cafe.photos.length > 4 && (
                  <button 
                    className="mt-4 text-amber-600 hover:text-amber-800 flex items-center"
                    onClick={() => setShowAllPhotos(!showAllPhotos)}
                  >
                    {showAllPhotos ? (
                      <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
                    ) : (
                      <>View all {cafe.photos.length} foto <ChevronDown className="h-4 w-4 ml-1" /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang</h2>
              <p className="text-gray-700 mb-4">{cafe.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Alamat</h3>
                  <p className="text-gray-900">{cafe.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Jam Buka</h3>
                  <p className="text-gray-900">{cafe.hours}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Harga</h3>
                  <p className="text-gray-900">{getMostCommonPriceLevel()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* WFC Ratings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rating</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Wifi className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="font-medium">Kualitas WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rating={avgWifi} size="sm" />
                        <span className="ml-2 font-bold">{avgWifi.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Battery className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="font-medium">Soket Listrik</span>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rating={avgPower} size="sm" />
                        <span className="ml-2 font-bold">{avgPower.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <VolumeX className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="font-medium">Kebisingan</span>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rating={6 - avgNoise} size="sm" />
                        <span className="ml-2 font-bold">{avgNoise.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="font-medium">Kenyamanan</span>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rating={avgComfort} size="sm" />
                        <span className="ml-2 font-bold">{avgComfort.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Review</h2>
                <div className="flex space-x-2">
                  {userReview ? (
                    <>
                      <button 
                        onClick={handleEditReview}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Review
                      </button>
                      <button 
                        onClick={handleDeleteReview}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={handleWriteReview}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tulis Review
                    </button>
                  )}
                </div>
              </div>

              {showReviewForm && (
                <div className="mb-6 bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {isEditingReview ? 'Edit Review' : 'Tambahkan Review'}
                  </h3>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {submitError}
                    </div>
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
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedReviews.length > 0 ? (
                <div>
                  {/* Show user's review first if it exists */}
                  {userReview && (
                    <div className="mb-6 border-2 border-amber-200 rounded-lg">
                      <div className="bg-amber-50 px-4 py-2 rounded-t-lg">
                        <span className="text-sm font-medium text-amber-800">Review Anda</span>
                      </div>
                      <div className="p-4">
                        <ReviewCard 
                          review={userReview}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Show other reviews */}
                  {displayedReviews.map(review => (
                    // Don't show user's review again in the main list
                    review.id !== userReview?.id && (
                      <ReviewCard 
                        key={review.id} 
                        review={review}
                      />
                    )
                  ))}
                  
                  {reviews.length > 3 && (
                    <button 
                      className="mt-4 text-amber-600 hover:text-amber-800 flex items-center"
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
                  <p className="text-gray-500 mb-4">
                    {userReview ? 'Belum ada review lain.' : 'Belum ada review. Jadilah yang pertama!'}
                  </p>
                  {!userReview && (
                    <button
                      onClick={handleWriteReview}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      Tulis Review
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Lokasi</h3>
              {cafe.googleMapsEmbedUrl ? (
                <div className="rounded overflow-hidden mb-4">
                  <iframe
                    src={cafe.googleMapsEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 h-48 rounded flex items-center justify-center mb-3">
                  <p className="text-gray-500">Peta belum tersedia</p>
                </div>
              )}
              <p className="text-gray-700">{cafe.address}</p>
            </div>
          </div>
          
          {/* Hours */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-gray-700 mr-2" />
                <h3 className="font-bold text-gray-900">Jam Buka</h3>
              </div>
              <p className="text-gray-700">{cafe.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetailPage;