# CampusCart E-Commerce Platform

CampusCart is a full-stack, responsive, and secure MERN (MongoDB, Express, React, Node.js) e-commerce application tailored for college students.

## Features

- **Full User Authentication:** JWT-based auth with secure, HTTP-only cookies.
- **Product Catalog:** Browse products, pagination, search, filter by category.
- **Product Details:** High-quality image gallery, reviews, and stock indicators.
- **Cart & Checkout:** Persistent server-side shopping cart with multi-step checkout.
- **Order Management:** Users can view order history and details.
- **Admin Dashboard:** Role-based authorization for admins to manage products, view orders and users.
- **Responsive Design:** Built with Tailwind CSS to look great on mobile, tablet, and desktop.
- **Security:** Password hashing, route protection, error handling.

## Tech Stack

- **Frontend:** React, Vite, React Router, Tailwind CSS, Axios, Lucide React
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs

## Folder Structure

```
campuscart/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React Context (Auth, Cart)
│   │   ├── pages/      # Route pages
│   │   └── ...
├── backend/            # Express backend application
│   ├── config/         # DB and environment config
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth and error middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   └── ...
```

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally on `mongodb://localhost:27017` or a MongoDB URI)

### 1. Clone the repository
```bash
git clone <repo_url>
cd campuscart
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (copy from `.env.example`):
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/campuscart
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 3. Database Seeding
To populate the database with sample products and a demo admin account:
```bash
npm run seed
```
**Demo Admin Account:**
- Email: admin@example.com
- Password: password123

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

### 5. Running the Application

You can run both servers simultaneously using concurrent scripts (if configured) or run them in separate terminals.

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

## API Overview

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Products:** `GET /api/products`, `GET /api/products/:id`
- **Cart:** `GET /api/cart`, `POST /api/cart`, `DELETE /api/cart/:itemId`
- **Orders:** `POST /api/orders`, `GET /api/orders/:id`

## Deployment

### Backend
1. Set environment variables on your hosting provider (e.g., Render, Heroku).
2. Ensure `NODE_ENV` is set to `production`.
3. Set the build command to `npm install` and start command to `node server.js`.

### Frontend
1. Change the API URL proxy in Vite or configure Axios base URL for production.
2. Build the project using `npm run build`.
3. Deploy the `dist` folder to a static host (e.g., Vercel, Netlify).

## Test Payment Information
In development mode, a mock payment flow is implemented. Select "Credit Card (Test Mode)" during checkout to bypass real payment gateways. No actual charges will be made.
