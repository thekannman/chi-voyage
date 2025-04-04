import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNeighborhoods } from '@/lib/api';
import CategoryCard from '@/components/CategoryCard';
import { Place } from '@/types';

interface NeighborhoodPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const neighborhoods = await getAllNeighborhoods();
  const neighborhood = neighborhoods.find((n) => n.slug === params.slug);

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found | Chi Voyage',
      description: 'The requested neighborhood could not be found.',
    };
  }

  return {
    title: `${neighborhood.name} | Chi Voyage`,
    description: neighborhood.description,
    openGraph: {
      title: `${neighborhood.name} | Chi Voyage`,
      description: neighborhood.description,
      images: neighborhood.images || [],
    },
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const neighborhoods = await getAllNeighborhoods();
  const neighborhood = neighborhoods.find((n) => n.slug === params.slug);
  
  if (!neighborhood) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{neighborhood.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhood.places.map((item: Place) => (
          <CategoryCard
            key={item.id}
            title={item.title}
            description={item.description || ''}
            imagePath={item.imagePath || ''}
            rating={item.rating || 0}
            location={item.location || ''}
            href={`/${item.category}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
} 