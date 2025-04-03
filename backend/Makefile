.PHONY: install build start dev sync migrate seed associate docker-build docker-run docker-compose-up docker-compose-down clean

# Install dependencies
install:
	npm install

# Build TypeScript code
build:
	npm run build

# Start the application in production mode
start:
	NODE_ENV=production npm start

# Run the application in development mode
dev:
	npm run dev

# Run a one-time data synchronization
sync:
	npm run sync

# Run database migrations
migrate:
	npm run migrate

# Seed the neighborhoods table
seed:
	npm run seed:neighborhoods

# Associate places with neighborhoods
associate:
	npm run associate:neighborhoods

# Build Docker image
docker-build:
	docker build -t chivoyage-backend .

# Run Docker container
docker-run:
	docker run -d --name chivoyage-backend --env-file .env chivoyage-backend

# Start services with Docker Compose
docker-compose-up:
	docker-compose up -d

# Stop services with Docker Compose
docker-compose-down:
	docker-compose down

# Clean up build artifacts and dependencies
clean:
	rm -rf dist
	rm -rf node_modules
	rm -rf logs 