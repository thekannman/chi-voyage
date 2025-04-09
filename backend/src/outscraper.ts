import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OUTSCRAPER_API_KEY) {
  throw new Error('Missing Outscraper API key');
}

const outscraperClient = axios.create({
  baseURL: 'https://api.outscraper.com',
  headers: {
    'X-API-KEY': process.env.OUTSCRAPER_API_KEY,
  },
});

export interface OutscraperPlace {
  name: string;
  description?: string;
  photo?: string;
  rating?: number;
  full_address?: string;
  place_id?: string;
  phone?: string;
  site?: string;
  price_range?: string;
  working_hours?: Record<string, string>;
  about?: Record<string, any>;
  reviews?: number;
  photos_count?: number;
  latitude?: number;
  longitude?: number;
  subtypes?: string[];
  city?: string;
  state?: string;
  postal_code?: number;
  time_zone?: string;
  business_status?: string;
  verified?: boolean;
  booking_appointment_link?: string;
  order_links?: string;
  location_link?: string;
  reviews_link?: string;
  owner_title?: string;
  owner_link?: string;
}

export async function searchPlaces(
  query: string,
  limit: number = 20,
  bounds?: string,
  excludePlaceIds?: string[]
): Promise<OutscraperPlace[]> {
  try {
    const response = await outscraperClient.get('/maps/search-v3', {
      params: {
        query,
        limit,
        bounds,
        exclude_place_ids: excludePlaceIds?.join(','),
        fields: [
          'name',
          'description',
          'photo',
          'rating',
          'full_address',
          'place_id',
          'phone',
          'site',
          'price_range',
          'working_hours',
          'about',
          'reviews',
          'photos_count',
          'latitude',
          'longitude',
          'subtypes',
          'city',
          'state',
          'postal_code',
          'time_zone',
          'business_status',
          'verified',
          'booking_appointment_link',
          'order_links',
          'location_link',
          'reviews_link',
          'owner_title',
          'owner_link'
        ].join(',')
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching places from Outscraper:', error);
    throw error;
  }
}

export async function getPlaceDetails(placeId: string): Promise<OutscraperPlace> {
  try {
    const response = await outscraperClient.get(`/maps/details-v3/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching place details from Outscraper:', error);
    throw error;
  }
} 