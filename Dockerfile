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

EXPOSE 8080

WORKDIR /var/www/html

USER root

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

# Create Laravel directories and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache && \
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Laravel optimization for production (cache configs, routes, views, events)
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan event:cache

# Configure s6-overlay service for Inertia SSR
RUN mkdir -p /etc/s6-overlay/s6-rc.d/inertia-ssr

# Set service type as longrun
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/inertia-ssr/type

# Create dependencies to ensure SSR starts after PHP-FPM and Nginx
RUN mkdir -p /etc/s6-overlay/s6-rc.d/inertia-ssr/dependencies.d && \
    touch /etc/s6-overlay/s6-rc.d/inertia-ssr/dependencies.d/php-fpm && \
    touch /etc/s6-overlay/s6-rc.d/inertia-ssr/dependencies.d/nginx

# Create run script for the SSR service
RUN echo -e "#!/usr/bin/with-contenv sh\necho \"Starting Inertia SSR server...\"\nexec s6-setuidgid www-data php /var/www/html/artisan inertia:start-ssr" > /etc/s6-overlay/s6-rc.d/inertia-ssr/run
RUN chmod +x /etc/s6-overlay/s6-rc.d/inertia-ssr/run

# Add service to user bundle (must contain service name, not empty)
RUN mkdir -p /etc/s6-overlay/s6-rc.d/user/contents.d
RUN echo "inertia-ssr" > /etc/s6-overlay/s6-rc.d/user/contents.d/inertia-ssr

USER www-data
