import { MetadataRoute } from 'next'
import { Place } from '@/types'
import { Neighborhood } from '@/data/neighborhoods'

// Define the structure of your routes
interface Route {
  path: string
  priority?: number
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastModified?: Date
}

// Define your static routes
export const staticRoutes: Route[] = [
  {
    path: '/',
    priority: 1,
    changeFrequency: 'daily',
  },
  {
    path: '/about',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/contact',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/privacy',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/terms',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/faq',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/help',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/careers',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    path: '/cookies',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/search',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/blog',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/activities',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/events',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/attractions',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/restaurants',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/neighborhoods',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
]

// Function to get all dynamic routes (you'll need to implement this based on your data)
export async function getDynamicRoutes(): Promise<Route[]> {
  try {
    // Fetch all places from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/places`);
    const data = await response.json();
    const places = data.places as Place[] || [];

    // Map places to routes
    const dynamicRoutes: Route[] = places.map((place: Place) => {
      // Determine the base path based on category
      const categoryPath = place.category === 'activity' ? 'activities' :
                         place.category === 'restaurant' ? 'restaurants' :
                         place.category === 'attraction' ? 'attractions' :
                         place.category === 'event' ? 'events' : 'other';

      return {
        path: `/${categoryPath}/${place.slug}`,
        priority: 0.9,
        changeFrequency: place.category === 'event' ? 'daily' : 'weekly',
        lastModified: place.updated_at ? new Date(place.updated_at) : new Date(),
      };
    });

    // Add neighborhood routes
    const neighborhoodsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/neighborhoods`);
    const neighborhoodsData = await neighborhoodsResponse.json();
    const neighborhoods = neighborhoodsData.neighborhoods as Neighborhood[] || [];

    const neighborhoodRoutes: Route[] = neighborhoods.map((neighborhood: Neighborhood) => ({
      path: `/neighborhoods/${neighborhood.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date(),
    }));

    return [...dynamicRoutes, ...neighborhoodRoutes];
  } catch (error) {
    console.error('Error generating dynamic routes:', error);
    return [];
  }
}

// Function to generate the complete sitemap
export async function generateSitemap(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const staticSitemapEntries = staticRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const dynamicRoutes = await getDynamicRoutes()
  const dynamicSitemapEntries = dynamicRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticSitemapEntries, ...dynamicSitemapEntries]
} 