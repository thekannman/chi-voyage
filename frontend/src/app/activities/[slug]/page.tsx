import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

interface ActivityPageProps {
  params: {
    slug: string;
  };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  return <CategoryPage params={params} category="activity" categoryTitle="Activity" />;
} 