import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { searchProducts, fetchProductsByCategory, fetchProducts, fetchCategories } from "../store/slices/ProductsSlice";
import LocationModal from "./Locationmodal";

import downArrowIcon   from "../assets/icons/down-arrow.png";
import searchIcon      from "../assets/icons/search.png";
import shoppingBagIcon from "../assets/icons/shopping-bag.png";
import userIcon        from "../assets/icons/user.png";
import favoriteIcon    from "../assets/icons/fav.png";
import cartIcon        from "../assets/icons/cart.png";

const MEGA_MENUS: Record<string, {
  columns: { heading: string; items: string[] }[];
  brands: string[];
  image: string;
}> = {
  "electronics": {
    columns: [
      { heading: "PHONES",    items: ["Smartphones","Tablets","Accessories","Cases","Chargers"] },
      { heading: "COMPUTERS", items: ["Laptops","Desktops","Monitors","Keyboards","Mouse"] },
      { heading: "AUDIO",     items: ["Headphones","Earbuds","Speakers","Microphones"] },
      { heading: "TV & MORE", items: ["Televisions","Cameras","Gaming","Smart Home"] },
    ],
    brands: ["Apple","Samsung","Sony","LG","Huawei","Xiaomi","HP","Dell","Lenovo","ASUS"],
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  "womens-fashion": {
    columns: [
      { heading: "CLOTHING",   items: ["Tops","Dresses","Pants","Jeans","Bodysuits"] },
      { heading: "SPORTSWEAR", items: ["Leggings","Shorts","Sport Bras","Sneakers"] },
      { heading: "FOOTWEAR",   items: ["Sneakers","Sandals","Heels","Boots","Flip Flops"] },
      { heading: "BAGS & ACC", items: ["Totes","Shoulder Bags","Wallets","Jewelry","Watches"] },
    ],
    brands: ["DeFacto","trendyol","LC WAIKIKI","adidas","Skechers","Mango","Puma","Desigual"],
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
  },
  "mens-fashion": {
    columns: [
      { heading: "CLOTHING",    items: ["T-Shirts","Shirts","Trousers","Jeans","Jackets"] },
      { heading: "FOOTWEAR",    items: ["Sneakers","Sandals","Formal Shoes","Boots"] },
      { heading: "SPORTSWEAR",  items: ["Track Suits","Gym Wear","Sports Shoes","Caps"] },
      { heading: "ACCESSORIES", items: ["Watches","Belts","Wallets","Sunglasses"] },
    ],
    brands: ["Nike","Adidas","Puma","Lacoste","Calvin Klein","Levi's","Under Armour"],
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80",
  },
  "kids-fashion": {
    columns: [
      { heading: "GIRLS",   items: ["Tops","Pants","Dresses","Sportswear","Jackets"] },
      { heading: "BOYS",    items: ["Tops","Pants","Sweaters","Sportswear","Jackets"] },
      { heading: "FOOTWEAR",items: ["Sports Shoes","Sneakers","Accessories","Backpacks"] },
    ],
    brands: ["DeFacto","Junior","adidas","LC WAIKIKI","Nike","Skechers","Okaidi"],
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
  },
  "beauty": {
    columns: [
      { heading: "SKINCARE",  items: ["Face Serum","Moisturizer","Sunscreen","Toner"] },
      { heading: "MAKEUP",    items: ["Foundation","Lipstick","Mascara","Eyeshadow"] },
      { heading: "FRAGRANCE", items: ["Women's Perfume","Men's Perfume","Body Mist","Oud"] },
      { heading: "HAIR",      items: ["Shampoo","Conditioner","Hair Oil","Styling"] },
    ],
    brands: ["L'Oréal","Maybelline","MAC","NYX","Dior","Chanel","Versace","Lattafa"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  },
};


const ALL_CATEGORIES = [
  { label: "All Categories", slug: "" },
  { label: "Electronics", slug: "laptops" },
  { label: "Women's Fashion", slug: "womens-dresses" },
  { label: "Men's Fashion", slug: "mens-shirts" },
  { label: "Kids' Fashion", slug: "tops" },
  { label: "Beauty", slug: "beauty" },
  { label: "Fragrances", slug: "fragrances" },
  { label: "Furniture", slug: "furniture" },
  { label: "Groceries", slug: "groceries" },
  { label: "Home Decoration", slug: "home-decoration" },
  { label: "Kitchen Accessories", slug: "kitchen-accessories" },
  { label: "Laptops", slug: "laptops" },
  { label: "Mens Shirts", slug: "mens-shirts" },
  { label: "Mens Shoes", slug: "mens-shoes" },
  { label: "Mens Watches", slug: "mens-watches" },
  { label: "Mobile Accessories", slug: "mobile-accessories" },
  { label: "Motorcycles", slug: "motorcycle" },
  { label: "Skin Care", slug: "skin-care" },
  { label: "Smartphones", slug: "smartphones" },
  { label: "Sports", slug: "sports-accessories" },
  { label: "Sunglasses", slug: "sunglasses" },
  { label: "Tablets", slug: "tablets" },
  { label: "Tops", slug: "tops" },
  { label: "Vehicle", slug: "vehicle" },
  { label: "Womens Bags", slug: "womens-bags" },
  { label: "Womens Jewellery", slug: "womens-jewellery" },
  { label: "Womens Shoes", slug: "womens-shoes" },
  { label: "Womens Watches", slug: "womens-watches" },
];

const NAV_ITEMS = [
  { label: "Electronics", slug: "smartphones", key: "electronics" },
  { label: "Women's Fashion", slug: "womens-dresses", key: "womens-fashion" },
  { label: "Men's Fashion", slug: "mens-shirts", key: "mens-fashion" },
  { label: "Kids' Fashion", slug: "tops", key: "kids-fashion" },
  { label: "Beauty", slug: "beauty", key: "beauty" },
  { label: "Home & Appliances", slug: "furniture", key: "" },
  { label: "Supermarket", slug: "groceries", key: "" },
  { label: "Automotive", slug: "vehicle", key: "" },
  { label: "Sports", slug: "sports-accessories", key: "" },
  
];

function Header() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();

  const cartCount  = useAppSelector((s) => s.cart.totalCount);
  const favCount   = useAppSelector((s) => s.favorites.totalCount);
  const city       = useAppSelector((s) => s.location.city);
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  const user       = useAppSelector((s) => s.auth.user);
  const categories = useAppSelector((s) => s.products.categories);

  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ label: "All", slug: "" });
  const [showCatDropdown,  setShowCatDropdown]  = useState(false);
  const [dropdownPos,      setDropdownPos]      = useState({ top: 0, left: 0, width: 240 });
  const [isLoginOpen,      setIsLoginOpen]      = useState(false);
  const [showLocation,     setShowLocation]     = useState(false);
  const [activeMega,       setActiveMega]       = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const catRef    = useRef<HTMLDivElement>(null);

  // Fetch categories 
  useEffect(() => {
    dispatch(fetchCategories());
    
  }, []);

 
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setShowCatDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function doSearch(q: string, catSlug: string) {
    if (!q.trim() && !catSlug) {
      dispatch(fetchProducts());
      navigate("/search");
      return;
    }
    if (catSlug && !q.trim()) {
      dispatch(fetchProductsByCategory(catSlug));
      navigate(`/search?category=${encodeURIComponent(catSlug)}&label=${encodeURIComponent(selectedCategory.label)}`);
      return;
    }
   
    dispatch(searchProducts(q.trim()));
    navigate(`/search?q=${encodeURIComponent(q.trim())}${catSlug ? `&category=${catSlug}` : ""}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    doSearch(searchQuery, selectedCategory.slug);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      doSearch(searchQuery, selectedCategory.slug);
    }
  }

  function handleCategorySelect(cat: typeof ALL_CATEGORIES[0]) {
    setSelectedCategory({ label: cat.label, slug: cat.slug });
    setShowCatDropdown(false);
   
    if (!searchQuery.trim()) {
      if (!cat.slug) {
        dispatch(fetchProducts());
        navigate("/search");
      } else {
        dispatch(fetchProductsByCategory(cat.slug));
        navigate(`/search?category=${encodeURIComponent(cat.slug)}&label=${encodeURIComponent(cat.label)}`);
      }
    }
  }

  function handleLogout() {
    dispatch(logout());
    setIsLoginOpen(false);
  }

  function openMega(key: string) {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setActiveMega(key);
  }
  function closeMega() {
    megaTimer.current = setTimeout(() => setActiveMega(null), 140);
  }
  function keepMega() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
  }
  useEffect(() => () => { if (megaTimer.current) clearTimeout(megaTimer.current); }, []);

  const catDisplayLabel = selectedCategory.label;


  const apiCategories = categories.map((slug) => ({
    label: slug.split("-").map((w) => w.charAt(0).toUpperCase()+w.slice(1)).join(" "),
    slug,
  }));
  const catList = ALL_CATEGORIES.length > 0 ? ALL_CATEGORIES : [
    { label: "All Categories", slug: "" },
    ...apiCategories,
  ];

  return (
    <>
      <header className="header">
        <div className="main-header">
          <div className="container">
            <div className="header-content">

              {/* LOGO */}
              <div className="logo" onClick={() => navigate("/")}>
                <img src={shoppingBagIcon} alt="ShopNest" className="logo-icon" />
                <h1>ShopNest</h1>
              </div>

              {/* SEARCH */}
              <div className="search-section">
                <div className="category-search-container">

                  <div className="cat-select-wrapper" ref={catRef}>
                    <button
                      type="button"
                      className="category-dropdown"
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setDropdownPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: 240 });
                        setShowCatDropdown((v) => !v);
                      }}
                    >
                      <span className="cat-label-text">{catDisplayLabel}</span>
                      <img src={downArrowIcon} alt="▼" className="category-arrow" />
                    </button>
                    {showCatDropdown && (
                      <div
                        className="cat-dropdown-panel"
                        style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width + "px" }}
                      >
                        {catList.map((cat) => (
                          <button
                            key={cat.slug + cat.label}
                            type="button"
                            className={`cat-panel-item ${selectedCategory.slug === cat.slug ? "active" : ""}`}
                            onClick={(e) => { e.stopPropagation(); handleCategorySelect(cat); }}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                
                  <form className="search-form-inner" onSubmit={handleSearch} style={{flex:1, display:"flex", alignItems:"center"}}>
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder={"Search products"}
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        />
                    </div>
                    <button type="submit" className="search-button">
                      <img src={searchIcon} alt="search" />
                    </button>
                  </form>
                </div>
              </div>

              {/* AUTH */}
              <div className="auth-section">
                <div className="delivery" onClick={() => setShowLocation(true)}>
                  <span className="delivery-text">{"Deliver to"}</span>
                  <span className="location">
                    {city}
                    <img src={downArrowIcon} alt="v" className="arrow-icon" />
                  </span>
                </div>

                <div className="icon-container" onClick={() => navigate("/favorites")}>
                  <img src={favoriteIcon} alt="favorites" className="action-icon" />
                  {favCount > 0 && <span className="icon-badge">{favCount}</span>}
                </div>

                <div className="icon-container" onClick={() => navigate("/cart")}>
                  <img src={cartIcon} alt="cart" className="action-icon" />
                  {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                </div>

                {!isLoggedIn && (
                  <button className="signin-btn" onClick={() => navigate("/signup")}>
                    <img src={userIcon} alt="user" />
                    <span>{"Sign Up"}</span>
                  </button>
                )}

                <div className="orders-wrapper">
                  <button
                    className="orders-btn"
                    onClick={() => isLoggedIn ? setIsLoginOpen(!isLoginOpen) : navigate("/login")}
                  >
                    <img src={userIcon} alt="login" className="orders-icon" />
                    <span>{isLoggedIn && user ? user.name : "Login"}</span>
                  </button>
                  {isLoginOpen && isLoggedIn && (
                    <>
                      <div className="dropdown-backdrop" onClick={() => setIsLoginOpen(false)} />
                      <div className="dropdown-menu">
                        <a href="#" onClick={handleLogout}>{"Logout"}</a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY NAV */}
        <div className="cat-nav-bar">
          <div className="container">
            <div className="cat-nav-inner">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`cat-nav-item ${activeMega===item.key && item.key ? "active" : ""}`}
                  onMouseEnter={() => item.key ? openMega(item.key) : setActiveMega(null)}
                  onMouseLeave={closeMega}
                  onClick={() => {
                    if (!item.slug) { dispatch(fetchProducts()); navigate("/search"); }
                    else { dispatch(fetchProductsByCategory(item.slug)); navigate(`/search?category=${encodeURIComponent(item.slug)}&label=${encodeURIComponent(item.label)}`); }
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {activeMega && MEGA_MENUS[activeMega] && (
            <div className="mega-menu" onMouseEnter={keepMega} onMouseLeave={closeMega}>
              <div className="container">
                <div className="mega-inner">
                  <div className="mega-columns">
                    {MEGA_MENUS[activeMega].columns.map((col) => (
                      <div key={col.heading} className="mega-col">
                        <p className="mega-col-heading">{col.heading}</p>
                        {col.items.map((item) => (
                          <a key={item} className="mega-col-item"
                            onClick={() => { dispatch(searchProducts(item)); navigate(`/search?q=${encodeURIComponent(item)}`); setActiveMega(null); }}>
                            {item}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega-brands">
                    <p className="mega-brands-title">TOP BRANDS</p>
                    <div className="mega-brands-grid">
                      {MEGA_MENUS[activeMega].brands.map((brand) => (
                        <div key={brand} className="mega-brand-chip"
                          onClick={() => { dispatch(searchProducts(brand)); navigate(`/search?q=${encodeURIComponent(brand)}`); setActiveMega(null); }}>
                          {brand}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mega-img">
                    <img src={MEGA_MENUS[activeMega].image} alt={activeMega} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {showLocation && <LocationModal onClose={() => setShowLocation(false)} />}
    </>
  );
}

export default Header;