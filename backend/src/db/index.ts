import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';
import dotenv from 'dotenv';

dotenv.config();

// Check for required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PASSWORD) {
  throw new Error('SUPABASE_URL and SUPABASE_PASSWORD environment variables are required');
}

// Use the direct database URL from Supabase
const connectionString = process.env.DATABASE_URL || `postgresql://postgres:${process.env.SUPABASE_PASSWORD}@${process.env.SUPABASE_URL.replace('https://', '')}:5432/postgres`;

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
});

// Create and export the database instance
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
}); 