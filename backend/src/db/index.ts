import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';
import dotenv from 'dotenv';

dotenv.config();

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set it to your Supabase direct connection string.');
}

// Log the connection string (with password redacted for security)
const redactedConnectionString = process.env.DATABASE_URL.replace(/\/\/[^:]+:[^@]+@/, '//****:****@');
console.log('Attempting to connect to database with connection string:', redactedConnectionString);

// Use the direct connection string from Supabase
const connectionString = process.env.DATABASE_URL;

// Create a PostgreSQL connection pool with additional options
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  },
  connectionTimeoutMillis: 10000, // 10 seconds
  idleTimeoutMillis: 30000, // 30 seconds
  max: 20, // Maximum number of clients in the pool
});

// Test the connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the connection immediately
pool.connect()
  .then(client => {
    console.log('Successfully connected to the database');
    client.release();
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(-1);
  });

// Create and export the database instance
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
}); 