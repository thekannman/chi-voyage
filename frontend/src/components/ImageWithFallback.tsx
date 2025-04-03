'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  fill?: boolean;
  className?: string;
  containerHeight?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  containerHeight = 'h-full',
  fallbackSrc = '/images/chicago-flag.png'
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${containerHeight} w-full overflow-hidden`}>
      <Image
        src={error || !src ? fallbackSrc : src}
        alt={alt}
        fill={fill}
        className={`${className} object-cover`}
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
    </div>
  );
} 