import { generateSitemaps } from '../sitemap/route'

interface SitemapInfo {
  id: number;
}

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://chivoyage.com' 
    : 'http://localhost:3000'

  const sitemaps = await generateSitemaps()
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap: SitemapInfo) => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${sitemap.id}.xml</loc>
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