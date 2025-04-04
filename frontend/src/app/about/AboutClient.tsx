'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BuildingOffice2Icon, MapIcon, StarIcon } from '@heroicons/react/24/outline';

export default function AboutClient() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/chicago-skyline.png"
          alt="Chicago Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            About Chi Voyage
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Chi Voyage, we&apos;re dedicated to helping you discover the best of Chicago. 
            Whether you&apos;re a local looking for new experiences or a visitor exploring the city, 
            we provide comprehensive guides to restaurants, attractions, activities, and events.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg">
            <BuildingOffice2Icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comprehensive Listings</h3>
            <p className="text-gray-600">
              Discover thousands of places across Chicago, from hidden gems to iconic landmarks.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <MapIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Information</h3>
            <p className="text-gray-600">
              Get all the details you need - location, pricing, ratings, and more - to make informed decisions.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <StarIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
            <p className="text-gray-600">
              Read authentic reviews from fellow explorers to find the perfect spot for your next adventure.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore Chicago?</h2>
          <p className="text-gray-600 mb-6">
            Start your journey with Chi Voyage today and discover the best of what Chicago has to offer.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
} 