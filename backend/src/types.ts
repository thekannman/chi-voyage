export interface OutscraperPlace {
  name: string;
  name_for_emails?: string;
  site?: string;
  category: string;
  type?: string;
  phone?: string;
  full_address: string;
  borough?: string;
  street?: string;
  city?: string;
  postal_code?: number;
  state?: string;
  us_state?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviews?: number;
  reviews_link?: string;
  reviews_per_score?: {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
  };
  photo?: string;
  working_hours?: Record<string, string>;
  range?: string;
  description?: string;
  about?: {
    Service_options?: Record<string, boolean>;
    Highlights?: Record<string, boolean>;
    Popular_for?: Record<string, boolean>;
    Accessibility?: Record<string, boolean>;
    Offerings?: Record<string, boolean>;
    Dining_options?: Record<string, boolean>;
    Amenities?: Record<string, boolean>;
    Atmosphere?: Record<string, boolean>;
    Crowd?: Record<string, boolean>;
    Planning?: Record<string, boolean>;
    Payments?: Record<string, boolean>;
    Children?: Record<string, boolean>;
    Parking?: Record<string, boolean>;
    Pets?: Record<string, boolean>;
  };
  reservation_links?: string;
  menu_link?: string;
  order_links?: string;
  place_id?: string;
  google_id?: string;
  verified?: boolean;
  subtypes?: string[];
}

export interface DatabasePlace {
  id: string;
  title: string;
  slug: string;
  description: string;
  imagePath: string;
  rating: number;
  reviews_count: number;
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  location: string;
  price_range: string | null;
  latitude: number;
  longitude: number;
  details?: {
    price?: string | null;
    hours?: Record<string, string>;
    website?: string | null;
    phone?: string;
    address?: string;
    street?: string;
    city?: string;
    state?: string;
    us_state?: string;
    postal_code?: number;
    country?: string;
    country_code?: string;
    about?: {
      Service_options?: Record<string, boolean>;
      Highlights?: Record<string, boolean>;
      Popular_for?: Record<string, boolean>;
      Accessibility?: Record<string, boolean>;
      Offerings?: Record<string, boolean>;
      Dining_options?: Record<string, boolean>;
      Amenities?: Record<string, boolean>;
      Atmosphere?: Record<string, boolean>;
      Crowd?: Record<string, boolean>;
      Planning?: Record<string, boolean>;
      Payments?: Record<string, boolean>;
      Children?: Record<string, boolean>;
      Parking?: Record<string, boolean>;
      Pets?: Record<string, boolean>;
    };
    features?: string[];
    reservation_links?: string;
    menu_link?: string;
    order_links?: string;
    place_id?: string;
    google_id?: string;
    verified?: boolean;
    reviews_link?: string;
    subtypes?: string[];
    reviews_per_score?: {
      1?: number;
      2?: number;
      3?: number;
      4?: number;
      5?: number;
    };
  };
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  imagePath: string;
  activities: string[];
  restaurants: string[];
  attractions: string[];
  events: string[];
} 