import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Create places table
  await db.schema
    .createTable('places')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('slug', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('imagePath', 'text')
    .addColumn('rating', 'numeric')
    .addColumn('category', 'text', (col) => col.notNull())
    .addColumn('location', 'text')
    .addColumn('details', 'jsonb')
    .addColumn('create_ts', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .addColumn('update_ts', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .execute();

  // Create indexes for places table
  await db.schema
    .createIndex('places_slug_idx')
    .on('places')
    .column('slug')
    .execute();

  await db.schema
    .createIndex('places_category_idx')
    .on('places')
    .column('category')
    .execute();

  await db.schema
    .createIndex('places_location_idx')
    .on('places')
    .column('location')
    .execute();

  // Create neighborhoods table
  await db.schema
    .createTable('neighborhoods')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('slug', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('imagePath', 'text')
    .addColumn('create_ts', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .addColumn('update_ts', 'timestamptz', (col) => col.defaultTo(sql`now()`))
    .execute();

  // Create index for neighborhoods table
  await db.schema
    .createIndex('neighborhoods_slug_idx')
    .on('neighborhoods')
    .column('slug')
    .execute();

  // Create junction table
  await db.schema
    .createTable('place_neighborhoods')
    .addColumn('place_id', 'text', (col) =>
      col.references('places.id').onDelete('cascade').notNull()
    )
    .addColumn('neighborhood_id', 'text', (col) =>
      col.references('neighborhoods.id').onDelete('cascade').notNull()
    )
    .addPrimaryKeyConstraint('place_neighborhoods_pkey', ['place_id', 'neighborhood_id'])
    .execute();

  // Create indexes for junction table
  await db.schema
    .createIndex('place_neighborhoods_place_id_idx')
    .on('place_neighborhoods')
    .column('place_id')
    .execute();

  await db.schema
    .createIndex('place_neighborhoods_neighborhood_id_idx')
    .on('place_neighborhoods')
    .column('neighborhood_id')
    .execute();

  // Create update_ts trigger function
  await sql`
    CREATE OR REPLACE FUNCTION update_update_ts_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.update_ts = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `.execute(db);

  // Create triggers
  await sql`
    CREATE TRIGGER update_places_update_ts
    BEFORE UPDATE ON places
    FOR EACH ROW
    EXECUTE FUNCTION update_update_ts_column()
  `.execute(db);

  await sql`
    CREATE TRIGGER update_neighborhoods_update_ts
    BEFORE UPDATE ON neighborhoods
    FOR EACH ROW
    EXECUTE FUNCTION update_update_ts_column()
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop triggers first
  await sql`DROP TRIGGER IF EXISTS update_places_update_ts ON places`.execute(db);
  await sql`DROP TRIGGER IF EXISTS update_neighborhoods_update_ts ON neighborhoods`.execute(db);
  
  // Drop trigger function
  await sql`DROP FUNCTION IF EXISTS update_update_ts_column()`.execute(db);

  // Drop tables and their indexes (indexes are dropped automatically)
  await db.schema.dropTable('place_neighborhoods').execute();
  await db.schema.dropTable('neighborhoods').execute();
  await db.schema.dropTable('places').execute();
} 