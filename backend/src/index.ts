import { startSyncManager } from './sync-manager';
import dotenv from 'dotenv';

dotenv.config();

// Start the sync manager
startSyncManager()
  .then(() => {
    console.log('Chi Voyage Backend started successfully');
  })
  .catch((error) => {
    console.error('Failed to start Chi Voyage Backend:', error);
    process.exit(1);
  }); 