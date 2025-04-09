import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNeighborhoods } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const neighborhoods = await getAllNeighborhoods();
  const resolvedParams = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === resolvedParams.slug);

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found | Chi Voyage',
      description: 'The requested neighborhood could not be found.',
    };
  }

  return {
    title: `${neighborhood.name} | Chi Voyage`,
    description: neighborhood.description,
  };
}

export default async function NeighborhoodPage({ params }: Props) {
  const neighborhoods = await getAllNeighborhoods();
  const resolvedParams = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === resolvedParams.slug);
  
  if (!neighborhood) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <nav className="mb-4">
          <Link 
            href="/neighborhoods" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to All Neighborhoods
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={neighborhood.imagePath || '/images/neighborhood-placeholder.jpg'}
            alt={neighborhood.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                {neighborhood.name}
              </h1>
              <p className="text-xl text-white drop-shadow-md">
                {neighborhood.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                  <p className="text-xl text-gray-600">
                    We&apos;re working hard to bring you the best recommendations for {neighborhood.name}.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Curated lists of the best restaurants and dining experiences
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Must-see attractions and hidden gems
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Local events and activities
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Insider tips and recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">About {neighborhood.name}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">{neighborhood.name}, Chicago</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Status</h3>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 