#!/bin/bash

# Trust proxies for HTTPS detection
export TRUSTED_PROXIES="*"

# Run migrations
php artisan migrate --force

# Start the server
php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
