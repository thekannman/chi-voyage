/**
 * Utility function to trigger revalidation of Next.js static pages
 * @param path The path to revalidate (e.g., '/restaurants', '/attractions/art-institute')
 * @returns Promise that resolves when revalidation is complete
 */
export async function revalidateFrontend(path: string): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const revalidationToken = process.env.REVALIDATION_TOKEN;
  
  if (!revalidationToken) {
    console.warn('REVALIDATION_TOKEN not set. Skipping revalidation.');
    return;
  }
  
  try {
    const response = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        token: revalidationToken,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Revalidation failed: ${JSON.stringify(error)}`);
    }
    
    const result = await response.json();
    console.log(`Revalidated path: ${path}`, result);
  } catch (error) {
    console.error('Error revalidating frontend:', error);
    // Don't throw the error to prevent breaking the main operation
  }
} 