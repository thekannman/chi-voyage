import Image from 'next/image';

export default function TestImage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="relative w-full max-w-4xl h-96 mb-8">
        <Image
          src="/images/chicago-skyline.png"
          alt="Chicago Skyline"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      
      <div className="text-center">
        <p className="mb-2">If you can see the image above, it&apos;s loading correctly.</p>
        <p>If not, there might be an issue with the image file or path.</p>
      </div>
    </div>
  );
} 