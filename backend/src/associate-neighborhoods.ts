import { supabase } from './supabase';

// Map of location keywords to neighborhood IDs
const locationToNeighborhood: Record<string, string[]> = {
  'loop': ['loop'],
  'river north': ['river-north'],
  'west loop': ['west-loop'],
  'lincoln park': ['lincoln-park'],
  'wicker park': ['wicker-park'],
  'gold coast': ['gold-coast'],
  'bucktown': ['bucktown'],
  'south loop': ['south-loop'],
  'downtown': ['loop', 'river-north'],
  'near north': ['river-north', 'gold-coast'],
  'old town': ['lincoln-park'],
  'lakeview': ['lincoln-park'],
  'ukrainian village': ['wicker-park'],
  'west town': ['west-loop', 'wicker-park'],
  'fulton market': ['west-loop'],
  'river west': ['river-north', 'west-loop'],
  'streeterville': ['river-north'],
  'magnificent mile': ['river-north', 'gold-coast'],
  'museum campus': ['south-loop'],
  'grant park': ['south-loop', 'loop']
};

async function associateNeighborhoods() {
  console.log('Starting neighborhood association...');

  // Fetch all places
  const { data: places, error: placesError } = await supabase
    .from('places')
    .select('id, location');

  if (placesError) {
    console.error('Error fetching places:', placesError);
    return;
  }

  // Fetch all neighborhoods
  const { data: neighborhoods, error: neighborhoodsError } = await supabase
    .from('neighborhoods')
    .select('id, name');

  if (neighborhoodsError) {
    console.error('Error fetching neighborhoods:', neighborhoodsError);
    return;
  }

  // Create a map of neighborhood names to IDs
  const neighborhoodMap = new Map(
    neighborhoods.map(n => [n.name.toLowerCase(), n.id])
  );

  // Process each place
  for (const place of places) {
    if (!place.location) continue;

    const location = place.location.toLowerCase();
    const associatedNeighborhoods = new Set<string>();

    // Check for exact matches
    for (const [keyword, neighborhoodIds] of Object.entries(locationToNeighborhood)) {
      if (location.includes(keyword)) {
        neighborhoodIds.forEach(id => associatedNeighborhoods.add(id));
      }
    }

    // Check for partial matches with neighborhood names
    for (const [name, id] of neighborhoodMap.entries()) {
      if (location.includes(name)) {
        associatedNeighborhoods.add(id);
      }
    }

    // Insert associations
    if (associatedNeighborhoods.size > 0) {
      const associations = Array.from(associatedNeighborhoods).map(neighborhoodId => ({
        place_id: place.id,
        neighborhood_id: neighborhoodId
      }));

      const { error: insertError } = await supabase
        .from('place_neighborhoods')
        .upsert(associations);

      if (insertError) {
        console.error(`Error associating neighborhoods for place ${place.id}:`, insertError);
      } else {
        console.log(`Associated ${associations.length} neighborhoods with place ${place.id}`);
      }
    }
  }

  console.log('Neighborhood association completed!');
}

// Run the association function
associateNeighborhoods().catch(console.error); 