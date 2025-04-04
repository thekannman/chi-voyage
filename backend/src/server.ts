import express, { Request, Response } from 'express';
import cors from 'cors';
import { getPlaceBySlug, getPlacesByNeighborhood, searchPlaces, getUniqueSubtypesForCategory } from './db/queries';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/places', async (req: Request, res: Response) => {
  try {
    const { category, page, pageSize, search, priceRange, rating, subtype } = req.query;
    
    console.log('Received query parameters:', {
      category,
      page,
      pageSize,
      search,
      priceRange,
      rating,
      subtype
    });
    
    // If category is specified, use searchPlaces with category filter
    if (category) {
      console.log('Fetching places with category:', category);
      const result = await searchPlaces(
        search as string | undefined,
        category as 'activity' | 'restaurant' | 'attraction' | 'event' | 'other',
        page ? parseInt(page as string) : 1,
        pageSize ? parseInt(pageSize as string) : 12,
        priceRange as string | undefined,
        rating as string | undefined,
        subtype as string | undefined
      );
      console.log('Found places:', result);
      res.json(result);
    } else {
      const result = await searchPlaces(
        search as string | undefined,
        undefined,
        page ? parseInt(page as string) : 1,
        pageSize ? parseInt(pageSize as string) : 12,
        priceRange as string | undefined,
        rating as string | undefined,
        subtype as string | undefined
      );
      console.log('Fetching all places');
      res.json(result);
    }
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

app.get('/places/:slug', async (req: Request<{ slug: string }>, res: Response): Promise<void> => {
  try {
    const place = await getPlaceBySlug(req.params.slug);
    if (!place) {
      res.status(404).json({ error: 'Place not found' });
      return;
    }
    console.log('Found place by slug:', place);
    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

app.get('/neighborhoods/:id/places', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const places = await getPlacesByNeighborhood(req.params.id);
    console.log('Found neighborhood places:', places);
    res.json(places);
  } catch (error) {
    console.error('Error fetching neighborhood places:', error);
    res.status(500).json({ error: 'Failed to fetch neighborhood places' });
  }
});

app.get('/categories/:category/subtypes', async (req: Request<{ category: string }>, res: Response) => {
  try {
    const category = req.params.category as 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
    const subtypes = await getUniqueSubtypesForCategory(category);
    res.json(subtypes);
  } catch (error) {
    console.error('Error fetching subtypes:', error);
    res.status(500).json({ error: 'Failed to fetch subtypes' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
export default app; 