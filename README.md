# 🛍️ ShopNest —  e-commerce web app

<div align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />

<img src="https://img.shields.io/badge/DummyJSON-API-f97316?style=for-the-badge" />
<img src="https://img.shields.io/badge/Flaticon-Icons-00B1EA?style=for-the-badge" />

<br/><br/>

### A full-featured, responsive e-commerce web application built from scratch with React, TypeScript, Redux Toolkit.
<br/>


<br/>


<img width="1918" height="907" alt="d" src="https://github.com/user-attachments/assets/2936812e-b856-4296-859d-709f3b5a5445" />




</div>

---

## 📖 Introduction

**ShopNest** is a complete front-end e-commerce application that delivers a full online shopping experience. Every feature — from browsing and searching products, to managing a cart and completing checkout — is fully implemented with real data, real validation, and real state management.

This project was built entirely from scratch with no UI libraries or component frameworks. Every button, card, form, modal, slider, and layout was hand-coded using React and custom CSS.

### What makes ShopNest different from tutorial projects?

| Typical Tutorial Project | ShopNest |
|--------------------------|----------|
| Fake or hardcoded product data | ✅ Live data from DummyJSON REST API |
| No real search logic | ✅ Smart client-side search with false-match prevention |
| Basic or no form validation | ✅ Full per-field validation with real-time feedback |
| Simple state with useState only | ✅ Redux Toolkit with 7 independent slices |
| Desktop only | ✅ Fully responsive — mobile, tablet, and desktop |
| UI library such as Bootstrap | ✅ 100% custom CSS — hand-written from scratch |
| No real icons | ✅ Professional icons from Flaticon |

---

## 🎬 Demo Video





https://github.com/user-attachments/assets/65b899ad-9dac-4629-9cce-715c1c2a4a8a





---

## ✨ Features

### 🔍 Smart Search
- Searches product **title**, **category**, and **brand** at the same time
- Short queries (1–2 characters) are precise — description is excluded to avoid false matches
- Longer queries (3+ characters) search all fields including description and tags
- Category dropdown to search within a specific department
- Popular search tag cloud for fast discovery

### 🗂️ Category Browsing
- Dropdown with **28 categories** — opens directly below the search bar
- Hover **mega menus** for Electronics, Fashion, Beauty, Kids, and Home
- Each mega menu shows sub-categories and top brand chips
- Category nav bar visible on every page
- Each category click fetches real products from the API

### 🛒 Shopping Cart
- Add, remove, and update quantity for any product
- Live subtotal, shipping fee, and total price
- Free shipping applied automatically on orders over $50
- Cart badge in the header updates in real time

### ❤️ Wishlist
- Toggle favorites from any product card or product detail page
- Dedicated wishlist page with all saved items
- Add any wishlist item directly to cart with one click

### 📦 Product Detail Page
- Full image gallery with clickable thumbnail navigation
- Customer reviews with star ratings and dates
- Related products loaded from the same category
- Stock availability: In Stock or Low Stock
- Quantity selector before adding to cart

### 💳 Checkout and Payment
- Shipping info: first name, last name, address, city, phone
- Two payment methods: Credit/Debit Card or Cash on Delivery
- Card number auto-formats with a space every 4 digits
- Expiry date auto-formats as MM/YY
- All fields validated before the order is submitted
- Order success screen shown after confirmation

### 🔐 Authentication
- **Login** — validates email format and password length
- **Signup** — first name, last name, email, password, confirm password
- Live password strength meter: Weak, Medium, or Strong
- Password match indicator shown in real time as you type
- Terms and Conditions checkbox required to proceed
- Every error appears next to its own field

### 📍 Location Picker
- Real **OpenStreetMap** embedded inside a modal
- Choose from 15 delivery cities
- Selected city updates the "Deliver to" label in the header via Redux

### 🎠 Hero Banner Slider
- Auto-plays every 4.5 seconds through 3 slides
- Manual previous and next arrows with dot indicators
- Animated promo strip that cycles colors
- Call-to-action button on each slide

