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

# Build frontend with SSR (PHP is now available for wayfinder)
RUN pnpm build:ssr

FROM base AS production

USER root

# Install Node.js for SSR server
RUN apk add --no-cache nodejs npm

ENV PHP_OPCACHE_ENABLE=1

USER www-data

COPY --chown=www-data:www-data composer.json composer.lock /var/www/html/

#Exclude dev dependencies for production with --no-dev
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction

COPY --chown=www-data:www-data . /var/www/html

# Copy built assets (both client and SSR) from node stage
COPY --from=node-builder /var/www/html/public/build /var/www/html/public/build
COPY --from=node-builder /var/www/html/bootstrap/ssr /var/www/html/bootstrap/ssr

# Copy node_modules for SSR runtime (production dependencies only)
COPY --from=node-builder /var/www/html/node_modules /var/www/html/node_modules

# Now run scripts and autoloader generation
RUN composer dump-autoload --optimize && \
    composer run-script post-autoload-dump

# Switch to root for entrypoint setup
USER root

# Copy SSR entrypoint script
COPY docker-entrypoint-ssr.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint-ssr.sh

# Expose port for SSR server (default Inertia SSR port is 13714)
EXPOSE 13714

# Use custom entrypoint that starts both PHP-FPM/Nginx and SSR server
ENTRYPOINT ["/usr/local/bin/docker-entrypoint-ssr.sh"]
CMD ["nginx", "-g", "daemon off;"]
