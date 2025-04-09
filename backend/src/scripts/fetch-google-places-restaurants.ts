import { getAllPlaces } from '../db/queries';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

if (!process.env.GOOGLE_PLACES_API_KEY) {
  throw new Error('Missing Google Places API key');
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Chicago city boundaries (approximate)
const CHICAGO_BOUNDS = {
  northeast: { lat: 42.0230, lng: -87.5237 },
  southwest: { lat: 41.6445, lng: -87.9401 }
};

const googlePlacesClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
    key: process.env.GOOGLE_PLACES_API_KEY
  }
});

async function searchGooglePlaces(
  query: string,
  location: { lat: number; lng: number },
  radius: number = 50000, // 50km radius
  pageToken?: string
) {
  try {
    const response = await googlePlacesClient.get('/textsearch/json', {
      params: {
        query,
        location: `${location.lat},${location.lng}`,
        radius,
        pageToken
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching places from Google Places API:', error);
    throw error;
  }
}

async function getPlaceDetails(placeId: string) {
  try {
    const response = await googlePlacesClient.get('/details/json', {
      params: {
        place_id: placeId,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'website',
          'rating',
          'user_ratings_total',
          'price_level',
          'opening_hours',
          'photos',
          'types',
          'url'
        ].join(',')
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching place details from Google Places API:', error);
    throw error;
  }
}

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
      'restaurants in 60606',
    ];

    let allPlaces = [];
    let newPlaces = 0;
    let seenPlaceIds = new Set<string>();

    // Center point of Chicago for search
    const chicagoCenter = {
      lat: (CHICAGO_BOUNDS.northeast.lat + CHICAGO_BOUNDS.southwest.lat) / 2,
      lng: (CHICAGO_BOUNDS.northeast.lng + CHICAGO_BOUNDS.southwest.lng) / 2
    };

    for (const query of queries) {
      console.log(`Searching for ${query}...`);
      let nextPageToken: string | undefined;
      
      do {
        const searchResults = await searchGooglePlaces(query, chicagoCenter, 50000, nextPageToken);
        
        for (const place of searchResults.results) {
          // Skip if we've already seen this place in this run
          if (place.place_id && seenPlaceIds.has(place.place_id)) {
            continue;
          }

          if (place.place_id) {
            seenPlaceIds.add(place.place_id);
          }

          // Get detailed information for each place
          const details = await getPlaceDetails(place.place_id);
          
          // Add additional fields that might be useful
          const enhancedPlace = {
            ...place,
            ...details.result,
            // Add a unique ID for tracking
            import_id: uuidv4(),
            // Add timestamp
            import_timestamp: new Date().toISOString()
          };

          allPlaces.push(enhancedPlace);
          newPlaces++;
        }

        nextPageToken = searchResults.next_page_token;
        
        // Google Places API requires a short delay between page token requests
        if (nextPageToken) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } while (nextPageToken);
    }

    // Save to JSON file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `google-places-chicago-restaurants-${timestamp}.json`;
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