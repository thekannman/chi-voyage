import { syncPlaces } from './sync';
import dotenv from 'dotenv';

dotenv.config();

const SYNC_INTERVAL = process.env.SYNC_INTERVAL || '0 0 * * *'; // Default to daily at midnight

async function runScheduledSync() {
  console.log('Starting scheduled sync...');
  const startTime = new Date();

  try {
    await syncPlaces();
    const endTime = new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / 1000;
    console.log(`Scheduled sync completed successfully in ${duration} seconds`);
  } catch (error) {
    console.error('Error during scheduled sync:', error);
    // Here you could add notification logic (email, Slack, etc.)
  }
}

// Run initial sync
runScheduledSync();

// Schedule future syncs
if (process.env.NODE_ENV !== 'development') {
  const cron = require('node-cron');
  cron.schedule(SYNC_INTERVAL, runScheduledSync);
  console.log(`Scheduled sync to run at: ${SYNC_INTERVAL}`);
} 