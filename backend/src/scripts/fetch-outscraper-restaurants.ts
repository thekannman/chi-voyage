import { searchPlaces } from '../outscraper';
import { getAllPlaces } from '../db/queries';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Chicago city boundaries (approximate)
const CHICAGO_BOUNDS = '41.6445,-87.9401|42.0230,-87.5237';

async function fetchChicagoRestaurants() {
  try {
    // Get all existing places from database to avoid duplicates
    const existingPlaces = await getAllPlaces();
    const existingPlaceIds = existingPlaces
      .map(p => p.details?.place_id)
      .filter((id): id is string => !!id);

    console.log(`Found ${existingPlaceIds.length} existing places in database`);

    // Search for Chicago restaurants with different queries
    const queries = [
      'restaurants in Chicago',
      'restaurants in Chicago downtown',
      'restaurants in Chicago neighborhoods',
      'restaurants in Chicago Loop',
      'restaurants in Chicago River North',
      'restaurants in Chicago West Loop',
      'restaurants in Chicago Lincoln Park',
      'restaurants in Chicago Wicker Park',
      'restaurants in Chicago Logan Square',
      'restaurants in Chicago Pilsen'
    ];

    let allPlaces = [];
    let newPlaces = 0;
    let seenPlaceIds = new Set<string>();

    for (const query of queries) {
      console.log(`Searching for ${query}...`);
      const places = await searchPlaces(query, 100, CHICAGO_BOUNDS, existingPlaceIds);

      for (const place of places) {
        // Skip if we've already seen this place in this run
        if (place.place_id && seenPlaceIds.has(place.place_id)) {
          continue;
        }

        if (place.place_id) {
          seenPlaceIds.add(place.place_id);
        }

        // Add additional fields that might be useful
        const enhancedPlace = {
          ...place,
          // Add a unique ID for tracking
          import_id: uuidv4(),
          // Add timestamp
          import_timestamp: new Date().toISOString()
        };

        allPlaces.push(enhancedPlace);
        newPlaces++;
      }
    }

    // Save to JSON file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `outscraper-chicago-restaurants-${timestamp}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(allPlaces, null, 2));
    
    console.log('\nFetch completed:');
    console.log(`- Found ${newPlaces} new restaurants`);
    console.log(`- Excluded ${existingPlaceIds.length} existing places from API calls`);
    console.log(`- Saved to ${filename}`);

  } catch (error) {
    console.error('Error fetching restaurants:', error);
    process.exit(1);
  }
}

// Run the fetch
fetchChicagoRestaurants().catch(console.error); 