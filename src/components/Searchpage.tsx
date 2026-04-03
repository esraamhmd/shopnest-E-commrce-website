import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts, fetchProductsByCategory } from "../store/slices/ProductsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toggleFavorite } from "../store/slices/favoriteSlice";
import searchIcon  from "../assets/icons/search.png";
import cartIconImg from "../assets/icons/carrt.png";
import "./Searchpage.css";

const POPULAR_SEARCHES = [
  "Laptop","Smartphone","Headphones","Watch","Perfume","Sneakers",
  "Skincare","Camera","Tablet","Speaker","Sunglasses","Bag",
  "Jewelry","Keyboard","Monitor","iPhone","Samsung","Nike","Adidas","Mascara",
];

function SearchPage() {
  const navigate   = useNavigate();
  const dispatch   = useAppDispatch();
  const [params]   = useSearchParams();
  const query      = params.get("q") || "";
  const catParam   = params.get("category") || "";
  const labelParam = params.get("label") || "";

  const allProducts = useAppSelector((s) => s.products.items);
  const status     = useAppSelector((s) => s.products.status);
  const categories = useAppSelector((s) => s.products.categories);
  const favItems   = useAppSelector((s) => s.favorites.items);

  const [sortBy,       setSortBy]       = useState("relevance");
  const [selCategory,  setSelCategory]  = useState("");
  const [minPrice,     setMinPrice]     = useState("");
  const [maxPrice,     setMaxPrice]     = useState("");
  const [minRating,    setMinRating]    = useState(0);
  const [selBrand,     setSelBrand]     = useState("");
  const [selSize,      setSelSize]      = useState("");
  const [openSections, setOpenSections] = useState<string[]>(["category","price","rating","brand"]);
  const [currentPage,  setCurrentPage]  = useState(1);
  const [cartAlert,    setCartAlert]    = useState<string | null>(null);
  const [localSearch,  setLocalSearch]  = useState(query);
  const PER_PAGE = 12;

  
  useEffect(() => {
    dispatch(fetchProducts());

  }, []);


  useEffect(() => {
    setCurrentPage(1);
    setLocalSearch(query || labelParam || "");
    if (catParam) {

      dispatch(fetchProductsByCategory(catParam));
    } else if (!query) {
  
      dispatch(fetchProducts());
    }
   
  }, [query, catParam]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = localSearch.trim();
    if (!q) { navigate("/search"); return; }
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function toggleSection(name: string) {
    setOpenSections((p) => p.includes(name) ? p.filter((s) => s !== name) : [...p, name]);
  }
  function isFav(id: number) { return favItems.some((f) => f.id === id); }
  function clearFilters() {
    setSelCategory(""); setMinPrice(""); setMaxPrice("");
    setMinRating(0); setSelBrand(""); setSelSize(""); setSortBy("relevance");
  }

  function handleAddToCart(product: typeof allProducts[0]) {
    dispatch(addToCart({
      id:product.id, title:product.title, price:product.price,
      thumbnail:product.thumbnail, category:product.category,
      discountPercentage:product.discountPercentage,
    }));
    setCartAlert(`"${product.title}" added to cart!`);
    setTimeout(() => setCartAlert(null), 2500);
  }

  const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].slice(0, 20);


  let results = allProducts.filter((p) => p.thumbnail && p.title && p.price > 0);


  if (query) {
    const q = query.toLowerCase();
    const isShort = q.length <= 2;
    results = results.filter((p) => {
      const inTitle    = p.title.toLowerCase().includes(q);
      const inCategory = p.category?.toLowerCase().includes(q) ?? false;
      const inBrand    = p.brand?.toLowerCase().includes(q) ?? false;
      if (isShort) {
       
        return inTitle || inCategory || inBrand;
      }
     
      const inDesc = p.description?.toLowerCase().includes(q) ?? false;
      const inTags = p.tags?.some((tag) => tag.toLowerCase().includes(q)) ?? false;
      return inTitle || inCategory || inBrand || inDesc || inTags;
    });
  }


  if (catParam) results = results.filter((p) => p.category === catParam);


  if (selCategory) results = results.filter((p) => p.category === selCategory);
  if (minPrice)    results = results.filter((p) => p.price >= Number(minPrice));
  if (maxPrice)    results = results.filter((p) => p.price <= Number(maxPrice));
  if (minRating)   results = results.filter((p) => p.rating >= minRating);
  if (selBrand)    results = results.filter((p) => p.brand === selBrand);

  if (sortBy === "price-asc")  results = [...results].sort((a,b) => a.price - b.price);
  if (sortBy === "price-desc") results = [...results].sort((a,b) => b.price - a.price);
  if (sortBy === "rating")     results = [...results].sort((a,b) => b.rating - a.rating);

  const totalPages = Math.ceil(results.length / PER_PAGE);
  const paginated  = results.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);

  function renderStars(r: number) {
    return "★".repeat(Math.floor(r)) + "☆".repeat(5 - Math.floor(r));
  }

  const displayTitle = query || labelParam || "All Products";

  return (
    <div className="search-page">

      {/* Cart Toast */}
      {cartAlert && (
        <div className="cart-alert-toast">
          <img src={cartIconImg} alt="cart" className="toast-cart-icon"/>
          {cartAlert}
          <button onClick={() => { setCartAlert(null); navigate("/cart"); }} className="cart-alert-view">
            View Cart
          </button>
        </div>
      )}

      <div className="search-layout">

        {/* ── SIDEBAR ── */}
        <aside className="search-sidebar">
          <div className="sidebar-header">
            <h2>{"Filters"}</h2>
            <button className="clear-all-btn" onClick={clearFilters}>{"Clear All"}</button>
          </div>

          {/* Category */}
          <div className="filter-group">
            <button className="filter-group-header" onClick={() => toggleSection("category")}>
              <span>{"Category"}</span>
              <div className="filter-header-right">
                {selCategory && <span className="filter-clear-tag" onClick={(e) => { e.stopPropagation(); setSelCategory(""); }}>{"Clear"}</span>}
                <span className={`filter-chevron ${openSections.includes("category")?"open":""}`}>›</span>
              </div>
            </button>
            {openSections.includes("category") && (
              <div className="filter-options">
                {categories.map((cat) => (
                  <label key={cat} className="filter-option">
                    <input type="radio" name="cat" checked={selCategory===cat} onChange={() => setSelCategory(cat)}/>
                    <span>{cat.split("-").map((w) => w.charAt(0).toUpperCase()+w.slice(1)).join(" ")}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand */}
          <div className="filter-group">
            <button className="filter-group-header" onClick={() => toggleSection("brand")}>
              <span>{"Brand"}</span>
              <div className="filter-header-right">
                {selBrand && <span className="filter-clear-tag" onClick={(e) => { e.stopPropagation(); setSelBrand(""); }}>{"Clear"}</span>}
                <span className={`filter-chevron ${openSections.includes("brand")?"open":""}`}>›</span>
              </div>
            </button>
            {openSections.includes("brand") && (
              <div className="filter-options filter-scroll">
                {brands.map((brand) => (
                  <label key={brand} className="filter-option">
                    <input type="radio" name="brand" checked={selBrand===brand} onChange={() => setSelBrand(brand)}/>
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="filter-group">
            <button className="filter-group-header" onClick={() => toggleSection("price")}>
              <span>{"Price"}</span>
              <span className={`filter-chevron ${openSections.includes("price")?"open":""}`}>›</span>
            </button>
            {openSections.includes("price") && (
              <div className="filter-price">
                <input type="number" placeholder="Min $" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
                <span>—</span>
                <input type="number" placeholder="Max $" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="filter-group">
            <button className="filter-group-header" onClick={() => toggleSection("rating")}>
              <span>{"Product Rating"}</span>
              <span className={`filter-chevron ${openSections.includes("rating")?"open":""}`}>›</span>
            </button>
            {openSections.includes("rating") && (
              <div className="filter-options">
                {[4,3,2,1].map((r) => (
                  <label key={r} className="filter-option">
                    <input type="radio" name="rating" checked={minRating===r} onChange={() => setMinRating(r)}/>
                    <span className="filter-stars-row">
                      <span className="filter-stars">{"★".repeat(r)}{"☆".repeat(5-r)}</span>
                      <span className="filter-stars-label"> & up</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div className="filter-group">
            <button className="filter-group-header" onClick={() => toggleSection("size")}>
              <span>{"Size"}</span>
              <span className={`filter-chevron ${openSections.includes("size")?"open":""}`}>›</span>
            </button>
            {openSections.includes("size") && (
              <div className="filter-options filter-sizes">
                {["XS","S","M","L","XL","XXL"].map((s) => (
                  <label key={s} className="size-chip">
                    <input type="radio" name="size" checked={selSize===s} onChange={() => setSelSize(selSize===s?"":s)}/>
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/*  RESULTS */}
        <main className="search-results">

      
          <form className="search-results-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={"Search products"}
              className="search-results-input"
              autoComplete="off"
            />
            <button type="submit" className="search-results-btn">
              <img src={searchIcon} alt="search"/>
            </button>
          </form>

          {/* Results header */}
          <div className="results-header">
            <div className="results-info">
              {displayTitle && <span className="results-query">"{displayTitle}"</span>}
              {status==="succeeded" && (
                <span className="results-count">{results.length} {"results"}</span>
              )}
            </div>
            <div className="results-sort">
              <label>{"Sort by"}:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Loading */}
          {status==="loading" && (
            <div className="search-grid">
              {Array.from({length:6}).map((_,i) => (
                <div key={i} className="search-card-skeleton">
                  <div className="skel-img"/><div className="skel-body"><div className="skel-line long"/><div className="skel-line short"/></div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {status==="succeeded" && results.length===0 && (
            <div className="no-results">
              <p>{"No results found"}</p>
              <p className="no-results-sub">Try different keywords or browse categories</p>
            </div>
          )}

          {/* Products grid */}
          {status==="succeeded" && paginated.length>0 && (
            <div className="search-grid">
              {paginated.map((product) => {
                const originalPrice = +(product.price/(1-product.discountPercentage/100)).toFixed(2);
                const fav = isFav(product.id);
                return (
                  <div key={product.id} className="search-card">
                    <Link to={`/product/${product.id}`} className="search-card-img-wrap">
                      <img src={product.thumbnail} alt={product.title} loading="lazy"
                        onError={(e) => {
                          const card = (e.target as HTMLElement).closest('.search-card') as HTMLElement;
                          if (card) card.style.display = 'none';
                        }}
                      />
                      {product.discountPercentage>0 && (
                        <span className="search-badge">-{Math.round(product.discountPercentage)}%</span>
                      )}
                    </Link>
                    <button
                      className={`search-fav-btn ${fav?"active":""}`}
                      onClick={() => dispatch(toggleFavorite({
                        id:product.id, title:product.title, price:product.price,
                        thumbnail:product.thumbnail, category:product.category,
                        rating:product.rating, discountPercentage:product.discountPercentage,
                      }))}
                    >{fav?"♥":"♡"}</button>
                    <div className="search-card-body">
                      <p className="search-card-cat">{product.category}</p>
                      <Link to={`/product/${product.id}`} className="search-card-title">{product.title}</Link>
                      <div className="search-card-rating">
                        <span className="search-stars">{renderStars(product.rating)}</span>
                        <span className="search-rating-num">{product.rating.toFixed(1)}</span>
                      </div>
                      <div className="search-card-price">
                        <span className="search-price-current">${product.price.toFixed(2)}</span>
                        {product.discountPercentage>0 && (
                          <span className="search-price-original">${originalPrice}</span>
                        )}
                      </div>
                      <button className="search-add-cart" onClick={() => handleAddToCart(product)}>
                        <img src={cartIconImg} alt="cart" className="btn-cart-icon"/>
                        {"Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => setCurrentPage((p) => Math.max(1,p-1))} disabled={currentPage===1}>
                ‹
              </button>
              {Array.from({length: Math.min(totalPages, 3)}, (_,i) => i+1).map((p) => (
                <button key={p} className={`page-btn ${currentPage===p?"active":""}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              {totalPages > 4 && <span className="page-ellipsis">...</span>}
              {totalPages > 3 && (
                <button className={`page-btn ${currentPage===totalPages?"active":""}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
              )}
              <button className="page-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}>
                ›
              </button>
            </div>
          )}

          {/* Popular searches */}
          {!query && !catParam && (
            <div className="popular-searches">
              <h3>{"Popular Searches"}</h3>
              <div className="popular-tags">
                {POPULAR_SEARCHES.map((s) => (
                  <button key={s} className="popular-tag" onClick={() => { setLocalSearch(s); navigate(`/search?q=${encodeURIComponent(s)}`); }}>{s}</button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default SearchPage;