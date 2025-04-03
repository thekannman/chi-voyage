import { slugify } from '@/lib/utils';
import { Place } from '@/types';

export type Item = Place;

export const activities: Item[] = [
  {
    id: '1',
    title: 'Chicago Architecture River Cruise',
    slug: slugify('Chicago Architecture River Cruise'),
    description: 'Experience Chicago\'s iconic architecture from the Chicago River. This 90-minute tour takes you through the heart of the city, showcasing its rich architectural history.',
    imagePath: '/images/activities/architecture-cruise.jpg',
    rating: 4.8,
    category: 'Tour',
    location: 'Chicago River',
    details: {
      price: '$45-55',
      hours: 'Daily, 9am-7pm',
      website: 'https://example.com/architecture-cruise',
      features: ['90-minute tour', 'Expert guide', 'Indoor & outdoor seating', 'Bar service available']
    }
  },
  {
    id: '2',
    title: 'Millennium Park Walking Tour',
    slug: slugify('Millennium Park Walking Tour'),
    description: 'Explore the famous Millennium Park, home to the iconic Cloud Gate sculpture and the Jay Pritzker Pavilion.',
    imagePath: '/images/activities/millennium-park.jpg',
    rating: 4.7,
    category: 'Tour',
    location: 'Millennium Park',
    details: {
      price: 'Free',
      hours: '6am-11pm daily',
      features: ['Self-guided tour', 'Photo opportunities', 'Public art', 'Gardens']
    }
  }
];

export const restaurants: Item[] = [
  {
    id: '1',
    title: 'Alinea',
    slug: slugify('Alinea'),
    description: 'Three-Michelin-starred restaurant offering innovative tasting menus in a modern setting.',
    imagePath: '/images/restaurants/alinea.jpg',
    rating: 4.9,
    category: 'Fine Dining',
    location: 'Lincoln Park',
    details: {
      price: '$$$$',
      hours: 'Wed-Sun, 5pm-10pm',
      website: 'https://alinearestaurant.com',
      phone: '(312) 867-0110',
      address: '1723 N Halsted St, Chicago, IL 60614',
      features: ['Tasting menu', 'Wine pairing', 'Private dining', 'Vegetarian options']
    }
  },
  {
    id: '2',
    title: 'Lou Malnati\'s Pizzeria',
    slug: slugify('Lou Malnati\'s Pizzeria'),
    description: 'Famous for its deep-dish pizza, this Chicago institution has been serving up delicious pies since 1971.',
    imagePath: '/images/restaurants/lou-malnatis.jpg',
    rating: 4.7,
    category: 'Pizza',
    location: 'Multiple Locations',
    details: {
      price: '$$',
      hours: '11am-10pm daily',
      website: 'https://loumalnatis.com',
      features: ['Deep-dish pizza', 'Gluten-free options', 'Delivery available', 'Family-friendly']
    }
  }
];

export const attractions: Item[] = [
  {
    id: '1',
    title: 'Art Institute of Chicago',
    slug: slugify('Art Institute of Chicago'),
    description: 'One of the oldest and largest art museums in the United States, featuring works from around the world.',
    imagePath: '/images/attractions/art-institute.jpg',
    rating: 4.8,
    category: 'Museum',
    location: 'Grant Park',
    details: {
      price: '$25-35',
      hours: 'Thu-Mon, 11am-5pm',
      website: 'https://www.artic.edu',
      features: ['Permanent collections', 'Special exhibitions', 'Audio tours', 'Café']
    }
  },
  {
    id: '2',
    title: 'Navy Pier',
    slug: slugify('Navy Pier'),
    description: 'Iconic Chicago landmark featuring shops, restaurants, attractions, and stunning lakefront views.',
    imagePath: '/images/attractions/navy-pier.jpg',
    rating: 4.5,
    category: 'Entertainment',
    location: 'Navy Pier',
    details: {
      price: 'Free entry',
      hours: '10am-8pm daily',
      website: 'https://navypier.org',
      features: ['Ferris wheel', 'Shops', 'Restaurants', 'Boat tours']
    }
  }
];

export const events: Item[] = [
  {
    id: '1',
    title: 'Chicago Blues Festival',
    slug: slugify('Chicago Blues Festival'),
    description: 'The largest free blues festival in the world, celebrating Chicago\'s rich blues heritage.',
    imagePath: '/images/events/blues-festival.jpg',
    rating: 4.7,
    category: 'Music Festival',
    location: 'Grant Park',
    details: {
      price: 'Free',
      hours: 'June, 11am-9:30pm',
      website: 'https://chicagobluesfestival.org',
      features: ['Live music', 'Food vendors', 'Art vendors', 'Family activities']
    }
  },
  {
    id: '2',
    title: 'Taste of Chicago',
    slug: slugify('Taste of Chicago'),
    description: 'The world\'s largest food festival, featuring Chicago\'s diverse culinary scene.',
    imagePath: '/images/events/taste-of-chicago.jpg',
    rating: 4.6,
    category: 'Food Festival',
    location: 'Grant Park',
    details: {
      price: 'Free entry',
      hours: 'July, 11am-9pm',
      website: 'https://www.tasteofchicago.com',
      features: ['Food vendors', 'Live music', 'Cooking demonstrations', 'Family activities']
    }
  }
]; 