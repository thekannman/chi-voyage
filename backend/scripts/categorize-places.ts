import { db } from '../src/db';
import { sql } from 'kysely';

// Mapping of subtypes to categories
const subtypeToCategory: Record<string, 'restaurant' | 'activity' | 'attraction' | 'other'> = {
  // Restaurant subtypes
  'restaurant': 'restaurant',
  'cafe': 'restaurant',
  'bar': 'restaurant',
  'bakery': 'restaurant',
  'food': 'restaurant',
  'meal_takeaway': 'restaurant',
  'meal_delivery': 'restaurant',
  'afghan restaurant': 'restaurant',
  'african restaurant': 'restaurant',
  'american restaurant': 'restaurant',
  'andhra restaurant': 'restaurant',
  'arab restaurant': 'restaurant',
  'argentinian restaurant': 'restaurant',
  'art cafe': 'restaurant',
  'asian fusion restaurant': 'restaurant',
  'asian restaurant': 'restaurant',
  'austrian restaurant': 'restaurant',
  'authentic japanese restaurant': 'restaurant',
  'bagel shop': 'restaurant',
  'bangladeshi restaurant': 'restaurant',
  'banquet hall': 'restaurant',
  'barbecue restaurant': 'restaurant',
  'bar & grill': 'restaurant',
  'basque restaurant': 'restaurant',
  'beer garden': 'restaurant',
  'beer hall': 'restaurant',
  'belgian restaurant': 'restaurant',
  'biryani restaurant': 'restaurant',
  'bistro': 'restaurant',
  'brazilian restaurant': 'restaurant',
  'breakfast restaurant': 'restaurant',
  'brewery': 'restaurant',
  'brewpub': 'restaurant',
  'british restaurant': 'restaurant',
  'brunch restaurant': 'restaurant',
  'bubble tea store': 'restaurant',
  'buffet restaurant': 'restaurant',
  'burrito restaurant': 'restaurant',
  'cafeteria': 'restaurant',
  'cajun restaurant': 'restaurant',
  'cake shop': 'restaurant',
  'californian restaurant': 'restaurant',
  'cambodian restaurant': 'restaurant',
  'canadian restaurant': 'restaurant',
  'cantonese restaurant': 'restaurant',
  'caribbean restaurant': 'restaurant',
  'caterer': 'restaurant',
  'catering': 'restaurant',
  'central american restaurant': 'restaurant',
  'charcuterie': 'restaurant',
  'cheese shop': 'restaurant',
  'cheesesteak restaurant': 'restaurant',
  'chicken restaurant': 'restaurant',
  'chicken shop': 'restaurant',
  'chicken wings restaurant': 'restaurant',
  'chilean restaurant': 'restaurant',
  'chinese noodle restaurant': 'restaurant',
  'chinese restaurant': 'restaurant',
  'chinese takeaway': 'restaurant',
  'chocolate cafe': 'restaurant',
  'chocolate shop': 'restaurant',
  'chophouse restaurant': 'restaurant',
  'cider bar': 'restaurant',
  'cocktail bar': 'restaurant',
  'coffee shop': 'restaurant',
  'coffee store': 'restaurant',
  'cold noodle restaurant': 'restaurant',
  'colombian restaurant': 'restaurant',
  'comic cafe': 'restaurant',
  'conveyor belt sushi restaurant': 'restaurant',
  'cookie shop': 'restaurant',
  'costa rican restaurant': 'restaurant',
  'crab house': 'restaurant',
  'creole restaurant': 'restaurant',
  'creperie': 'restaurant',
  'croatian restaurant': 'restaurant',
  'cuban restaurant': 'restaurant',
  'czech restaurant': 'restaurant',
  'deli': 'restaurant',
  'delivery chinese restaurant': 'restaurant',
  'delivery restaurant': 'restaurant',
  'dessert restaurant': 'restaurant',
  'dessert shop': 'restaurant',
  'dim sum restaurant': 'restaurant',
  'diner': 'restaurant',
  'dinner theater': 'restaurant',
  'dog cafe': 'restaurant',
  'dominican restaurant': 'restaurant',
  'doner kebab restaurant': 'restaurant',
  'donut shop': 'restaurant',
  'dumpling restaurant': 'restaurant',
  'east african restaurant': 'restaurant',
  'eastern european restaurant': 'restaurant',
  'eclectic restaurant': 'restaurant',
  'ecuadorian restaurant': 'restaurant',
  'egyptian restaurant': 'restaurant',
  'eritrean restaurant': 'restaurant',
  'espresso bar': 'restaurant',
  'ethiopian restaurant': 'restaurant',
  'european restaurant': 'restaurant',
  'falafel restaurant': 'restaurant',
  'family restaurant': 'restaurant',
  'fast food restaurant': 'restaurant',
  'filipino restaurant': 'restaurant',
  'fine dining restaurant': 'restaurant',
  'fish and chips takeaway': 'restaurant',
  'fish & chips restaurant': 'restaurant',
  'fish restaurant': 'restaurant',
  'fondue restaurant': 'restaurant',
  'food court': 'restaurant',
  'french restaurant': 'restaurant',
  'french steakhouse restaurant': 'restaurant',
  'fried chicken takeaway': 'restaurant',
  'frozen yogurt shop': 'restaurant',
  'fusion restaurant': 'restaurant',
  'gastropub': 'restaurant',
  'georgian restaurant': 'restaurant',
  'german restaurant': 'restaurant',
  'gluten-free restaurant': 'restaurant',
  'greek restaurant': 'restaurant',
  'grill': 'restaurant',
  'guatemalan restaurant': 'restaurant',
  'gujarati restaurant': 'restaurant',
  'gyro restaurant': 'restaurant',
  'haitian restaurant': 'restaurant',
  'halal restaurant': 'restaurant',
  'hamburger restaurant': 'restaurant',
  'hawaiian restaurant': 'restaurant',
  'health food restaurant': 'restaurant',
  'hoagie restaurant': 'restaurant',
  'honduran restaurant': 'restaurant',
  'hong kong style fast food restaurant': 'restaurant',
  'hot dog restaurant': 'restaurant',
  'hot dog stand': 'restaurant',
  'hot pot restaurant': 'restaurant',
  'hunan restaurant': 'restaurant',
  'hyderabadi restaurant': 'restaurant',
  'ice cream shop': 'restaurant',
  'indian muslim restaurant': 'restaurant',
  'indian restaurant': 'restaurant',
  'indian sizzler restaurant': 'restaurant',
  'indian takeaway': 'restaurant',
  'internet cafe': 'restaurant',
  'irish pub': 'restaurant',
  'irish restaurant': 'restaurant',
  'israeli restaurant': 'restaurant',
  'italian restaurant': 'restaurant',
  'izakaya restaurant': 'restaurant',
  'jamaican restaurant': 'restaurant',
  'japanese restaurant': 'restaurant',
  'jewish restaurant': 'restaurant',
  'juice shop': 'restaurant',
  'karaoke bar': 'restaurant',
  'kazakhstani restaurant': 'restaurant',
  'kebab shop': 'restaurant',
  'kerala restaurant': 'restaurant',
  'korean barbecue restaurant': 'restaurant',
  'korean restaurant': 'restaurant',
  'korean rib restaurant': 'restaurant',
  'kosher restaurant': 'restaurant',
  'kushiyaki restaurant': 'restaurant',
  'laotian restaurant': 'restaurant',
  'latin american restaurant': 'restaurant',
  'lebanese restaurant': 'restaurant',
  'lunch restaurant': 'restaurant',
  'malaysian restaurant': 'restaurant',
  'mandarin restaurant': 'restaurant',
  'meat dish restaurant': 'restaurant',
  'mediterranean restaurant': 'restaurant',
  'mexican restaurant': 'restaurant',
  'mexican torta restaurant': 'restaurant',
  'middle eastern restaurant': 'restaurant',
  'modern british restaurant': 'restaurant',
  'modern european restaurant': 'restaurant',
  'modern indian restaurant': 'restaurant',
  'momo restaurant': 'restaurant',
  'moroccan restaurant': 'restaurant',
  'neapolitan restaurant': 'restaurant',
  'nepalese restaurant': 'restaurant',
  'new american restaurant': 'restaurant',
  'noodle shop': 'restaurant',
  'north african restaurant': 'restaurant',
  'north eastern indian restaurant': 'restaurant',
  'northern italian restaurant': 'restaurant',
  'north indian restaurant': 'restaurant',
  'oaxacan restaurant': 'restaurant',
  'organic restaurant': 'restaurant',
  'oyster bar restaurant': 'restaurant',
  'pakistani restaurant': 'restaurant',
  'pan-asian restaurant': 'restaurant',
  'pancake restaurant': 'restaurant',
  'pan-latin restaurant': 'restaurant',
  'pasta shop': 'restaurant',
  'pastry shop': 'restaurant',
  'persian restaurant': 'restaurant',
  'peruvian restaurant': 'restaurant',
  'pho restaurant': 'restaurant',
  'pie shop': 'restaurant',
  'pizza delivery': 'restaurant',
  'pizza restaurant': 'restaurant',
  'pizza takeout': 'restaurant',
  'po\' boys restaurant': 'restaurant',
  'poke bar': 'restaurant',
  'polish restaurant': 'restaurant',
  'portuguese restaurant': 'restaurant',
  'pozole restaurant': 'restaurant',
  'pub': 'restaurant',
  'puerto rican restaurant': 'restaurant',
  'ramen restaurant': 'restaurant',
  'rice restaurant': 'restaurant',
  'russian restaurant': 'restaurant',
  'salad shop': 'restaurant',
  'salsa bar': 'restaurant',
  'salvadoran restaurant': 'restaurant',
  'sandwich shop': 'restaurant',
  'sardinian restaurant': 'restaurant',
  'scandinavian restaurant': 'restaurant',
  'seafood donburi restaurant': 'restaurant',
  'seafood restaurant': 'restaurant',
  'self service restaurant': 'restaurant',
  'serbian restaurant': 'restaurant',
  'shabu-shabu restaurant': 'restaurant',
  'shanghainese restaurant': 'restaurant',
  'shawarma restaurant': 'restaurant',
  'sichuan restaurant': 'restaurant',
  'sicilian restaurant': 'restaurant',
  'small plates restaurant': 'restaurant',
  'snack bar': 'restaurant',
  'soul food restaurant': 'restaurant',
  'soup restaurant': 'restaurant',
  'soup shop': 'restaurant',
  'south african restaurant': 'restaurant',
  'south american restaurant': 'restaurant',
  'south asian restaurant': 'restaurant',
  'southeast asian restaurant': 'restaurant',
  'southern italian restaurant': 'restaurant',
  'southern restaurant (us)': 'restaurant',
  'south indian restaurant': 'restaurant',
  'southwestern restaurant (us)': 'restaurant',
  'spanish restaurant': 'restaurant',
  'sports bar': 'restaurant',
  'sri lankan restaurant': 'restaurant',
  'steak house': 'restaurant',
  'steamed bun shop': 'restaurant',
  'sushi restaurant': 'restaurant',
  'sushi takeaway': 'restaurant',
  'swedish restaurant': 'restaurant',
  'sweets and dessert buffet': 'restaurant',
  'taco restaurant': 'restaurant',
  'taiwanese restaurant': 'restaurant',
  'takeout restaurant': 'restaurant',
  'tamale shop': 'restaurant',
  'tapas bar': 'restaurant',
  'tapas restaurant': 'restaurant',
  'tea house': 'restaurant',
  'teppanyaki restaurant': 'restaurant',
  'tex-mex restaurant': 'restaurant',
  'thai restaurant': 'restaurant',
  'tofu restaurant': 'restaurant',
  'tonkatsu restaurant': 'restaurant',
  'tortilla shop': 'restaurant',
  'traditional american restaurant': 'restaurant',
  'tuscan restaurant': 'restaurant',
  'udon noodle restaurant': 'restaurant',
  'ukrainian restaurant': 'restaurant',
  'vegan restaurant': 'restaurant',
  'vegetarian cafe and deli': 'restaurant',
  'vegetarian restaurant': 'restaurant',
  'venezuelan restaurant': 'restaurant',
  'vietnamese restaurant': 'restaurant',
  'wine bar': 'restaurant',
  'wine cellar': 'restaurant',
  'wine club': 'restaurant',
  'winery': 'restaurant',
  'wok restaurant': 'restaurant',
  'yakiniku restaurant': 'restaurant',
  'yakitori restaurant': 'restaurant',
  'yemeni restaurant': 'restaurant',
  'yucatan restaurant': 'restaurant',

  // Activity subtypes
  'amusement park': 'activity',
  'aquarium': 'activity',
  'art gallery': 'activity',
  'art studio': 'activity',
  'bowling alley': 'activity',
  'casino': 'activity',
  'children\'s museum': 'activity',
  'comedy club': 'activity',
  'concert hall': 'activity',
  'cultural center': 'activity',
  'dance club': 'activity',
  'dance company': 'activity',
  'dance hall': 'activity',
  'dance school': 'activity',
  'dart bar': 'activity',
  'disco club': 'activity',
  'escape room center': 'activity',
  'gambling house': 'activity',
  'haunted house': 'activity',
  'indoor playground': 'activity',
  'karaoke': 'activity',
  'live music bar': 'activity',
  'live music venue': 'activity',
  'miniature golf course': 'activity',
  'movie theater': 'activity',
  'museum': 'activity',
  'musical club': 'activity',
  'night club': 'activity',
  'performing arts': 'activity',
  'performing arts group': 'activity',
  'performing arts theater': 'activity',
  'pool hall': 'activity',
  'recreation center': 'activity',
  'social club': 'activity',
  'spa': 'activity',
  'stadium': 'activity',
  'stage': 'activity',
  'tennis club': 'activity',
  'theater company': 'activity',
  'theater production': 'activity',
  'tourist attraction': 'activity',
  'video arcade': 'activity',
  'wellness center': 'activity',

  // Attraction subtypes
  'art center': 'attraction',
  'arts organization': 'attraction',
  'association / organization': 'attraction',
  'auditorium': 'attraction',
  'artist': 'attraction',
  'band': 'attraction',
  'business center': 'other',
  'community center': 'attraction',
  'conference center': 'attraction',
  'corporate office': 'other',
  'dj service': 'other',
  'education': 'attraction',
  'entertainer': 'activity',
  'entertainment': 'attraction',
  'entertainment agency': 'other',
  'event management company': 'other',
  'event planner': 'other',
  'event venue': 'attraction',
  'exhibit': 'attraction',
  'furnished apartment building': 'other',
  'gay bar': 'restaurant',
  'historical landmark': 'attraction',
  'hotel': 'other',
  'jazz club': 'activity',
  'lounge': 'restaurant',
  'market': 'attraction',
  'meeting planning service': 'other',
  'music management and promotion': 'other',
  'musician': 'attraction',
  'news service': 'other',
  'non-profit organization': 'attraction',
  'observation deck': 'attraction',
  'orchestra': 'attraction',
  'park': 'attraction',
  'party equipment rental service': 'other',
  'photo booth': 'other',
  'private university': 'other',
  'publisher': 'other',
  'recording studio': 'other',
  'service establishment': 'other',
  'sightseeing tour agency': 'attraction',
  'social services organization': 'attraction',
  'talent agency': 'other',
  'tour agency': 'attraction',
  'tour operator': 'attraction',
  'training centre': 'other',
  'video production service': 'other',
  'wedding planner': 'other',
  'wedding service': 'other',
  'wedding venue': 'attraction',
  'west african restaurant': 'restaurant',
  'youth social services organization': 'attraction',
  'amusement center': 'activity',
  'bed & breakfast': 'other'
};

