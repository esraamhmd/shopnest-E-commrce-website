# 🛍️ ShopNest — Modern E-Commerce Web App

<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/DummyJSON-API-f97316?style=for-the-badge" />

<br/><br/>

> A full-featured, responsive e-commerce web application inspired by **Amazon** and **Noon**,  
> built from scratch with React, TypeScript, Redux Toolkit, and Vite.

<br/>

**[🔗 Live Demo](#)** &nbsp;•&nbsp; **[📸 Screenshots](#-screenshots)** &nbsp;•&nbsp; **[⚡ Quick Start](#-getting-started)**

</div>

---

## 🎬 Demo Video

<div align="center">

[![ShopNest Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

### ▶️ [Click here to watch the full demo](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

🔒 **The video is public but download-protected.**  
YouTube streams the video securely — right-click save and download extensions are blocked by YouTube's DRM system. Anyone can watch, but no one can download it.

</div>

<br/>

> **To update with your real video:**
> 1. Record with `Win + G` or [OBS Studio](https://obsproject.com)
> 2. Upload to [YouTube](https://youtube.com) → set visibility to **Unlisted**
> 3. Copy your video ID from the URL: `youtube.com/watch?v=`**`YOUR_ID_HERE`**
> 4. Replace `YOUR_VIDEO_ID` in the two lines above with your actual ID
> 5. Run: `git add README.md` → `git commit -m "Add demo video"` → `git push`

---

## 📖 Introduction

**ShopNest** is a complete front-end e-commerce application that demonstrates professional-level React development. It replicates the full shopping experience — browsing categories, searching products, viewing details, managing a cart and wishlist, and completing checkout with payment validation.

### Why this project?

Most tutorial e-commerce projects are simple and incomplete. ShopNest goes further:

- ✅ **Real API** — connects to [DummyJSON](https://dummyjson.com) for live product data
- ✅ **Real icons** — all icons sourced from [Flaticon](https://flaticon.com) (credited below)
- ✅ **Real validation** — every form field has proper validation and error messages
- ✅ **Real state management** — Redux Toolkit with 7 slices covering the full app
- ✅ **Real responsiveness** — tested and working on mobile, tablet, and desktop
- ✅ **Zero UI libraries** — every component and style built from scratch

---

## ✨ Features

### 🔍 Smart Search
- Searches across product **title**, **category**, and **brand**
- Short queries (1–2 chars) only search title/category/brand — not descriptions (prevents false matches)
- Longer queries (3+ chars) search all fields including description and tags
- Popular search tag cloud for quick access

### 🗂️ Category Browsing
- Amazon-style category **dropdown** with 28 categories
- Hover **mega menus** with sub-categories and brand chips
- Category **nav bar** across the top of every page
- Clicking a category fetches its products directly from the DummyJSON API

### 🛒 Shopping Cart
- Add, remove, and update quantity of any product
- Live subtotal, shipping cost, and total
- Free shipping automatically applied on orders over $50
- Live cart badge in header showing item count

### ❤️ Wishlist
- Toggle favorite from any product card or detail page
- Dedicated wishlist page
- Add to cart directly from wishlist

### 📦 Product Detail Page
- Full image gallery with thumbnail navigation
- Customer reviews with star ratings
- Related products from the same category
- Stock availability status
- Quantity selector

### 💳 Checkout & Payment
- Full shipping info form (name, address, city, phone)
- Credit/Debit Card with auto-formatting (card number, expiry MM/YY, CVV)
- Cash on Delivery option
- Complete field validation before submission
- Order success confirmation screen

### 🔐 Authentication
- **Login** — email and password with validation
- **Signup** — first name, last name, email, password with:
  - Real-time password strength meter (Weak / Medium / Strong)
  - Password confirmation match indicator
  - Terms & Conditions checkbox

### 📍 Location Picker
- Real **OpenStreetMap** embedded in a modal
- Choose from 15 delivery cities
- Updates "Deliver to" in the header via Redux

### 🎠 Hero Banner Slider
- Auto-plays every 4.5 seconds
- Manual navigation with arrows and dot indicators
- Animated promo strip (color cycles: orange → black → white)

### 🔔 Toast Notifications
- Cart success alert appears on every add-to-cart action
- Shows product name + "View Cart" button
- Auto-dismisses after 2.5 seconds

### 📱 Fully Responsive Design

| Screen | Behavior |
|--------|----------|
| **Desktop** `>1024px` | Full layout — mega menus, 4-col grid, all elements visible |
| **Tablet** `768–1024px` | Mega menus hidden, 3-col grid, compact header |
| **Mobile** `600–768px` | Search moves to row 2, buttons icon-only, 2-col grid |
| **Small** `400–600px` | Sidebar stacks above results, auth fields stack vertically |
| **Extra Small** `<400px` | Single column, logo text hidden, minimal UI |

---

## 🚀 Tech Stack

| Technology | Version | Why Used |
|------------|---------|----------|
| **React** | 18 | Component-based UI with hooks |
| **TypeScript** | 5 | Type safety, better IDE support, fewer runtime errors |
| **Redux Toolkit** | 2 | Clean, predictable global state — cart, auth, products, favorites |
| **React Router DOM** | 6 | Client-side navigation between pages |
| **Vite** | 5 | Blazing fast dev server and optimized production builds |
| **DummyJSON API** | — | Free REST API with real product data — no backend needed |
| **OpenStreetMap** | — | Free, open-source interactive map — no API key required |
| **Flaticon** | — | High-quality icons for search, cart, favorites, and more |
| **Custom CSS** | — | Hand-written styles — no Bootstrap, no Tailwind, no UI library |

---

## 🎨 Icons Credit

All icons used in this project are sourced from **[Flaticon](https://flaticon.com)** — the world's largest database of free icons.

Icons used include: search, shopping cart, favorites/heart, user profile, delivery location pin, down arrow, shopping bag, delete/trash, fire (hot deals), back arrow, and more.

> Icons by [Flaticon](https://www.flaticon.com) — free for personal and commercial use with attribution.

---

## 📡 API — DummyJSON

All product data comes from **[DummyJSON](https://dummyjson.com)** — a free, no-auth REST API.

| Endpoint | What It Returns |
|----------|-----------------|
| `GET /products?limit=100` | All 100 products |
| `GET /products/search?q=apple` | Products matching search keyword |
| `GET /products/category/beauty` | Products in a specific category |
| `GET /products/category-list` | List of all category slugs |
| `GET /products/:id` | Single product with full details, images, reviews |

No API key, no sign-up, no rate limiting for normal usage.

---

## 📁 Project Structure

```
shopnest/
├── src/
│   ├── assets/
│   │   └── icons/              # PNG icons from Flaticon
│   ├── components/
│   │   ├── Header.tsx          # Sticky header with search & mega menu
│   │   ├── Herobanner.tsx      # Hero slider + product grid (home page)
│   │   ├── Productdetail.tsx   # Full product detail page
│   │   ├── Locationmodal.tsx   # Delivery city picker with OpenStreetMap
│   │   ├── Footer.tsx          # Footer with links, popular searches, support
│   │   ├── Searchpage.tsx      # Search results page with sidebar filters
│   │   ├── Cartpage.tsx        # Shopping cart page
│   │   ├── Favoritespage.tsx   # Wishlist page
│   │   ├── Paymentpage.tsx     # Checkout & payment form
│   │   ├── Loginpage.tsx       # Login form
│   │   └── Signuppage.tsx      # Sign up form
│   ├── store/
│   │   ├── index.ts            # Redux store setup
│   │   ├── hooks.ts            # useAppSelector / useAppDispatch
│   │   └── slices/
│   │       ├── authSlice.ts    # Login / logout state
│   │       ├── cartSlice.ts    # Cart items and totals
│   │       ├── favoriteSlice.ts # Wishlist items
│   │       ├── locationSlice.ts # Selected delivery city
│   │       ├── ProductsSlice.ts # Products, categories, fetch status
│   │       ├── categorySlice.ts # Active category
│   │       └── Adsslice.ts     # Promo banner visibility
│   ├── App.tsx                 # Root component with all routes
│   └── main.tsx               # React app entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org)
- **Git** → [Download](https://git-scm.com)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/shopnest.git

# 2. Enter the folder
cd shopnest

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Build for Production

```bash
npm run build      # Creates /dist folder
npm run preview    # Preview the production build locally
```

---

## 🌍 Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. Click **Add New Project** → select your repository
4. Vercel auto-detects Vite → click **Deploy**
5. Your app is live at `https://shopnest.vercel.app` in ~60 seconds

---

## 🔄 Redux State Management

The app uses **7 Redux slices** — each managing one independent concern:

| Slice | State | Key Actions |
|-------|-------|-------------|
| `auth` | `isLoggedIn`, `user.name`, `user.email` | `login`, `logout` |
| `cart` | `items[]`, `totalCount`, `totalPrice` | `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` |
| `favorites` | `items[]`, `totalCount` | `toggleFavorite`, `removeFromFavorites` |
| `products` | `items[]`, `categories[]`, `status` | `fetchProducts`, `fetchProductsByCategory`, `fetchCategories` |
| `location` | `city`, `lat`, `lng` | `setCity`, `setCoords` |
| `category` | `activeCategory` | `setActiveCategory` |
| `ads` | `isVisible` | `toggleAds` |

---

## 📄 License

MIT License — free to use for learning, portfolios, and commercial projects.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Redux Toolkit**

Icons by [Flaticon](https://flaticon.com) &nbsp;•&nbsp; Data by [DummyJSON](https://dummyjson.com) &nbsp;•&nbsp; Map by [OpenStreetMap](https://openstreetmap.org)

⭐ **If this project helped you, please give it a star!**

</div>
