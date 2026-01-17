#!/bin/sh
set -e

echo "Running Laravel setup..."

# Run migrations
php artisan migrate --force --no-interaction

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Laravel setup complete!"
