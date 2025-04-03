import { db } from '../db';
import { insertPlace, updatePlace, getPlaceBySlug } from '../db/queries';
import fs from 'fs';
import path from 'path';
import { NewPlace, JsonObject } from '../db/types';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToSupabase } from '../utils/supabase';
import crypto from 'crypto';
import { categorizePlace } from '../utils';

interface OutscraperPlace {
  name: string;
  description?: string;
  photo?: string;
  rating?: number;
  full_address?: string;
  place_id?: string;
  phone?: string;
  site?: string;
  price_range?: string;
  working_hours?: JsonObject;
  about?: JsonObject;
  reviews?: number;
  photos_count?: number;
  latitude?: number;
  longitude?: number;
  subtypes?: string[];
  city?: string;
  state?: string;
  postal_code?: number;
  time_zone?: string;
  business_status?: string;
  verified?: boolean;
  booking_appointment_link?: string;
  order_links?: string;
  location_link?: string;
  reviews_link?: string;
  owner_title?: string;
  owner_link?: string;
  [key: string]: any;
}

// Get the file path from command line arguments or use default
const args = process.argv.slice(2);
const filePath = args.find(arg => !arg.startsWith('--')) || path.join(__dirname, '../../data/Outscraper-20250402171751xs4c_restaurant_+2.json');
const failFast = args.includes('--fail-fast');

