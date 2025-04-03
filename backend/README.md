# Chi Voyage Backend

Backend service for Chi Voyage, handling data synchronization between Outscraper and Supabase.

## Features

- Automated data synchronization from Outscraper to Supabase
- Scheduled updates using cron expressions
- Comprehensive error handling and logging
- Neighborhood association for places
- Database migrations and seeding
- Docker support for easy deployment

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Docker and Docker Compose (optional, for containerized deployment)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chivoyage.git
cd chivoyage/backend
```

2. Install dependencies:
```bash
npm install
# or using make
make install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:
```
OUTSCRAPER_API_KEY=your_outscraper_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SYNC_INTERVAL=0 */6 * * * # Run every 6 hours
```

## Usage

### Development

Run the application in development mode:
```bash
npm run dev
# or using make
make dev
```

### Production

Build and start the application:
```bash
npm run build
npm start
# or using make
make build
make start
```

### Database Management

Run database migrations:
```bash
npm run migrate
# or using make
make migrate
```

Seed the neighborhoods table:
```bash
npm run seed:neighborhoods
# or using make
make seed
```

Associate places with neighborhoods:
```bash
npm run associate:neighborhoods
# or using make
make associate
```

### Data Synchronization

The sync manager provides several ways to synchronize data:

1. **Automatic Mode (Production)**
   - When running in production mode, the sync manager will:
     - Run an initial sync immediately
     - Schedule future syncs based on the `SYNC_INTERVAL` environment variable
     - Log all sync activities and errors to the `logs` directory

2. **Manual Mode**
   Run a one-time data synchronization:
   ```bash
   npm run sync
   # or using make
   make sync
   ```

3. **Logging**
   - Sync logs are stored in `logs/sync.log`
   - Error logs are stored in `logs/error.log`
   - Both files contain timestamped entries for easy tracking

### Docker Deployment

Build the Docker image:
```bash
docker build -t chivoyage-backend .
# or using make
make docker-build
```

Run the container:
```bash
docker run -d --name chivoyage-backend --env-file .env chivoyage-backend
# or using make
make docker-run
```

Using Docker Compose:
```bash
docker-compose up -d
# or using make
make docker-compose-up
```

Stop services:
```bash
docker-compose down
# or using make
make docker-compose-down
```

### Cleanup

Remove build artifacts and dependencies:
```bash
make clean
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Main application entry point
│   ├── sync.ts            # Data synchronization logic
│   ├── sync-manager.ts    # Sync scheduling and error handling
│   ├── migrate.ts         # Database migration script
│   └── types.ts           # TypeScript type definitions
├── migrations/            # SQL migration files
├── logs/                 # Sync and error logs
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── Makefile             # Convenient commands for common tasks
└── package.json         # Project dependencies and scripts
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

Please read [SECURITY.md](SECURITY.md) for details on our security policy and how to report vulnerabilities.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   OUTSCRAPER_API_KEY=your_outscraper_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SYNC_INTERVAL=0 0 * * *  # Optional: Cron expression for sync schedule (default: daily at midnight)
   NODE_ENV=development     # Optional: Set to 'production' to enable scheduled syncs
   ```

3. Run the database migrations:
   ```bash
   npm run migrate
   ```

   This will create the necessary tables in your Supabase database:
   - `places`: Stores information about activities, restaurants, attractions, and events
   - `neighborhoods`: Stores information about Chicago neighborhoods
   - `place_neighborhoods`: Junction table for the many-to-many relationship between places and neighborhoods

4. Seed the neighborhoods table with initial data:
   ```bash
   npm run seed:neighborhoods
   ```

   This will populate the neighborhoods table with data about popular Chicago neighborhoods.

5. Associate places with neighborhoods:
   ```bash
   npm run associate:neighborhoods
   ```

   This will analyze the location data of each place and associate it with relevant neighborhoods based on keywords and partial matches.

## Development

- `npm run build` - Build the TypeScript code
- `npm run dev` - Run the application in development mode
- `npm start` - Run the built application in production mode
- `npm run sync` - Run a one-time data synchronization
- `npm run migrate` - Run database migrations
- `npm run migrate:build` - Build and run migrations
- `npm run seed:neighborhoods` - Seed the neighborhoods table with initial data
- `npm run associate:neighborhoods` - Associate places with neighborhoods based on location data
- `npm run scheduler` - Run the sync process on a schedule

## Database Schema

### Places Table
```sql
CREATE TABLE places (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  imagePath TEXT,
  rating NUMERIC,
  category TEXT NOT NULL,
  location TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Neighborhoods Table
```sql
CREATE TABLE neighborhoods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  imagePath TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Place-Neighborhoods Junction Table
```sql
CREATE TABLE place_neighborhoods (
  place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
  neighborhood_id TEXT REFERENCES neighborhoods(id) ON DELETE CASCADE,
  PRIMARY KEY (place_id, neighborhood_id)
);
```

## Data Structure

The backend transforms Outscraper data into the following structure:

```typescript
interface DatabasePlace {
  id: string;
  title: string;
  slug: string;
  description: string;
  imagePath: string;
  rating: number;
  category: 'activities' | 'restaurants' | 'attractions' | 'events';
  location: string;
  details?: {
    price?: string;
    hours?: string;
    website?: string;
    phone?: string;
    address?: string;
    features?: string[];
  };
}
```

## Error Handling

The sync process includes error handling for:
- API failures
- Data transformation issues
- Database errors
- Neighborhood association errors

Errors are logged to the console for debugging purposes. 