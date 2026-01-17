# Deployment Guide - Render.com

This guide will walk you through deploying the Rento application to Render.com using Docker.

## Prerequisites

- A Render.com account
- GitHub repository with your code
- Required API keys and credentials for third-party services

## Manual Deployment

If you prefer to set up services manually, follow these steps:

## Architecture on Render

You'll need to create the following services:

1. **PostgreSQL Database** - Production database
2. **Web Service** - Laravel application (Docker)
3. **Background Worker** - Queue processor (Docker)

## Step 1: Create PostgreSQL Database

1. Log in to Render.com dashboard
2. Click "New +" and select "PostgreSQL"
3. Configure:
    - **Name**: `rento-db` (or your preferred name)
    - **Database**: `rento`
    - **User**: `rento_user` (auto-generated)
    - **Region**: Choose closest to your users
    - **Plan**: Choose based on your needs (Free tier available)
4. Click "Create Database"
5. Save the **Internal Database URL** - you'll need this later

## Step 2: Create Web Service

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Configure the service:

### Basic Settings

- **Name**: `rento-app`
- **Region**: Same as your database
- **Branch**: `main` (or your production branch)
- **Root Directory**: Leave empty
- **Runtime**: `Docker` or `Native Environment`

### Build & Deploy Settings

**Runtime**: Docker

- **Dockerfile Path**: `./Dockerfile`
- Render will automatically detect and use the Dockerfile
- No build or start commands needed (handled by Dockerfile)

### Environment Variables

Add the following environment variables in Render dashboard:

#### Application Settings

```bash
APP_NAME=Rento
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.onrender.com
APP_KEY=  # Generate with: php artisan key:generate --show
```

#### Database

```bash
DB_CONNECTION=pgsql
DB_URL=  # Use the Internal Database URL from Step 1
# Or set individually:
DB_HOST=
DB_PORT=5432
DB_DATABASE=rento
DB_USERNAME=
DB_PASSWORD=
```

#### Session & Cache

```bash
SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=s3
```

#### AWS S3 (Required for file uploads)

```bash
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_bucket_name
AWS_USE_PATH_STYLE_ENDPOINT=false
```

#### Email (Resend)

```bash
MAIL_MAILER=resend
RESEND_API_KEY=your_resend_api_key
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME=Rento
```

#### Stripe

```bash
STRIPE_KEY=your_stripe_publishable_key
STRIPE_SECRET=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CASHIER_CURRENCY=cad
```

#### Mapbox

```bash
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

#### Notion (for legal pages)

```bash
NOTION_API_TOKEN=your_notion_token
NOTION_PRIVACY_POLICY_PAGE_ID=your_page_id
NOTION_TERMS_OF_SERVICE_PAGE_ID=your_page_id
```

#### Interac

```bash
INTERAC_CLIENT_ID=your_client_id
INTERAC_SCOPES=your_scopes
INTERAC_REDIRECT_URI=https://your-app.onrender.com/interac/callback
INTERAC_JWKS_URL=https://your-app.onrender.com/.well-known/jwks.json
INTERAC_JWT_KID=your_jwt_kid
```

#### Logging

```bash
LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=error
```

4. Click "Create Web Service"

## Step 3: Background Worker (Queue)

Since this application uses queues, you need to set up a background worker:

1. Click "New +" and select "Background Worker"
2. Connect the same repository
3. Configure:
    - **Name**: `rento-worker`
    - **Region**: Same as web service
    - **Branch**: Same as web service
    - **Runtime**: Docker
    - **Dockerfile Path**: `./Dockerfile`
    - **Docker Command**: `php artisan queue:work --tries=3 --timeout=90 --sleep=3`
4. Add the same environment variables as the web service
5. Click "Create Background Worker"

## Step 4: Custom Domain (Optional)

1. Go to your web service settings
2. Click "Custom Domain"
3. Add your domain and follow DNS configuration instructions
4. Update `APP_URL` environment variable to your custom domain
5. Update callback URLs (e.g., `INTERAC_REDIRECT_URI`, `INTERAC_JWKS_URL`)

## Step 5: Set Up Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-app.onrender.com/stripe/webhook`
3. Select events to listen for (e.g., `payment_intent.succeeded`, `customer.subscription.updated`)
4. Copy the webhook signing secret
5. Update `STRIPE_WEBHOOK_SECRET` in Render environment variables
6. Redeploy the service

## Step 6: Configure Health Checks

The application includes a `/health` endpoint for health checks.

In Render dashboard, configure:

- **Health Check Path**: `/health`

The Docker container also includes a built-in health check that runs every 30 seconds.

## Post-Deployment Checklist

- [ ] Database migrations ran successfully
- [ ] Application is accessible via URL
- [ ] Queue worker is running
- [ ] Stripe webhooks are receiving events
- [ ] File uploads to S3 are working
- [ ] Email sending is working
- [ ] Maps are displaying correctly
- [ ] SSL certificate is active
- [ ] Custom domain is configured (if applicable)
- [ ] Error tracking is set up (consider Sentry or similar)
- [ ] Docker health checks are passing

## Monitoring

### Logs

View logs in Render dashboard:

- Web Service logs: Application requests and errors
- Background Worker logs: Queue job processing

### Performance

- Monitor response times in Render dashboard
- Set up alerts for downtime

### Database

- Monitor database size and connection count
- Set up automatic backups in PostgreSQL settings

## Scaling

### Vertical Scaling

Upgrade your instance size in Render dashboard if you need more resources.

### Horizontal Scaling

For the web service, you can increase the number of instances in settings.

For queue workers, you can:

1. Increase the number of background workers
2. Or run multiple processes: `php artisan queue:work --tries=3 --sleep=3 --max-jobs=1000`

## Troubleshooting

### Application Key Error

Generate a key locally and set it as environment variable:

```bash
php artisan key:generate --show
```

### 500 Internal Server Error

1. Enable debug temporarily: Set `APP_DEBUG=true`
2. Check logs in Render dashboard
3. Verify all environment variables are set
4. Ensure database migrations ran successfully

### Queue Jobs Not Processing

1. Check background worker logs
2. Verify `QUEUE_CONNECTION=database` is set
3. Restart the background worker service

### File Upload Issues

1. Verify AWS credentials
2. Check S3 bucket permissions
3. Ensure `FILESYSTEM_DISK=s3` is set

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check if database service is running
3. Ensure web service and database are in the same region

## Zero-Downtime Deployments

Render automatically performs zero-downtime deployments for web services. However:

1. Database migrations may cause brief downtime
2. Consider using feature flags (Laravel Pennant) for new features
3. Test thoroughly in a staging environment first

## Backup Strategy

### Database Backups

- Render PostgreSQL plans include automatic daily backups
- You can also manually create backups in the database settings
- Consider setting up automated backups to S3 using Laravel:

```bash
# Add to your scheduler in app/Console/Kernel.php
$schedule->command('backup:run')->daily();
```

### File Backups

Your files are on S3, which has built-in redundancy. Enable versioning on your S3 bucket for additional protection.

## Cost Estimation

Typical monthly costs on Render:

- Web Service: $7-$25/month (depending on plan)
- PostgreSQL: $7-$20/month (depending on plan)
- Background Worker: $7/month
- Bandwidth: Additional charges may apply

Plus external services:

- AWS S3: ~$0.023/GB/month
- Stripe: Transaction fees
- Resend: Based on email volume
- Mapbox: Based on map loads

## Support

If you encounter issues:

1. Check Render documentation: https://render.com/docs
2. Check application logs in Render dashboard
3. Review Laravel logs: `storage/logs/laravel.log`
4. Contact Render support: https://render.com/support
