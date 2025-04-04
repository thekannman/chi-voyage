import { generateSitemap } from '@/utils/routes'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chivoyage.com'
  return generateSitemap(baseUrl)
} 