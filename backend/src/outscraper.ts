import axios from 'axios';
import dotenv from 'dotenv';
import { OutscraperPlace } from './types';

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

export async function searchPlaces(query: string, limit: number = 20): Promise<OutscraperPlace[]> {
  try {
    const response = await outscraperClient.post('/places/search', {
      query,
      limit,
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching places from Outscraper:', error);
    throw error;
  }
}

export async function getPlaceDetails(placeId: string): Promise<OutscraperPlace> {
  try {
    const response = await outscraperClient.get(`/places/details/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching place details from Outscraper:', error);
    throw error;
  }
} 