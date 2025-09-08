#!/bin/sh
set -e

# 1. Run Laravel migrations
php artisan migrate --force

# 2. Start SSR server in background
php artisan inertia:start-ssr &

# 3. Start PHP-FPM in foreground
php-fpm8 -F
