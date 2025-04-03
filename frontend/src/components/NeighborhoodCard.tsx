import React from 'react';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface NeighborhoodCardProps {
  name: string;
  description: string;
  imagePath: string;
  href: string;
  itemCount: number;
}

export default function NeighborhoodCard({
  name,
  description,
  imagePath,
  href,
  itemCount,
}: NeighborhoodCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center text-gray-500">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{itemCount} places to explore</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 