<div align="center">

# 🛒 Tronixy
### Full Stack Electronics E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

**Your one-stop destination for electronics & tech accessories — Built in India 🇮🇳**

[Live Demo](https://tronixy.vercel.app) • [Report Bug](https://github.com/Devo-Hacker/Tronixy/issues) • [GitHub](https://github.com/Devo-Hacker/Tronixy)

</div>
---

## 📖 About

**Tronixy** is a production-ready full stack e-commerce web application focused on electronics and tech accessories. Built with Node.js, Express, and MongoDB on the backend and pure HTML, Tailwind CSS, and Vanilla JavaScript on the frontend — no React, no build step, zero client-side dependencies.

The platform features a **Rule-Based Recommendation System** that suggests relevant products based on category and price range, a complete shopping experience with cart management, JWT-based authentication, Cloudinary image storage, and a full Admin Panel for managing products, orders, and categories.

---

## ✨ Features

### 🛍️ User Features
- **Product Search & Filtering** — Search by keyword, filter by category
- **Rule-Based Recommendation System** — Smart product suggestions based on category and price proximity (±₹5000 range)
- **Product Reviews & Ratings** — Logged-in users can submit reviews and star ratings
- **Shopping Cart** — Add, remove, update quantities — persisted in localStorage
- **Checkout** — Shipping info, COD or Online payment selection, automatic GST calculation
- **Order Tracking** — Full order history with live status (Processing → Shipped → Delivered)
- **User Authentication** — Register, Login, Logout with JWT + bcrypt security
- **User Profile** — View personal info, address, and account details
- **Responsive Design** — Optimised for both desktop and mobile

### ⚙️ Admin Features
- **Product Management** — Create, edit, delete products with Cloudinary image uploads
- **Order Management** — View all orders, advance order status with one click
- **Category Management** — Full CRUD for categories with automatic product relinking on delete
- **Dashboard Stats** — Live count of products, orders, categories, and total revenue

---

## 🏗️ Project Structure

```
Tronixy/
├── client/                     # Frontend — HTML, Tailwind CSS, Vanilla JS
│   ├── index.html              # Entry point — redirects to home
│   ├── js/
│   │   ├── api.js              # Core: fetch wrapper, Auth, Cart, Toast, TokenStore
│   │   └── nav.js              # Shared navbar component loaded by every page
│   └── pages/
│       ├── home.html           # Landing page — hero, search, products grid, footer
│       ├── login.html          # JWT login
│       ├── register.html       # User registration (7 fields)
│       ├── product.html        # Product detail, image gallery, reviews, recommendations
│       ├── cart.html           # Cart management
│       ├── checkout.html       # Shipping info + COD/Online payment
│       ├── my-orders.html      # Order history
│       ├── order-detail.html   # Single order breakdown
│       ├── profile.html        # User info display
│       └── admin/
│           ├── dashboard.html  # Admin stats overview
│           ├── products.html   # Product CRUD + image upload
│           ├── orders.html     # All orders + status management
│           └── categories.html # Category CRUD
│
├── server/                     # Backend — Node.js / Express
│   ├── server.js               # Entry point — Express app, middleware, routes, Stripe + Cloudinary config
│   ├── config/
│   │   └── db.js               # MongoDB connection via Mongoose
│   ├── controllers/
│   │   ├── userController.js   # Auth: register, login, logout, profile, update, pic upload
│   │   ├── productController.js # Products: CRUD, search, reviews, recommendations
│   │   ├── orderController.js  # Orders: create, my-orders, payments, admin management
│   │   └── categoryController.js # Category: create, get all, update, delete
│   ├── models/
│   │   ├── userModel.js        # User schema — bcrypt pre-save hook + JWT methods
│   │   ├── productModel.js     # Product schema — embedded reviews sub-document
│   │   ├── orderModel.js       # Order schema — status enum + delivery tracking
│   │   └── categoryModel.js    # Category schema
│   ├── routes/
│   │   ├── userRoutes.js       # /api/v1/user
│   │   ├── productRoutes.js    # /api/v1/product
│   │   ├── orderRoutes.js      # /api/v1/order
│   │   ├── categoryRoutes.js   # /api/v1/cat
│   │   └── testRoutes.js       # /api/v1/test
│   ├── middlewares/
│   │   ├── authMiddleware.js   # isAuth + isAdmin JWT middleware
│   │   └── multer.js           # Multer memory storage for file uploads
│   └── utils/
│       └── features.js         # getDataUri — converts file buffer to base64 data URI
│
├── .vscode/
│   └── settings.json           # Live Server root config
└── .gitignore
```

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML5, Tailwind CSS, Vanilla JS | UI, routing, state management |
| Backend | Node.js, Express.js | REST API server |
| Database | MongoDB, Mongoose | Data persistence and ODM |
| Authentication | JWT, bcryptjs | Secure login + password hashing |
| Image Storage | Cloudinary | CDN image upload and delivery |
| File Uploads | Multer | Multipart form data parsing |
| Payments | Stripe | Payment intent creation |
| Version Control | Git & GitHub | Source control |
| Deployment | Render (Backend) <br> Vercel (Frontend) | Dynamic file hosting <br> Static file hosting |

---

## 🔐 Authentication & Security

Tronixy uses a **dual-token strategy** for maximum browser compatibility:

1. **Server side** — JWT token set as an HTTP-only cookie on login response
2. **Client side** — Token also stored in localStorage and sent via `Authorization: Bearer` header on every request

The `isAuth` middleware reads from the cookie first, falls back to the Authorization header, then verifies using `JWT.verify()`. Protected admin routes additionally pass through `isAdmin` which checks `req.user.role === "admin"`.

Passwords are **never stored in plain text** — a Mongoose pre-save hook runs `bcrypt.hash()` with 10 salt rounds automatically before every user save operation.

---

## 📡 API Endpoints

### User Routes — `/api/v1/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | Public | Create new user account |
| POST | `/login` | Public | Login and receive JWT token |
| GET | `/profile` | 🔒 User | Get logged-in user profile |
| GET | `/logout` | 🔒 User | Clear cookie and end session |
| PUT | `/profile-update` | 🔒 User | Update user info (name, address, city, country, phone) |
| PUT | `/update-password` | 🔒 User | Change password with old password verification |
| PUT | `/update-picture` | 🔒 User | Upload profile picture to Cloudinary |


### Product Routes — `/api/v1/product`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Get all products (with category populated) |
| GET | `/search?keyword=` | Public | Search products by name (MongoDB regex) |
| GET | `/:id` | Public | Single product detail |
| GET | `/recommend/:id` | Public | Similar products by category + price range (±₹5000) |
| POST | `/create` | 🔒 Admin | Create product with Cloudinary image upload |
| PUT | `/:id` | 🔒 Admin | Update product details |
| PUT | `/image/:id` | 🔒 Admin | Add extra image to existing product |
| DELETE | `/image/:id?id=` | 🔒 Admin | Delete specific product image from Cloudinary |
| DELETE | `/delete/:id` | 🔒 Admin | Delete product and all its Cloudinary images |
| PUT | `/:id/review` | 🔒 User | Submit review — recalculates average rating |

### Order Routes — `/api/v1/order`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | 🔒 User | Place order + auto-decrement product stock |
| GET | `/my-orders` | 🔒 User | Get all orders for logged-in user |
| GET | `/my-orders/:id` | 🔒 User | Single order detail |
| POST | `/payments` | 🔒 User | Create Stripe payment intent |
| GET | `/admin/get-all-orders` | 🔒 Admin | All orders from all users |
| PUT | `/admin/order/:id` | 🔒 Admin | Advance order status (processing → shipped → delivered) |

### Category Routes — `/api/v1/cat`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | 🔒 Admin | Create new category |
| GET | `/get-all` | Public | Get all categories |
| PUT | `/update/:id` | 🔒 Admin | Rename category |
| DELETE | `/delete/:id` | 🔒 Admin | Delete category and unlink from all products |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or above
- npm
- MongoDB Atlas account
- Cloudinary account
- Stripe account (for payment features)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Devo-Hacker/Tronixy.git
cd Tronixy
```

**2. Install server dependencies**
```bash
cd server
npm install
```

**3. Configure environment variables**

Create a `.env` file inside the `server/` folder:
```env
PORT=8080
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
STRIPE_API_SECRET=your_stripe_secret_key
```

**4. Start the backend server**
```bash
nodemon server.js
```

Server will run at `http://localhost:8080`

**5. Configure Live Server for frontend**

Add this to `.vscode/settings.json` in the root:
```json
{
  "liveServer.settings.root": "/client"
}
```

**6. Open the frontend**

Right-click `client/index.html` → **Open with Live Server**

The app will open at `http://127.0.0.1:5500/pages/home.html`

---

## 📄 Pages Reference

| Page | File | Access |
|---|---|---|
| Home | `pages/home.html` | Public |
<br>
<img width="1897" height="908" alt="image" src="https://github.com/user-attachments/assets/a3d8dd55-6bc1-4000-b1a9-03e3ba6e3362" />
| Login | `pages/login.html` | Public |
<br>
<img width="663" height="539" alt="image" src="https://github.com/user-attachments/assets/fde82fce-0590-43ac-87f8-ed40d345880d" />
| Register | `pages/register.html` | Public |
<br>
<img width="1893" height="905" alt="Screenshot 2026-04-26 103915" src="https://github.com/user-attachments/assets/7a86e0f4-06f4-462d-b222-845031543173" />
| Product Detail | `pages/product.html?id=` | Public |
<br>
<img width="1899" height="909" alt="image" src="https://github.com/user-attachments/assets/cb6cf246-5948-4da7-abc8-c7ede2dddf88" />
<br>
<img width="1895" height="903" alt="image" src="https://github.com/user-attachments/assets/70a60d3a-853b-4a73-bc45-2ab6e6728415" />
| Cart | `pages/cart.html` | Public |
<br>
<img width="1913" height="905" alt="image" src="https://github.com/user-attachments/assets/35244711-75ed-4375-9028-b7aeb92fbd45" />
| Checkout | `pages/checkout.html` | 🔒 User |
<br>
<img width="1913" height="901" alt="image" src="https://github.com/user-attachments/assets/7c4c2d21-355d-4948-aa29-c334b698ab79" />
| My Orders | `pages/my-orders.html` | 🔒 User |
<br>
<img width="1910" height="891" alt="image" src="https://github.com/user-attachments/assets/eb92e0d8-d229-4c05-b20a-010512c3de19" />
| Order Detail | `pages/order-detail.html?id=` | 🔒 User |
<br>
<img width="1893" height="896" alt="image" src="https://github.com/user-attachments/assets/92293a41-7b99-4179-b50c-7e25a45e1e37" />
| Profile | `pages/profile.html` | 🔒 User and 🔒 Admin  |
<br>
<img width="1914" height="894" alt="image" src="https://github.com/user-attachments/assets/e40745e6-cc07-41ac-91eb-50c213dd16eb" />
| Admin Dashboard | `pages/admin/dashboard.html` | 🔒 Admin |
<br>
<img width="1915" height="895" alt="image" src="https://github.com/user-attachments/assets/f9a61ed2-57a3-4272-8212-560cbee6a4a0" />
| Admin Products | `pages/admin/products.html` | 🔒 Admin |
<br>
<img width="1899" height="911" alt="image" src="https://github.com/user-attachments/assets/0efaf99e-ebc2-4942-96ae-45921bdd5dea" />
| Admin Orders | `pages/admin/orders.html` | 🔒 Admin |
<br>
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/1517fd4f-ffa1-4701-ad1a-182057f9989a" />
| Admin Categories | `pages/admin/categories.html` | 🔒 Admin |
<br>
<img width="1913" height="893" alt="image" src="https://github.com/user-attachments/assets/c6eaace2-e88f-4152-a09a-dc10dfce3158" />

---

## 💡 Frontend Architecture

The frontend uses **zero client-side dependencies** — no React, no Vue, no bundler.

- `api.js` — Single shared module loaded by every page. Contains the fetch wrapper, Auth state object, Cart (localStorage), TokenStore, and toast notifications
- `nav.js` — Shared navbar renderer. Reads `Auth.user` and builds the full navbar as an HTML template literal, injected via `innerHTML`
- Every page follows the same init pattern:

```js
async function init() {
  await Auth.load();                          // fetch user from server
  if (!Auth.isLoggedIn()) go('login.html');   // guard
  renderNav('pageName');                      // build navbar
  loadPageData();                             // fetch and render content
}
init();
```

---

## 👥 Team

Built by the **Tronixy Team**:

| Name | Role | Contact |
|---|---|---|
| **Devo-Hacker** | Full Stack Lead | [GitHub](https://github.com/Devo-Hacker) |
| **Niladree Bihari Nayak** | Backend & Auth | [niladreebiharinayak@gmail.com](mailto:niladreebiharinayak@gmail.com) |
| **Sakshi Mishra** | Frontend & UI | [mishra0108sakshi@gmail.com](mailto:mishra0108sakshi@gmail.com) |
| **Sanjana** | Testing & Design | [sanjanacps185@gmail.com](mailto:sanjanacps185@gmail.com) |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

© 2026 **TRONIXY**. All Rights Reserved. | Made in India 🇮🇳

⭐ **Star this repo if you found it helpful!**

</div>
