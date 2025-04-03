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
    imagePath: '/images/neighborhoods/the-loop.jpg',
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
    imagePath: '/images/neighborhoods/lincoln-park.jpg',
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
    imagePath: '/images/neighborhoods/west-loop.jpg',
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
    imagePath: '/images/neighborhoods/wrigleyville.jpg',
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
    imagePath: '/images/neighborhoods/river-north.jpg',
    activities: ['1'], // Architecture River Cruise
    restaurants: ['2'], // Lou Malnati's Pizzeria
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