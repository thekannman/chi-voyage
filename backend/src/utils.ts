import { OutscraperPlace, DatabasePlace } from './types';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function categorizePlace(category: string): DatabasePlace['category'] {
  const categoryMap: Record<string, DatabasePlace['category']> = {
    'restaurant': 'restaurant',
    'food': 'restaurant',
    'cafe': 'restaurant',
    'bar': 'restaurant',
    'activity': 'activity',
    'entertainment': 'activity',
    'tour': 'activity',
    'attraction': 'attraction',
    'landmark': 'attraction',
    'museum': 'attraction',
    'park': 'attraction',
    'event': 'event',
    'festival': 'event',
    'concert': 'event',
    'show': 'event',
  };

  const normalizedCategory = category.toLowerCase();
  for (const [key, value] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(key)) {
      return value;
    }
  }

  return 'other'; // Default category
}

export function transformOutscraperPlace(place: OutscraperPlace): DatabasePlace {
  // Normalize price range to ensure consistent format
  const priceRange = place.range ? place.range.replace(/[^$]/g, '') : null;

  // Extract features from about section
  const features: string[] = [];
  if (place.about) {
    // Add service options
    if (place.about.Service_options) {
      features.push(...Object.keys(place.about.Service_options).filter(key => place.about?.Service_options?.[key]));
    }
    // Add highlights
    if (place.about.Highlights) {
      features.push(...Object.keys(place.about.Highlights).filter(key => place.about?.Highlights?.[key]));
    }
    // Add offerings
    if (place.about.Offerings) {
      features.push(...Object.keys(place.about.Offerings).filter(key => place.about?.Offerings?.[key]));
    }
    // Add amenities
    if (place.about.Amenities) {
      features.push(...Object.keys(place.about.Amenities).filter(key => place.about?.Amenities?.[key]));
    }
  }

  return {
    id: place.name.toLowerCase().replace(/\s+/g, '-'),
    title: place.name_for_emails || place.name,
    slug: slugify(place.name),
    description: place.description || `${place.name} in ${place.borough || place.city || 'Chicago'}`,
    imagePath: place.photo || '/images/placeholder.jpg',
    rating: place.rating || 0,
    reviews_count: place.reviews || 0,
    category: categorizePlace(place.category),
    location: place.borough || place.city || 'Chicago',
    price_range: priceRange,
    latitude: place.latitude || 0,
    longitude: place.longitude || 0,
    details: {
      price: place.range || undefined,
      hours: place.working_hours || undefined,
      website: place.site || undefined,
      phone: place.phone || undefined,
      address: place.full_address || undefined,
      street: place.street || undefined,
      city: place.city || undefined,
      state: place.state || undefined,
      us_state: place.us_state || undefined,
      postal_code: place.postal_code || undefined,
      country: place.country || undefined,
      country_code: place.country_code || undefined,
      about: place.about || undefined,
      reservation_links: place.reservation_links || undefined,
      menu_link: place.menu_link || undefined,
      order_links: place.order_links || undefined,
      place_id: place.place_id || undefined,
      google_id: place.google_id || undefined,
      verified: place.verified || false,
      reviews_link: place.reviews_link || undefined,
      subtypes: Array.isArray(place.subtypes) ? place.subtypes : (typeof place.subtypes === 'string' ? (place.subtypes as string).split(',').map((s: string) => s.trim()) : []),
      reviews_per_score: place.reviews_per_score || undefined
    },
  };
} 