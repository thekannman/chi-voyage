import fs from 'fs';
import path from 'path';
import { db } from '../src/db';
import { NewPlace } from '../src/db/types';
import { createSlug } from '../src/utils/slugify';

async function importRestaurants() {
  const filePath = path.join(__dirname, '../data/Outscraper-20250402171751xs4c_restaurant_+2.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const restaurants = JSON.parse(fileContent);

  console.log(`Found ${restaurants.length} restaurants to import`);

  for (const restaurant of restaurants) {
    try {
      const place: NewPlace = {
        id: restaurant.place_id,
        title: restaurant.name,
        slug: createSlug(restaurant.name),
        description: restaurant.description,
        imagePath: restaurant.photo,
        rating: restaurant.rating,
        category: restaurant.type || 'restaurant',
        location: restaurant.full_address,
        phone: restaurant.phone,
        website: restaurant.site,
        price_range: restaurant.range,
        working_hours: restaurant.working_hours,
        features: restaurant.about,
        photos_count: restaurant.photos_count,
        reviews_count: restaurant.reviews,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        details: {
          subtypes: restaurant.subtypes,
          borough: restaurant.borough,
          business_status: restaurant.business_status,
          reviews_per_score: {
            "1": restaurant.reviews_per_score_1,
            "2": restaurant.reviews_per_score_2,
            "3": restaurant.reviews_per_score_3,
            "4": restaurant.reviews_per_score_4,
            "5": restaurant.reviews_per_score_5
          }
        }
      };

      await db
        .insertInto('places')
        .values(place)
        .onConflict((oc) => 
          oc.column('id').doUpdateSet({
            title: place.title,
            description: place.description,
            imagePath: place.imagePath,
            rating: place.rating,
            category: place.category,
            location: place.location,
            phone: place.phone,
            website: place.website,
            price_range: place.price_range,
            working_hours: place.working_hours,
            features: place.features,
            photos_count: place.photos_count,
            reviews_count: place.reviews_count,
            latitude: place.latitude,
            longitude: place.longitude,
            details: place.details
          })
        )
        .execute();

      console.log(`Imported/Updated: ${place.title}`);
    } catch (error) {
      console.error(`Error importing ${restaurant.name}:`, error);
    }
  }

  console.log('Import completed');
}

// Run the import
importRestaurants().catch(console.error).finally(() => process.exit()); 