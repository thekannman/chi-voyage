import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

const categoryPlaceholders: Record<string, string> = {
  'Places': '/images/blog/placeholders/places.png',
  'Food': '/images/blog/placeholders/food.png',
  'Travel Tips': '/images/blog/placeholders/travel.png',
};

export const metadata: Metadata = {
  title: 'Chicago\'s Best Deep Dish Pizza: A Local\'s Guide | Chi Voyage',
  description: 'Discover the best deep dish pizza in Chicago, from the original Pizzeria Uno to modern interpretations. A comprehensive guide to Chicago\'s iconic pizza scene.',
  keywords: ['Chicago deep dish pizza', 'best pizza in Chicago', 'Pizzeria Uno', 'Lou Malnati\'s', 'Giordano\'s', 'Pequod\'s Pizza', 'Chicago food guide'],
  openGraph: {
    title: 'Chicago\'s Best Deep Dish Pizza: A Local\'s Guide',
    description: 'Discover the best deep dish pizza in Chicago, from the original Pizzeria Uno to modern interpretations.',
    images: ['/images/blog/deep-dish.jpg'],
  },
};

// Related content data
const relatedContent = {
  restaurants: [
    {
      name: 'Pizzeria Uno',
      slug: 'pizzeria-uno',
      description: 'The birthplace of deep dish pizza',
    },
    {
      name: 'Lou Malnati\'s',
      slug: 'lou-malnatis',
      description: 'Famous for their buttercrust and signature sausage',
    },
    {
      name: 'Giordano\'s',
      slug: 'giordanos',
      description: 'Known for their stuffed deep dish pizza',
    },
  ],
  neighborhoods: [
    {
      name: 'River North',
      slug: 'river-north',
      description: 'Home to the original Pizzeria Uno',
    },
    {
      name: 'Lincoln Park',
      slug: 'lincoln-park',
      description: 'Where you\'ll find Pequod\'s Pizza',
    },
  ],
};

export default function DeepDishPizzaPost() {
  const heroImageSrc = categoryPlaceholders['Food'] || '/images/blog/placeholders/generic.jpg';

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
            Food
          </span>
          <span className="text-sm text-gray-500">5 min read</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Chicago&apos;s Best Deep Dish Pizza: A Local&apos;s Guide
        </h1>
        <p className="text-xl text-gray-600">
          From the original Pizzeria Uno to modern interpretations, discover where to find the best deep dish pizza in Chicago.
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={heroImageSrc}
          alt="Chicago Deep Dish Pizza"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-700">
          Deep dish pizza is more than just a meal in Chicago—it&apos;s a cultural institution. 
          From the original Pizzeria Uno to modern interpretations, this guide will help you 
          navigate the city&apos;s deep dish scene like a local.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The History of Deep Dish</h2>
        <p>
          Deep dish pizza was invented in 1943 at Pizzeria Uno in Chicago. The thick, 
          buttery crust and layers of cheese, toppings, and sauce revolutionized pizza 
          in America. Today, several iconic pizzerias continue this tradition while 
          others put their own spin on the classic.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Must-Visit Deep Dish Pizzerias</h2>
        
        <div className="grid gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Pizzeria Uno</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  River North
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  11am - 11pm
                </span>
                <span className="flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  $$
                </span>
              </div>
              <p className="text-gray-700">
                The birthplace of deep dish pizza, Pizzeria Uno maintains its original 
                location in River North. Their classic deep dish features a buttery crust, 
                layers of mozzarella, and a chunky tomato sauce on top.
              </p>
              <Link 
                href="/restaurants/pizzeria-uno" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
              >
                View restaurant details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Lou Malnati&apos;s</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  Multiple Locations
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  11am - 10pm
                </span>
                <span className="flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  $$
                </span>
              </div>
              <p className="text-gray-700">
                A family-owned institution since 1971, Lou Malnati&apos;s is known for their 
                &quot;buttercrust&quot; and signature sausage. Their locations throughout the city 
                make it a convenient choice for visitors.
              </p>
              <Link 
                href="/restaurants/lou-malnatis" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
              >
                View restaurant details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Giordano&apos;s</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  Multiple Locations
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  11am - 10pm
                </span>
                <span className="flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  $$
                </span>
              </div>
              <p className="text-gray-700">
                Famous for their stuffed deep dish pizza, Giordano&apos;s takes the concept 
                to another level with an extra layer of dough on top. Their cheese blend 
                is particularly noteworthy.
              </p>
              <Link 
                href="/restaurants/giordanos" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
              >
                View restaurant details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Tips for Ordering</h2>
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-3">
                1
              </span>
              <span>Be prepared to wait—deep dish takes about 45 minutes to bake</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-3">
                2
              </span>
              <span>Consider sharing—slices are substantial</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-3">
                3
              </span>
              <span>Try different styles—from classic to stuffed</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-3">
                4
              </span>
              <span>Don&apos;t forget the salad—it&apos;s a traditional pairing</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Modern Takes on Deep Dish</h2>
        <p>
          While the classics remain popular, several newer pizzerias are putting 
          their own spin on deep dish. Places like Art of Pizza and My Pi Pizza 
          offer unique variations worth trying.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
        <p>
          Whether you&apos;re a first-time visitor or a long-time resident, Chicago&apos;s 
          deep dish pizza scene offers something for everyone. From the original 
          recipe to modern interpretations, each pizzeria brings its own unique 
          take on this Chicago classic.
        </p>
      </article>

      {/* Related Content */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore More</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Related Restaurants */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Restaurants</h3>
            <div className="space-y-4">
              {relatedContent.restaurants.map((restaurant) => (
                <Link 
                  key={restaurant.slug}
                  href={`/restaurants/${restaurant.slug}`}
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-medium text-gray-900">{restaurant.name}</h4>
                  <p className="text-gray-600 mt-1">{restaurant.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Neighborhoods */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Neighborhoods</h3>
            <div className="space-y-4">
              {relatedContent.neighborhoods.map((neighborhood) => (
                <Link 
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-medium text-gray-900">{neighborhood.name}</h4>
                  <p className="text-gray-600 mt-1">{neighborhood.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Blog Posts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">More Food Guides</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/blog/foodies-guide-to-chicago" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">A Foodie&apos;s Guide to Chicago</h3>
                <p className="mt-2 text-gray-600">Explore the diverse culinary scene of Chicago...</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 