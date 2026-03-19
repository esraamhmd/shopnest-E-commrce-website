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

**[🔗 Live Demo](#)** &nbsp;•&nbsp; **[⚡ Quick Start](#-getting-started)**

</div>

---

## 🎬 Demo Video

https://github.com/user-attachments/assets/YOUR_VIDEO_LINK_HERE.mp4

---

## 📖 Introduction

**ShopNest** is a complete front-end e-commerce application that demonstrates professional-level React development. It replicates the full shopping experience of major platforms like Amazon and Noon — from browsing categories and searching products, to adding items to a cart and completing checkout with full payment validation.

Every part of this project was built from scratch:

- ✅ **Real API** — live product data from [DummyJSON](https://dummyjson.com) (100 products, 28 categories)
- ✅ **Real icons** — all UI icons from [Flaticon](https://flaticon.com)
- ✅ **Real validation** — every form field validated with clear error messages
- ✅ **Real state management** — Redux Toolkit with 7 independent slices
- ✅ **Real responsiveness** — fully tested on mobile, tablet, and desktop
- ✅ **Zero UI libraries** — no Bootstrap, no Tailwind, no component library — pure custom CSS

---





## ✨ Features

### 🔍 Smart Search
- Searches product **title**, **category**, and **brand** simultaneously
- Short queries (1–2 chars) are precise — description excluded to avoid false matches
- Longer queries (3+ chars) search all fields including description and tags
- Amazon-style category dropdown to search within a specific department
- Popular search tag cloud for quick discovery

### 🗂️ Category Browsing
- Dropdown with **28 categories** — opens below the search bar
- Hover **mega menus** for Electronics, Fashion, Beauty, Kids, Home with sub-links and top brands
- Category **nav bar** visible on every page
- Each category click fetches real products from the DummyJSON API

### 🛒 Shopping Cart
- Add, remove, and update quantity of any product
- Live subtotal, shipping cost, and total price calculation
- Free shipping automatically applied on orders over $50
- Persistent cart badge in header showing live item count

### ❤️ Wishlist
- Toggle favorites from any product card or detail page
- Dedicated wishlist page showing all saved products
- Add wishlist items directly to cart with one click

### 📦 Product Detail Page
- Full image gallery with clickable thumbnails
- Customer reviews with star ratings
- Related products section loaded from same category
- Stock availability status (In Stock / Low Stock)
- Quantity selector before adding to cart

### 💳 Checkout & Payment
- Shipping info: first name, last name, street address, city, phone number
- Payment options: Credit/Debit Card or Cash on Delivery
- Card number auto-formats with spaces every 4 digits
- Expiry date auto-formats as MM/YY
- CVV field with length validation
- All fields validated before submission
- Order success screen with confirmation message

### 🔐 Authentication
- **Login** — email format check + password minimum length
- **Signup** — first name, last name, email, password, confirm password
  - Live password strength meter: Weak / Medium / Strong
  - Password match indicator in real time
  - Terms & Conditions checkbox required
  - All errors shown per-field, not as a generic message

### 📍 Location Picker
- Real interactive **OpenStreetMap** embedded in a modal
- Choose delivery city from 15 options (Cairo, Dubai, Riyadh, Alexandria, and more)
- Selected city updates the "Deliver to" section in the header instantly via Redux

### 🎠 Hero Banner
- Auto-playing slider cycling through 3 slides every 4.5 seconds
- Manual prev/next arrows and dot indicators
- Animated promo strip below — cycles colors: orange → black → white
- "Grab the Deal" CTA button

### 🔔 Toast Notifications
- Cart alert pops up every time a product is added
- Displays the product name and a "View Cart" shortcut button
- Auto-dismisses after 2.5 seconds

### 📱 Fully Responsive

| Screen Size | Layout Behavior |
|-------------|-----------------|
| `> 1024px` | Full desktop — mega menus visible, 4-column product grid |
| `768–1024px` | Tablet — mega menus hidden, 3-column grid, compact header |
| `600–768px` | Mobile — search bar moves to second row, buttons show icons only, 2-column grid |
| `400–600px` | Small mobile — sidebar stacks above results, auth fields stack vertically |
| `< 400px` | Extra small — single column, logo text hidden, minimal UI |

---

## 🚀 Tech Stack

| Technology | Version | Why It Was Used |
|------------|---------|-----------------|
| **React** | 18 | Component-based UI architecture with hooks |
| **TypeScript** | 5 | Catches bugs at compile time, better IDE autocomplete |
| **Redux Toolkit** | 2 | Predictable global state for cart, auth, favorites, products |
| **React Router DOM** | 6 | Client-side navigation with URL-based routing |
| **Vite** | 5 | Instant dev server startup and fast production builds |
| **DummyJSON API** | — | Free REST API — real product data with no backend needed |
| **OpenStreetMap** | — | Free interactive map embed — no API key required |
| **Flaticon** | — | Professional icon set for all UI elements |
| **Custom CSS** | — | Every style written by hand — full control, no dependencies |

---

## 🎨 Icons Credit

All icons in this project come from **[Flaticon](https://flaticon.com)** — the world's largest free icon library.

Icons used: `search`, `shopping-cart`, `heart/favorites`, `user/profile`, `location-pin`, `down-arrow`, `shopping-bag`, `delete/trash`, `fire`, `back-arrow`, `right-arrow`, `email`, `phone`, `help`, `check`, `top/scroll-up`

> Icons by [Flaticon](https://www.flaticon.com) — used with attribution as required by the free license.

---

## 📡 API — DummyJSON

All product data is fetched live from **[DummyJSON](https://dummyjson.com)** — completely free, no API key, no sign-up.

| Endpoint | Returns |
|----------|---------|
| `GET /products?limit=100` | All 100 products with full details |
| `GET /products/search?q=apple` | Products matching the search query |
| `GET /products/category/beauty` | All products in a specific category |
| `GET /products/category-list` | Array of all available category slugs |
| `GET /products/:id` | Single product — images, reviews, stock, specs |

---

## 📁 Project Structure

```
shopnest/
├── public/
├── src/
│   ├── assets/
│   │   └── icons/               # All PNG icons from Flaticon
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
│   │   ├── Header.tsx            # Sticky header: logo, search bar, mega menu, auth
│   │   ├── Header.css
│   │   ├── Herobanner.tsx        # Home page: hero slider + product grid
│   │   ├── Herobanner.css
│   │   ├── Productdetail.tsx     # Full product detail with gallery and reviews
│   │   ├── Productdetail.css
│   │   ├── Locationmodal.tsx     # Delivery location picker with OpenStreetMap
│   │   ├── Locationmodal.css
│   │   ├── Footer.tsx            # Footer: popular searches, support, links grid
│   │   ├── Footer.css
│   │   ├── Searchpage.tsx        # Search results + sidebar filters
│   │   ├── Searchpage.css
│   │   ├── Cartpage.tsx          # Shopping cart with quantity controls
│   │   ├── Cartpage.css
│   │   ├── Favoritespage.tsx     # Wishlist page
│   │   ├── Favoritespage.css
│   │   ├── Paymentpage.tsx       # Checkout form with card formatting
│   │   ├── Paymentpage.css
│   │   ├── Loginpage.tsx         # Login form
│   │   ├── Signuppage.tsx        # Signup form with password strength
│   │   └── AuthPages.css         # Shared styles for login and signup
│   │
│   ├── store/
│   │   ├── index.ts              # Redux store configuration
│   │   ├── hooks.ts              # useAppSelector / useAppDispatch
│   │   └── slices/
│   │       ├── authSlice.ts      # User login state
│   │       ├── cartSlice.ts      # Cart items, count, total price
│   │       ├── favoriteSlice.ts  # Wishlist items
│   │       ├── locationSlice.ts  # Delivery city and coordinates
│   │       ├── ProductsSlice.ts  # Products list, categories, API status
│   │       ├── categorySlice.ts  # Active category selection
│   │       └── Adsslice.ts       # Promo banner show/hide
│   │
│   ├── App.tsx                   # Root component with all routes
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global base styles
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

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

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

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
5. Done — your app is live in about 60 seconds

---

## 🔄 Redux State Management

The app uses **Redux Toolkit** with **7 slices** — each slice manages one independent part of the application:

| Slice | What It Stores | Actions |
|-------|---------------|---------|
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

<br/>

Icons by [Flaticon](https://flaticon.com) &nbsp;•&nbsp; Product data by [DummyJSON](https://dummyjson.com) &nbsp;•&nbsp; Map by [OpenStreetMap](https://openstreetmap.org)

<br/>

⭐ **If this project helped you, please give it a star on GitHub!**

</div>
