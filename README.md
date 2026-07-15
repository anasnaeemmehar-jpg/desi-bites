# DesiBites 🍛

A full-stack desi food ordering platform: a customer-facing menu & checkout site, an admin dashboard for managing products/orders, and a REST API backend.

## Stack

- **Frontend (customer site):** React + Vite, plain CSS
- **Admin panel:** Separate React + Vite app
- **Backend:** Node.js + Express
- **Database:** SQLite (via `better-sqlite3`) — zero setup, single file, easy to swap for MySQL/Postgres later
- **Auth:** JWT for admin login

## Project structure

```
DESI-BITES/
├── frontend/     # Customer-facing site (menu, cart, checkout, order tracking)
├── admin/        # Admin dashboard (products, categories, orders, customers)
├── backend/      # Express API + SQLite database logic
├── database/     # SQL schema + seed data (desibites.sql), generated .db file
└── package.json  # Root scripts to run everything together
```

## Getting started

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

This installs dependencies for `backend/`, `frontend/`, and `admin/` in one go.

### 2. Set up environment variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set a real `JWT_SECRET` before deploying anywhere public.

### 3. Seed the database

```bash
npm run seed
```

This creates `database/desibites.db`, loads the schema + sample categories/products, and creates a default admin account:

- **Email:** `admin@desibites.com`
- **Password:** `admin123`

> Change this password immediately if you deploy this anywhere real.

### 4. Run everything

```bash
npm run dev
```

This starts all three services together:

| Service  | URL                     |
|----------|--------------------------|
| Backend API | http://localhost:5000 |
| Customer site | http://localhost:5173 |
| Admin panel | http://localhost:5174 |

Or run them individually: `npm run dev:backend`, `npm run dev:frontend`, `npm run dev:admin`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a full step-by-step guide to deploying this for free: backend on Render (with a persistent disk so the SQLite database and uploaded images survive redeploys), and the customer site + admin panel on Vercel.

## Key features

**Customer site**
- Browse menu by category, search dishes
- Product detail pages with quantity selector
- Cart (persisted in session storage)
- Checkout with delivery details, COD/card payment
- Order tracking by order ID with a visual status timeline

**Admin panel**
- JWT-protected login
- Dashboard with order/revenue/customer stats
- Full CRUD on products (with image upload) and categories
- Order management: filter by status, update status, view line items
- Customer list

**Backend API**
- RESTful endpoints under `/api/*`
- Public endpoints: browse products/categories, place orders, track orders
- Protected (admin-only) endpoints: manage products/categories, view/update orders, manage customers
- File uploads via `multer`, served from `/uploads`

## Notes on the database

The schema lives in `database/desibites.sql`. On first run, the backend automatically creates `database/desibites.db` from this file and seeds sample data. If you want to reset everything, just delete `database/desibites.db` and restart the backend (or run `npm run seed` again).

To switch to MySQL or Postgres later, the schema in `desibites.sql` is close to standard SQL — you'd mainly need to swap out `backend/config/database.js` and the query syntax in `backend/models/*.js` (better-sqlite3's synchronous API would become async).

## Printer integration

`backend/config/printer.js` is currently a stub that logs a simulated receipt to the console whenever an order is placed. Real thermal/receipt printer support (e.g. via `node-thermal-printer` and ESC/POS commands) needs a printer reachable from wherever the backend runs — typically a local network printer rather than a cloud-hosted one.
