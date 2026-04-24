# Monorepo_react_node

A fullstack template with:
- Express + TypeScript API
- React + TypeScript frontend (Vite)
- Postgres schema for users, permissions, sessions, categories, and products

## First-Time Setup

### 1) Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop (recommended) or local Postgres

### 2) Install dependencies

```bash
pnpm install
```

### 3) Configure environment

Create both env files:

```bash
cp .env.example .env
cp .env.example apps/api/.env
```

### 4) Configure database

Use one of the following options.

#### Option A: Docker Postgres (recommended)

```bash
docker-compose up -d
```

Use this in both `.env` and `apps/api/.env`:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/template_auth_catalog
```

#### Option B: Local Postgres

If your local Postgres does not have the `postgres` role, use your local role in `DATABASE_URL`.

Example:

```env
DATABASE_URL=postgres://<your_local_role>@localhost:5432/template_auth_catalog
```

Create the database if needed:

```bash
createdb template_auth_catalog
```

### 5) Run migration and seed

```bash
pnpm --filter @template/api db:migrate
pnpm --filter @template/api db:seed
```

Expected output includes:
- `Applied migration: 001_init.sql`
- `Seed completed`

### 6) Start apps

```bash
pnpm dev
```

- API: `http://localhost:3001`
- Client: `http://localhost:5173`

### 7) Quick API checks

Register:

```bash
curl -sS 'http://localhost:3001/auth/register' \
  -H 'Content-Type: application/json' \
  --data-raw '{"fullName":"asd","email":"asd@asd.asd","password":"Asd123!!"}'
```

Login:

```bash
curl -sS 'http://localhost:3001/auth/login' \
  -H 'Content-Type: application/json' \
  --data-raw '{"email":"asd@asd.asd","password":"Asd123!!"}'
```

## Troubleshooting

- `role "postgres" does not exist`
  - Your `DATABASE_URL` is using a DB role that does not exist in the running Postgres instance.
  - Either run Docker Postgres (`postgres:postgres`) or change `DATABASE_URL` to your local role.

- `database "template_auth_catalog" does not exist`
  - Create it with `createdb template_auth_catalog`.

- Env changes not applied
  - Restart `pnpm dev` after editing `.env` files.

## Default Admin

- Email: `admin@example.com`
- Password: `Admin123!`

## API Routes

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /categories`
- `GET /categories/:id`
- `GET /categories/:id/products`
- `GET /products`
- `GET /products/:id`

Write routes require permissions:
- `POST/PATCH/DELETE /categories` -> `category.write`
- `POST/PATCH/DELETE /products` -> `product.write`
