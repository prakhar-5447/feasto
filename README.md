# Deployment
https://feasto-app-latest.onrender.com/

# 🍽️ Feasto

> The revamped, production-ready version of Juicy-N-Yummy — a full-stack restaurant aggregator and food delivery platform built with **Angular 21 SSR** and a **Node.js monolithic backend**, all inside a single repository.

![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular SSR](https://img.shields.io/badge/Angular_SSR-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express 5](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 📖 About

**Feasto** is the fully revamped version of [Juicy-N-Yummy](https://github.com/prakhar-5447/Juicy-N-Yummy), rebuilt from the ground up with a modern architecture. It adopts **Angular 21 with Server-Side Rendering (SSR)** for fast initial page loads and SEO benefits, and integrates the **Express.js REST API directly inside the same project** as a true monolithic full-stack application — eliminating the need for a separate backend repository.

### What changed from Juicy-N-Yummy?

| Feature | Juicy-N-Yummy (v1) | Feasto (v2) |
|---|---|---|
| Angular Version | 13 | 21 |
| Rendering | Client-Side (CSR) | Server-Side Rendering (SSR) |
| Styling | TailwindCSS | SASS (component-scoped) |
| State Management | Services + RxJS | NgRx Store + Effects |
| Architecture | Separate frontend & backend repos | Monolithic (single repo) |
| Backend Framework | Express 4 | Express 5 |
| Image Uploads | — | Cloudinary via Multer |
| Security | Basic CORS + JWT | Helmet, Rate Limiting, Mongo Sanitize, Joi Validation |
| Logging | — | Morgan (HTTP) + Winston (app) |

---

## ✨ Features

- **Angular SSR** — Pages are rendered server-side for faster loads, SEO optimization, and improved Core Web Vitals.
- **Monolithic Architecture** — The Express API runs inside the same Angular SSR server (`src/server.ts`), sharing a single Node.js process.
- **NgRx State Management** — Application-wide state handled via NgRx Store, Actions, Reducers, and Effects.
- **JWT Authentication** — Secure stateless auth using JSON Web Tokens with cookie-parser for HttpOnly cookie support.
- **Image Uploads** — Restaurant/food images uploaded via Multer and stored on Cloudinary.
- **Input Validation** — All API inputs validated with Joi schemas.
- **Security Hardening** — Helmet for HTTP headers, express-mongo-sanitize to prevent NoSQL injection, and express-rate-limit to prevent brute-force attacks.
- **Structured Logging** — Morgan for HTTP request logging, Winston for application-level logs (stored in `logs/`).
- **Restaurant Discovery** — Location-based restaurant search, menus, and user reviews.
- **Dashboard** — Admin panel for managing restaurants, menu items, and reviews.

---

## 🛠️ Tech Stack

### Frontend (Angular 21 SSR)
| Technology | Version | Purpose |
|---|---|---|
| Angular | ^21.2.0 | Core SPA + SSR framework |
| @angular/ssr | ^21.2.1 | Server-Side Rendering engine |
| @angular/platform-server | ^21.2.0 | Node.js rendering platform |
| NgRx Store | ^21.0.1 | Global state management |
| NgRx Effects | ^21.0.1 | Side-effect handling (API calls) |
| NgRx Store Devtools | ^21.0.1 | Redux DevTools integration |
| FontAwesome Angular | ^4.0.0 | Icon library |
| RxJS | ~7.8.0 | Reactive streams and Observables |
| SASS | — | Component-scoped styling |
| TypeScript | ~5.9.2 | Strongly-typed language |

### Backend (Embedded Express 5 Monolith — `server/`)
| Technology | Version | Purpose |
|---|---|---|
| Express | ^5.2.1 | Web framework / REST API |
| MongoDB | ^7.1.0 | NoSQL database driver |
| Mongoose | ^9.3.1 | ODM for MongoDB schema modeling |
| JSON Web Token | ^9.0.3 | Stateless authentication |
| bcrypt | ^6.0.0 | Password hashing |
| cookie-parser | ^1.4.7 | Cookie parsing for JWT HttpOnly cookies |
| Multer | ^2.1.1 | File/image upload handling |
| multer-storage-cloudinary | ^4.0.0 | Cloudinary storage engine for Multer |
| Cloudinary | ^1.41.3 | Cloud image storage and delivery |
| Joi | ^18.0.2 | Request body validation schemas |
| Helmet | ^8.1.0 | Security-related HTTP headers |
| express-rate-limit | ^8.3.1 | Rate limiting against brute-force |
| express-mongo-sanitize | ^2.2.0 | NoSQL injection prevention |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |
| dotenv | ^17.3.1 | Environment variable management |
| morgan | ^1.10.1 | HTTP request logging middleware |
| Winston | ^3.19.0 | Application-level logger |
| uuid | ^13.0.0 | Unique ID generation |
| chalk | ^5.6.2 | Terminal output styling |

### Dev Tools
| Tool | Version | Purpose |
|---|---|---|
| Angular CLI | ^21.2.1 | Project scaffolding and builds |
| Nodemon | ^3.1.14 | Auto-restart during development |
| Vitest | ^4.0.8 | Unit testing framework |
| Prettier | ^3.8.1 | Code formatting |
| jsdom | ^28.0.0 | DOM simulation for tests |

---

## 🏗️ Architecture Overview

### Monolithic SSR Architecture

```
Browser Request
      │
      ▼
┌─────────────────────────────────────────────┐
│         Node.js Process (Single Server)     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │       Angular SSR Engine            │    │
│  │  (src/main.server.ts + src/app)     │    │
│  │  - Renders Angular pages on server  │    │
│  │  - Hydrates on client               │    │
│  └──────────────┬──────────────────────┘    │
│                 │ mounted on Express        │
│  ┌──────────────▼──────────────────────┐    │
│  │       Express 5 API (server/)       │    │
│  │  - REST routes (/api/*)             │    │
│  │  - JWT Auth middleware              │    │
│  │  - Mongoose ↔ MongoDB               │    │
│  │  - Cloudinary image uploads         │    │
│  └──────────────┬──────────────────────┘    │
└─────────────────┼───────────────────────────┘
                  │
          ┌───────▼───────┐
          │   MongoDB     │
          │  (Mongoose)   │
          └───────────────┘
```

In SSR mode, Angular's `src/server.ts` bootstraps an Express app that serves both the Angular Universal rendered HTML **and** all `/api/*` routes from the same Node.js process.

---

## 🗂️ Project Structure

```
customer-web/
├── server/                          # Express REST API (monolith backend)
│   ├── index.js                     # API bootstrap — registers all routes & middleware
│   ├── config/
│   │   ├── db.js                    # Mongoose connection setup
│   │   └── cloudinary.js            # Cloudinary SDK configuration
│   ├── models/                      # Mongoose schemas
│   │   ├── user.model.js            # User (auth, roles)
│   │   ├── restaurant.model.js      # Restaurant info & location
│   │   ├── menuItem.model.js        # Menu items with images
│   │   ├── order.model.js           # Orders
│   │   └── review.model.js          # User reviews & ratings
│   ├── routes/                      # Express route definitions
│   │   ├── auth.routes.js           # /api/auth/*
│   │   ├── restaurant.routes.js     # /api/restaurants/*
│   │   ├── menu.routes.js           # /api/menu/*
│   │   ├── order.routes.js          # /api/orders/*
│   │   └── review.routes.js         # /api/reviews/*
│   ├── controllers/                 # Route business logic
│   │   ├── auth.controller.js
│   │   ├── restaurant.controller.js
│   │   ├── menu.controller.js
│   │   ├── order.controller.js
│   │   └── review.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── validate.middleware.js   # Joi validation wrapper
│   │   └── upload.middleware.js     # Multer + Cloudinary storage
│   └── validators/
│       └── *.validator.js           # Joi schemas per resource
│
├── src/                             # Angular 21 SSR frontend
│   ├── main.ts                      # Browser bootstrap
│   ├── main.server.ts               # Server (SSR) bootstrap
│   ├── server.ts                    # Express + Angular SSR entry
│   ├── app/
│   │   ├── app.config.ts            # Standalone app config (provideRouter, provideStore, etc.)
│   │   ├── app.config.server.ts     # SSR-specific providers
│   │   ├── app.routes.ts            # Application route definitions
│   │   ├── core/
│   │   │   ├── guards/              # Auth route guards
│   │   │   ├── interceptors/        # HTTP interceptors (auth token, error)
│   │   │   └── services/            # Core services (AuthService, ApiService)
│   │   ├── store/                   # NgRx state management
│   │   │   ├── auth/                # Auth actions, reducer, effects, selectors
│   │   │   ├── restaurant/          # Restaurant state slice
│   │   │   ├── cart/                # Cart/order state slice
│   │   │   └── app.state.ts         # Root AppState interface
│   │   ├── pages/                   # Route-level page components
│   │   │   ├── home/                # Landing page
│   │   │   ├── restaurant-list/     # Browse all restaurants
│   │   │   ├── restaurant-detail/   # Single restaurant (menu + reviews)
│   │   │   ├── cart/                # Cart & checkout
│   │   │   ├── orders/              # Order history
│   │   │   ├── dashboard/           # Admin/owner dashboard
│   │   │   ├── login/               # Login page
│   │   │   └── register/            # Registration page
│   │   ├── components/              # Shared/reusable UI components
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── restaurant-card/
│   │   │   ├── menu-item-card/
│   │   │   └── review-card/
│   │   └── models/                  # TypeScript interfaces
│   ├── assets/                      # Static assets (images, fonts)
│   ├── environments/
│   │   ├── environment.ts           # Dev environment (API base URL etc.)
│   │   └── environment.prod.ts      # Production environment
│   └── styles.sass                  # Global styles
│
├── public/                          # Static files served as-is
├── logs/                            # Winston log output files
├── .env                             # Environment variables (not committed)
├── angular.json                     # Angular workspace config
├── package.json                     # Unified dependencies (frontend + backend)
├── tsconfig.json                    # Root TypeScript config
├── tsconfig.app.json                # Angular app TypeScript config
├── .prettierrc                      # Prettier formatting rules
└── README.md
```

---

## 🔌 Backend API Architecture

The Express backend lives in `server/` and is mounted directly onto the Angular SSR server at `src/server.ts`. All API routes are prefixed with `/api`.

### Security Middleware Stack (applied globally)
```
Request → Helmet → CORS → Rate Limiter → Express JSON → Cookie Parser
       → Mongo Sanitize → Morgan Logger → Routes
```

### Authentication (`/api/auth`)
| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| POST | `/api/auth/register` | Register a new user (hashed password via bcrypt) | ❌ |
| POST | `/api/auth/login` | Login — returns JWT in HttpOnly cookie | ❌ |
| POST | `/api/auth/logout` | Clear auth cookie | ✅ |
| GET | `/api/auth/me` | Get current authenticated user profile | ✅ |

### Restaurants (`/api/restaurants`)
| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| GET | `/api/restaurants` | List all restaurants (with filters/search) | ❌ |
| GET | `/api/restaurants/:id` | Get single restaurant details | ❌ |
| POST | `/api/restaurants` | Create a new restaurant (with image upload) | ✅ |
| PUT | `/api/restaurants/:id` | Update restaurant info | ✅ |
| DELETE | `/api/restaurants/:id` | Delete restaurant | ✅ |

### Menu Items (`/api/menu`)
| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| GET | `/api/menu/:restaurantId` | Get all menu items for a restaurant | ❌ |
| POST | `/api/menu` | Add menu item (with Cloudinary image upload) | ✅ |
| PUT | `/api/menu/:id` | Update menu item | ✅ |
| DELETE | `/api/menu/:id` | Delete menu item | ✅ |

### Orders (`/api/orders`)
| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| GET | `/api/orders` | Get all orders for current user | ✅ |
| GET | `/api/orders/:id` | Get order details | ✅ |
| POST | `/api/orders` | Place a new order | ✅ |
| PATCH | `/api/orders/:id/status` | Update order status (admin/owner) | ✅ |

### Reviews (`/api/reviews`)
| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| GET | `/api/reviews/:restaurantId` | Get all reviews for a restaurant | ❌ |
| POST | `/api/reviews` | Submit a review | ✅ |
| DELETE | `/api/reviews/:id` | Delete a review | ✅ |

### JWT & Auth Flow
- On login, a JWT is signed with `JWT_SECRET` and sent as an **HttpOnly cookie** via `cookie-parser`.
- `auth.middleware.js` reads the cookie on each protected request, verifies the token, and attaches `req.user`.
- Passwords are hashed at rest using **bcrypt** (cost factor configurable).

### Image Upload Flow
```
Client uploads file → Multer (memory/disk buffer)
                    → multer-storage-cloudinary
                    → Cloudinary CDN
                    → Returns secure_url saved in MongoDB
```

---

## 🖥️ Frontend Pages & SSR

All pages are Angular standalone components using the new Angular 21 standalone API (no `NgModule`).

| Page | Route | SSR | Description |
|------|-------|:---:|-------------|
| **Home** | `/` | ✅ | Hero, featured restaurants, location-based search |
| **Restaurant List** | `/restaurants` | ✅ | Filterable/searchable restaurant grid |
| **Restaurant Detail** | `/restaurants/:id` | ✅ | Full menu, photos, reviews, ratings |
| **Cart** | `/cart` | ❌ | Cart summary and checkout (client-only) |
| **Orders** | `/orders` | ✅ | User order history |
| **Dashboard** | `/dashboard` | ✅ | Admin/owner management panel |
| **Login** | `/login` | ✅ | Auth form with NgRx dispatch |
| **Register** | `/register` | ✅ | Sign-up form with validation |

### SSR Rendering Strategy
- Pages marked ✅ are pre-rendered on the Node.js server using `@angular/ssr`, enabling full SEO and fast First Contentful Paint (FCP).
- The app hydrates on the client after the initial HTML is delivered.
- Cart page is client-only (`isPlatformBrowser` guard) since it depends on local session state.

### NgRx Store Architecture
```
┌──────────────────────────────────────────────────────┐
│                    NgRx Store                        │
│                                                      │
│  auth/         restaurant/      cart/                │
│  ├─ state      ├─ state         ├─ state             │
│  ├─ actions    ├─ actions       ├─ actions           │
│  ├─ reducer    ├─ reducer       ├─ reducer           │
│  ├─ effects ──►│ HTTP call      ├─ effects           │
│  └─ selectors  └─ selectors     └─ selectors         │
└──────────────────────────────────────────────────────┘
```
NgRx Effects handle all async HTTP interactions with the backend, keeping components clean and declarative.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20+
- **npm** v11+
- **MongoDB** (local or Atlas URI)
- **Cloudinary** account (for image uploads)
- **Angular CLI** v21

### 1. Clone the Repository

```bash
git clone https://github.com/prakhar-5447/customer-web.git
cd customer-web
```

### 2. Install All Dependencies

```bash
npm install
```

> This installs both Angular frontend and all backend (Express/Mongoose/etc.) packages from the single unified `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/feasto

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run in Development Mode

**Terminal 1 — Angular SSR Dev Server:**
```bash
npm start
# or
ng serve
```
Runs at: `http://localhost:4200`

**Terminal 2 — Backend (nodemon watch):**
```bash
npx nodemon server/index.js
```
API runs at: `http://localhost:3000/api`

### 5. Run the Production SSR Build

```bash
npm run build
node dist/customer-web/server/server.mjs
```

This starts the unified Angular SSR + Express server on the configured `PORT`.

---

## 📦 Build for Production

```bash
npm run build
```

Output artifacts:
- `dist/customer-web/browser/` — Static client-side assets
- `dist/customer-web/server/server.mjs` — The unified SSR + API server entry point

---

## 📄 License

This project is open source. Please refer to the repository for licensing details.

---

## 👤 Author

| | Name | GitHub |
|---|---|---|
| <img src="https://avatars.githubusercontent.com/u/80202909?v=4" width="40" style="border-radius:50%"> | Prakhar Sahu | [@prakhar-5447](https://github.com/prakhar-5447) |

---

## 🔗 Related

- **v1 (Juicy-N-Yummy):** https://github.com/prakhar-5447/Juicy-N-Yummy — The original version with Angular 13 CSR and a separate backend.

---

> ⭐ If you found this useful, a star on GitHub would be appreciated!
