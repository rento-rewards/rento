# ----------------------------
# Stage 1: Build Node SSR assets
# ----------------------------
FROM node:20-alpine AS node-build

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package-*.json ./
RUN npm install

# Copy application files
COPY resources resources
COPY tsconfig.json vite.config.ts ./

# Build SSR bundle
RUN npm run build:ssr

# ----------------------------
# Stage 2: Build Laravel app
# ----------------------------
FROM php:8.3-fpm-alpine AS php-build

# Install PHP extensions
RUN apk add --no-cache \
    bash git curl \
    libzip-dev zip unzip \
    oniguruma-dev \
    sqlite sqlite-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring zip \

# Set working directory
WORKDIR /var/www/html

# Copy composer.json and install deps
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --optimize-autoloader --no-dev

COPY . .

COPY --from=node-build /app/public/build ./public/build
COPY --from=node-build /app/bootstrap/ssr ./bootstrap/ssr

RUN chown -R nobody:nogroup storage bootstrap/cache \
 && chmod -R u+rwX,go+rX storage bootstrap/cache

# Copy startup script
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 8080

# Start migrations, SSR, and PHP-FPM
CMD ["/usr/local/bin/start.sh"]
