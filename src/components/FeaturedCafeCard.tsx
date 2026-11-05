import React from "react";
import Link from "next/link";
import { MapPin, Star, Wifi, Plug, VolumeX, ArrowRight } from "lucide-react";
import { Cafe } from "../types";

interface FeaturedCafeCardProps {
    cafe: Cafe;
    badge?: string;
}

const safeToFixed = (value: number | null | undefined, digits: number = 1) =>
    typeof value === 'number' ? value.toFixed(digits) : 'N/A';

const FeaturedCafeCard: React.FC<FeaturedCafeCardProps> = ({ cafe, badge }) => {
    return (
        <Link
            href={`/cafes/${cafe.id}`}
            className="group flex flex-col bg-cream-light rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
        >
            <div className="relative h-40 overflow-hidden">
                <img
                    src={cafe.imageUrl || '/default_cafe_image.jpg'}
                    alt={cafe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {badge && (
                    <span className="absolute top-3 left-3 bg-caramel text-white text-[11px] font-body px-2.5 py-1 rounded">
                        {badge}
                    </span>
                )}
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="font-heading text-xl text-black">{cafe.name}</h3>
                <p className="flex items-center font-body text-xs text-amber-900 mt-1">
                    <MapPin className="h-3 w-3 mr-1 text-amber-900"/>
                    {cafe.neighborhood || 'Lokasi belum tersedia'}
                </p>

                {/* Rating + price */}
                <div className="flex items-center justify-between font-body text-xs mt-3">
                    <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="ml-1 font-semibold text-espresso">{safeToFixed(cafe.overallRating)}</span>
                        <span className="ml-1 text-gray-500">
                            ({cafe.reviewCount ?? 0} review{(cafe.reviewCount ?? 0) === 1 ? '' : 's'})
                        </span>
                    </div>
                    <span className="text-gray-500">{cafe.priceLevel || 'N/A'}</span>
                </div>

                {/* Metrics */}
                <div className="flex space-x-4 font-body mt-4">
                    <div className="flex items-center" title="Wifi Rating">
                        <Wifi className="h-4 w-4 text-amber-900" />
                        <span className="ml-1 text-xs text-gray-600">{safeToFixed(cafe.wifiRating)}</span>
                    </div>
                    <div className="flex items-center" title="Power Outlets">
                        <Plug className="h-4 w-4 text-amber-900" />
                        <span className="ml-1 text-xs text-gray-600">{safeToFixed(cafe.powerOutlets)}</span>
                    </div>
                    <div className="flex items-center" title="Noise Level">
                        <VolumeX className="h-4 w-4 text-amber-900"/>
                        <span className="ml-1 text-xs text-gray-600">{safeToFixed(cafe.noiseLevel)}</span>
                    </div>
                </div>

                <span className="mt-auto pt-4 flex items-center justify-end font-body text-xs text-caramel">
                    Lihat Detail <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
            </div>
        </Link>
    );
};

export default FeaturedCafeCard;