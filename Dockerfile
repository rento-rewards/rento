# Production-ready Docker image for Laravel + React
FROM php:8.2-fpm-alpine

# Install system dependencies including Node.js for build
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

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /var/www/html

# Copy package files and install frontend dependencies
COPY package.json package-lock.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source files needed for frontend build
COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json ./
COPY components.json ./
COPY eslint.config.js .prettierrc .prettierignore ./

# Build frontend assets
RUN pnpm build

# Remove node_modules to save space (not needed at runtime)
RUN rm -rf node_modules

# Copy composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --optimize-autoloader

# Copy remaining application files
COPY . .

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
