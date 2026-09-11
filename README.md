# Sports Court Rental

Laravel 12 REST API for booking sports courts. Backend only.

## Requirements

Docker Desktop. Nothing else — PHP, Composer, and MySQL all run inside containers.

## Getting started

```bash
git clone <repo-url>
cd iznajmljivanje-terena/back
./setup.sh
```

`setup.sh` builds the images, starts the stack, waits for the API, and runs the test suite. On the first run the container creates `.env` from `.env.example`, generates an application key, waits for MySQL, and applies all migrations.

| Service | URL |
|---|---|
| API | http://localhost:8000 |
| API documentation | http://localhost:8000/docs/api |
| phpMyAdmin | http://localhost:8080 |
| MySQL from the host | localhost:3307 |

Database credentials for local development are in `.env.example`: database `tereni`, user `tereni`, password `tereni_pass`.

## Everyday commands

Run from `back/`:

```bash
docker compose up -d
docker compose down
docker compose logs -f app

docker compose exec app php artisan migrate
docker compose exec app php artisan test
docker compose exec app php artisan tinker
docker compose exec app composer require <package>
```

After `composer require`, rebuild so the package is baked into the image:

```bash
docker compose build app
```

## Stack

Laravel 12.69 · PHP 8.3 · MySQL 8 · Laravel Sanctum · Pest 4 · Scramble

Tests run against sqlite in-memory and never touch the development database.

## Project layout

```
back/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Mail/
│   ├── Models/
│   └── Services/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/api.php
└── tests/
```
