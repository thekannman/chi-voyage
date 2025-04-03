/**
 * Script to manually trigger revalidation of Next.js static pages
 * 
 * Usage:
 * node scripts/revalidate.js <path> <token>
 * 
 * Example:
 * node scripts/revalidate.js /restaurants your-secret-token
 */

const path = process.argv[2];
const token = process.env.REVALIDATION_TOKEN || process.argv[3];

if (!path) {
  console.error('Please provide a path to revalidate');
  console.error('Usage: node scripts/revalidate.js <path> <token>');
  process.exit(1);
}

if (!token) {
  console.error('Please provide a revalidation token');
  console.error('Usage: node scripts/revalidate.js <path> <token>');
  process.exit(1);
}

async function revalidate() {
  try {
    const response = await fetch('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        token,
      }),
    });

    const data = await response.json();
    console.log('Revalidation response:', data);
  } catch (error) {
    console.error('Error revalidating:', error);
  }
}

revalidate(); 