# MERN E‑Commerce

A modern full‑stack e‑commerce application built with the MERN stack (MongoDB, Express, React, Node.js), Zustand for state management, TailwindCSS for styling, and Stripe + Cloudinary integrations. The app supports browsing products, product details, cart and checkout, admin features (create/edit/delete, feature toggling), analytics, coupons, and authentication.

## Tech Stack

- Frontend: React (Vite), Zustand, React Router, TailwindCSS, Framer Motion, Lucide Icons, Axios
- Backend: Node.js, Express.js, MongoDB (Mongoose), Redis (caching), Cloudinary (images), Stripe (payments), Cookie-based auth (JWT)
- Tooling: ESLint, Vite, PostCSS

## Project Structure

```
.
├── backend
│   ├── controllers
│   │   ├── analytics.controller.js
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── coupon.controller.js
│   │   ├── payment.controller.js
│   │   └── product.controller.js
│   ├── lib
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── stripe.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── models
│   │   ├── coupon.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes
│   │   ├── analytics.route.js
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── coupon.route.js
│   │   ├── payment.route.js
│   │   └── product.route.js
│   └── server.js
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── public
│   └── src
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components
│       ├── contexts
│       ├── lib
│       │   └── axios.js
│       ├── pages
│       └── stores
├── .env
├── package.json
└── README.md
```

## Features

- Public product catalog with filters/search/sort and grid/list views
- Product detail page with images, options, and add-to-cart
- Cart and checkout flow (Stripe)
- User authentication (sign up, login), protected routes
- Admin dashboard: create, edit, delete, toggle featured products
- Analytics dashboard
- Coupons support
- Redis caching for featured products
- Cloudinary image uploads
- Dark/light theme via ThemeContext

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional for featured cache, recommended)
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### Environment Variables

Use `.env.example` as a reference and create a `.env` file in the project root.

Typical variables:
```
# Server
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-ecommerce

# JWT/Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

The frontend Axios baseURL is configured in `frontend/src/lib/axios.js`:
- Development: `http://localhost:5000/api`
- Production: `/api`

Ensure your backend runs on port 5000 in development, or adjust the baseURL accordingly.

### Installation

From the repo root:

1) Install backend dependencies:
```
npm install
```

2) Install frontend dependencies:
```
cd frontend
npm install
```

### Running Locally

In two terminals:

1) Backend:
```
npm run server
```
or if not present, use:
```
node backend/server.js
```
You should see:
```
Server is running on http://localhost:5000
```

2) Frontend (in ./frontend):
```
npm run dev
```
Vite will serve the app at (default):
```
http://localhost:5173
```

Open http://localhost:5173 in the browser.

### Production Build

- Build frontend:
```
cd frontend
npm run build
```
- In production `backend/server.js` serves `frontend/dist` when `NODE_ENV=production`.

Optionally, use a process manager like PM2 for the backend in production.

## API Overview

Base URL:
- Development: `http://localhost:5000/api`
- Production: `/api`

Auth:
- POST `/auth/signup`
- POST `/auth/login`
- GET `/auth/me`

Products:
- GET `/products`               → Public list of products (updated to be public)
- GET `/products/featured`      → Public featured list (cached by Redis)
- GET `/products/category/:category` → Public products by category
- POST `/products`              → Admin only (create)
- PATCH `/products/:id`         → Admin only (toggle featured)
- DELETE `/products/:id`        → Admin only (delete)

Cart:
- `/cart` (protected)

Coupons:
- `/coupons` (admin create; redemption in checkout)

Payments:
- `/payments/*` (Stripe integration)

Analytics:
- `/analytics/*` (admin)

## Frontend Pages

- `/` Home: highlights featured products, CTA to /products
- `/products` ProductsPage.jsx: search/filter/sort and list products
- `/products/:id` ProductDetailPage.jsx: product details and add-to-cart
- `/cart` CartPage.jsx: cart overview
- `/admin` AdminPage.jsx: product management (uses CreateProductForm, EditProductForm, ProductsList)
- `/login`, `/signup` Auth pages
- `/success`, `/cancel` post-purchase pages

## Important Implementation Notes

- Products listing endpoint is PUBLIC:
  - backend/routes/product.route.js: `router.get("/", getAllProducts);`
- Frontend fetch alignment:
  - ProductsPage.jsx uses `axios.get("/products")`.
  - ProductDetailPage.jsx should also fetch from `/products` (replace any `/products/all` references).

- Zustand stores:
  - `frontend/src/stores/useProductStore.js` exposes fetchers:
    - `fetchAllProducts()` GET `/products`
    - `fetchFeaturedProducts()` GET `/products/featured`
    - Prefer using store methods to centralize logic and loading state.

- Axios:
  - `frontend/src/lib/axios.js` creates an instance with `baseURL` and `withCredentials` for cookie auth.

- TailwindCSS + Theme:
  - `ThemeContext.jsx` provides `classes` and `colors` tokens used by components.
  - Be mindful with dynamic class names like `text-${colors.primary}` to ensure Tailwind safelist covers dynamic tokens if necessary.

## Seeding Data (Optional)

If your database is empty, the UI will show “No products found”. You can create products via:
- Admin page (requires an admin user), or
- API call:
```
POST http://localhost:5000/api/products
Content-Type: application/json
{
  "name": "Sample Product",
  "description": "High quality product",
  "price": 49.99,
  "image": "https://via.placeholder.com/600",
  "category": "clothing"
}
```
Ensure you have admin auth cookies for the request (or temporarily allow creation for testing only, not recommended for production).

## Common Issues & Debugging

- /products shows nothing:
  - Ensure backend route is public (as above).
  - Check Network tab for `GET /api/products` → status 200 and JSON `{ products: [...] }`.
  - If empty array, seed products as described.

- CORS/auth:
  - Axios uses `withCredentials: true`. Ensure the backend sets proper CORS headers if you enable CORS. Currently same-origin dev setup (5173 → 5000) typically needs CORS; add `cors` middleware if required.

- Images not appearing:
  - If using Cloudinary, validate environment variables.
  - For local testing, you can set a static image URL.

- Stripe webhook (if used):
  - Requires a public URL or local tunneling (e.g., `stripe listen`).

## Scripts

Root:
- `npm run server` (if defined) – starts backend server

Frontend:
- `npm run dev` – Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build

## Security

- Keep JWT secret safe.
- Restrict admin routes with `protectRoute, adminRoute`.
- Validate and sanitize inputs on create/edit product.
- Never commit real secrets to version control.

## License

MIT

## Acknowledgments

Based on a MERN e‑commerce reference implementation. Icons by Lucide. Animations by Framer Motion. Deployed with love by the team.
