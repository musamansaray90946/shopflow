# ShopFlow — Full-Stack E-Commerce Store

A production-quality e-commerce application with real Stripe payments, admin panel, and full shopping experience.

## Live Demo
Coming soon

## Features
- Browse products with search and category filters
- Shopping cart with quantity controls
- User registration and login with JWT authentication
- Real Stripe checkout with test payments
- Order confirmation and history
- Admin panel to add and delete products
- Responsive design — works on mobile

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Stripe.js

**Backend**
- Node.js + Express
- JWT Authentication
- Stripe Payments API
- REST API

**Database**
- PostgreSQL (Supabase)
- Prisma ORM

## Test Payment
Use Stripe test card: `4242 4242 4242 4242` with any future expiry and CVC

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/musamansaray90946/shopflow.git
cd shopflow
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Create `server/.env`:
5. Generate Prisma client
```bash
cd server
npx prisma generate
```

6. Run servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```