async function categorizePlaces() {
  console.log('Starting place categorization...');
  
  // Get all places with subtypes
  const places = await db
    .selectFrom('places')
    .select(['id', 'details', 'category'])
    .where('details', 'is not', null)
    .where(sql<boolean>`details->'subtypes' is not null`)
    .execute();

  console.log(`Found ${places.length} places to categorize`);

  // Track unmatched subtypes
  const unmatchedSubtypes = new Set<string>();

  for (const place of places) {
    if (!place.details?.subtypes) continue;
    
    const subtypes = place.details.subtypes as string[];
    if (!subtypes) continue;

    // Count matches for each category
    const categoryCounts = {
      restaurant: 0,
      activity: 0,
      attraction: 0,
      other: 0
    };
    
    let matchedSubtype = false;
    
    // Count how many subtypes match each category
    for (const subtype of subtypes) {
      const lowerSubtype = subtype.toLowerCase();
      if (subtypeToCategory[lowerSubtype]) {
        categoryCounts[subtypeToCategory[lowerSubtype]]++;
        matchedSubtype = true;
      }
    }

    // Add unmatched subtypes to the set
    if (!matchedSubtype) {
      subtypes.forEach(subtype => unmatchedSubtypes.add(subtype));
    }

    // Determine the category with the most matches
    let newCategory: 'restaurant' | 'activity' | 'attraction' | 'other' | undefined;
    let maxCount = 0;
    
    for (const [category, count] of Object.entries(categoryCounts) as [
      'restaurant' | 'activity' | 'attraction' | 'other', 
      number
    ][]) {
      if (count > maxCount) {
        maxCount = count;
        newCategory = category;
      }
    }

    // Only update if we found at least one matching subtype
    if (newCategory && maxCount > 0) {
      await db
        .updateTable('places')
        .set({ category: newCategory })
        .where('id', '=', place.id)
        .execute();
        
      console.log(`Updated place ${place.id} from ${place.category} to ${newCategory} (matched ${maxCount} of ${subtypes.length} subtypes)`);
    } else {
      console.log(`No matching subtype found for place ${place.id}, keeping category as ${place.category}`);
    }
  }

  console.log('Categorization completed');
  
  // Print all unmatched subtypes
  console.log('\nUnmatched subtypes:');
  if (unmatchedSubtypes.size === 0) {
    console.log('None - all subtypes were matched');
  } else {
    console.log(Array.from(unmatchedSubtypes).sort().join('\n'));
    console.log(`\nTotal unmatched subtypes: ${unmatchedSubtypes.size}`);
  }
}

// Run the categorization
categorizePlaces()
  .catch(console.error)
  .finally(() => process.exit()); 