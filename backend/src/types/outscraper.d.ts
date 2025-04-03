declare module 'outscraper' {
  export class OutscraperClient {
    constructor(apiKey: string);

    googleMapsSearch(
      query: string,
      options?: {
        limit?: number;
        language?: string;
        region?: string;
      }
    ): Promise<Array<{
      name: string;
      description?: string;
      photo?: string;
      rating?: number;
      price?: string;
      hours?: string;
      website?: string;
      phone?: string;
      address?: string;
      features?: string[];
    }>>;
  }
} 