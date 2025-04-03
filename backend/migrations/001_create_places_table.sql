-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  imagePath TEXT,
  rating NUMERIC,
  category TEXT NOT NULL,
  location TEXT,
  details JSONB,
  create_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  update_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS places_slug_idx ON places (slug);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS places_category_idx ON places (category);

-- Create index on location for filtering
CREATE INDEX IF NOT EXISTS places_location_idx ON places (location);

-- Create a function to update the update_ts column
CREATE OR REPLACE FUNCTION update_update_ts_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.update_ts = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the update_ts column
CREATE TRIGGER update_places_update_ts
BEFORE UPDATE ON places
FOR EACH ROW
EXECUTE FUNCTION update_update_ts_column(); 