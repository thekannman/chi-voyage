import { NextResponse } from 'next/server';
import { neighborhoods } from '@/data/neighborhoods';

export async function GET() {
  try {
    return NextResponse.json({ neighborhoods });
  } catch (error) {
    console.error('Error fetching neighborhoods:', error);
    return NextResponse.json({ error: 'Failed to fetch neighborhoods' }, { status: 500 });
  }
} 