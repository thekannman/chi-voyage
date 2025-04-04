import CategoryPage from '@/components/CategoryPage';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EventPage({ params }: Props) {
  const resolvedParams = await params;
  return <CategoryPage params={resolvedParams} category="event" categoryTitle="Events" />;
} 