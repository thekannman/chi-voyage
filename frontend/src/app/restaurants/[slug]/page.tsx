import CategoryPage from '@/components/CategoryPage';

interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  return <CategoryPage params={params} category="restaurant" categoryTitle="Restaurant" />;
} 