import React from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  title: string;
  description: string;
  imagePath: string;
  rating: number;
  location: string;
  href: string;
}

export default function CategoryCard({
  title,
  description,
  imagePath,
  rating,
  location,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center text-gray-500">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 