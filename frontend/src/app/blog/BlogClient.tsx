'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in Chicago',
    excerpt: 'Discover the lesser-known but amazing places in Chicago that locals love.',
    image: '/images/blog/hidden-gems.jpg',
    author: 'Jane Smith',
    date: '2024-03-15',
    category: 'Places',
  },
  {
    id: 2,
    title: 'A Foodie\'s Guide to Chicago',
    excerpt: 'Explore the diverse culinary scene of Chicago, from deep-dish pizza to international cuisine.',
    image: '/images/blog/food-guide.jpg',
    author: 'John Doe',
    date: '2024-03-10',
    category: 'Food',
  },
  {
    id: 3,
    title: 'Best Time to Visit Chicago',
    excerpt: 'Learn about the best seasons and events to plan your perfect Chicago trip.',
    image: '/images/blog/best-time.jpg',
    author: 'Sarah Johnson',
    date: '2024-03-05',
    category: 'Travel Tips',
  },
];

export default function BlogClient() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Chi Voyage Blog
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover Chicago through our stories, tips, and guides.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <div className="h-48 w-full relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">
                    {post.category}
                  </p>
                  <Link href={`/blog/${post.id}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 