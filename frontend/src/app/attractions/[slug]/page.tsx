import CategoryPage from '@/components/CategoryPage';

interface AttractionPageProps {
  params: {
    slug: string;
  };
}

export default function AttractionPage({ params }: AttractionPageProps) {
  return <CategoryPage params={params} category="attraction" categoryTitle="Attractions" />;
} 