async function importOutscraperData(filePath: string) {
  try {
    console.log('Reading JSON file...');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const places: OutscraperPlace[] = JSON.parse(rawData);

    console.log(`Found ${places.length} places to import`);
    let imported = 0;
    let updated = 0;
    let errors = 0;
    let skipped = 0;

    for (const place of places) {
      try {
        // Create a slug from the name
        const slug = place.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Check if place already exists
        const existingPlace = await getPlaceBySlug(slug);

        // If the place exists and has a valid UUID, update it
        // If it exists with a Google place_id, delete it and create a new one
        if (existingPlace) {
          if (existingPlace.id.startsWith('ChIJ')) {
            console.log(`Deleting duplicate entry with Google place_id for ${place.name}`);
            await db
              .deleteFrom('places')
              .where('id', '=', existingPlace.id)
              .execute();
          } else {
            console.log(`Updating existing place ${place.name}`);
            
            // Handle image upload if there's a photo
            let imagePath = existingPlace.imagePath;
            if (place.photo && !imagePath) {
              try {
                const urlHash = crypto.createHash('md5').update(place.photo).digest('hex');
                const fileName = `${slug}-${urlHash}.jpg`;
                imagePath = await uploadImageToSupabase(place.photo, fileName);
                console.log(`Uploaded image for ${place.name}: ${imagePath}`);
              } catch (error) {
                console.error(`Failed to upload image for ${place.name}:`, error);
                if (failFast) {
                  throw error;
                }
                // Keep the existing imagePath if upload fails
                imagePath = existingPlace.imagePath;
              }
            }

            // Get the category from the most appropriate field
            const category = place.category || place.type || place.subtypes?.[0] || existingPlace.category || '';
            console.log('Selected category:', category);
            const mappedCategory = categorizePlace(category);
            console.log('Mapped category:', mappedCategory);

            // Prepare the update data
            const updateData: Omit<NewPlace, 'create_ts' | 'update_ts'> = {
              id: existingPlace.id,
              title: place.name,
              slug,
              description: place.description || existingPlace.description || undefined,
              imagePath: imagePath || existingPlace.imagePath || undefined,
              rating: place.rating || existingPlace.rating || undefined,
              category: mappedCategory,
              location: place.full_address || existingPlace.location || undefined,
              phone: place.phone || existingPlace.phone || undefined,
              website: place.site || existingPlace.website || undefined,
              price_range: place.price_range || existingPlace.price_range || undefined,
              working_hours: place.working_hours || existingPlace.working_hours || undefined,
              features: place.about ? Object.entries(place.about).reduce((acc, [key, value]) => {
                if (typeof value === 'object') {
                  // For nested objects, create a string representation
                  acc[key] = Object.entries(value as Record<string, unknown>)
                    .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                    .join(', ');
                } else {
                  acc[key] = value;
                }
                return acc;
              }, {} as Record<string, unknown>) as JsonObject : existingPlace.features,
              photos_count: place.photos_count || existingPlace.photos_count || undefined,
              reviews_count: place.reviews || existingPlace.reviews_count || undefined,
              latitude: place.latitude || existingPlace.latitude || undefined,
              longitude: place.longitude || existingPlace.longitude || undefined,
              details: {
                ...(existingPlace.details as JsonObject || {}),
                place_id: place.place_id,
                subtypes: Array.isArray(place.subtypes) ? place.subtypes : (typeof place.subtypes === 'string' ? (place.subtypes as string).split(',').map((s: string) => s.trim()) : []),
                city: place.city,
                state: place.state,
                postal_code: place.postal_code,
                time_zone: place.time_zone,
                business_status: place.business_status,
                verified: place.verified,
                booking_appointment_link: place.booking_appointment_link,
                order_links: place.order_links,
                location_link: place.location_link,
                reviews_link: place.reviews_link,
                owner_title: place.owner_title,
                owner_link: place.owner_link,
              } as JsonObject,
            };

            await updatePlace(existingPlace.id, updateData);
            updated++;
            continue;
          }
        }

        // Handle image upload if there's a photo
        let imagePath = null;
        if (place.photo) {
          try {
            const urlHash = crypto.createHash('md5').update(place.photo).digest('hex');
            const fileName = `${slug}-${urlHash}.jpg`;
            imagePath = await uploadImageToSupabase(place.photo, fileName);
            console.log(`Uploaded image for ${place.name}: ${imagePath}`);
          } catch (error) {
            console.error(`Failed to upload image for ${place.name}:`, error);
            if (failFast) {
              throw error;
            }
          }
        }

        // Get the category from the most appropriate field
        const category = place.category || place.type || place.subtypes?.[0] || '';
        console.log('Selected category:', category);
        const mappedCategory = categorizePlace(category);
        console.log('Mapped category:', mappedCategory);

        const placeData: Omit<NewPlace, 'create_ts' | 'update_ts'> = {
          id: uuidv4(),
          title: place.name,
          slug,
          description: place.description || undefined,
          imagePath: imagePath || undefined,
          rating: place.rating || undefined,
          category: mappedCategory,
          location: place.full_address || undefined,
          phone: place.phone || undefined,
          website: place.site || undefined,
          price_range: place.price_range || undefined,
          working_hours: place.working_hours || undefined,
          features: place.about ? Object.entries(place.about).reduce((acc, [key, value]) => {
            if (typeof value === 'object') {
              // For nested objects, create a string representation
              acc[key] = Object.entries(value as Record<string, unknown>)
                .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                .join(', ');
            } else {
              acc[key] = value;
            }
            return acc;
          }, {} as Record<string, unknown>) as JsonObject : undefined,
          photos_count: place.photos_count || undefined,
          reviews_count: place.reviews || undefined,
          latitude: place.latitude || undefined,
          longitude: place.longitude || undefined,
          details: {
            place_id: place.place_id,
            subtypes: Array.isArray(place.subtypes) ? place.subtypes : (typeof place.subtypes === 'string' ? (place.subtypes as string).split(',').map((s: string) => s.trim()) : []),
            city: place.city,
            state: place.state,
            postal_code: place.postal_code,
            time_zone: place.time_zone,
            business_status: place.business_status,
            verified: place.verified,
            booking_appointment_link: place.booking_appointment_link,
            order_links: place.order_links,
            location_link: place.location_link,
            reviews_link: place.reviews_link,
            owner_title: place.owner_title,
            owner_link: place.owner_link,
          } as JsonObject,
        };

        // Insert new place
        await insertPlace(placeData);
        imported++;

        // Log progress every 100 places
        if ((imported + updated) % 100 === 0) {
          console.log(`Processed ${imported + updated} places...`);
        }
      } catch (error) {
        console.error(`Error processing place ${place.name}:`, error);
        errors++;
        if (failFast) {
          throw error;
        }
      }
    }

    console.log('\nImport completed:');
    console.log(`- ${imported} new places imported`);
    console.log(`- ${updated} existing places updated`);
    console.log(`- ${errors} errors encountered`);
    console.log(`- ${skipped} duplicates skipped`);

  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  } finally {
    // Close the database connection
    await db.destroy();
  }
}

// Run the import
importOutscraperData(filePath).catch(console.error); 