import { MetadataRoute } from 'next';
import { generateSitemap } from '@/utils/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('=== Sitemap Generation Started ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Time:', new Date().toISOString());
  
  // Use the actual domain in production, fallback to localhost in development
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://api.chivoyage.com'
    : 'http://localhost:3001';
    
  console.log('Using baseUrl:', baseUrl);
  
  const sitemap = await generateSitemap(baseUrl);
  console.log('Generated sitemap entries:', sitemap.length);
  //console.log('Sitemap entries:', JSON.stringify(sitemap, null, 2));
  console.log('=== Sitemap Generation Completed ===');
  
  return sitemap;
}

// Configure the sitemap generation
export const dynamic = 'force-dynamic'; // Ensure the sitemap is always generated fresh
export const revalidate = 0; // Disable caching for debugging 