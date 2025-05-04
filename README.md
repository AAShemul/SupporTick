# SupporTick

A modern lightweight support ticket system for startups, built with Laravel and React.js.

## Project Setup

1. Clone the repo
2. Run `composer install`
3. Run `php artisan migrate --seed`
4. Copy `.env.example` to `.env` and update database credentials
5. Run `php artisan key:generate`
6. Build frontend: `npm install && npm run build` (done locally)
7. Upload `/public` contents to hosting root (e.g., `public_html`)

## Demo

- [Visit here](https://supportick.shikkhaweb.com)

For admin:

- Email: admin@admin.admin
- Password: admin@admin.admin

For user:

- Email: test@test.test
- Password: test@test.test

## Features

- Laravel 12 with Sanctum
- React.js (via Laravel mix)
- Tailwind CSS
- Dark and Light mode
- MySQL
- Motion (for animations)

## How to Use

- Users can register, login, and submit support tickets.
- Admins can log in to `/admin/dashboard` and manage tickets.

## Roles

- Users: can create, view, and post replies to their own tickets.
- Admins: can view all tickets, update statuses, and filter by category.

## Security Practices

- Input sanitized via Laravel's validation
- Output escaped with Blade
- JWT used for frontend auth (stored securely in `localStorage`)
- CSRF protection active
- Sanctum is used for authentication.
