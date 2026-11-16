import React from 'react';
import Link from 'next/link';
import { Wifi, Battery, VolumeX, Star, MapPin,  ArrowRight } from 'lucide-react';
import { Cafe } from '../types';

interface CafeCardProps {
  cafe: Cafe;
}

const safeToFixed = (value: number | null | undefined, digits: number = 1) =>
  typeof value === 'number' ? value.toFixed(digits) : 'N/A';

const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  const reviewCount = cafe.reviewCount ?? 0;

  return (
    <Link href={`/cafes/${cafe.id}`} className="group block">
      <div className="relative bg-cream-light bg-[url('/cafe-card-bg.webp')] bg-[length:100%_100%] bg-no-repeat px-3 py-7 transition-transform duration-200 group-hover:-translate-y-1">
        <div className="h-40 overflow-hidden rounded-xl">
          <img
            src={cafe?.imageUrl || '/default_cafe_image.jpg'}
            alt={cafe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="px-2 pt-3 pb-2">
          <h3 className="font-heading text-xl text-espresso">{cafe.name}</h3>
          <p className="flex items-center font-body text-xs text-espresso/70 mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {cafe.neighborhood || 'Lokasi belum tersedia'}
          </p>

          <div className="flex items-center justify-between font-body text-xs mt-3 pr-12">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-caramel fill-caramel" />
              <span className="ml-1 font-semibold text-espresso">{safeToFixed(cafe.overallRating)}</span>
              <span className="ml-1 text-espresso/60">
                ({reviewCount} review{reviewCount === 1 ? '' : 's'})
              </span>
            </div>
            {cafe.priceLevel && <span className="text-espresso/60">{cafe.priceLevel}</span>}
          </div>

          <div className="flex space-x-4 font-body mt-3">
            <div className="flex items-center" title="WiFi Rating">
              <Wifi className="h-4 w-4 text-amber-500" />
              <span className="ml-1 text-xs text-espresso/70">{safeToFixed(cafe.wifiRating)}</span>
            </div>
            <div className="flex items-center" title="Power Outlets">
              <Battery className="h-4 w-4 text-amber-500" />
              <span className="ml-1 text-xs text-espresso/70">{safeToFixed(cafe.powerOutlets)}</span>
            </div>
            <div className="flex items-center" title="Noise Level">
              <VolumeX className="h-4 w-4 text-amber-500" />
              <span className="ml-1 text-xs text-espresso/70">{safeToFixed(cafe.noiseLevel)}</span>
            </div>
          </div>
        </div>

        <span className="absolute bottom-5 right-5 h-9 w-9 rounded-full border border-caramel text-caramel flex items-center justify-center group-hover:bg-caramel group-hover:text-white transition-colors">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default CafeCard;