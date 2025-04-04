'use client';

import { useState } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Add mapping for category URLs
const categoryUrls: Record<string, string> = {
  activity: 'activities',
  restaurant: 'restaurants',
  attraction: 'attractions',
  //event: 'events',
  other: 'other'
};

const categories = [
  {
    title: 'Activities',
    description: 'Discover exciting things to do in Chicago',
    icon: '🎯',
    href: '/activities',
    image: '/images/categories/activities.jpg'
  },
  {
    title: 'Restaurants',
    description: 'Find the best places to eat',
    icon: '🍽️',
    href: '/restaurants',
    image: '/images/categories/restaurants.jpg'
  },
  {
    title: 'Attractions',
    description: 'Explore Chicago\'s top attractions',
    icon: '🏛️',
    href: '/attractions',
    image: '/images/categories/attractions.jpg'
  }
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (selectedCategory) {
        // If a category is selected, search within that category
        router.push(`/${categoryUrls[selectedCategory]}?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        // If no category is selected, do a generic search across all categories
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative bg-gray-600 text-white">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/chicago-skyline.png"
            alt="Chicago Skyline"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Discover Chicago
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              Find the best restaurants, attractions, and activities in the Windy City.
            </p>
          </div>

          <div className="mt-12">
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg border border-gray-200"
                  />
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg border border-gray-200"
                  >
                    <option value="">All Categories</option>
                    <option value="restaurant">Restaurants</option>
                    <option value="attraction">Attractions</option>
                    <option value="activity">Activities</option>
                  </select>
                </div>
                <div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-600">Popular:</span>
                {categories.map(category => (
                  <button
                    key={category.href}
                    onClick={() => router.push(category.href)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                  <div className="relative aspect-[16/9]">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
