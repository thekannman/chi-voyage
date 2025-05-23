import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  imagePath?: string;
  gradientClassName?: string;
}

export default function PageHeader({ 
  title, 
  description, 
  imagePath = '/images/header.jpg',
  gradientClassName = 'bg-gradient-to-b from-black/60 to-black/30'
}: PageHeaderProps) {
  return (
    <div className="relative h-[60vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
      <div className={`absolute inset-0 ${gradientClassName}`} />
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
} 