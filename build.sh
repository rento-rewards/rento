#!/usr/bin/env bash
set -o errexit

# Build
composer install --no-dev --optimize-autoloader
pnpm install --frozen-lockfile
pnpm build

php artisan migrate --force
php artisan optimize
