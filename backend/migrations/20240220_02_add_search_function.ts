import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
    CREATE OR REPLACE FUNCTION search_places(
      search_term TEXT,
      category_filter TEXT DEFAULT NULL,
      location_filter TEXT DEFAULT NULL,
      limit_count INT DEFAULT 20,
      offset_count INT DEFAULT 0
    )
    RETURNS TABLE (
      id TEXT,
      title TEXT,
      slug TEXT,
      description TEXT,
      imagePath TEXT,
      rating NUMERIC,
      category TEXT,
      location TEXT,
      details JSONB,
      create_ts TIMESTAMP WITH TIME ZONE,
      update_ts TIMESTAMP WITH TIME ZONE
    ) AS $$
    BEGIN
      RETURN QUERY
      SELECT
        p.id,
        p.title,
        p.slug,
        p.description,
        p.imagePath,
        p.rating,
        p.category,
        p.location,
        p.details,
        p.create_ts,
        p.update_ts
      FROM
        places p
      WHERE
        (
          search_term IS NULL OR
          search_term = '' OR
          p.title ILIKE '%' || search_term || '%' OR
          p.description ILIKE '%' || search_term || '%'
        )
        AND
        (
          category_filter IS NULL OR
          category_filter = '' OR
          p.category = category_filter
        )
        AND
        (
          location_filter IS NULL OR
          location_filter = '' OR
          p.location ILIKE '%' || location_filter || '%'
        )
      ORDER BY
        p.rating DESC NULLS LAST,
        p.title ASC
      LIMIT limit_count
      OFFSET offset_count;
    END;
    $$ LANGUAGE plpgsql;
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP FUNCTION IF EXISTS search_places(TEXT, TEXT, TEXT, INT, INT)`.execute(db);
} 