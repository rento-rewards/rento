# Multi-stage build for optimized production image

# Stage 1: Build frontend assets
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json pnpm-lock.yaml* ./

# Enable corepack and install dependencies
RUN corepack enable && \
    pnpm install --frozen-lockfile

# Copy source files needed for build
COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json ./
COPY components.json ./
COPY eslint.config.js .prettierrc .prettierignore ./

# Build frontend assets
RUN pnpm build

# Stage 2: PHP application
FROM php:8.2-fpm-alpine AS production

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    postgresql-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure PHP for production
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Custom PHP configuration
RUN echo "opcache.enable=1" >> $PHP_INI_DIR/conf.d/opcache.ini && \
    echo "opcache.memory_consumption=256" >> $PHP_INI_DIR/conf.d/opcache.ini && \
    echo "opcache.interned_strings_buffer=16" >> $PHP_INI_DIR/conf.d/opcache.ini && \
    echo "opcache.max_accelerated_files=10000" >> $PHP_INI_DIR/conf.d/opcache.ini && \
    echo "opcache.revalidate_freq=0" >> $PHP_INI_DIR/conf.d/opcache.ini && \
    echo "opcache.validate_timestamps=0" >> $PHP_INI_DIR/conf.d/opcache.ini

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies (without dev dependencies)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --optimize-autoloader

# Copy application files
COPY . .

# Copy built frontend assets from builder stage
COPY --from=frontend-builder /app/public/build ./public/build

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-dev

# Create storage and cache directories
RUN mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy Docker configuration files
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/start.sh /usr/local/bin/start.sh

# Make startup script executable
RUN chmod +x /usr/local/bin/start.sh

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["/usr/local/bin/start.sh"]
