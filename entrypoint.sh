#!/bin/bash

# Trust all proxies (Render uses reverse proxy)
export TRUSTED_PROXIES="*"

# Run migrations
php artisan migrate --force

# Start Inertia SSR server in background
node bootstrap/ssr/ssr.js &

# Store the SSR process ID
SSR_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "Shutting down SSR server..."
    kill $SSR_PID 2>/dev/null
    exit
}

# Trap termination signals
trap cleanup SIGTERM SIGINT

# Start PHP server in foreground
php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
