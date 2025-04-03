export interface Place {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imagePath: string | null;
  rating: number | null;
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  location: string | null;
  neighborhood?: string;
  details?: {
    place_id?: string;
    subtypes?: string[];
    reservation_links?: string;
    menu_link?: string;
    order_links?: string;
    [key: string]: any;
  } | null;
  phone?: string | null;
  website?: string | null;
  price_range?: string | null;
  working_hours?: Record<string, any> | null;
  features?: Record<string, any> | null;
  photos_count?: number | null;
  reviews_count?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  created_at?: string;
  updated_at?: string;
  rating_count?: number | null;
  subtitle?: string | null;
  popular_times?: Record<string, Record<string, number>> | null;
  verified?: boolean;
}

export interface Neighborhood {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  images?: string[];
  created_at: string;
  updated_at: string;
} 