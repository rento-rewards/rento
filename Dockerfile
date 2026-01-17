FROM serversideup/php:8.4.11-fpm-nginx-alpine3.21 AS base

USER root

RUN install-php-extensions intl
USER www-data

FROM node:22.19.0-alpine3.21 AS node-builder

WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install deps
RUN npm ci --legacy-peer-deps

# Copy the rest of the frontend
COPY resources/ resources/
COPY vite.config.ts ./

# Build frontend
RUN npm run build

FROM base AS production

ENV PHP_OPCACHE_ENABLE=1

USER www-data

COPY --chown=www-data:www-data composer.json composer.lock /var/www/html/

#Exclude dev dependencies for production with --no-dev
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction

COPY --chown=www-data:www-data . /var/www/html

# Copy only the built assets from node stage
COPY --from=node-builder /app/public/build /var/www/html/public/build

# Now run scripts and autoloader generation
RUN composer dump-autoload --optimize && \
    composer run-script post-autoload-dump
