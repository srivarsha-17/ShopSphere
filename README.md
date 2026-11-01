# ShopSphere – Enterprise Full-Stack E-Commerce Platform

[![Spring Boot 3](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java 17](https://img.shields.io/badge/Java-17%20LTS-orange.svg?logo=openjdk)](https://openjdk.org/)
[![React 18](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?logo=vite)](https://vitejs.dev/)
[![MySQL 8.0](https://img.shields.io/badge/MySQL-8.0-blue.svg?logo=mysql)](https://www.mysql.com/)
[![Spring Security & JWT](https://img.shields.io/badge/Security-Spring%20Security%20%2B%20JWT-red.svg)](https://spring.io/projects/spring-security)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 1. Project Overview

**ShopSphere** is a modern, enterprise-grade Full-Stack E-Commerce Web Application built from scratch for academic evaluation and production portfolio showcase. The platform delivers an end-to-end shopping experience featuring product discovery with instant search, category filtering, dynamic price sorting, real-time stock management, a persistent shopping cart, transaction-safe Cash on Delivery (COD) order checkout, customer purchase history tracking, and a comprehensive Administrator Dashboard for catalog and order operations.

### Key Highlights
- **Real Layered Backend**: Built strictly with **Java 17 and Spring Boot 3** (Spring Web, Spring Data JPA, Hibernate, Bean Validation).
- **Stateless Security**: **Spring Security 6** with **JSON Web Tokens (JWT)** and **BCrypt** password hashing.
- **Relational Integrity**: **MySQL 8.0** database with foreign keys, transactional integrity, and automated schema migrations.
- **Clean Architecture**: Complete separation of Concerns (`controller`, `service`, `repository`, `entity`, `dto`, `security`, `exception`, `config`).
- **Responsive UI/UX**: Built with **React 18**, **Vite**, **Context API**, and **Lucide React Icons**, styled with a custom modern design system.

---

## 2. Technology Stack

### Frontend
- **Framework**: React.js 18 with Vite
- **Routing**: React Router DOM v6 (declarative routing with Protected & Admin route guards)
- **State Management**: Context API (`AuthContext`, `CartContext`, `ToastContext`)
- **HTTP Client**: Axios with JWT Bearer request interceptors and 401 response handling
- **Typography & Icons**: Plus Jakarta Sans & Lucide React
- **Styling**: Modern, responsive CSS design system with micro-interactions and mobile drawer

### Backend
- **Language & Runtime**: Java 17 LTS (OpenJDK 17)
- **Framework**: Spring Boot 3.3.4
- **Persistence**: Spring Data JPA & Hibernate 6
- **Security**: Spring Security 6, JJWT 0.12.6, BCryptPasswordEncoder
- **Build Tool**: Apache Maven 3.9+
- **Validation**: Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Min`, `@DecimalMin`)
- **Boilerplate Reduction**: Project Lombok

### Database & Deployment
- **Database**: MySQL Server 8.0+
- **Version Control**: Git & GitHub
- **Frontend Hosting**: Vercel (`vercel.json` SPA routing configured)
- **Backend Hosting**: Render / Railway (multi-stage `Dockerfile` and `render.yaml` included)

---

## 3. System Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │          Client Browser (React SPA)          │
                    │   Navbar | Catalog | Cart | Orders | Admin   │
                    └──────────────────────┬───────────────────────┘
                                           │ Axios + Bearer JWT
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               Spring Boot 3 Backend (:8081)                           │
│                                                                                        │
│  ┌───────────────────────────┐         ┌────────────────────────────────────────────┐  │
│  │   Security Filter Chain   │ ──────> │              REST Controllers              │  │
│  │   JwtAuthenticationFilter │         │ Auth | Product | Category | Cart | Orders  │  │
│  └───────────────────────────┘         └─────────────────────┬──────────────────────┘  │
│                                                              │                         │
│  ┌───────────────────────────┐         ┌─────────────────────▼──────────────────────┐  │
│  │    DataInitializer Bean   │         │               Service Layer                │  │
│  │ Auto-seeds Admin & Catalog│         │ Business Rules, Stock Checks, Total Sums   │  │
│  └───────────────────────────┘         └─────────────────────┬──────────────────────┘  │
│                                                              │                         │
│                                        ┌─────────────────────▼──────────────────────┐  │
│                                        │          Spring Data Repositories          │  │
│                                        │   UserRepository | ProductRepository etc.  │  │
│                                        └─────────────────────┬──────────────────────┘  │
└──────────────────────────────────────────────────────────────┼─────────────────────────┘
                                                               │ JPA / JDBC
                                                               ▼
                                        ┌─────────────────────────────────────────────┐
                                        │               MySQL Database                │
                                        │               (shopsphere_db)               │
                                        └─────────────────────────────────────────────┘
```

---

## 4. Project Directory Structure

```
ShopSphere/
├── database/
│   ├── schema.sql                      # Relational DDL for MySQL (Tables, FKs, Indexes)
│   └── seed_data.sql                   # Initial 6 categories & 18 high-res products
├── backend/
│   ├── pom.xml                         # Maven dependencies & plugins
│   ├── Dockerfile                      # Multi-stage production container build
│   └── src/
│       ├── main/
│       │   ├── java/com/shopsphere/
│       │   │   ├── ShopSphereApplication.java
│       │   │   ├── config/             # DataInitializer (auto-seeds accounts/catalog)
│       │   │   ├── controller/         # Auth, Product, Category, Cart, Order, Admin
│       │   │   ├── dto/                # Request & Response DTOs, ApiResponse wrapper
│       │   │   ├── entity/             # User, Product, Category, Cart, Order, OrderItem
│       │   │   ├── exception/          # GlobalExceptionHandler, ResourceNotFoundException
│       │   │   ├── repository/         # Spring Data JPA interfaces
│       │   │   ├── security/           # JwtTokenProvider, JwtFilter, SecurityConfig
│       │   │   └── service/            # Business logic & transactional methods
│       │   └── resources/
│       │       └── application.properties # Datasource, JWT & CORS configuration
├── frontend/
│   ├── package.json                    # Dependencies & build scripts
│   ├── vite.config.js                  # Vite configuration & backend proxy
│   ├── vercel.json                     # SPA client-side routing rewrites for Vercel
│   ├── index.html                      # HTML5 entrypoint with Google Fonts
│   └── src/
│       ├── App.jsx                     # Route declarations & provider hierarchy
│       ├── index.css                   # Global responsive CSS design system
│       ├── main.jsx                    # React DOM renderer
│       ├── components/                 # Navbar, Footer, ProductCard, RouteGuards, Toast
│       ├── context/                    # AuthContext, CartContext, ToastContext
│       ├── pages/                      # 10 core pages (Home, Catalog, Details, Cart...)
│       └── services/api.js             # Axios client with JWT interceptor
├── render.yaml                         # Cloud deployment blueprint
├── .gitignore                          # Comprehensive ignore for Java, Node, IDEs
└── README.md                           # Documentation
```

---

## 5. User Roles & Pre-configured Test Accounts

For testing, grading, and evaluation, the backend automatically initializes demo accounts upon initial launch. The frontend login page also features **1-Click Demo Fill Buttons** to immediately test without manual typing.

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@shopsphere.com` | `Admin@123` | Full Admin Dashboard, Catalog CRUD, Order Status Management, User List |
| **Customer** | `customer@shopsphere.com` | `Customer@123` | Browse catalog, Manage cart, Place orders (COD), View order history |

---

## 6. REST API Reference

All responses follow a unified format:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... },
  "timestamp": "2026-11-01T19:28:15"
}
```

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new customer account and create persistent cart |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue signed JWT Bearer token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current user profile and role |

### Product & Category Endpoints (`/api/products`, `/api/categories`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | List products (supports `categoryId`, `query`, `sortBy`, `page`, `size`) |
| `GET` | `/api/products/{id}` | Public | Get product details by ID |
| `GET` | `/api/products/featured` | Public | Get top 8 highest-rated products for home showcase |
| `GET` | `/api/categories` | Public | List all product departments and category counts |

### Shopping Cart Endpoints (`/api/cart`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Customer | Fetch current user's persistent cart with items and total |
| `POST` | `/api/cart/items` | Customer | Add product to cart (validates against real-time stock) |
| `PUT` | `/api/cart/items/{itemId}` | Customer | Adjust quantity of an item in cart |
| `DELETE` | `/api/cart/items/{itemId}` | Customer | Remove specific item from cart |
| `DELETE` | `/api/cart/clear` | Customer | Empty the shopping cart |

### Order Endpoints (`/api/orders`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Customer | Place order (validates stock, decrements inventory, clears cart, computes total) |
| `GET` | `/api/orders` | Customer | Fetch logged-in user's order history |
| `GET` | `/api/orders/{id}` | Customer | Fetch single order details |

### Administrator Control Endpoints (`/api/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard` | Admin Only | Get platform analytics: Total Revenue, Orders, Products, Users |
| `GET` | `/api/admin/orders` | Admin Only | List all customer orders across platform |
| `PATCH` | `/api/admin/orders/{id}/status` | Admin Only | Update status (`PLACED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`) |
| `POST` | `/api/admin/products` | Admin Only | Create new product in catalog |
| `PUT` | `/api/admin/products/{id}` | Admin Only | Edit product details, price, or stock |
| `DELETE` | `/api/admin/products/{id}` | Admin Only | Remove product from catalog |
| `POST` | `/api/admin/categories` | Admin Only | Create new category |
| `DELETE` | `/api/admin/categories/{id}` | Admin Only | Remove category |
| `GET` | `/api/admin/users` | Admin Only | List all registered customers and administrators |

---

## 7. Local Setup & Running Instructions

### Prerequisites
- **Java Development Kit (JDK 17 or later)**: Verified with `java -version`
- **Apache Maven (3.8+)**: Verified with `mvn -v`
- **Node.js (18+ or 20+) & npm**: Verified with `node -v`
- **MySQL Server (8.0+)**: Running locally on port 3306

---

### Step 1: Database Setup
1. Log in to your local MySQL server:
   ```bash
   mysql -u root -p
   ```
2. Create the database and seed initial categories and sample products:
   ```sql
   source database/schema.sql;
   source database/seed_data.sql;
   ```
*(Note: If you run the Spring Boot backend directly, the built-in `DataInitializer` bean will also automatically seed default categories, sample products, and admin accounts if empty).*

---

### Step 2: Backend Setup
1. Open a terminal in `ShopSphere/backend/`:
   ```bash
   cd backend
   ```
2. Configure database credentials in `src/main/resources/application.properties` (or set environment variables `DB_USERNAME` and `DB_PASSWORD`):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/shopsphere_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=YourPassword
   server.port=8081
   ```
3. Build the application:
   ```bash
   mvn clean package -DskipTests
   ```
4. Run the backend server:
   ```bash
   java -jar target/shopsphere-backend-1.0.0.jar
   ```
   *The Spring Boot server will start on `http://localhost:8081`.*

---

### Step 3: Frontend Setup
1. Open a new terminal in `ShopSphere/frontend/`:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:5173`.*

---

## 8. Deployment Guide

### Frontend Deployment (Vercel)
1. Push repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `ShopSphere` repository and set the **Root Directory** to `frontend`.
4. Add the Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com/api`
5. Click **Deploy**. Vercel will automatically read `vercel.json` to handle client-side routing.

### Backend Deployment (Render / Railway / Docker)
1. Log in to [Render](https://render.com/) or [Railway](https://railway.app/).
2. Create a new **Web Service** connected to your `ShopSphere` GitHub repository.
3. Select **Docker** environment using the included `backend/Dockerfile` with root context `backend`.
4. Configure environment variables in the Render dashboard:
   - `DB_HOST`: Hostname of your hosted MySQL provider (e.g., Aiven, Railway MySQL, or PlanetScale)
   - `DB_PORT`: `3306`
   - `DB_NAME`: `shopsphere_db`
   - `DB_USERNAME`: Database username
   - `DB_PASSWORD`: Database password
   - `JWT_SECRET`: 64-character random secure key
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`
5. Deploy the container. The database schema and seed data will be initialized automatically.

---

## 9. Academic Declaration

This project was designed, developed, and tested as a mandatory Full-Stack E-Commerce Web Application assignment. All components, including the Spring Boot REST backend, JWT authentication, MySQL relational schema, and React frontend, have been thoroughly validated with real end-to-end integration tests.
