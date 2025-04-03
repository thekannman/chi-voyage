'use client';

import Image from 'next/image';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  title: string;
  className?: string;
}

export default function GoogleMapComponent({ latitude, longitude, title, className = 'h-[400px] w-full' }: GoogleMapProps) {
  const width = 800;
  const height = 400;
  const zoom = 15;
  
  // Construct the static map URL
  const mapUrl = `/api/map?lat=${latitude}&lng=${longitude}&zoom=${zoom}&width=${width}&height=${height}`;

  return (
    <div className={`${className} relative`}>
      <Image
        src={mapUrl}
        alt={`Map showing location of ${title}`}
        fill
        className="object-cover rounded-lg"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={90}
      />
    </div>
  );
} 