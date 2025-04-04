// Function to fetch slugs for a given type
export async function fetchSlugs(type: 'attractions' | 'restaurants'): Promise<string[]> {
  const pageSize = 100; // Smaller page size to avoid cache issues
  let allSlugs: string[] = [];
  let currentPage = 1;
  let hasMore = true;
  
  while (hasMore) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/places?category=${type === 'attractions' ? 'attraction' : 'restaurant'}&page=${currentPage}&pageSize=${pageSize}`
    console.log(`Attempting to fetch ${type} from:`, apiUrl)
    
    try {
      const response = await fetch(apiUrl, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log(`Response status for ${type} page ${currentPage}:`, response.status)
      
      if (!response.ok) {
        console.error(`Failed to fetch ${type} slugs:`, response.statusText)
        break
      }
      
      const data = await response.json()
      console.log(`Received data for ${type} page ${currentPage}:`, data)
      
      // Ensure we're getting the correct data structure
      if (!data.places || !Array.isArray(data.places)) {
        console.error(`Invalid data format for ${type}:`, data)
        break
      }
      
      // Extract slugs from the data
      const pageSlugs = data.places.map((item: { slug: string }) => {
        if (typeof item === 'object' && item !== null && 'slug' in item) {
          return item.slug
        }
        console.error(`Invalid item format in ${type} data:`, item)
        return null
      }).filter((slug: string | null): slug is string => slug !== null)
      
      allSlugs = [...allSlugs, ...pageSlugs]
      
      // Check if we've reached the end
      const totalPages = Math.ceil(data.total / pageSize)
      hasMore = currentPage < totalPages
      currentPage++
      
    } catch (error) {
      console.error(`Error fetching ${type} slugs:`, error)
      break
    }
  }
  
  console.log(`Extracted total slugs for ${type}:`, allSlugs.length)
  return allSlugs
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Function to generate sitemap entries for a specific page
export async function generateSitemapEntries(page: number, pageSize: number = 1000): Promise<SitemapEntry[]> {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://chivoyage.com' 
    : 'http://localhost:3000'

  // Static routes (only include in first page)
  const staticRoutes = page === 0 ? [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/attractions`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neighborhoods`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/restaurants`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ] : [];

  // Fetch dynamic routes
  const [attractionSlugs, restaurantSlugs] = await Promise.all([
    fetchSlugs('attractions'),
    fetchSlugs('restaurants'),
  ])

  // Create dynamic route entries
  const allDynamicRoutes = [
    ...attractionSlugs.map(slug => ({
      url: `${baseUrl}/attractions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...restaurantSlugs.map(slug => ({
      url: `${baseUrl}/restaurants/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  // Calculate pagination
  const start = page * pageSize
  const end = start + pageSize
  const paginatedRoutes = allDynamicRoutes.slice(start, end)

  // Combine routes (static + paginated dynamic)
  return [...staticRoutes, ...paginatedRoutes]
}

// Generate sitemap index
export async function generateSitemaps() {
  // Fetch total count of dynamic routes
  const [attractionSlugs, restaurantSlugs] = await Promise.all([
    fetchSlugs('attractions'),
    fetchSlugs('restaurants'),
  ])

  const totalDynamicRoutes = attractionSlugs.length + restaurantSlugs.length
  const pageSize = 1000 // Number of URLs per sitemap
  const totalPages = Math.ceil(totalDynamicRoutes / pageSize)

  // Generate array of sitemap page numbers
  return Array.from({ length: totalPages }, (_, i) => ({ id: i }))
}

// Handle sitemap index request
export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://chivoyage.com' 
    : 'http://localhost:3000'

  const sitemaps = await generateSitemaps()
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${baseUrl}/sitemap/${sitemap.id}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
    )
    .join('')}
</sitemapindex>`

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 