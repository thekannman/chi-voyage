import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaceBySlug } from '@/lib/api';
import ImageWithFallback from '@/components/ImageWithFallback';
import GoogleMapComponent from '@/components/GoogleMap';
import { StarIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/solid';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  categoryTitle: string;
  categorySlug: string;
}

export async function generateMetadata({ params, category, categoryTitle }: CategoryPageProps): Promise<Metadata> {
  const place = await getPlaceBySlug(params.slug);

  if (!place) {
    return {
      title: `${categoryTitle} Not Found | Chi Voyage`,
      description: `The requested ${category.toLowerCase()} could not be found.`,
    };
  }

  return {
    title: `${place.title} | ${categoryTitle} | Chi Voyage`,
    description: place.description || '',
    openGraph: {
      title: `${place.title} | ${categoryTitle} | Chi Voyage`,
      description: place.description || '',
      images: place.imagePath ? [place.imagePath] : [],
    },
  };
}

export const revalidate = 3600;

export default async function CategoryPage({ params, categoryTitle, categorySlug }: CategoryPageProps) {
  const place = await getPlaceBySlug(params.slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-4">
          <a href={`/${categorySlug}`} className="text-blue-600 hover:text-blue-800">
            ← Back to {categoryTitle}
          </a>
        </nav>
        {/* Hero Section */}
        <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
          <ImageWithFallback
            src={place.imagePath}
            alt={place.title}
            fill
            containerHeight="aspect-[16/9]"
            className="object-cover"
          />
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{place.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-lg">{Number(place.rating).toFixed(1)}</span>
                {place.reviews_count && (
                  <span className="text-sm ml-1">({place.reviews_count} reviews)</span>
                )}
              </div>
              {place.price_range && (
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  <span>{place.price_range}</span>
                </div>
              )}
            </div>
          </div>
          {place.subtitle && (
            <p className="text-xl text-gray-600">{place.subtitle}</p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <p className="text-lg mb-6">{place.description}</p>
              {place.details?.subtypes && Array.isArray(place.details.subtypes) && place.details.subtypes.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {place.details.subtypes.map((subtype: string) => (
                      <span
                        key={subtype}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {subtype}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {place.features && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Features</h2>
                  <div className="flex flex-wrap gap-6">
                    {Object.entries(place.features).map(([category, items]) => {
                      // Parse the comma-separated string into an array of features
                      const features = (items as string)
                        .split(',')
                        .map(item => item.trim())
                        .filter(item => item.endsWith(': true'))
                        .map(item => item.split(':')[0].trim());

                      // Only render the category if it has features
                      if (features.length === 0) return null;

                      return (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg w-[calc(50%-12px)] min-w-[200px]">
                          <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
                          <ul className="space-y-2">
                            {features.map((feature) => (
                              <li key={feature} className="flex items-start text-gray-700">
                                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                <span className="break-words">{feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {place.popular_times && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Popular Times</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(place.popular_times).map(([day, times]) => (
                      <div key={day} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">{day}</h3>
                        <div className="space-y-1">
                          {Object.entries(times).map(([time, popularity]) => (
                            <div key={time} className="flex items-center">
                              <span className="w-20">{time}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500" 
                                  style={{ width: `${popularity}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/*{place.latitude && place.longitude && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Location</h2>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <GoogleMapComponent
                      latitude={place.latitude}
                      longitude={place.longitude}
                      title={place.title}
                      className="h-[400px]"
                    />
                  </div>
                </div>
              )}*/}
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              {place.working_hours && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Business Hours
                  </h2>
                  <div className="space-y-1">
                    {Object.entries(place.working_hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}:</span>
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.title} ${place.location}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 hover:underline"
                  >
                    {place.location}
                  </a>
                </div>
                {place.details?.menu_link && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <a 
                      href={place.details.menu_link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View Menu
                    </a>
                  </div>
                )}
                {place.details?.order_links && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <a 
                      href={place.details.order_links}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Order Online
                    </a>
                  </div>
                )}
              </div>

              {place.verified && (
                <div className="flex items-center text-green-600">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Business</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 