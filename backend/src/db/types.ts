import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

// Define the database interface
export interface Database {
  places: PlacesTable;
  neighborhoods: NeighborhoodsTable;
  place_neighborhoods: PlaceNeighborhoodsTable;
  _migrations: MigrationsTable;
}

// Define individual table interfaces
export interface PlacesTable {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imagePath: string | null;
  rating: number | null;
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  location: string | null;
  details: ColumnType<JsonObject, JsonObject, JsonObject> | null;
  phone: string | null;
  website: string | null;
  price_range: string | null;
  working_hours: ColumnType<JsonObject, JsonObject, JsonObject> | null;
  features: ColumnType<JsonObject, JsonObject, JsonObject> | null;
  photos_count: number | null;
  reviews_count: number | null;
  latitude: number | null;
  longitude: number | null;
  create_ts: ColumnType<Date, never, never>;
  update_ts: ColumnType<Date, never, never>;
}

export interface NeighborhoodsTable {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imagePath: string | null;
  create_ts: ColumnType<Date, never, never>;
  update_ts: ColumnType<Date, never, never>;
}

export interface PlaceNeighborhoodsTable {
  place_id: string;
  neighborhood_id: string;
}

export interface MigrationsTable {
  id: Generated<number>;
  name: string;
  executed_at: ColumnType<Date, never, never>;
}

// Helper type for JSON objects
export type JsonObject = Record<string, unknown>;

// Convenience types for CRUD operations
export type NewPlace = Insertable<PlacesTable>;
export type SelectPlace = Selectable<PlacesTable>;
export type UpdatePlace = {
  title?: string;
  slug?: string;
  description?: string | null;
  imagePath?: string | null;
  rating?: number | null;
  category?: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  location?: string | null;
  neighborhood?: string;
  price_range?: string | null;
  working_hours?: JsonObject | null;
  features?: JsonObject | null;
  website?: string | null;
  phone?: string | null;
  photos_count?: number | null;
  reviews_count?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  updated_at?: string;
};

export type NewNeighborhood = Insertable<NeighborhoodsTable>;
export type SelectNeighborhood = Selectable<NeighborhoodsTable>;
export type UpdateNeighborhood = Updateable<NeighborhoodsTable>;

export type NewPlaceNeighborhood = Insertable<PlaceNeighborhoodsTable>;
export type SelectPlaceNeighborhood = Selectable<PlaceNeighborhoodsTable>;

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