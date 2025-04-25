'use client';

import Image from 'next/image';
import Link from 'next/link';

// Ensure Category type covers all possibilities from frontmatter
export type Category = 'Places' | 'Food' | 'Travel Tips' | 'Planning'; // Added Planning

// Export the interface and add the date field
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  category: Category;
  date: string; // Add date field
}

// Define props for the component
interface BlogClientProps {
  blogPosts: BlogPost[];
}

// Category-specific placeholder images
const categoryPlaceholders: Record<Category, string> = {
  'Places': '/images/blog/placeholders/places.png',
  'Food': '/images/blog/placeholders/food.png',
  'Travel Tips': '/images/blog/placeholders/travel.png',
  'Planning': '/images/blog/placeholders/travel.png', // Use Travel Tips image for Planning for now
};

// Remove the hardcoded blogPosts array
// const blogPosts: BlogPost[] = [ ... ];

// Accept blogPosts as a prop
export default function BlogClient({ blogPosts }: BlogClientProps) {
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
            // Ensure category exists in placeholders, fallback to generic if not
            const placeholder = categoryPlaceholders[post.category] || '/images/blog/placeholders/generic.jpg';
            const imageSrc = post.image || placeholder;

            return (
              <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.id}`} className="block group">
                  <div className="flex-shrink-0">
                    <div className="h-48 w-full relative overflow-hidden"> {/* Added overflow-hidden */}
                      <Image
                        src={imageSrc}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" // Added hover effect
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop
                        // Remove unoptimized if you want Next.js image optimization
                        // unoptimized 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-600">
                        {post.category}
                      </p>
                      {/* <Link href={`/blog/${post.id}`} className="mt-2 block"> */}
                        <p className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 mt-2">{post.title}</p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.excerpt}</p> {/* Use line-clamp */}
                      {/* </Link> */}
                    </div>
                     {/* Optional: Add date display */}
                     <div className="mt-4 text-sm text-gray-500">
                       {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                     </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
} 