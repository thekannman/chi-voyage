import { FileMigrationProvider, Migrator } from 'kysely';
import * as path from 'path';
import { promises as fs } from 'fs';
import { db } from './index';

// Initialize the migrator
const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, '../../migrations'),
  }),
});

// Function to run all pending migrations
export async function migrateToLatest() {
  const { error, results } = await migrator.migrateToLatest();

  if (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  if (results) {
    results.forEach((migration) => {
      if (migration.status === 'Success') {
        console.log(`Migration "${migration.migrationName}" was executed successfully`);
      } else if (migration.status === 'Error') {
        console.error(`Failed to execute migration "${migration.migrationName}"`);
      }
    });
  }
}

// Function to rollback the last migration
export async function rollbackLatest() {
  const { error, results } = await migrator.migrateDown();

  if (error) {
    console.error('Rollback failed:', error);
    process.exit(1);
  }

  if (results) {
    results.forEach((migration) => {
      if (migration.status === 'Success') {
        console.log(`Migration "${migration.migrationName}" was rolled back successfully`);
      } else if (migration.status === 'Error') {
        console.error(`Failed to roll back migration "${migration.migrationName}"`);
      }
    });
  }
} 