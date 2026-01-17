#!/bin/sh
set -e

echo "=== Starting Rento Application with SSR ==="

# Function to handle shutdown
shutdown() {
    echo "Received shutdown signal, stopping services..."
    if [ -n "$SSR_PID" ] && kill -0 "$SSR_PID" 2>/dev/null; then
        echo "Stopping SSR server (PID: $SSR_PID)..."
        kill -TERM "$SSR_PID" 2>/dev/null || true
    fi
    if [ -n "$PHP_PID" ] && kill -0 "$PHP_PID" 2>/dev/null; then
        echo "Stopping PHP-FPM/Nginx (PID: $PHP_PID)..."
        kill -TERM "$PHP_PID" 2>/dev/null || true
    fi
    exit 0
}

# Trap signals
trap shutdown TERM INT QUIT

# Check if SSR bundle exists
if [ ! -f "/var/www/html/bootstrap/ssr/ssr.js" ] && [ ! -f "/var/www/html/bootstrap/ssr/ssr.mjs" ]; then
    echo "WARNING: SSR bundle not found at /var/www/html/bootstrap/ssr/"
    echo "SSR will not be available. Build with 'pnpm build:ssr' to enable SSR."
else
    # Start the Inertia SSR server in the background
    echo "Starting Inertia SSR server on port 13714..."
    cd /var/www/html

    # Find the SSR file (could be .js or .mjs)
    SSR_FILE=""
    if [ -f "bootstrap/ssr/ssr.js" ]; then
        SSR_FILE="bootstrap/ssr/ssr.js"
    elif [ -f "bootstrap/ssr/ssr.mjs" ]; then
        SSR_FILE="bootstrap/ssr/ssr.mjs"
    fi

    if [ -n "$SSR_FILE" ]; then
        node "$SSR_FILE" > /var/www/html/storage/logs/ssr.log 2>&1 &
        SSR_PID=$!
        echo "SSR server started with PID: $SSR_PID"

        # Give SSR server a moment to start
        sleep 2

        # Check if SSR server is running
        if kill -0 "$SSR_PID" 2>/dev/null; then
            echo "✓ SSR server is running"
        else
            echo "✗ SSR server failed to start. Check /var/www/html/storage/logs/ssr.log"
            cat /var/www/html/storage/logs/ssr.log
        fi
    fi
fi

# Start PHP-FPM in the background
echo "Starting PHP-FPM..."
php-fpm -D

# Start Nginx in the foreground
echo "Starting Nginx..."
echo "=== Application ready ==="
echo "PHP-FPM + Nginx: http://0.0.0.0:8080"
if [ -n "$SSR_PID" ]; then

    echo "SSR Server: http://127.0.0.1:13714 (internal)"
fi
echo "==================================="

# Start nginx in foreground and capture its PID
nginx -g "daemon off;" &
PHP_PID=$!

# Wait for nginx to exit
wait $PHP_PID
