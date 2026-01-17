# Docker Quick Reference

Quick reference for working with the Dockerized Rento application.

## Building

```bash
# Build the Docker image
docker build -t rento:latest .

# Build without cache (if you have issues)
docker build --no-cache -t rento:latest .

# Build with specific platform (for M1/M2 Macs deploying to Linux)
docker build --platform linux/amd64 -t rento:latest .
```

## Running Locally

### With Docker Compose (Recommended)

```bash
# Start all services (app, database, worker)
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
docker-compose logs -f worker
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Stop and remove volumes (careful - deletes database data)
docker-compose down -v

# Execute commands in running container
docker-compose exec app php artisan migrate
docker-compose exec app php artisan tinker
docker-compose exec app sh
```

### With Docker Only

```bash
# Run the container
docker run -p 8000:8000 \
  -e APP_ENV=local \
  -e APP_DEBUG=true \
  -e APP_KEY=base64:your_key_here \
  -e DB_CONNECTION=sqlite \
  rento:latest

# Run with volume mounts for development
docker run -p 8000:8000 \
  -v $(pwd)/storage:/var/www/html/storage \
  -e APP_ENV=local \
  rento:latest

# Run in detached mode
docker run -d -p 8000:8000 --name rento-app rento:latest

# View logs
docker logs -f rento-app

# Execute commands in running container
docker exec -it rento-app php artisan migrate
docker exec -it rento-app sh

# Stop container
docker stop rento-app

# Remove container
docker rm rento-app
```

## Debugging

```bash
# Access container shell
docker-compose exec app sh
# or
docker exec -it rento-app sh

# Check PHP version
docker-compose exec app php -v

# Check installed PHP extensions
docker-compose exec app php -m

# View Nginx configuration
docker-compose exec app cat /etc/nginx/nginx.conf

# View Nginx error logs
docker-compose exec app cat /var/log/nginx/error.log

# View Laravel logs
docker-compose exec app cat /var/www/html/storage/logs/laravel.log

# Test database connection
docker-compose exec app php artisan db:show

# Run migrations manually
docker-compose exec app php artisan migrate

# Clear caches
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan view:clear
```

## Database Management

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U rento -d rento

# Create database backup
docker-compose exec postgres pg_dump -U rento rento > backup.sql

# Restore database backup
docker-compose exec -T postgres psql -U rento rento < backup.sql

# View all databases
docker-compose exec postgres psql -U rento -c "\l"

# View all tables
docker-compose exec postgres psql -U rento -d rento -c "\dt"
```

## Cleanup

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything (careful!)
docker system prune -a --volumes

# Remove specific image
docker rmi rento:latest

# Remove all stopped containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q)
```

## Production Deployment to Render

```bash
# Make sure your code is committed
git add .
git commit -m "Add Docker configuration"
git push origin main

# Render will automatically detect the Dockerfile and build/deploy
# No manual Docker commands needed on Render - it handles everything!
```

## Testing the Health Check

```bash
# Test health endpoint locally
curl http://localhost:8000/health

# Test in Docker container
docker-compose exec app curl http://localhost:8000/health

# Expected response:
# {"status":"ok"}
```

## Environment Variables for Local Development

Create a `.env.docker` file for local Docker development:

```bash
APP_NAME=Rento
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_KEY=base64:your_generated_key

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=rento
DB_USERNAME=rento
DB_PASSWORD=secret

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local

# Add your other environment variables here
```

Then use it with Docker Compose:

```bash
docker-compose --env-file .env.docker up
```

## Multi-Stage Build Information

The Dockerfile uses a multi-stage build:

1. **Stage 1 (frontend-builder)**: Builds frontend assets with Node.js/pnpm
2. **Stage 2 (production)**: Creates the final PHP runtime image with built assets

Benefits:

- Smaller final image size (no Node.js in production)
- Faster builds (frontend dependencies cached separately)
- More secure (fewer packages in production image)

## Common Issues

### Issue: Port already in use

```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port
docker run -p 8080:8000 rento:latest
```

### Issue: Permission denied on storage

```bash
# Fix permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

### Issue: Database connection refused

```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

### Issue: Frontend assets not loading

```bash
# Rebuild with no cache
docker-compose build --no-cache app

# Check if build artifacts exist
docker-compose exec app ls -la public/build
```

### Issue: APP_KEY not set

```bash
# Generate key locally
php artisan key:generate --show

# Add to environment variables or .env file
# Format: base64:random_generated_key
```

## Performance Optimization

```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build -t rento:latest .

# Or with Docker Compose
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build

# Cache Composer dependencies
# (Already configured in Dockerfile)

# Limit container resources
docker run --memory="512m" --cpus="1.0" rento:latest
```

## Monitoring

```bash
# View container stats
docker stats

# View specific container stats
docker stats rento-app

# View disk usage
docker system df

# Detailed disk usage
docker system df -v
```
