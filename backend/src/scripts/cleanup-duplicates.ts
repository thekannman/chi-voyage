import { db } from '../db';

async function cleanupDuplicates() {
  try {
    console.log('Deleting entries with Google place_id IDs...');
    
    const result = await db
      .deleteFrom('places')
      .where('id', 'like', 'ChIJ%')
      .execute();
    
    console.log(`Deleted ${result.length} entries with Google place_id IDs`);
  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

// Run the cleanup
cleanupDuplicates().catch(console.error); 