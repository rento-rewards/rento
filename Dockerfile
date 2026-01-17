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

# Install Node.js for SSR server and curl for healthcheck
RUN apk add --no-cache nodejs npm curl

# Environment variables for PHP
ENV PHP_OPCACHE_ENABLE=1
ENV PHP_FPM_POOL_NAME=www
ENV PHP_FPM_LISTEN=127.0.0.1:9000
ENV SSL_MODE=off
ENV LOG_OUTPUT_LEVEL=info

# Default PORT for local development (Render.com will override this)
ENV PORT=10000

EXPOSE $PORT

WORKDIR /var/www/html

USER root

COPY --chown=www-data:www-data composer.json composer.lock /var/www/html/

# Exclude dev dependencies for production with --no-dev
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

# Laravel optimization for production (cache configs, views, events)
# Note: route:cache is removed because it caches routes at build time
# which can cause 500 errors when runtime environment variables differ
RUN php artisan config:cache && \
    php artisan view:cache && \
    php artisan event:cache

# Configure NGINX to listen on 0.0.0.0 and use PORT variable
# This is required for Render.com and other cloud platforms
RUN mkdir -p /etc/cont-init.d

# Create init script to configure NGINX with runtime PORT variable
RUN cat > /etc/cont-init.d/99-configure-nginx <<'EOF'
#!/command/with-contenv sh
set -e

echo "Configuring NGINX to listen on 0.0.0.0:${PORT}..."

# Backup original default.conf if it exists
if [ -f /etc/nginx/conf.d/default.conf ] && [ ! -f /etc/nginx/conf.d/default.conf.bak ]; then
    cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
fi

# Create NGINX configuration that listens on 0.0.0.0 with PORT variable
cat > /etc/nginx/conf.d/default.conf <<NGINX_EOF
server {
    listen 0.0.0.0:${PORT};
    listen [::]:${PORT};

    server_name _;
    root /var/www/html/public;
    index index.php index.html;

    charset utf-8;

    # Logging
    access_log /dev/stdout;
    error_log /dev/stderr;

    # Laravel specific
    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    # PHP handling
    location ~ \.php\$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;

        # Additional FastCGI params for Laravel
        fastcgi_param PATH_INFO \$fastcgi_path_info;
        fastcgi_param PATH_TRANSLATED \$document_root\$fastcgi_path_info;

        # Increase timeouts for long-running requests
        fastcgi_read_timeout 300;
        fastcgi_send_timeout 300;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Deny access to .php files in storage and bootstrap/cache
    location ~ ^/(storage|bootstrap\/cache)/.*\.php\$ {
        deny all;
    }

    # Static assets caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_EOF

echo "NGINX configured to listen on 0.0.0.0:${PORT}"

# Test NGINX configuration
nginx -t

EOF

RUN chmod +x /etc/cont-init.d/99-configure-nginx

# Configure s6-overlay service for Inertia SSR
RUN mkdir -p /etc/s6-overlay/s6-rc.d/inertia-ssr

# Set service type as longrun
RUN echo "longrun" > /etc/s6-overlay/s6-rc.d/inertia-ssr/type

# Create dependencies file to ensure SSR starts after PHP-FPM and Nginx
RUN echo -e "php-fpm\nnginx" > /etc/s6-overlay/s6-rc.d/inertia-ssr/dependencies

# Create run script for the SSR service
RUN cat > /etc/s6-overlay/s6-rc.d/inertia-ssr/run <<'EOF'
#!/command/with-contenv sh
echo "Starting Inertia SSR server..."
cd /var/www/html
exec s6-setuidgid www-data php artisan inertia:start-ssr
EOF

RUN chmod +x /etc/s6-overlay/s6-rc.d/inertia-ssr/run

# Add service to user bundle (empty file to register service)
RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/inertia-ssr

USER www-data
