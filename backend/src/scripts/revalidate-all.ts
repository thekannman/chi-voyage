import { revalidateFrontend } from '../utils/revalidate';
import { getAllPlaces } from '../db/queries';

async function revalidateAllPages() {
  console.log('Starting revalidation of all pages...');
  
  // Revalidate category pages
  const categories = ['restaurants', 'activities', 'attractions', 'events'];
  for (const category of categories) {
    console.log(`Revalidating ${category} category page...`);
    await revalidateFrontend(`/${category}`);
  }
  
  // Revalidate detail pages for each category
  const allPlaces = await getAllPlaces();
  
  for (const category of categories) {
    const categoryPlaces = allPlaces.filter(place => place.category === category);
    console.log(`Revalidating ${categoryPlaces.length} ${category} detail pages...`);
    
    for (const place of categoryPlaces) {
      if (place.slug) {
        await revalidateFrontend(`/${category}/${place.slug}`);
      }
    }
  }
  
  console.log('Revalidation complete!');
}

// Run the revalidation
revalidateAllPages().catch(console.error); 