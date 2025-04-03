'use client';

import { Item } from '@/data/items';
import ImageWithFallback from './ImageWithFallback';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, ClockIcon, GlobeAltIcon, PhoneIcon, CurrencyDollarIcon, TagIcon, PhotoIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface ItemDetailProps {
  item: Item;
}

export default function ItemDetail({ item }: ItemDetailProps) {
  const [processedImagePath, setProcessedImagePath] = useState<string | null>(null);
  
  useEffect(() => {
    async function processImage() {
      if (item.imagePath) {
        try {
          // For client components, we need to use a different approach
          // since we can't use the server-side processImageUrl function
          // We'll use a simple check to see if it's an external URL
          if (item.imagePath.startsWith('http')) {
            // For external URLs, we'll use a proxy endpoint
            const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(item.imagePath)}`);
            if (response.ok) {
              const data = await response.json();
              setProcessedImagePath(data.localPath);
            } else {
              setProcessedImagePath('/images/placeholder.jpg');
            }
          } else {
            // For local paths, use as is
            setProcessedImagePath(item.imagePath);
          }
        } catch (error) {
          console.error('Error processing image:', error);
          setProcessedImagePath('/images/placeholder.jpg');
        }
      } else {
        setProcessedImagePath('/images/placeholder.jpg');
      }
    }
    
    processImage();
  }, [item.imagePath]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden shadow-xl">
          <ImageWithFallback
            src={item.imagePath || '/images/placeholder.jpg'}
            alt={item.title}
            fill
            containerHeight="h-96 lg:h-[600px]"
            className="object-cover"
          />
          {item.rating && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">{item.rating}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </span>
              {item.location && (
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span>{item.location}</span>
                </div>
              )}
              {item.neighborhood && (
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 mr-1" />
                  <span>{item.neighborhood}</span>
                </div>
              )}
            </div>
          </div>

          {item.description && (
            <p className="text-lg text-gray-700 mb-8">{item.description}</p>
          )}

          <div className="space-y-6">
            {item.price_range && (
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">Price Range:</span>
                <span className="ml-2 text-gray-700">{item.price_range}</span>
              </div>
            )}

            {item.working_hours && (
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{JSON.stringify(item.working_hours)}</span>
              </div>
            )}

            {item.website && (
              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2" />
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}

            {item.phone && (
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                <a
                  href={`tel:${item.phone}`}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.phone}
                </a>
              </div>
            )}

            {item.location && (
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{item.location}</span>
              </div>
            )}

            {item.features && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {Object.entries(item.features).map(([key, value]) => (
                    <li
                      key={key}
                      className="flex items-center text-gray-700"
                    >
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      {key}: {String(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.reviews_count && (
              <div className="flex items-center">
                <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{item.reviews_count} reviews</span>
              </div>
            )}

            {item.photos_count && (
              <div className="flex items-center">
                <PhotoIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{item.photos_count} photos</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 