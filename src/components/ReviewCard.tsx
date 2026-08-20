import React, { useState, useEffect } from 'react';
import { ThumbsUp, Flag } from 'lucide-react';
import RatingStars from './RatingStars';
import { Review } from '../types';
import { useAuth } from '../hooks/useAuth';
import { reviewService } from '../services/reviewService';

interface ReviewCardProps {
  review: Review;
}

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

  const toggleHelpful = async () => {
    if (!user) return;
    if (hasVoted) {
      await reviewService.unmarkHelpful(review.id, user.id);
    } else {
      await reviewService.markHelpful(review.id, user.id);
    }

    const count = await reviewService.getHelpfulCount(review.id);
    setHelpfulCount(count);
    setHasVoted(!hasVoted);
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img 
            src={review.user.avatar} 
            alt={review.user.name} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="font-medium text-gray-900">{review.user.name}</h4>
            <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        </div>
        <RatingStars rating={review.overallRating} size="sm" />
      </div>
      
      <p className="text-gray-700 mb-4">{review.comment}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-xs text-gray-500">WiFi</p>
          <div className="flex items-center">
            <RatingStars rating={review.wifiRating} size="sm" />
            <span className="ml-1 text-sm">{review.wifiRating}</span>
          </div>
        </div>
        
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-xs text-gray-500">Soket Listrik</p>
          <div className="flex items-center">
            <RatingStars rating={review.powerOutlets} size="sm" />
            <span className="ml-1 text-sm">{review.powerOutlets}</span>
          </div>
        </div>
        
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-xs text-gray-500">Kebisingan</p>
          <div className="flex items-center">
            <RatingStars rating={6 - review.noiseLevel} size="sm" />
            <span className="ml-1 text-sm">{6 - review.noiseLevel}</span>
          </div>
        </div>
        
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-xs text-gray-500">Kenyamanan</p>
          <div className="flex items-center">
            <RatingStars rating={review.comfort} size="sm" />
            <span className="ml-1 text-sm">{review.comfort}</span>
          </div>
        </div>

        {review.priceLevel && (
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-xs text-gray-500">Harga</p>
          <div className="text-sm font-medium text-gray-700">{review.priceLevel}</div>
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
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      )}
      
      <div className="flex justify-between text-sm">
        <button
          onClick={async () => {
            if (!user) return; // maybe redirect login
            if (hasVoted) {
              await reviewService.unmarkHelpful(review.id, user.id);
            } else {
              await reviewService.markHelpful(review.id, user.id);
            }
            const count = await reviewService.getHelpfulCount(review.id);
            setHelpfulCount(count);
            setHasVoted(!hasVoted);
          }}
          className={`flex items-center ${hasVoted ? 'text-amber-600' : 'text-gray-500'} hover:text-amber-700`}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Membantu ({helpfulCount})
        </button> 
      </div>
    </div>
  );
};

export default ReviewCard;