import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Add new columns to places table
  await db.schema
    .alterTable('places')
    .addColumn('phone', 'text')
    .addColumn('website', 'text')
    .addColumn('price_range', 'text')
    .addColumn('working_hours', 'jsonb')
    .addColumn('features', 'jsonb')
    .addColumn('photos_count', 'integer')
    .addColumn('reviews_count', 'integer')
    .addColumn('latitude', 'numeric')
    .addColumn('longitude', 'numeric')
    .execute();

  // Create indexes for new columns
  await db.schema
    .createIndex('places_price_range_idx')
    .on('places')
    .column('price_range')
    .execute();

  await db.schema
    .createIndex('places_rating_idx')
    .on('places')
    .column('rating')
    .execute();

  // Create index for location-based queries
  await db.schema
    .createIndex('places_location_coords_idx')
    .on('places')
    .columns(['latitude', 'longitude'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop indexes
  await db.schema.dropIndex('places_price_range_idx').execute();
  await db.schema.dropIndex('places_rating_idx').execute();
  await db.schema.dropIndex('places_location_coords_idx').execute();

  // Drop columns
  await db.schema
    .alterTable('places')
    .dropColumn('phone')
    .dropColumn('website')
    .dropColumn('price_range')
    .dropColumn('working_hours')
    .dropColumn('features')
    .dropColumn('photos_count')
    .dropColumn('reviews_count')
    .dropColumn('latitude')
    .dropColumn('longitude')
    .execute();
} 