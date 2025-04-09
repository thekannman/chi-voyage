import { getBlogPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const categoryPlaceholders: Record<string, string> = {
  'Places': '/images/blog/placeholders/places.jpg',
  'Food': '/images/blog/placeholders/food.jpg',
  'Travel Tips': '/images/blog/placeholders/travel.jpg',
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return post.metadata;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const heroImageSrc = post.heroImage || categoryPlaceholders[post.category] || '/images/blog/placeholders/generic.jpg';

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
            {post.category}
          </span>
          <span className="text-sm text-gray-500">{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600">
          {post.description}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={heroImageSrc}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Article Content */}
      <article 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Content */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore More</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Related Restaurants */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Restaurants</h3>
            <div className="space-y-4">
              {/* This would be populated with actual related restaurants */}
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-medium text-gray-900">Related Restaurant</h4>
                <p className="text-gray-600 mt-1">Description of the restaurant</p>
              </div>
            </div>
          </div>

          {/* Related Neighborhoods */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Neighborhoods</h3>
            <div className="space-y-4">
              {/* This would be populated with actual related neighborhoods */}
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-medium text-gray-900">Related Neighborhood</h4>
                <p className="text-gray-600 mt-1">Description of the neighborhood</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blog Posts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">More {post.category} Guides</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* This would be populated with actual related blog posts */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Related Blog Post</h3>
              <p className="mt-2 text-gray-600">Description of the related post...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 