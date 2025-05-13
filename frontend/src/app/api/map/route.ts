import { NextResponse } from 'next/server';

export const revalidate = 7776000; // Cache for 90 days

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const zoom = searchParams.get('zoom') || '15';
  const width = searchParams.get('width') || '800';
  const height = searchParams.get('height') || '400';

  if (!lat || !lng) {
    return new NextResponse('Missing coordinates', { status: 400 });
  }

  // TK: DEACTIVATED GOGOLE MAPS API KEY FOR NOW. COST WAS TOO HIGH.
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return new NextResponse('API key not configured', { status: 500 });
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(mapUrl);
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
      },
    });
  } catch (error) {
    console.error('Error fetching map:', error);
    return new NextResponse('Error fetching map', { status: 500 });
  }
} 