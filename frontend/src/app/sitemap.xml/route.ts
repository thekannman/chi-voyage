// Function to fetch slugs for a given type
async function fetchSlugs(type: 'attractions' | 'restaurants'): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${type}/slugs`)
    if (!response.ok) {
      console.error(`Failed to fetch ${type} slugs:`, response.statusText)
      return []
    }
    const data = await response.json()
    return data.map((item: { slug: string }) => item.slug)
  } catch (error) {
    console.error(`Error fetching ${type} slugs:`, error)
    return []
  }
}

export async function GET() {
  // Static routes
  const staticRoutes = [
    {
      url: 'https://chivoyage.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://chivoyage.com/about',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/activities',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/attractions',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/careers',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/contact',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/cookies',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/events',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/faq',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/help',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/neighborhoods',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/restaurants',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/search',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://chivoyage.com/terms',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Fetch dynamic routes
  const [attractionSlugs, restaurantSlugs] = await Promise.all([
    fetchSlugs('attractions'),
    fetchSlugs('restaurants'),
  ])

  // Create dynamic route entries
  const dynamicRoutes = [
    ...attractionSlugs.map(slug => ({
      url: `https://chivoyage.com/attractions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...restaurantSlugs.map(slug => ({
      url: `https://chivoyage.com/restaurants/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  // Combine all routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 