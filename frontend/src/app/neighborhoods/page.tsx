import React from 'react';
import PageHeader from '@/components/PageHeader';
import NeighborhoodCard from '@/components/NeighborhoodCard';
import { neighborhoods } from '@/data/neighborhoods';

export default function NeighborhoodsPage() {
  // Calculate the total number of items for each neighborhood
  const neighborhoodsWithCounts = neighborhoods.map(neighborhood => {
    const totalItems = 
      neighborhood.activities.length + 
      neighborhood.restaurants.length + 
      neighborhood.attractions.length + 
      neighborhood.events.length;
    
    return {
      ...neighborhood,
      itemCount: totalItems
    };
  });

  return (
    <>
      <PageHeader
        title="Chicago Neighborhoods"
        description="Explore Chicago's diverse neighborhoods and discover what each area has to offer"
        imagePath="/images/chicago-neighborhoods.png"
        gradientClassName="bg-gradient-to-b from-black/80 via-black/60 to-black/40"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neighborhoodsWithCounts.map((neighborhood) => (
            <NeighborhoodCard
              key={neighborhood.id}
              name={neighborhood.name}
              description={neighborhood.description}
              imagePath={neighborhood.imagePath}
              href={`/neighborhoods/${neighborhood.slug}`}
              itemCount={neighborhood.itemCount}
            />
          ))}
        </div>
      </div>
    </>
  );
} 