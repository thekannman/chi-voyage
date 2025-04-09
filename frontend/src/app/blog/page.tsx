import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

const categoryPlaceholders: Record<string, string> = {
  'Places': '/images/blog/placeholders/places.png',
  'Food': '/images/blog/placeholders/food.png',
  'Travel Tips': '/images/blog/placeholders/travel.png',
};

export const metadata = {
  title: 'Chicago Travel Blog | Chi Voyage',
  description: 'Explore comprehensive travel guides, local insights, and expert tips for experiencing Chicago like a local.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chicago Travel Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best of Chicago through our comprehensive guides, from deep dish pizza to hidden gems.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imageSrc = categoryPlaceholders[post.category] || '/images/blog/placeholders/generic.png';
          
          return (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 