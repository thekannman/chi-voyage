import { MetadataRoute } from 'next'

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
  // This is where you'll fetch your dynamic content
  // For example:
  // - Fetch all restaurants
  // - Fetch all attractions
  // - Fetch all blog posts
  // etc.

  // Example structure (replace with your actual data fetching):
  const dynamicRoutes: Route[] = [
    // {
    //   path: '/restaurants/[slug]',
    //   priority: 0.9,
    //   changeFrequency: 'weekly',
    // },
    // {
    //   path: '/attractions/[slug]',
    //   priority: 0.9,
    //   changeFrequency: 'weekly',
    // },
  ]

  return dynamicRoutes
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