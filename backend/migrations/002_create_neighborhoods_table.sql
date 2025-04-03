-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  imagePath TEXT,
  create_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  update_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS neighborhoods_slug_idx ON neighborhoods (slug);

-- Create a trigger to automatically update the update_ts column
CREATE TRIGGER update_neighborhoods_update_ts
BEFORE UPDATE ON neighborhoods
FOR EACH ROW
EXECUTE FUNCTION update_update_ts_column();

-- Create a junction table for places and neighborhoods
CREATE TABLE IF NOT EXISTS place_neighborhoods (
  place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
  neighborhood_id TEXT REFERENCES neighborhoods(id) ON DELETE CASCADE,
  PRIMARY KEY (place_id, neighborhood_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS place_neighborhoods_place_id_idx ON place_neighborhoods (place_id);
CREATE INDEX IF NOT EXISTS place_neighborhoods_neighborhood_id_idx ON place_neighborhoods (neighborhood_id); 