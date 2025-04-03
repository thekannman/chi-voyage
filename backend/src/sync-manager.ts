import { syncPlaces } from './sync';
//import { createClient } from '@supabase/supabase-js';
import * as cron from 'node-cron';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
//const supabaseUrl = process.env.SUPABASE_URL!;
//const supabaseKey = process.env.SUPABASE_KEY!;
//const supabase = createClient(supabaseUrl, supabaseKey);

// Ensure logs directory exists
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file paths
const syncLogPath = path.join(logsDir, 'sync.log');
const errorLogPath = path.join(logsDir, 'error.log');

// Helper function to format date for logging
const getFormattedDate = () => {
  return new Date().toISOString();
};

// Helper function to log messages
const logMessage = (message: string, isError = false) => {
  const formattedMessage = `[${getFormattedDate()}] ${message}\n`;
  const logPath = isError ? errorLogPath : syncLogPath;
  fs.appendFileSync(logPath, formattedMessage);
  console.log(message);
};

// Function to run the sync process with error handling
const runSync = async () => {
  const startTime = Date.now();
  logMessage('Starting data synchronization...');

  try {
    await syncPlaces();
    const duration = (Date.now() - startTime) / 1000;
    logMessage(`Sync completed successfully in ${duration.toFixed(2)} seconds`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logMessage(`Error during sync: ${errorMessage}`, true);
    throw error;
  }
};

// Function to schedule sync based on cron expression
const scheduleSync = (cronExpression: string) => {
  if (!cron.validate(cronExpression)) {
    throw new Error(`Invalid cron expression: ${cronExpression}`);
  }

  logMessage(`Scheduling sync with cron expression: ${cronExpression}`);
  cron.schedule(cronExpression, async () => {
    try {
      await runSync();
    } catch (error) {
      // Error is already logged in runSync
      // We catch it here to prevent the cron job from stopping
    }
  });
};

// Main function to start the sync manager
export const startSyncManager = async () => {
  const syncInterval = process.env.SYNC_INTERVAL;
  
  try {
    // Run initial sync
    await runSync();

    // Schedule future syncs if interval is provided
    if (syncInterval) {
      scheduleSync(syncInterval);
      logMessage('Sync manager started successfully');
    } else {
      logMessage('No sync interval provided. Running in one-time sync mode.');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logMessage(`Failed to start sync manager: ${errorMessage}`, true);
    process.exit(1);
  }
};

// Export for testing and direct usage
export { runSync, scheduleSync }; 