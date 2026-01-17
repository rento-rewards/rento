# Stage 1: Build frontend assets with PHP + Node.js
# Using serversideup/php CLI variant and installing Node.js
# Using PHP 8.4 to match composer.lock requirements (Symfony 8 needs PHP 8.4+)
FROM serversideup/php:8.4-cli AS frontend-builder

# Switch to root to install Node.js
USER root

WORKDIR /app

# Install Node.js 20 from NodeSource
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install bcmath extension (required by moneyphp/money)
RUN install-php-extensions bcmath

# Enable corepack for pnpm
RUN corepack enable

# Copy ALL application files first (Composer needs the full context)
COPY . .

# Create a minimal .env file (needed by Laravel during composer install)
RUN echo "APP_KEY=base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" > .env

# Install PHP dependencies (needed for Wayfinder plugin)
# Using --no-plugins and --no-scripts to avoid any plugin/script issues during build
RUN composer install \
    --no-dev \
    --no-plugins \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader || (echo "Composer install failed" && exit 1)

# Install frontend dependencies
RUN pnpm install --frozen-lockfile

# Build frontend assets (Wayfinder plugin will run php artisan wayfinder:generate)
RUN pnpm build

# Stage 2: Production-ready PHP image
# Using serversideup/php - excellent for Laravel: https://serversideup.net/open-source/docker-php/
# Using PHP 8.4 to match composer.lock requirements
FROM serversideup/php:8.4-fpm-nginx

# Switch to root to install additional packages
USER root

# Install PostgreSQL client for database operations and bcmath extension
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && install-php-extensions bcmath

# Set working directory
WORKDIR /var/www/html

# Copy built frontend assets from the frontend-builder stage
COPY --from=frontend-builder --chown=www-data:www-data /app/public/build ./public/build

# Copy composer files and install PHP dependencies
COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

# Copy remaining application files
COPY --chown=www-data:www-data . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-dev

# Ensure proper permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 storage bootstrap/cache

# Copy startup script for migrations and cache
COPY docker/entrypoint.sh /etc/entrypoint.d/50-laravel-setup.sh
RUN chmod +x /etc/entrypoint.d/50-laravel-setup.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Switch back to www-data user for security
USER www-data

# The base image already has the correct CMD/ENTRYPOINT
