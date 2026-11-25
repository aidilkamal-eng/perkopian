'use client';

import React, { useState } from 'react';
import { Star, Wifi, Battery, VolumeX, ThumbsUp } from 'lucide-react';
import RatingStars from './RatingStars';

interface ReviewData {
  overallRating: number;
  wifiRating: number;
  powerOutlets: number;
  noiseLevel: number;
  comfort: number;
  priceLevel: string;
  comment: string;
}

interface ReviewFormProps {
  initialData?: ReviewData;
  isEditing?: boolean;
  onSubmit: (review: ReviewData) => void;
  onCancel: () => void;
}

const labelClass = 'flex items-center font-heading text-base text-espresso mb-2';

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

    onSubmit({ overallRating, wifiRating, powerOutlets, noiseLevel, comfort, priceLevel, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-100 p-3 font-body text-sm text-red-700">{error}</div>
      )}

      <div>
        <label className={labelClass}>Rating Total *</label>
        <RatingStars rating={overallRating} size="lg" interactive onRatingChange={setOverallRating} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            <Wifi className="h-4 w-4 mr-2 text-espresso/70" />
            Kualitas WiFi
          </label>
          <RatingStars rating={wifiRating} interactive onRatingChange={setWifiRating} />
        </div>

        <div>
          <label className={labelClass}>
            <Battery className="h-4 w-4 mr-2 text-espresso/70" />
            Soket Listrik
          </label>
          <RatingStars rating={powerOutlets} interactive onRatingChange={setPowerOutlets} />
        </div>

        <div>
          <label className={labelClass}>
            <VolumeX className="h-4 w-4 mr-2 text-espresso/70" />
            Kebisingan
          </label>
          <RatingStars rating={noiseLevel} interactive onRatingChange={setNoiseLevel} />
        </div>

        <div>
          <label className={labelClass}>
            <ThumbsUp className="h-4 w-4 mr-2 text-espresso/70" />
            Kenyamanan
          </label>
          <RatingStars rating={comfort} interactive onRatingChange={setComfort} />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          <Star className="h-4 w-4 mr-2 text-espresso/70" />
          Harga
        </label>
        <div className="flex gap-2">
          {['$', '$$', '$$$'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPriceLevel(priceLevel === level ? '' : level)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
                priceLevel === level
                  ? 'bg-caramel text-white'
                  : 'bg-cream-dark text-espresso hover:bg-caramel/20'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className={labelClass}>
          Komentar *
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block w-full rounded-lg border border-caramel/30 bg-cream-light px-3 py-2 font-body text-sm text-espresso placeholder-gray-400 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel"
          placeholder="Ceritakan pengalamanmu bekerja dari warkop ini..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-caramel/40 bg-transparent px-5 py-2 font-body text-sm font-medium text-espresso transition-colors hover:bg-cream-dark"
        >
          Batal
        </button>
        <button
          type="submit"
          className="rounded-lg bg-caramel px-5 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-caramel/90"
        >
          {isEditing ? 'Perbarui Review' : 'Kirim Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;