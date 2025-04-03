import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json();
    
    // Verify the request is authorized
    if (token !== process.env.REVALIDATION_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid token' }, 
        { status: 401 }
      );
    }
    
    // Revalidate the path
    revalidatePath(path);
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) }, 
      { status: 500 }
    );
  }
} 