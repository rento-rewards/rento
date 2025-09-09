FROM php:8.2-fpm-alpine AS php-build

# Install system dependencies
RUN apk add --no-cache bash git curl zip unzip oniguruma-dev libzip-dev sqlite sqlite-dev nodejs npm \
  && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath ffi

# Enable PHP extensions
RUN echo "ffi.enable=true" > /usr/local/etc/php/conf.d/ffi.ini

WORKDIR /var/www/html

# Install composer
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
 && composer install --no-dev --optimize-autoloader

# Install npm dependencies and build assets
COPY package.json package-lock.json ./
RUN npm install

# Build the application
COPY . .
RUN npm run build:ssr \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

# Copy startup script
COPY docker/start.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start.sh

# Expose main HTTP port for DigitalOcean App Platform
EXPOSE 8080

# Start migrations, SSR, PHP-FPM
CMD ["/usr/local/bin/start.sh"]
