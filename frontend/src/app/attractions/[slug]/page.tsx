import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaceBySlug, getAllPlaces } from '@/lib/api';
import { Place } from '@/types';
import Image from 'next/image';
import CategoryPage from '@/components/CategoryPage';

interface AttractionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AttractionPageProps): Promise<Metadata> {
  const attraction = await getPlaceBySlug(params.slug);

  if (!attraction) {
    return {
      title: 'Attraction Not Found | Chi Voyage',
      description: 'The requested attraction could not be found.',
    };
  }

  return {
    title: `${attraction.title} | Chi Voyage`,
    description: attraction.description || '',
    openGraph: {
      title: `${attraction.title} | Chi Voyage`,
      description: attraction.description || '',
      images: attraction.imagePath ? [attraction.imagePath] : [],
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all attractions
export async function generateStaticParams() {
  const places = await getAllPlaces();
  return places
    .filter(place => place.category === 'attraction')
    .map((place) => ({
      slug: place.slug,
    }));
}

export default function AttractionPage({ params }: AttractionPageProps) {
  return <CategoryPage params={params} category="attraction" categoryTitle="Attraction" />;
} 