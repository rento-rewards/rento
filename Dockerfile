FROM php:8.4-fpm

# 1. Install system dependencies and Node.js
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && npm install -g pnpm \
    && rm -rf /var/lib/apt/lists/*

# 2. Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd
RUN docker-php-ext-install zip
RUN docker-php-ext-install opcache
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath

# 3. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Set working directory
WORKDIR /var/www/html

# 5. Copy application files
COPY . .

# 6. Copy and make entrypoint script executable
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# 7. Install PHP dependencies (ignore platform requirements for cross-platform compatibility)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 8. Install Node dependencies and build assets
RUN pnpm install --frozen-lockfile && pnpm run build

# 9. Clean up to reduce image size
RUN rm -rf node_modules /root/.npm /root/.local/share/pnpm

# 10. Set proper permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 11. Production optimizations (skip config:cache to allow runtime env vars)
RUN php artisan route:cache && php artisan view:cache

# 12. Expose port (Render will use PORT env variable)
EXPOSE 10000

# 13. Use entrypoint script
CMD ["/usr/local/bin/entrypoint.sh"]