### 🔔 Toast Notifications
- A success alert appears every time a product is added to cart
- Shows the product name and a "View Cart" shortcut button
- Disappears automatically after 2.5 seconds

### 📱 Fully Responsive Design

| Screen Size | What Changes |
|-------------|-------------|
| Larger than 1024px | Full layout — mega menus, 4-column grid, all elements visible |
| 768 to 1024px | Mega menus hidden, 3-column grid, compact header |
| 600 to 768px | Search bar moves to second row, buttons show icons only, 2-column grid |
| 400 to 600px | Sidebar stacks above results, form fields stack vertically |
| Smaller than 400px | Single column, logo text hidden, minimal interface |

---

## 🚀 Tech Stack

### ⚛️ React
React is the core UI framework. The entire app is built as a tree of reusable components. Each page — Home, Search, Cart, Checkout, Login — is its own component. React hooks such as `useState`, `useEffect`, `useRef`, and `useNavigate` are used throughout for local state, side effects, DOM references, and navigation.

### 🔷 TypeScript
TypeScript adds static typing on top of JavaScript. Every component, Redux slice, and function has typed props and return values. This catches bugs before the app runs — for example, if a product price field is accidentally treated as a string, TypeScript throws an error immediately in the editor instead of failing silently at runtime.

### 🟣 Redux Toolkit
Redux Toolkit manages all global state — data that multiple components across different pages need to share. The cart, wishlist, user login status, selected city, and product list are all stored in Redux so any component can read or update them without passing props through many layers.

### 🔴 React Router DOM
Handles all navigation between pages without reloading the browser. Each URL maps to a different component. The browser address bar updates when navigating but the page never fully reloads — this is called client-side routing.


### 🟠 DummyJSON API
All product data is fetched live from [dummyjson.com](https://dummyjson.com) — a free public REST API with no authentication required. It provides 100 products across 28 categories, each with images, prices, ratings, reviews, and stock information.

### 🗺️ OpenStreetMap
The delivery location picker uses a real embedded OpenStreetMap. It is completely free with no API key required.

### 🎨 Flaticon
All UI icons — search, cart, heart, user, location pin, arrow, trash, fire, phone, email, and more — come from [Flaticon](https://flaticon.com), the world's largest free icon library. Icons are downloaded as PNG files and imported directly into components.

### 🖌️ Custom CSS
Every style in ShopNest was written by hand. No Bootstrap, no Tailwind, no Material UI — just pure CSS with flexbox, grid, media queries, transitions, and animations.

---

## 🔄 Redux State Management

| Slice | What It Stores | Actions |
|-------|---------------|---------|
| `auth` | Login status, user name, user email | `login`, `logout` |
| `cart` | Cart items, total count, total price | `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` |
| `favorites` | Wishlist items, total count | `toggleFavorite`, `removeFromFavorites` |
| `products` | Product list, categories, fetch status | `fetchProducts`, `fetchProductsByCategory`, `fetchCategories` |
| `location` | Selected city, latitude, longitude | `setCity`, `setCoords` |
| `category` | Active category | `setActiveCategory` |
| `ads` | Promo banner visibility | `toggleAds` |

---
## 🔗 Live  Demo 

https://esraamhmd.github.io/shopnest-E-commrce-website/ 

## 📡 API Reference — DummyJSON

All product data is fetched live from **[DummyJSON](https://dummyjson.com)** — free, no API key, no sign-up needed.

| Endpoint | Returns |
|----------|---------|
| `GET /products?limit=100` | All 100 products with full details |
| `GET /products/search?q=apple` | Products matching the search query |
| `GET /products/category/beauty` | All products in a specific category |
| `GET /products/category-list` | List of all available category slugs |
| `GET /products/:id` | Single product with images, reviews, and stock info |

---


## 📄 License

MIT License — free to use for learning, portfolios, and commercial projects.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Redux Toolkit**

<br/>


