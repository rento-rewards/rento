FROM serversideup/php:8.4.11-fpm-nginx-alpine3.21 AS base

USER root

RUN install-php-extensions intl bcmath
USER www-data

FROM base AS node-builder

USER root

# Install Node.js and pnpm in the PHP image
RUN apk add --no-cache nodejs npm
RUN npm install -g pnpm

USER www-data

WORKDIR /var/www/html

# Copy composer files and install dependencies (needed for wayfinder)
COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction

# Copy application code (needed for artisan commands)
# This includes package.json and pnpm-lock.yaml
COPY --chown=www-data:www-data . .

# Generate autoloader (required for artisan commands)
RUN composer dump-autoload

# Install frontend deps (after composer install)
RUN pnpm i --frozen-lockfile

# Build frontend (PHP is now available for wayfinder)
RUN pnpm build

FROM base AS production

ENV PHP_OPCACHE_ENABLE=1

USER www-data

COPY --chown=www-data:www-data composer.json composer.lock /var/www/html/

#Exclude dev dependencies for production with --no-dev
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction

COPY --chown=www-data:www-data . /var/www/html

# Copy only the built assets from node stage
COPY --from=node-builder /var/www/html/public/build /var/www/html/public/build

# Now run scripts and autoloader generation
RUN composer dump-autoload --optimize && \
    composer run-script post-autoload-dump
