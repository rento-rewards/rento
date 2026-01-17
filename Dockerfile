FROM dunglas/frankenphp:latest

# 1. Install Node.js & pnpm (Debian-based)
RUN apt-get update && apt-get install -y nodejs npm \
    && npm install -g pnpm \
    && rm -rf /var/lib/apt/lists/*

# 2. Install PHP extensions for Laravel
RUN install-php-extensions pdo_pgsql gd intl zip opcache pcntl bcmath

# 3. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# 4. Build Everything
# pnpm run build can now find 'php artisan' because it's in the same image
RUN composer install --no-dev --optimize-autoloader
RUN pnpm install --frozen-lockfile && pnpm run build

# 5. Clean up to reduce image size (Optional but recommended)
RUN rm -rf node_modules /root/.npm /root/.local/share/pnpm

# 6. Production Optimization
RUN php artisan config:cache && php artisan route:cache

ENV SERVER_NAME=:80
ENV APP_RUNTIME=Laravel\Octane\FrankenPHP\Runtime

CMD ["frankenphp", "php-server", "--listen", "0.0.0.0:${PORT:-10000}", "--root", "public/"]
