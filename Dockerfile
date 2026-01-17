FROM php:8.3-apache

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

# 2. Configure and install PHP extensions one by one
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd
RUN docker-php-ext-install zip
RUN docker-php-ext-install opcache
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath

# 3. Enable Apache mod_rewrite
RUN a2enmod rewrite

# 4. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Set working directory
WORKDIR /var/www/html

# 6. Copy application files
COPY . .

# 7. Install PHP dependencies (ignore platform requirements for cross-platform compatibility)
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs

# 8. Install Node dependencies and build assets
RUN pnpm install --frozen-lockfile && pnpm run build

# 9. Clean up to reduce image size
RUN rm -rf node_modules /root/.npm /root/.local/share/pnpm

# 10. Set proper permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 11. Configure Apache DocumentRoot
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 12. Production optimizations
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

# 13. Expose port
EXPOSE 80

# 14. Start Apache
CMD ["apache2-foreground"]
