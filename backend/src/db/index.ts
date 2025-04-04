import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';
import dotenv from 'dotenv';

dotenv.config();

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set it to your Supabase direct connection string.');
}

// Use the direct connection string from Supabase
const connectionString = process.env.DATABASE_URL;

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
});

// Test the connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Create and export the database instance
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
}); 