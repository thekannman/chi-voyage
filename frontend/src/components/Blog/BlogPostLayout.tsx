import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Define the structure for related items (can be adjusted as needed)
interface RelatedItem {
  name: string;
  slug: string;
  description: string;
}

interface RelatedPost {
  title: string;
  slug: string;
  description: string;
}

interface BlogPostLayoutProps {
  category: string;
  readTime: string;
  title: string;
  description: string;
  heroImageSrc?: string;
  heroImageAlt: string;
  children: React.ReactNode; // For the main article content
  relatedRestaurants?: RelatedItem[];
  relatedNeighborhoods?: RelatedItem[];
  relatedBlogPosts?: RelatedPost[];
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  category,
  readTime,
  title,
  description,
  heroImageSrc,
  heroImageAlt,
  children,
  relatedRestaurants = [],
  relatedNeighborhoods = [],
  relatedBlogPosts = [],
}) => {
  // Define category placeholders within the layout
  const categoryPlaceholders: Record<string, string> = {
    'Places': '/images/blog/placeholders/places.png',
    'Food': '/images/blog/placeholders/food.png',
    'Travel Tips': '/images/blog/placeholders/travel.png',
  };

  // Determine the image source - use provided src or fallback to placeholder
  const imageSrcToUse = heroImageSrc || categoryPlaceholders[category] || '/images/blog/placeholders/generic.jpg';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Navigation */}
      <nav className="mb-8">
        <Link 
          href="/blog" 
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Blog
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-500">{readTime}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600">
          {description}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imageSrcToUse}
          alt={heroImageAlt}
          fill
          className="object-cover"
          unoptimized // Keep or remove based on image optimization strategy
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Article Content - Rendered via children prop */}
      <article className="prose prose-lg max-w-none">
        {children}
      </article>

      {/* Related Content Section */}
      {(relatedRestaurants.length > 0 || relatedNeighborhoods.length > 0 || relatedBlogPosts.length > 0) && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore More</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Related Restaurants */}
            {relatedRestaurants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Restaurants</h3>
                <div className="space-y-4">
                  {relatedRestaurants.map((item) => (
                    <Link 
                      key={item.slug}
                      href={`/restaurants/${item.slug}`}
                      className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Neighborhoods */}
            {relatedNeighborhoods.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Neighborhoods</h3>
                <div className="space-y-4">
                  {relatedNeighborhoods.map((item) => (
                    <Link 
                      key={item.slug}
                      href={`/neighborhoods/${item.slug}`}
                      className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Blog Posts */}
          {relatedBlogPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">More Food Guides</h2> {/* Consider making this title dynamic */}
              <div className="grid gap-6 md:grid-cols-2">
                {relatedBlogPosts.map((post) => (
                   <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                       <div className="p-6">
                         <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                         <p className="mt-2 text-gray-600">{post.description}</p>
                       </div>
                     </div>
                   </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPostLayout; 