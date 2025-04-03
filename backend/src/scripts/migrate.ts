import { migrateToLatest } from '../db/migrator';

migrateToLatest().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
}); 