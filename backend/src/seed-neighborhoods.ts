import { supabase } from './supabase';
import { slugify } from './utils';

const neighborhoods = [
  {
    name: 'Loop',
    description: 'The heart of downtown Chicago, known for its iconic skyscrapers and business district.',
    imagePath: '/images/neighborhoods/loop.jpg'
  },
  {
    name: 'River North',
    description: 'A vibrant neighborhood known for its art galleries, restaurants, and nightlife.',
    imagePath: '/images/neighborhoods/river-north.jpg'
  },
  {
    name: 'West Loop',
    description: 'A trendy area known for its restaurants, including many of Chicago\'s best dining spots.',
    imagePath: '/images/neighborhoods/west-loop.jpg'
  },
  {
    name: 'Lincoln Park',
    description: 'A historic neighborhood known for its park, zoo, and beautiful residential streets.',
    imagePath: '/images/neighborhoods/lincoln-park.jpg'
  },
  {
    name: 'Wicker Park',
    description: 'A hip neighborhood known for its independent shops, restaurants, and art scene.',
    imagePath: '/images/neighborhoods/wicker-park.jpg'
  },
  {
    name: 'Gold Coast',
    description: 'An affluent neighborhood known for its historic mansions and upscale shopping.',
    imagePath: '/images/neighborhoods/gold-coast.jpg'
  },
  {
    name: 'Bucktown',
    description: 'A trendy neighborhood known for its art galleries, boutiques, and restaurants.',
    imagePath: '/images/neighborhoods/bucktown.jpg'
  },
  {
    name: 'South Loop',
    description: 'A diverse neighborhood known for its museums, including the Field Museum and Shedd Aquarium.',
    imagePath: '/images/neighborhoods/south-loop.jpg'
  }
];

async function seedNeighborhoods() {
  console.log('Starting neighborhood seeding...');

  for (const neighborhood of neighborhoods) {
    const id = slugify(neighborhood.name);
    const { error } = await supabase
      .from('neighborhoods')
      .upsert({
        id,
        name: neighborhood.name,
        slug: id,
        description: neighborhood.description,
        imagePath: neighborhood.imagePath
      });

    if (error) {
      console.error(`Error seeding neighborhood ${neighborhood.name}:`, error);
    } else {
      console.log(`Successfully seeded neighborhood: ${neighborhood.name}`);
    }
  }

  console.log('Neighborhood seeding completed!');
}

// Run the seeding function
seedNeighborhoods().catch(console.error); 