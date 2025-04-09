import { Item } from './items';

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  imagePath: string;
  activities: string[]; // IDs of activities in this neighborhood
  restaurants: string[]; // IDs of restaurants in this neighborhood
  attractions: string[]; // IDs of attractions in this neighborhood
  events: string[]; // IDs of events in this neighborhood
}

export const neighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'The Loop',
    slug: 'the-loop',
    description: 'Chicago\'s central business district, home to iconic skyscrapers, Millennium Park, and the Art Institute of Chicago.',
    imagePath: '/images/coming-soon.png',
    activities: ['1', '2'], // Architecture River Cruise, Millennium Park Walking Tour
    restaurants: ['2'], // Lou Malnati's Pizzeria
    attractions: ['1', '2'], // Art Institute of Chicago, Navy Pier
    events: ['1', '2'] // Taste of Chicago, Lollapalooza
  },
  {
    id: '2',
    name: 'Lincoln Park',
    slug: 'lincoln-park',
    description: 'A vibrant neighborhood with the Lincoln Park Zoo, beautiful parks, and upscale dining options.',
    imagePath: '/images/coming-soon.png',
    activities: ['3'], // Art Institute of Chicago
    restaurants: ['1'], // Alinea
    attractions: ['3'], // Shedd Aquarium
    events: ['3'] // Chicago Air and Water Show
  },
  {
    id: '3',
    name: 'West Loop',
    slug: 'west-loop',
    description: 'A trendy area known for its food scene, including the famous Restaurant Row on Randolph Street.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: ['2', '4'], // Girl & the Goat, Au Cheval
    attractions: [],
    events: []
  },
  {
    id: '4',
    name: 'Wrigleyville',
    slug: 'wrigleyville',
    description: 'Home to Wrigley Field and the Chicago Cubs, with a lively bar and restaurant scene.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: ['4'], // Wrigley Field
    events: ['4'] // Chicago Jazz Festival
  },
  {
    id: '5',
    name: 'River North',
    slug: 'river-north',
    description: 'A bustling area with art galleries, nightlife, and dining options, including the famous Magnificent Mile.',
    imagePath: '/images/coming-soon.png',
    activities: ['1'], // Architecture River Cruise
    restaurants: ['2'], // Lou Malnati's Pizzeria
    attractions: [],
    events: []
  },
  {
    id: '6',
    name: 'Gold Coast',
    slug: 'gold-coast',
    description: 'An upscale neighborhood known for its historic mansions, luxury shopping, and vibrant nightlife.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '7',
    name: 'Pilsen',
    slug: 'pilsen',
    description: 'A vibrant Mexican-American neighborhood known for its colorful murals, authentic cuisine, and art galleries.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '8',
    name: 'Hyde Park',
    slug: 'hyde-park',
    description: 'Home to the University of Chicago, Museum of Science and Industry, and historic architecture.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '9',
    name: 'Logan Square',
    slug: 'logan-square',
    description: 'A hip neighborhood with a thriving arts scene, craft breweries, and diverse dining options.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '10',
    name: 'Wicker Park',
    slug: 'wicker-park',
    description: 'A trendy area known for its boutique shopping, art galleries, and vibrant nightlife.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '11',
    name: 'Andersonville',
    slug: 'andersonville',
    description: 'A charming neighborhood with Swedish heritage, known for its unique shops and diverse dining.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '12',
    name: 'Chinatown',
    slug: 'chinatown',
    description: 'A vibrant cultural district with authentic Asian cuisine, shops, and the iconic Chinatown Gate.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '13',
    name: 'South Loop',
    slug: 'south-loop',
    description: 'A growing neighborhood with museums, parks, and proximity to downtown attractions.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '14',
    name: 'Bucktown',
    slug: 'bucktown',
    description: 'A trendy neighborhood with a mix of historic homes, boutique shops, and popular restaurants.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  },
  {
    id: '15',
    name: 'Ukrainian Village',
    slug: 'ukrainian-village',
    description: 'A historic neighborhood with Eastern European heritage, known for its architecture and cultural events.',
    imagePath: '/images/coming-soon.png',
    activities: [],
    restaurants: [],
    attractions: [],
    events: []
  }
];

// Helper function to get items by neighborhood
export function getItemsByNeighborhood(neighborhoodSlug: string, allItems: Item[]): Item[] {
  const neighborhood = neighborhoods.find(n => n.slug === neighborhoodSlug);
  if (!neighborhood) return [];
  
  const allIds = [
    ...neighborhood.activities,
    ...neighborhood.restaurants,
    ...neighborhood.attractions,
    ...neighborhood.events
  ];
  
  return allItems.filter(item => allIds.includes(item.id));
} 