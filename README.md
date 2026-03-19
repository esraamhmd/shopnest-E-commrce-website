# 🛍️ ShopNest — Modern E-Commerce Web App

<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/DummyJSON-API-f97316?style=for-the-badge" />
<img src="https://img.shields.io/badge/Flaticon-Icons-00B1EA?style=for-the-badge" />

<br/><br/>

> A full-featured, responsive e-commerce web application built from scratch  
> with **React**, **TypeScript**, **Redux Toolkit**.

<br/>

**[🔗 Live Demo](#)** &nbsp;•&nbsp; **[⚡ Quick Start](#-getting-started)**

</div>

---

## 📖 Introduction

**ShopNest** is a complete front-end e-commerce application that replicates the full shopping experience of platforms like Amazon and Noon. Every feature — from browsing and searching products, to managing a cart and completing checkout — is fully implemented with real data, real validation, and real state management.

This project was built entirely from scratch with no UI libraries or component frameworks. Every button, card, form, modal, slider, and layout was hand-coded in React and custom CSS.

### What makes ShopNest different from tutorial projects?

| Typical Tutorial Project | ShopNest |
|--------------------------|----------|
| Fake/hardcoded product data | ✅ Live data from DummyJSON REST API |
| No real search logic | ✅ Smart client-side search with false-match prevention |
| Basic or no form validation | ✅ Full per-field validation with real-time feedback |
| Simple state with useState | ✅ Redux Toolkit with 7 independent slices |
| Desktop only | ✅ Fully responsive — mobile, tablet, desktop |
| UI library (Bootstrap/MUI) | ✅ 100% custom CSS — hand-written from scratch |
| No real icons | ✅ Professional icons from Flaticon |

---

## ✨ Features

### 🔍 Smart Search
- Searches product **title**, **category**, and **brand** at the same time
- Short queries (1–2 chars) are precise — description is excluded to avoid false matches
- Longer queries (3+ chars) search all fields including description and tags
- Amazon-style category dropdown — search within a specific department
- Popular search tag cloud for fast discovery

### 🗂️ Category Browsing
- Dropdown with **28 categories** — opens directly below the search bar
- Hover **mega menus** for Electronics, Fashion, Beauty, Kids, and Home
- Each mega menu shows sub-categories and top brand chips
- Category nav bar visible on every page
- Each category click calls the DummyJSON API and fetches real products

### 🛒 Shopping Cart
- Add, remove, and update quantity for any product
- Live subtotal, shipping fee, and total price
- Free shipping applied automatically on orders over $50
- Cart badge in header updates in real time

### ❤️ Wishlist
- Toggle favorites from any product card or product detail page
- Dedicated wishlist page with all saved items
- Add any wishlist item directly to cart with one click

### 📦 Product Detail Page
- Full image gallery with clickable thumbnail navigation
- Customer reviews with star ratings and dates
- Related products loaded from the same category
- Stock availability: In Stock / Low Stock
- Quantity selector before adding to cart

### 💳 Checkout & Payment
- Shipping info: first name, last name, address, city, phone
- Two payment methods: Credit/Debit Card or Cash on Delivery
- Card number auto-formats with a space every 4 digits
- Expiry date auto-formats as MM/YY
- All fields validated before the order is submitted
- Order success screen shown after confirmation

### 🔐 Authentication
- **Login** — validates email format and password length
- **Signup** — first name, last name, email, password, confirm password
- Live password strength meter: Weak / Medium / Strong
- Password match shown in real time as you type
- Terms & Conditions checkbox required to proceed
- Every error shown next to its own field — not a single generic message

### 📍 Location Picker
- Real **OpenStreetMap** embedded inside a modal
- Choose from 15 delivery cities (Cairo, Dubai, Riyadh, Alexandria, and more)
- Selected city updates the "Deliver to" label in the header via Redux

### 🎠 Hero Banner Slider
- Auto-plays every 4.5 seconds through 3 slides
- Manual prev/next arrows and dot indicators
- Animated promo strip that cycles colors: orange → black → white
- "Grab the Deal" call-to-action button

### 🔔 Toast Notifications
- A success alert appears every time a product is added to cart
- Shows the product name and a "View Cart" shortcut
- Disappears automatically after 2.5 seconds

### 📱 Fully Responsive Design

| Screen | What Changes |
|--------|-------------|
| `> 1024px` | Full layout — mega menus, 4-column grid, all elements visible |
| `768–1024px` | Mega menus hidden, 3-column grid, compact header |
| `600–768px` | Search bar moves to second row, buttons show icons only, 2-column grid |
| `400–600px` | Sidebar stacks above results, auth form fields stack vertically |
| `< 400px` | Single column, logo text hidden, minimal UI |

---

## 🚀 Tech Stack

### ⚛️ React 18
React is the core UI framework. The entire app is built as a tree of reusable components. Each page (Home, Search, Cart, Checkout, Login) is its own component. React hooks like `useState`, `useEffect`, `useRef`, and `useNavigate` are used throughout for local state, side effects, DOM references, and navigation.

### 🔷 TypeScript 5
TypeScript adds static typing on top of JavaScript. Every component, Redux slice, and function has typed props and return values. This catches bugs before the app runs — for example, if a product's `price` field is accidentally treated as a string, TypeScript throws an error immediately in the editor instead of failing silently at runtime.

### 🟣 Redux Toolkit 2
Redux Toolkit manages all global state — data that multiple components across different pages need to share. The cart, wishlist, user auth status, selected city, and product list are all stored in Redux so any component can read or update them without passing props through many layers.

The app has **7 Redux slices**:

| Slice | Stores | Actions |
|-------|--------|---------|
| `auth` | `isLoggedIn`, `user.name`, `user.email` | `login`, `logout` |
| `cart` | `items[]`, `totalCount`, `totalPrice` | `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` |
| `favorites` | `items[]`, `totalCount` | `toggleFavorite`, `removeFromFavorites` |
| `products` | `items[]`, `categories[]`, `status` | `fetchProducts`, `fetchProductsByCategory`, `fetchCategories` |
| `location` | `city`, `lat`, `lng` | `setCity`, `setCoords` |
| `category` | `activeCategory` | `setActiveCategory` |
| `ads` | `isVisible` | `toggleAds` |

### 🔴 React Router DOM 6
Handles all navigation between pages without reloading the browser. Each URL (`/`, `/search`, `/cart`, `/product/:id`, `/login`, etc.) maps to a different component. The browser URL updates when navigating but the page never fully reloads — this is called client-side routing.

### ⚡ Vite 5
Vite is the build tool and development server. It starts in under 1 second and updates the browser instantly when you save a file (Hot Module Replacement). For production it bundles and optimizes all files into a small `/dist` folder.

### 🟠 DummyJSON API
All product data is fetched live from [dummyjson.com](https://dummyjson.com) — a free public REST API with no authentication required. It provides 100 products across 28 categories, each with images, prices, ratings, reviews, and stock info.

### 🗺️ OpenStreetMap
The delivery location picker uses a real embedded OpenStreetMap iframe. It is completely free with no API key required — unlike Google Maps which requires billing.

### 🎨 Flaticon Icons
All UI icons (search, cart, heart, user, location pin, arrow, trash, fire, phone, email, etc.) come from [Flaticon](https://flaticon.com) — the world's largest free icon library. Icons are downloaded as PNG files and imported directly into components.

### 🎨 Custom CSS
Every style in ShopNest was written by hand. No Bootstrap, no Tailwind, no Material UI — just pure CSS with flexbox, grid, media queries, transitions, and animations. This gives full control over every pixel and makes the design unique.

---

## 📁 Project Structure

```
shopnest/
├── public/
├── src/
│   ├── assets/
│   │   └── icons/               # PNG/SVG icons from Flaticon
│   │       ├── search.png
│   │       ├── cart.png
│   │       ├── fav.png
│   │       ├── carrt.png
│   │       ├── delete.png
│   │       ├── fire.png
│   │       ├── user.png
│   │       ├── shopping-bag.png
│   │       ├── down-arrow.png
│   │       ├── right-arrow.svg
│   │       ├── arrowback.png
│   │       ├── pin.png
│   │       ├── help.png
│   │       ├── email.png
│   │       ├── phone.png
│   │       └── top.png
│   │
│   ├── components/
│   │   ├── Header.tsx            # Sticky header: logo, search bar, mega menu, auth buttons
│   │   ├── Header.css
│   │   ├── Herobanner.tsx        # Home page: auto-playing hero slider + product grid
│   │   ├── Herobanner.css
│   │   ├── Productdetail.tsx     # Product detail: gallery, reviews, related products
│   │   ├── Productdetail.css
│   │   ├── Locationmodal.tsx     # Delivery city picker with OpenStreetMap
│   │   ├── Locationmodal.css
│   │   ├── Footer.tsx            # Footer: popular searches, support channels, links
│   │   ├── Footer.css
│   │   ├── Searchpage.tsx        # Search results with sidebar filters and pagination
│   │   ├── Searchpage.css
│   │   ├── Cartpage.tsx          # Shopping cart with quantity controls and totals
│   │   ├── Cartpage.css
│   │   ├── Favoritespage.tsx     # Wishlist page
│   │   ├── Favoritespage.css
│   │   ├── Paymentpage.tsx       # Checkout form with card auto-formatting
│   │   ├── Paymentpage.css
│   │   ├── Loginpage.tsx         # Login form
│   │   ├── Signuppage.tsx        # Signup with password strength meter
│   │   └── AuthPages.css         # Shared styles for login and signup pages
│   │
│   ├── store/
│   │   ├── index.ts              # Redux store — combines all slices
│   │   ├── hooks.ts              # Typed useAppSelector and useAppDispatch
│   │   └── slices/
│   │       ├── authSlice.ts      # Login / logout state
│   │       ├── cartSlice.ts      # Cart items, count, total price
│   │       ├── favoriteSlice.ts  # Wishlist items
│   │       ├── locationSlice.ts  # Selected delivery city and coordinates
│   │       ├── ProductsSlice.ts  # Product list, categories, API fetch status
│   │       ├── categorySlice.ts  # Active category
│   │       └── Adsslice.ts       # Promo banner visibility toggle
│   │
│   ├── App.tsx                   # Root component — defines all routes
│   ├── main.tsx                  # React entry point — mounts app to DOM
│   └── index.css                 # Global base styles and resets
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎬 Demo Video

https://github.com/user-attachments/assets/YOUR_VIDEO_LINK_HERE.mp4

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18 or higher → [nodejs.org](https://nodejs.org)
- **Git** → [git-scm.com](https://git-scm.com)

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/shopnest.git

# Move into the project folder
cd shopnest

# Install all dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Other Commands

```bash
npm run build      # Build optimized production files into /dist
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint to check for code issues
```

---

## 🌍 Deploy for Free on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. Click **Add New Project** → select your `shopnest` repository
4. Vercel detects Vite automatically → click **Deploy**
5. Your app is live in about 60 seconds

---

## 📡 API Reference — DummyJSON

All product data is fetched live from **[DummyJSON](https://dummyjson.com)** — free, no API key, no sign-up needed.

| Endpoint | Returns |
|----------|---------|
| `GET /products?limit=100` | All 100 products with full details |
| `GET /products/search?q=apple` | Products matching the search query |
| `GET /products/category/beauty` | All products in a specific category |
| `GET /products/category-list` | List of all category slugs |
| `GET /products/:id` | Single product — images, reviews, stock, specs |

---

## 🎨 Icons Credit

All icons come from **[Flaticon](https://flaticon.com)** — the world's largest free icon database.

> Icons by [Flaticon](https://www.flaticon.com) — used with attribution per the free license.

---

## 📄 License

MIT License — free to use for learning, portfolios, and commercial projects.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Redux Toolkit**

<br/>

Icons by [Flaticon](https://flaticon.com) &nbsp;•&nbsp; Data by [DummyJSON](https://dummyjson.com) &nbsp;•&nbsp; Map by [OpenStreetMap](https://openstreetmap.org)

<br/>

⭐ **Star this repo if you found it helpful!**

</div>
