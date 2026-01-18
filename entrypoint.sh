#!/bin/bash

# Trust all proxies (Render uses reverse proxy)
export TRUSTED_PROXIES="*"

# Run migrations
php artisan migrate --force

# Start the server
php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
