import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { neighborhoods, getItemsByNeighborhood } from '@/data/neighborhoods';
import { activities, restaurants, attractions, events } from '@/data/items';
import PageHeader from '@/components/PageHeader';
import CategoryCard from '@/components/CategoryCard';

// Add mapping for category URLs
const categoryUrls: Record<string, string> = {
  activity: 'activities',
  restaurant: 'restaurants',
  attraction: 'attractions',
  event: 'events',
  other: 'other'
};

interface NeighborhoodPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
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
      images: [neighborhood.imagePath],
    },
  };
}

export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const neighborhood = neighborhoods.find((n) => n.slug === params.slug);

  if (!neighborhood) {
    notFound();
  }

  // Get all items in this neighborhood
  const allItems = [...activities, ...restaurants, ...attractions, ...events];
  const neighborhoodItems = getItemsByNeighborhood(params.slug, allItems);

  return (
    <>
      <PageHeader
        title={neighborhood.name}
        description={neighborhood.description}
        imagePath={neighborhood.imagePath}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Places to Explore in {neighborhood.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neighborhoodItems.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.title}
              description={item.description}
              imagePath={item.imagePath}
              rating={item.rating}
              location={item.location}
              href={`/${categoryUrls[item.category]}/${item.slug}`}
            />
          ))}
        </div>
      </div>
    </>
  );
} 