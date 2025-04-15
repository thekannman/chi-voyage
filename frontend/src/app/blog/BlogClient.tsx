'use client';

import Image from 'next/image';
import Link from 'next/link';

type Category = 'Places' | 'Food' | 'Travel Tips';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  category: Category;
}

// Category-specific placeholder images
const categoryPlaceholders: Record<Category, string> = {
  'Places': '/images/blog/placeholders/places.png',
  'Food': '/images/blog/placeholders/food.png',
  'Travel Tips': '/images/blog/placeholders/travel.png',
};

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 'chicagos-hidden-gems',
    title: 'Top 10 Hidden Gems in Chicago',
    excerpt: 'Discover the lesser-known but amazing places in Chicago that locals love.',
    category: 'Places',
  },
  {
    id: 'foodies-guide-to-chicago',
    title: 'A Foodie\'s Guide to Chicago',
    excerpt: 'Explore the diverse culinary scene of Chicago, from deep-dish pizza to international cuisine.',
    category: 'Food',
  },
  {
    id: 'best-time-to-visit-chicago',
    title: 'Best Time to Visit Chicago',
    excerpt: 'Learn about the best seasons and events to plan your perfect Chicago trip.',
    category: 'Travel Tips',
  },
  {
    id: 'chicagos-best-deep-dish-pizza',
    title: 'Chicago\'s Best Deep Dish Pizza: A Local\'s Guide',
    excerpt: 'From the original to the modern takes, discover where to find the best deep dish pizza in Chicago.',
    category: 'Food',
  },
  {
    id: 'chicago-public-transportation-guide',
    title: 'Navigating Chicago: A Complete Public Transportation Guide',
    excerpt: 'Everything you need to know about getting around Chicago using public transportation.',
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
          {blogPosts.map((post) => {
            // Determine which image to use
            const imageSrc = post.image || categoryPlaceholders[post.category] || '/images/blog/placeholders/generic.jpg';
            
            return (
              <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <div className="h-48 w-full relative">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
} 