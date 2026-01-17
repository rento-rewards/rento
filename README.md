# Rento

A modern rental management platform built with Laravel and React.

## Features

- User authentication and authorization
- Lease management
- Reporting and analytics
- Payment processing with Stripe
- Email notifications via Resend
- File storage with AWS S3
- Interactive maps with Mapbox
- Interac integration for Canadian payments

## Tech Stack

### Backend

- **Framework**: Laravel 12
- **Language**: PHP 8.2+
- **Database**: PostgreSQL (production) / SQLite (development)
- **Queue**: Database driver
- **Cache**: Database driver

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS 4
- **State Management**: Inertia.js

### Third-Party Services

- **Payments**: Stripe (with Laravel Cashier)
- **Email**: Resend
- **Storage**: AWS S3
- **Maps**: Mapbox
- **Documentation**: Notion API
- **Canadian Payments**: Interac

## Requirements

- PHP 8.2 or higher
- Composer
- Node.js 18+ (see .nvmrc)
- pnpm or npm
- PostgreSQL (production) or SQLite (development)

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd rento
```

### 2. Install dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
pnpm install
# or
npm install
```

### 3. Environment configuration

```bash
# Copy the example environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database setup

```bash
# For SQLite (default in development)
touch database/database.sqlite

# Run migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed
```

### 5. Configure environment variables

Edit `.env` and set up the following:

```env
APP_NAME=Rento
APP_URL=http://localhost:8000

# Database (SQLite for development)
DB_CONNECTION=sqlite

# Stripe
STRIPE_KEY=your_stripe_key
STRIPE_SECRET=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CASHIER_CURRENCY=cad

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
MAIL_FROM_ADDRESS=noreply@yourdomain.com

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_bucket_name

# Mapbox
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Notion (for legal pages)
NOTION_API_TOKEN=your_notion_token
NOTION_PRIVACY_POLICY_PAGE_ID=page_id
NOTION_TERMS_OF_SERVICE_PAGE_ID=page_id

# Interac
INTERAC_CLIENT_ID=your_client_id
INTERAC_SCOPES=your_scopes
INTERAC_JWT_KID=your_jwt_kid
```

### 6. Start development server

```bash
# Start all services (Laravel, Queue Worker, Logs, Vite)
composer dev

# Or start services individually:
php artisan serve          # Laravel server
php artisan queue:work     # Queue worker
npm run dev                # Vite dev server
```

Visit http://localhost:8000

## Building for Production

```bash
# Build frontend assets
pnpm build

# Optimize Laravel
php artisan optimize
```

## Testing

```bash
# Run all tests
composer test

# Or use PHPUnit directly
php artisan test
```

## Code Quality

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check

# Lint and fix
pnpm lint

# Type check
pnpm types
```

## Deployment to Render.com

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

## Project Structure

```
app/
├── Casts/          # Custom Eloquent casts
├── Data/           # Data Transfer Objects (Spatie Laravel Data)
├── Enums/          # PHP Enums
├── Features/       # Feature flags (Laravel Pennant)
├── Http/           # Controllers, Middleware, Requests
├── Models/         # Eloquent models
├── Policies/       # Authorization policies
├── Providers/      # Service providers
├── Services/       # Business logic services
└── Socialite/      # OAuth providers

resources/
├── css/           # Stylesheets
├── js/            # React components and TypeScript
└── views/         # Blade templates (minimal, mostly Inertia)

routes/
├── auth.php        # Authentication routes
├── console.php     # Artisan commands
├── leases.php      # Lease management routes
├── reports.php     # Reporting routes
├── settings.php    # Settings routes
├── verification.php # Email verification routes
└── web.php         # Main web routes
```

## Key Commands

```bash
# Development
composer dev              # Start all dev services
composer dev:ssr          # Start with SSR

# Database
php artisan migrate       # Run migrations
php artisan db:seed       # Seed database
php artisan migrate:fresh --seed  # Fresh database with seeds

# Queue
php artisan queue:work    # Process queue jobs
php artisan queue:listen  # Process with auto-reload

# Cache
php artisan cache:clear   # Clear application cache
php artisan config:clear  # Clear config cache
php artisan route:clear   # Clear route cache
php artisan view:clear    # Clear compiled views

# Optimization
php artisan optimize      # Optimize for production
php artisan optimize:clear # Clear optimizations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
