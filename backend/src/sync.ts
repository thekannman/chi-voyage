import { OutscraperClient } from 'outscraper';
import { insertPlace, updatePlace, getPlaceBySlug } from './db/queries';
import { db } from './db';
import dotenv from 'dotenv';
import { categorizePlace } from './utils';

dotenv.config();

const client = new OutscraperClient(process.env.OUTSCRAPER_API_KEY!);

// Map of location keywords to neighborhood IDs
const locationToNeighborhood: Record<string, string[]> = {
  'loop': ['loop'],
  'river north': ['river-north'],
  'west loop': ['west-loop'],
  'lincoln park': ['lincoln-park'],
  'wicker park': ['wicker-park'],
  'gold coast': ['gold-coast'],
  'bucktown': ['bucktown'],
  'south loop': ['south-loop'],
  'downtown': ['loop', 'river-north'],
  'near north': ['river-north', 'gold-coast'],
  'old town': ['lincoln-park'],
  'lakeview': ['lincoln-park'],
  'ukrainian village': ['wicker-park'],
  'west town': ['west-loop', 'wicker-park'],
  'fulton market': ['west-loop'],
  'river west': ['river-north', 'west-loop'],
  'streeterville': ['river-north'],
  'magnificent mile': ['river-north', 'gold-coast'],
  'museum campus': ['south-loop'],
  'grant park': ['south-loop', 'loop']
};

/*interface Place {
  id: string;
  title: string;
  slug: string;
  description: string;
  imagePath: string;
  rating: number;
  category: 'activities' | 'restaurants' | 'attractions' | 'events';
  location: string;
  details?: {
    price?: string;
    hours?: string;
    website?: string;
    phone?: string;
    address?: string;
    features?: string[];
  };
  neighborhoods?: string[];
}*/

interface GoogleMapsPlace {
  place_id: string;
  name: string;
  description?: string;
  main_image?: string;
  rating?: number;
  subtypes?: string[];
  full_address?: string;
  [key: string]: any;
}

async function findNeighborhoods(location: string): Promise<string[]> {
  const locationLower = location.toLowerCase();
  const associatedNeighborhoods = new Set<string>();

  // Check for exact matches
  for (const [keyword, neighborhoodIds] of Object.entries(locationToNeighborhood)) {
    if (locationLower.includes(keyword)) {
      neighborhoodIds.forEach(id => associatedNeighborhoods.add(id));
    }
  }

  // Fetch all neighborhoods for partial matches
  const neighborhoods = await db
    .selectFrom('neighborhoods')
    .select(['id', 'name'])
    .execute();

  for (const neighborhood of neighborhoods) {
    if (locationLower.includes(neighborhood.name.toLowerCase())) {
      associatedNeighborhoods.add(neighborhood.id);
    }
  }

  return Array.from(associatedNeighborhoods);
}

export async function syncPlaces() {
  try {
    console.log('Starting place synchronization...');
    const startTime = Date.now();

    // Search for places in Chicago
    const results = await client.googleMapsSearch('restaurants in Chicago') as GoogleMapsPlace[];

    // Process each place
    for (const place of results) {
      try {
        const placeData = {
          id: place.place_id,
          title: place.name,
          slug: place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: place.description || null,
          imagePath: place.main_image || null,
          rating: place.rating || null,
          category: categorizePlace(place.subtypes?.[0] || ''),
          location: place.full_address || null,
          details: place
        } as const;

        // Check if place exists
        const existingPlace = await getPlaceBySlug(placeData.slug);

        if (existingPlace) {
          // Update existing place
          await updatePlace(existingPlace.id, placeData);
          console.log(`Updated place: ${placeData.title}`);
        } else {
          // Insert new place
          const newPlace = {
            ...placeData,
            create_ts: new Date(),
            update_ts: new Date()
          };
          await insertPlace(newPlace);
          console.log(`Added new place: ${placeData.title}`);
        }

        // Find and associate neighborhoods
        if (placeData.location) {
          const neighborhoodIds = await findNeighborhoods(placeData.location);
          for (const neighborhoodId of neighborhoodIds) {
            await db
              .insertInto('place_neighborhoods')
              .values({
                place_id: placeData.id,
                neighborhood_id: neighborhoodId
              })
              .onConflict((eb) => eb.columns(['place_id', 'neighborhood_id']).doNothing())
              .execute();
          }
        }
      } catch (error) {
        const title = place.name || 'Unknown place';
        console.error(`Error processing place ${title}:`, error);
      }
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log(`Sync completed in ${duration.toFixed(2)} seconds`);
  } catch (error) {
    console.error('Error during sync:', error);
    throw error;
  }
}

// Run the sync function
syncPlaces().catch(console.error); 