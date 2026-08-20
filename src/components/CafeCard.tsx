import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Battery, VolumeX, Coffee, Star } from 'lucide-react';
import { Cafe } from '../types';

interface CafeCardProps {
  cafe: Cafe;
}

const safeToFixed = (value: number | null | undefined, digits: number = 1) =>
  typeof value === 'number' ? value.toFixed(digits) : 'N/A';

const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  return (
    <Link to={`/cafes/${cafe.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={cafe?.imageUrl || '/default_cafe_image.jpg'} 
            alt={cafe.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-bold text-xl">{cafe.name}</h3>
            <p className="text-amber-200 text-sm">{cafe.neighborhood}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="ml-1 font-bold">{safeToFixed(cafe.overallRating)}</span>
              <span className="ml-1 text-gray-500 text-sm">({cafe.reviewCount ?? 0} review{(cafe.reviewCount ?? 0) === 1 ? '' : 's'})</span>
            </div>
            <div className="text-sm text-gray-500">
              {cafe.priceLevel || 'N/A'}
            </div>
          </div>
          
          <div className="flex space-x-4 mb-3">
            <div className="flex items-center" title="WiFi Rating">
              <Wifi className={`h-4 w-4 ${cafe.wifiRating >= 4 ? 'text-green-500' : cafe.wifiRating >= 3 ? 'text-amber-500' : 'text-red-500'}`} />
              <span className="ml-1 text-xs">{safeToFixed(cafe.wifiRating)}</span>
            </div>
            <div className="flex items-center" title="Power Outlets">
              <Battery className={`h-4 w-4 ${cafe.powerOutlets >= 4 ? 'text-green-500' : cafe.powerOutlets >= 3 ? 'text-amber-500' : 'text-red-500'}`} />
              <span className="ml-1 text-xs">{safeToFixed(cafe.powerOutlets)}</span>
            </div>
            <div className="flex items-center" title="Noise Level">
              <VolumeX className={`h-4 w-4 ${cafe.noiseLevel <= 2 ? 'text-green-500' : cafe.noiseLevel <= 3 ? 'text-amber-500' : 'text-red-500'}`} />
              <span className="ml-1 text-xs">{safeToFixed(cafe.noiseLevel)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">{cafe.description || 'Tidak ada deskripsi.'}</p>
        </div>
      </div>
    </Link>
  );
};

export default CafeCard;