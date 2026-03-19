# 🛍️ ShopNest — Modern E-Commerce Web App

<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<br/><br/>

> A full-featured, responsive e-commerce web application inspired by **Amazon** and **Noon**,
> built from scratch with React, TypeScript, and Redux Toolkit.

</div>

---

## 🎬 Demo Video

<!-- 
  HOW TO ADD YOUR VIDEO:
  1. Drag your video file into any GitHub Issue text box
  2. GitHub uploads it and gives you a link like:
     https://github.com/user-attachments/assets/xxxxxx.mp4
  3. Paste that link below replacing YOUR_VIDEO_LINK
-->



> 🔒 Videos uploaded to GitHub cannot be downloaded by viewers — they stream only.

---

## 📖 Introduction

**ShopNest** is a complete front-end e-commerce application that replicates the real shopping experience of major platforms. Every feature — from browsing and searching products, to adding items to cart and completing checkout — is fully implemented and working with live data.

### Why this project?

Most e-commerce tutorials only build basic CRUD apps. ShopNest goes further:

- **Real API** — connects to DummyJSON and fetches 100 actual products across 28 categories
- **Real state management** — Redux Toolkit handles cart, wishlist, auth, location, and products independently
- **Real search logic** — smart filtering that avoids false matches on short queries
- **Real validation** — every form field validates in real time with clear error messages
- **Real responsive design** — tested and working on mobile, tablet, and desktop

### Tech choices explained

**React 18** was chosen as the UI framework because it is the industry standard for building component-based user interfaces. Every part of the page — header, product cards, sidebar filters — is its own reusable component.

**TypeScript** adds static typing on top of JavaScript. This means errors are caught while writing code, not after running it. Every component prop, Redux state, and API response is typed, making the codebase safer and easier to maintain.

**Redux Toolkit** manages all shared state. When a user adds a product to the cart from the search page, the header badge updates instantly — because both components read from the same Redux store. The same applies to favorites, login status, and delivery location.

**Vite** is the build tool. It starts the development server in under a second and bundles the production build with Rollup. Much faster than Create React App.

---

## ✨ Features

### 🔍 Smart Search
Real-time search as you type. Searches title, category, and brand. Short queries (1–2 characters) only search the title and brand — not the description — to avoid showing unrelated products.

### 🗂️ Category Browsing
Amazon-style category dropdown with 28 departments. Hover mega menus for Electronics, Fashion, and Beauty show sub-categories and top brands. Clicking any nav item fetches that category's products directly from the API.

### 🛒 Shopping Cart
Add, remove, and update quantity for any product. Live subtotal and total update on every change. Free shipping applied automatically on orders over $50. Cart badge in the header shows the live item count.

### ❤️ Wishlist
Toggle any product as a favorite from the search page, home page, or product detail. Dedicated wishlist page shows all saved products. Add favorites to cart in one click.

### 📦 Product Detail
Full product page with image gallery, customer reviews, star ratings, and related products. Shows stock availability. Quantity selector before adding to cart.

### 💳 Checkout
Two-step form: shipping information then payment method. Supports Credit/Debit Card (with auto-formatting) and Cash on Delivery. Every field validates before the order is placed. Order success screen on completion.

### 🔐 Auth Pages
Login with email and password validation. Signup with first name, last name, email, and password. Includes a password strength meter and real-time password match indicator.

### 📍 Location Picker
Real interactive OpenStreetMap embedded in a modal. Select from 15 cities. The chosen city appears in the header under "Deliver to".

### 🎠 Hero Slider
Auto-playing banner with 3 slides, navigation arrows, and dot indicators. Animated promo strip below the header with a "Grab the Deal" button.

### 📱 Responsive Design
Works on all screen sizes. The header collapses to a two-row layout on mobile. Product grids scale from 4 columns on desktop down to 1 column on small phones.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI framework |
| **TypeScript 5** | Static typing and type safety |
| **Redux Toolkit 2** | Global state: cart, favorites, auth, products |
| **React Router DOM 6** | Page routing without full reloads |
| **Vite 5** | Fast dev server and production builder |
| **DummyJSON API** | Free REST API with 100 real products |
| **OpenStreetMap** | Embedded interactive map |
| **Custom CSS** | All styles hand-written, no UI libraries |

---

## 📁 Project Structure

```
shopnest/
├── src/
│   ├── assets/
│   │   └── icons/              # Search, cart, heart, user icons
│   ├── components/
│   │   ├── Header.tsx          # Sticky header with search and mega menu
│   │   ├── Herobanner.tsx      # Home page: slider and product grid
│   │   ├── Productdetail.tsx   # Full product detail page
│   │   ├── Locationmodal.tsx   # Delivery city picker with map
│   │   ├── Footer.tsx          # Links, support, popular searches
│   │   ├── Searchpage.tsx      # Search results with sidebar filters
│   │   ├── Cartpage.tsx        # Shopping cart
│   │   ├── Favoritespage.tsx   # Wishlist
│   │   ├── Paymentpage.tsx     # Checkout form
│   │   ├── Loginpage.tsx       # Login
│   │   └── Signuppage.tsx      # Sign up
│   ├── store/
│   │   ├── index.ts            # Redux store setup
│   │   ├── hooks.ts            # Typed useAppSelector and useAppDispatch
│   │   └── slices/
│   │       ├── authSlice.ts    # Login / logout state
│   │       ├── cartSlice.ts    # Cart items and totals
│   │       ├── favoriteSlice.ts # Wishlist items
│   │       ├── locationSlice.ts # Selected delivery city
│   │       ├── ProductsSlice.ts # Products, categories, loading status
│   │       ├── categorySlice.ts # Active category
│   │       └── Adsslice.ts     # Promo banner toggle
│   ├── App.tsx                 # Root layout and all routes
│   └── main.tsx               # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Requirements
- Node.js v18 or higher → [nodejs.org](https://nodejs.org)
- Git → [git-scm.com](https://git-scm.com)

### Run Locally

```bash
# Clone the project
git clone https://github.com/YOUR_USERNAME/shopnest.git

# Enter the folder
cd shopnest

# Install packages
npm install

# Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

The output goes into the `/dist` folder ready to deploy.

---

## 🌍 Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** and select your repository
4. Click **Deploy** — Vite is detected automatically
5. Your app goes live at `https://shopnest.vercel.app`

---

## 🔄 Redux State Structure

| Slice | What it stores | Key actions |
|-------|---------------|-------------|
| `auth` | `isLoggedIn`, `user.name`, `user.email` | `login`, `logout` |
| `cart` | `items[]`, `totalCount`, `totalPrice` | `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` |
| `favorites` | `items[]`, `totalCount` | `toggleFavorite`, `removeFromFavorites` |
| `products` | `items[]`, `categories[]`, `status` | `fetchProducts`, `fetchProductsByCategory`, `fetchCategories` |
| `location` | `city`, `lat`, `lng` | `setCity`, `setCoords` |
| `category` | `activeCategory` | `setActiveCategory` |
| `ads` | `isVisible` | `toggleAds` |

---

## 📡 API Endpoints Used

| Endpoint | Used for |
|----------|---------|
| `GET /products?limit=100` | Load all products on home page |
| `GET /products/category/:slug` | Browse by category |
| `GET /products/category-list` | Get all category names |
| `GET /products/:id` | Load single product detail |

Base URL: `https://dummyjson.com`

---

## 📄 License

MIT — free to use for learning, portfolio, or commercial projects.

---

<div align="center">

Built with ❤️ using React + TypeScript + Redux

⭐ **If this helped you, give it a star on GitHub!**

</div>
