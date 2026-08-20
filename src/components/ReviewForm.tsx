import React, { useState } from 'react';
import { Star, Wifi, Battery, VolumeX, ThumbsUp } from 'lucide-react';
import RatingStars from './RatingStars';

interface ReviewFormProps {
  initialData?: {
    overallRating: number;
    wifiRating: number;
    powerOutlets: number;
    noiseLevel: number;
    comfort: number;
    priceLevel: string;
    comment: string;
  };
  isEditing?: boolean;
  onSubmit: (review: {
    overallRating: number;
    wifiRating: number;
    powerOutlets: number;
    noiseLevel: number;
    comfort: number;
    priceLevel: string;
    comment: string;
  }) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ initialData, isEditing = false, onSubmit, onCancel }) => {
  const [overallRating, setOverallRating] = useState(initialData?.overallRating || 0);
  const [wifiRating, setWifiRating] = useState(initialData?.wifiRating || 0);
  const [powerOutlets, setPowerOutlets] = useState(initialData?.powerOutlets || 0);
  const [noiseLevel, setNoiseLevel] = useState(initialData?.noiseLevel || 0);
  const [comfort, setComfort] = useState(initialData?.comfort || 0);
  const [priceLevel, setPriceLevel] = useState(initialData?.priceLevel || '');
  const [comment, setComment] = useState(initialData?.comment || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!overallRating) {
      setError('Silahkan masukkan rating keseluruhan');
      return;
    }

    if (!comment.trim()) {
      setError('Silahkan masukkan komentar review');
      return;
    }

    onSubmit({
      overallRating,
      wifiRating,
      powerOutlets,
      noiseLevel,
      comfort,
      priceLevel,
      comment
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating Total *
        </label>
        <RatingStars
          rating={overallRating}
          size="lg"
          interactive
          onRatingChange={setOverallRating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Wifi className="h-4 w-4 mr-1" />
              Kualitas WiFi
            </div>
          </label>
          <RatingStars
            rating={wifiRating}
            interactive
            onRatingChange={setWifiRating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Battery className="h-4 w-4 mr-1" />
              Soket Listrik
            </div>
          </label>
          <RatingStars
            rating={powerOutlets}
            interactive
            onRatingChange={setPowerOutlets}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <VolumeX className="h-4 w-4 mr-1" />
              Kebisingan
            </div>
          </label>
          <RatingStars
            rating={noiseLevel}
            interactive
            onRatingChange={setNoiseLevel}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Kenyamanan
            </div>
          </label>
          <RatingStars
            rating={comfort}
            interactive
            onRatingChange={setComfort}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Harga
          </div>
        </label>
        <div className="flex space-x-2">
          {['$', '$$', '$$$'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPriceLevel(priceLevel === level ? '' : level)}
              className={`px-4 py-2 rounded-full text-sm ${
                priceLevel === level
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Komentar *
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          placeholder="Share your experience working from this café..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md hover:bg-amber-700"
        >
          {isEditing ? 'Update Review' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;