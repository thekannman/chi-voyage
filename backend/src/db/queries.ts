import { db } from './index';
import { NewPlace, NewNeighborhood, NewPlaceNeighborhood, SelectPlace, UpdatePlace } from './types';
import { revalidateFrontend } from '../utils/revalidate';
import { ExpressionBuilder } from 'kysely';
import { Database } from './types';
import { sql } from 'kysely';

// Place queries
export async function insertPlace(place: NewPlace): Promise<SelectPlace> {
  const result = await db
    .insertInto('places')
    .values(place)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw new Error('Failed to insert place');
  }

  // Trigger revalidation for the new place
  if (result.slug) {
    await revalidateFrontend(`/${result.category}/${result.slug}`);
    // Also revalidate the category page
    await revalidateFrontend(`/${result.category}`);
  }

  return result;
}

export async function getPlaceById(id: string): Promise<SelectPlace | null> {
  const result = await db
    .selectFrom('places')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
    
  return result || null;
}

export async function updatePlace(id: string, place: UpdatePlace): Promise<SelectPlace> {
  const result = await db
    .updateTable('places')
    .set(place)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw new Error(`Place with id ${id} not found`);
  }

  // Trigger revalidation for the updated place
  if (result.slug) {
    await revalidateFrontend(`/${result.category}/${result.slug}`);
    // Also revalidate the category page
    await revalidateFrontend(`/${result.category}`);
  }

  return result;
}

export async function getPlaceBySlug(slug: string): Promise<SelectPlace | null> {
  const result = await db
    .selectFrom('places')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirst();

  return result || null;
}

export async function searchPlaces(
  searchTerm?: string, 
  category?: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other', 
  page: number = 1, 
  pageSize: number = 12,
  priceRange?: string,
  rating?: string,
  subtype?: string
): Promise<{ places: SelectPlace[], total: number }> {
  console.log('searchPlaces called with:', {
    searchTerm,
    category,
    page,
    pageSize,
    priceRange,
    rating,
    subtype
  });

  // Build the where conditions
  const whereConditions = (eb: ExpressionBuilder<Database, 'places'>) => {
    let conditions: any[] = [];
    
    // Search conditions (these should be combined with OR)
    if (searchTerm && searchTerm.trim() !== '') {
      console.log('Adding search condition:', searchTerm);
      const searchPattern = `%${searchTerm.trim().toLowerCase()}%`;
      conditions.push(
        eb.or([
          eb('title', 'ilike', searchPattern),
          eb('location', 'ilike', searchPattern),
          eb('description', 'ilike', searchPattern),
          sql<boolean>`details->>'subtypes' ilike ${searchPattern}`,
          sql<boolean>`details->>'features' ilike ${searchPattern}`
        ])
      );
    }

    // Filter conditions (these should be combined with AND)
    if (category) {
      console.log('Adding category condition:', category);
      conditions.push(eb('category', '=', category));
    }

    if (priceRange && priceRange.trim() !== '') {
      console.log('Adding price range condition:', priceRange);
      conditions.push(eb('price_range', '=', priceRange.trim()));
    }

    if (rating && rating.trim() !== '') {
      console.log('Adding rating condition:', rating);
      conditions.push(eb('rating', '>=', parseFloat(rating.trim())));
    }

    if (subtype && subtype.trim() !== '') {
      console.log('Adding subtype condition:', subtype);
      conditions.push(
        sql<boolean>`details->'subtypes' @> ${JSON.stringify([subtype.trim()])}::jsonb`
      );
    }

    // If we have no conditions, return true
    if (conditions.length === 0) {
      return eb.val(true);
    }

    // Combine all conditions with AND
    return conditions.reduce((acc, condition) => eb.and([acc, condition]), eb.val(true));
  };

  // Get total count
  const totalResult = await db
    .selectFrom('places')
    .select(db.fn.countAll().as('count'))
    .where(whereConditions)
    .executeTakeFirst();
  
  const total = Number(totalResult?.count || 0);
  console.log('Total count:', total);

  // Get paginated results with sorting
  const places = await db
    .selectFrom('places')
    .selectAll()
    .where(whereConditions)
    // First sort by rating (highest first), putting NULL ratings at the end
    .orderBy((eb) => eb.fn('COALESCE', [eb.ref('rating'), eb.val(0)]), 'desc')
    // Then sort by number of reviews (highest first)
    .orderBy('reviews_count', 'desc')
    // Finally sort alphabetically by title
    .orderBy('title', 'asc')
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .execute();

  console.log('Found places:', places.length);
  return { places, total };
}

// Neighborhood queries
export async function insertNeighborhood(neighborhood: NewNeighborhood) {
  return await db
    .insertInto('neighborhoods')
    .values(neighborhood)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getNeighborhoodBySlug(slug: string) {
  return await db
    .selectFrom('neighborhoods')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirst();
}

export async function getAllNeighborhoods() {
  return await db
    .selectFrom('neighborhoods')
    .selectAll()
    .orderBy('name', 'asc')
    .execute();
}

// Place-Neighborhood junction queries
export async function associatePlaceWithNeighborhood(association: NewPlaceNeighborhood) {
  return await db
    .insertInto('place_neighborhoods')
    .values(association)
    .onConflict((eb) => eb.columns(['place_id', 'neighborhood_id']).doNothing())
    .execute();
}

export async function getNeighborhoodsForPlace(placeId: string) {
  return await db
    .selectFrom('neighborhoods')
    .innerJoin(
      'place_neighborhoods',
      'neighborhoods.id',
      'place_neighborhoods.neighborhood_id'
    )
    .selectAll('neighborhoods')
    .where('place_neighborhoods.place_id', '=', placeId)
    .execute();
}

export async function getPlacesInNeighborhood(neighborhoodId: string) {
  return await db
    .selectFrom('places')
    .innerJoin(
      'place_neighborhoods',
      'places.id',
      'place_neighborhoods.place_id'
    )
    .selectAll('places')
    .where('place_neighborhoods.neighborhood_id', '=', neighborhoodId)
    .execute();
}

// Get all places
export async function getAllPlaces(): Promise<SelectPlace[]> {
  return await db
    .selectFrom('places')
    .selectAll()
    .orderBy('title', 'asc')
    .execute();
}

// Get places by neighborhood ID
export async function getPlacesByNeighborhood(neighborhoodId: string): Promise<SelectPlace[]> {
  return await db
    .selectFrom('places')
    .innerJoin('place_neighborhoods', 'places.id', 'place_neighborhoods.place_id')
    .where('place_neighborhoods.neighborhood_id', '=', neighborhoodId)
    .selectAll('places')
    .orderBy('title', 'asc')
    .execute();
}

export async function deletePlace(id: string): Promise<void> {
  // Get the place before deleting it to know its category
  const place = await getPlaceById(id);
  
  if (!place) {
    throw new Error(`Place with id ${id} not found`);
  }
  
  // Delete the place
  await db
    .deleteFrom('places')
    .where('id', '=', id)
    .execute();
  
  // Trigger revalidation for the category page
  if (place.category) {
    await revalidateFrontend(`/${place.category}`);
  }
}

export async function getUniqueSubtypesForCategory(
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other'
): Promise<string[]> {
  const result = await db
    .selectFrom('places')
    .select('details')
    .where('category', '=', category)
    .execute();

  // Extract all subtypes from the details JSON field
  const allSubtypes = result
    .map(place => {
      const details = place.details as { subtypes?: string[] } | null;
      return details?.subtypes || [];
    })
    .flat();

  // Get unique subtypes and sort them
  return [...new Set(allSubtypes)].sort();
} 