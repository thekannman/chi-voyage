import { migrateToLatest } from './db/migrator';

// Run the migrations
migrateToLatest()
  .then(() => {
    console.log('Migrations completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 