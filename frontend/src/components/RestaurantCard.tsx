import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Place } from '@/types';

interface RestaurantCardProps {
  restaurant: Place;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link 
      href={`/restaurants/${restaurant.slug}`} 
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
        <div className="relative aspect-[4/3] w-full">
          <ImageWithFallback
            src={restaurant.imagePath}
            alt={restaurant.title}
            fill
            containerHeight="aspect-[4/3]"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{restaurant.title}</h2>
          {restaurant.location && (
            <div className="flex items-center text-gray-600 mb-2">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{restaurant.location}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            {restaurant.rating && (
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{Number(restaurant.rating).toFixed(1)}</span>
              </div>
            )}
            {restaurant.price_range && (
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                <span>{restaurant.price_range}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 