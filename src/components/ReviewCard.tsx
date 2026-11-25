'use client';

import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import RatingStars from './RatingStars';
import { Review } from '../types';
import { useAuth } from '../hooks/useAuth';
import { reviewService } from '../services/reviewService';

interface ReviewCardProps {
  review: Review;
}

const MetricChip = ({
  label,
  rating,
  display,
}: {
  label: string;
  rating: number;
  display: number;
}) => (
  <div className="rounded-lg bg-cream-dark/60 px-2.5 py-2">
    <p className="font-heading text-xs text-espresso/70 mb-1">{label}</p>
    <div className="flex items-center">
      <RatingStars rating={rating} size="xs" />
      <span className="ml-1 font-body text-xs text-espresso">{display}</span>
    </div>
  </div>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth(); // assuming you have a hook for current user

  useEffect(() => {
    const load = async () => {
      const count = await reviewService.getHelpfulCount(review.id);
      const voted = user ? await reviewService.hasUserVoted(review.id, user.id) : false;
      setHelpfulCount(count);
      setHasVoted(voted);
    };
    load();
  }, [review.id, user?.id]);

  const handleHelpful = async () => {
    if (!user) return;
    if (hasVoted) {
      await reviewService.unmarkHelpful(review.id, user.id);
    } else {
      await reviewService.markHelpful(review.id, user.id);
    }
    const count = await reviewService.getHelpfulCount(review.id);
    setHelpfulCount(count);
    setHasVoted(!hasVoted);
  };
  
  return (
    <div className="mb-4 rounded-xl border border-caramel/20 bg-cream-light p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="h-12 w-12 rounded-lg bg-cream-dark object-cover mr-3"
          />
          <div>
            <h4 className="font-heading text-lg text-espresso leading-tight">{review.user.name}</h4>
            <p className="font-body text-xs text-espresso/60">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <RatingStars rating={review.overallRating} size="sm" />
          <span className="ml-1 font-body text-sm text-espresso">{review.overallRating.toFixed(1)}</span>
        </div>
      </div>

      <p className="font-body text-espresso mb-4">{review.comment}</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        <MetricChip label="WiFi" rating={review.wifiRating} display={review.wifiRating} />
        <MetricChip label="Soket Listrik" rating={review.powerOutlets} display={review.powerOutlets} />
        <MetricChip label="Kebisingan" rating={6 - review.noiseLevel} display={6 - review.noiseLevel} />
        <MetricChip label="Kenyamanan" rating={review.comfort} display={review.comfort} />
        {review.priceLevel && (
          <div className="rounded-lg bg-cream-dark/60 px-2.5 py-2">
            <p className="font-heading text-xs text-espresso/70 mb-1">Harga</p>
            <p className="font-body text-sm text-espresso">{review.priceLevel}</p>
          </div>
        )}
      </div>

      {review.photos && review.photos.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review photo ${index + 1}`}
              className="h-24 w-24 rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      <div className="border-t border-caramel/20 pt-3">
        <button
          onClick={handleHelpful}
          className={`flex items-center font-body text-sm transition-colors ${
            hasVoted ? 'text-caramel' : 'text-espresso/70'
          } hover:text-caramel`}
        >
          <ThumbsUp className={`h-4 w-4 mr-1.5 ${hasVoted ? 'fill-caramel' : ''}`} />
          Membantu ({helpfulCount})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;