# Docker Configuration Files

This directory contains configuration files used by the Docker container.

## Files

### nginx.conf

Nginx web server configuration for serving the Laravel application.

**Key settings:**

- Listens on port 8000
- Document root: `/var/www/html/public`
- PHP-FPM FastCGI connection on port 9000
- Gzip compression enabled
- Max upload size: 20MB
- Allows `.well-known` directory (for SSL verification, etc.)
- Denies access to hidden files

### supervisord.conf

Supervisor configuration for managing multiple processes in a single container.

**Processes managed:**

- `php-fpm`: PHP FastCGI Process Manager
- `nginx`: Nginx web server

Both processes output logs to stdout/stderr for Docker log collection.

### start.sh

Container startup script that runs before the main application starts.

**Startup sequence:**

1. Run database migrations
2. Cache Laravel configuration, routes, and views
3. Start Supervisor (which manages nginx and php-fpm)

## Modifying Configuration

To modify these files:

1. Edit the file in this directory
2. Rebuild the Docker image:
    ```bash
    docker-compose build
    # or
    docker build -t rento:latest .
    ```

## Environment-Specific Configuration

These files are optimized for production. For different environments:

- **Development**: Use `docker-compose.yml` which can override these settings
- **Staging**: Create separate config files if needed
- **Production**: These files are ready to use as-is

## Troubleshooting

### View Nginx configuration in container

```bash
docker-compose exec app cat /etc/nginx/nginx.conf
```

### View Supervisor configuration

```bash
docker-compose exec app cat /etc/supervisor/conf.d/supervisord.conf
```

### Check Nginx syntax

```bash
docker-compose exec app nginx -t
```

### View process status

```bash
docker-compose exec app supervisorctl status
```

### Restart processes

```bash
docker-compose exec app supervisorctl restart all
# or individually
docker-compose exec app supervisorctl restart nginx
docker-compose exec app supervisorctl restart php-fpm
```
