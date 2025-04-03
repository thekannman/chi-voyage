import request from 'supertest';
import express from 'express';
import { getAllPlaces, getPlaceBySlug, getPlacesByNeighborhood } from './db/queries';

// Mock the database queries
jest.mock('./db/queries', () => ({
  getAllPlaces: jest.fn(),
  getPlaceBySlug: jest.fn(),
  getPlacesByNeighborhood: jest.fn(),
}));

const app = express();

describe('API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/places', () => {
    it('should return all places', async () => {
      const mockPlaces = [
        { id: '1', title: 'Test Place 1' },
        { id: '2', title: 'Test Place 2' },
      ];
      (getAllPlaces as jest.Mock).mockResolvedValue(mockPlaces);

      const response = await request(app).get('/api/places');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlaces);
    });

    it('should handle errors', async () => {
      (getAllPlaces as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/places');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch places' });
    });
  });

  describe('GET /api/places/:slug', () => {
    it('should return a place by slug', async () => {
      const mockPlace = { id: '1', title: 'Test Place', slug: 'test-place' };
      (getPlaceBySlug as jest.Mock).mockResolvedValue(mockPlace);

      const response = await request(app).get('/api/places/test-place');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlace);
    });

    it('should return 404 for non-existent place', async () => {
      (getPlaceBySlug as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/places/non-existent');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Place not found' });
    });
  });

  describe('GET /api/neighborhoods/:id/places', () => {
    it('should return places in a neighborhood', async () => {
      const mockPlaces = [
        { id: '1', title: 'Test Place 1' },
        { id: '2', title: 'Test Place 2' },
      ];
      (getPlacesByNeighborhood as jest.Mock).mockResolvedValue(mockPlaces);

      const response = await request(app).get('/api/neighborhoods/test-neighborhood/places');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlaces);
    });
  });
}); 