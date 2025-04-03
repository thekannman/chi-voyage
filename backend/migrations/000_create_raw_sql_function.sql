-- Create a function to execute raw SQL
CREATE OR REPLACE FUNCTION raw_sql(query text)
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 