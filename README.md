# Flexirent

A full-stack e-commerce rental platform where customers can browse and rent products, and sellers can list and manage their inventory. Built with a React frontend and a Node.js/Express backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

---

## Features

- **Customer**
  - Browse and search products
  - Add items to cart
  - Checkout with Razorpay payment integration
  - Track orders
  - Add and manage delivery addresses
  - Leave product reviews

- **Seller**
  - Register as a seller
  - Create, edit, and delete product listings (with image upload)
  - View incoming orders
  - Manage product inventory

- **General**
  - JWT-based authentication & authorization
  - Role-based access control (`customer`, `seller`, `admin`)
  - Responsive UI

---

## Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 18 |
| Vite | Latest |
| React Router DOM | 6 |
| Axios | 1.7 |
| React Icons | 5 |
| SweetAlert2 | 11 |

### Backend
| Technology | Version |
|---|---|
| Node.js / Express | 4.x |
| MongoDB / Mongoose | 8.x |
| JWT (jsonwebtoken) | 9.x |
| bcryptjs | 2.x |
| Multer (file upload) | 1.x |
| Razorpay | 2.x |
| dotenv | 16.x |

---

## Project Structure

```
Flexirent/
├── Backend/
│   ├── index.js              # Entry point
│   ├── config/
│   │   └── multer.js         # Multer file upload config
│   ├── controllers/          # Route handler logic
│   ├── DB/
│   │   └── connectDb.js      # MongoDB connection
│   ├── middlewares/
│   │   └── auth.js           # JWT protect & role middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routers
│   └── utils/                # Helpers & validators
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── assets/
        ├── components/       # Reusable UI components
        └── pages/            # Page-level components
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Razorpay](https://razorpay.com/) account for payment integration

---

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder (see [Environment Variables](#environment-variables)).

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file inside the `Backend/` directory with the following keys:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## API Endpoints

### Users — `/users`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | No | Register a new user |
| POST | `/users/login` | No | Login and get JWT |
| GET | `/users/:id` | Yes | Get user profile |
| PATCH | `/users/details` | Yes | Add address & phone number |

### Products — `/products`
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| GET | `/products/` | Yes | Any | Get all products |
| GET | `/products/latest` | Yes | Any | Get latest products |
| GET | `/products/:id` | Yes | Any | Get single product |
| POST | `/products/create` | Yes | Seller | Create a product |
| PATCH | `/products/:id` | Yes | Seller | Edit a product |
| DELETE | `/products/:id` | Yes | Seller | Delete a product |
| PATCH | `/products/review/:id` | Yes | Any | Add a review |
| GET | `/products/seller` | Yes | Seller | Get seller's products |

### Cart — `/cart`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cart/` | Yes | Get cart items |
| POST | `/cart/` | Yes | Add item to cart |
| DELETE | `/cart/:id` | Yes | Remove item from cart |

### Payment — `/payment`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/payment/` | Yes | Initiate Razorpay order |
| POST | `/payment/verify` | Yes | Verify payment signature |

### Orders — `/order`
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| GET | `/order/` | Yes | Customer | Get user's orders |
| GET | `/order/sellerorder` | Yes | Seller | Get seller's orders |

---

## Deployment

Both the frontend and backend include a `vercel.json` configuration for deployment on [Vercel](https://vercel.com/).

- **Backend**: Deploy the `Backend/` folder as a serverless Node.js project.
- **Frontend**: Deploy the `frontend/` folder; Vite builds the static assets.

Make sure to set the environment variables in your Vercel project settings.
