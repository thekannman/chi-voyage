import CategoryPage from '@/components/CategoryPage';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return <CategoryPage params={params} category="event" categoryTitle="Events" />;
} 