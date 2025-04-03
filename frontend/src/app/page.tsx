import ImageWithFallback from '@/components/ImageWithFallback';
import Link from "next/link";
import { getAllPlaces } from '@/lib/api';

// Add mapping for category URLs
const categoryUrls: Record<string, string> = {
  activity: 'activities',
  restaurant: 'restaurants',
  attraction: 'attractions',
  event: 'events',
  other: 'other'
};

export default async function Home() {
  // Fetch places from the API
  const places = await getAllPlaces();

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
    },
    {
      title: 'Events',
      description: 'Stay updated with local events',
      icon: '🎉',
      href: '/events',
      image: '/images/categories/events.jpg'
    }
  ];

  // Get featured items from the API data
  const featuredItems = places
    .filter(place => place.rating && place.rating >= 4.5)
    .slice(0, 3)
    .map(place => ({
      title: place.title,
      description: place.description || '',
      image: place.imagePath || '/images/placeholder-featured.jpg',
      href: `/${categoryUrls[place.category]}/${place.slug}`,
      category: place.category.charAt(0).toUpperCase() + place.category.slice(1)
    }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/chicago-skyline.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Discover Chicago
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed text-white/90">
            Your guide to the Windy City&apos;s best experiences
          </p>
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg border border-gray-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="When?"
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg border border-gray-200"
                />
              </div>
              <div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg">
                  Search
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600">Popular:</span>
              {places.slice(0, 4).map(place => (
                <button key={place.id} className="text-sm text-blue-600 hover:text-blue-700">
                  {place.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Explore Chicago
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the best experiences the Windy City has to offer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    fill
                    containerHeight="h-72"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    //fallbackSrc="/images/placeholder-category.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured in Chicago
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Must-visit destinations and experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-72">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    fill
                    containerHeight="h-72"
                    className="object-cover"
                    fallbackSrc="/images/placeholder-featured.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-white/90">
            Subscribe to our newsletter for the latest Chicago events and recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-lg"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors text-lg shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
