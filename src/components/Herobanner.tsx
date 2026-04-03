import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Herobanner.css";
import fireIcon  from "../assets/icons/fire.png";
import rightArrow from "../assets/icons/right-arrow.svg";
import cartIconImg from "../assets/icons/carrt.png";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleAds } from "../store/slices/Adsslice";
import { fetchProducts } from "../store/slices/ProductsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toggleFavorite } from "../store/slices/favoriteSlice";

const SLIDES_EN = [
  { id:1, slideClass:"slide-1", subtitle:"Back to School",  titleLine1:"Write It.", titleLine2:"Plan It.",    titleLine3:"Slay It",  description:"Notebooks",    image:"https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=900&q=80" },
  { id:2, slideClass:"slide-2", subtitle:"New Arrivals",    titleLine1:"Color It.", titleLine2:"Draw It.",    titleLine3:"Own It",   description:"Art Supplies", image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80" },
  { id:3, slideClass:"slide-3", subtitle:"Best Sellers",    titleLine1:"Organize.", titleLine2:"Prioritize.", titleLine3:"Achieve",  description:"Planners",     image:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80" },
];
function renderStars(r: number) {
  return "★".repeat(Math.floor(r)) + (r%1>=0.5?"½":"") + "☆".repeat(5-Math.floor(r)-(r%1>=0.5?1:0));
}
function getBadge(d: number) { return d>=15?"SALE":d>=10?"HOT":null; }

function HeroBanner() {
  const dispatch       = useAppDispatch();
  const navigate       = useNavigate();
  const adsVisible     = useAppSelector((s) => s.ads.isVisible);
  const products       = useAppSelector((s) => s.products.items);
  const status         = useAppSelector((s) => s.products.status);
  const activeCategory = useAppSelector((s) => s.category.activeCategory);
  const favItems       = useAppSelector((s) => s.favorites.items);

  const SLIDES = SLIDES_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [promoBg, setPromoBg] = useState<"orange"|"black"|"white">("orange");
  const [cartAlert, setCartAlert] = useState<string | null>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval>|null>(null);
  const promoRef  = useRef<ReturnType<typeof setInterval>|null>(null);

 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  useEffect(() => {
    if (status === "failed") {
      const timer = setTimeout(() => dispatch(fetchProducts()), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  const slidesLengthRef = useRef(SLIDES.length);
  slidesLengthRef.current = SLIDES.length;

  const stopAutoPlay = useRef(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }).current;

  const startAutoPlay = useRef(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slidesLengthRef.current),
      4500
    );
  }).current;


  useEffect(() => { startAutoPlay(); return stopAutoPlay; }, []);

  useEffect(() => {
    if (!adsVisible) return;
    const colors: Array<"orange"|"black"|"white"> = ["orange","black","white"];
    let idx = 0;
    promoRef.current = setInterval(() => { idx=(idx+1)%3; setPromoBg(colors[idx]); }, 1400);
    return () => { if (promoRef.current) clearInterval(promoRef.current); };
  }, [adsVisible]);

  function goTo(i: number) { stopAutoPlay(); setCurrentSlide(i); startAutoPlay(); }
  function isFav(id: number) { return favItems.some((f) => f.id === id); }

  function formatCategory(slug: string) {
    if (slug === "all") return "All Products";
    return slug.split("-").map((w) => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
  }

  function handleAddToCart(product: typeof products[0]) {
    dispatch(addToCart({
      id: product.id, title: product.title, price: product.price,
      thumbnail: product.thumbnail, category: product.category,
      discountPercentage: product.discountPercentage,
    }));
    const msg = `✅ "${product.title}" added to cart!`;
    setCartAlert(msg);
    setTimeout(() => setCartAlert(null), 2500);
  }

 
  const validProducts = products.filter(
    (p) => p.thumbnail && p.title && p.price > 0
  );

  return (
    <section className="hero-section">

      {/* Cart Alert Toast */}
      {cartAlert && (
        <div className="cart-alert-toast">
          {cartAlert}
          <button onClick={() => { setCartAlert(null); navigate("/cart"); }} className="cart-alert-view">
            View Cart
          </button>
        </div>
      )}

      {/* PROMO BANNER */}
      {adsVisible && (
        <div className={`promo-banner promo-${promoBg}`}>
          <div className="promo-left">
            <span className="promo-tag"><img src={fireIcon} alt="fire" className="fire-icon"/> {"Limited"}</span>
            <span className="promo-text">{"Free shipping on all orders over $50 — Today only!"}</span>
          </div>
          <button className="promo-banner-cta" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
            {"Grab the Deal"}
          </button>
          <button className="promo-banner-close" onClick={() => dispatch(toggleAds())}>×</button>
        </div>
      )}

      {/* SLIDER */}
      <div className="hero-slider">
        <div className="slider-track" style={{ transform:`translateX(-${currentSlide*100}%)` }}>
          {SLIDES.map((slide) => (
            <div key={slide.id} className={`slide ${slide.slideClass}`} >
              <div className="slide-content">
                <p className="slide-subtitle">{slide.subtitle}</p>
                <h2 className="slide-title">
                  {slide.titleLine1}<br/>{slide.titleLine2}<br/>
                  <span>{slide.titleLine3}</span>
                </h2>
                <p className="slide-desc">{slide.description}</p>
                <button className="slide-btn">{"SHOP NOW"}</button>
              </div>
              <img src={slide.image} alt={slide.description} className="slide-image"/>
            </div>
          ))}
        </div>
        <button className="slider-arrow prev" onClick={() => goTo((currentSlide-1+SLIDES.length)%SLIDES.length)}>
          ‹
        </button>
        <button className="slider-arrow next" onClick={() => goTo((currentSlide+1)%SLIDES.length)}>
          ›
        </button>
        <div className="slider-dots">
          {SLIDES.map((_,i) => <button key={i} className={`slider-dot ${i===currentSlide?"active":""}`} onClick={() => goTo(i)}/>)}
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="products-section-header">
        <h2 className="section-title">
          <span>{formatCategory(activeCategory)}</span>
          {status==="succeeded" && (
            <small className="products-count"> ({validProducts.length} {"products"})</small>
          )}
        </h2>
      </div>

      {/* PRODUCT GRID */}
      <div className="products-grid-wrapper">
        {status==="loading" && (
          <div className="products-grid">
            {Array.from({length:8}).map((_,i) => (
              <div key={i} className="product-card-skeleton">
                <div className="skeleton-image"/>
                <div className="skeleton-body">
                  <div className="skeleton-line long"/><div className="skeleton-line short"/><div className="skeleton-line medium"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {status==="failed" && (
          <div className="products-error">
            <p>⚠️ {"Failed to load products."}</p>
            <button onClick={() => dispatch(fetchProducts())}>{"Retry"}</button>
          </div>
        )}

        {status==="succeeded" && (
          <div className="products-grid">
            {validProducts.length===0
              ? <p className="products-empty">{"No products found."}</p>
              : validProducts.map((product) => {
                const badge         = getBadge(product.discountPercentage);
                const originalPrice = +(product.price/(1-product.discountPercentage/100)).toFixed(2);
                const fav           = isFav(product.id);
              

                return (
                  <div key={product.id} className="product-card">
                    {/* FAV btn top-left */}
                    <button
                      className={`product-fav-btn ${fav?"active":""}`}
                      onClick={() => dispatch(toggleFavorite({
                        id:product.id, title:product.title, price:product.price,
                        thumbnail:product.thumbnail, category:product.category,
                        rating:product.rating, discountPercentage:product.discountPercentage,
                      }))}
                    >{fav?"♥":"♡"}</button>

                    <Link to={`/product/${product.id}`} className="product-card-link">
                      <div className="product-card-image">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                          onError={(e) => {
                        
                            const card = (e.target as HTMLElement).closest('.product-card') as HTMLElement;
                            if (card) card.style.display = 'none';
                          }}
                        />
                        {badge && <span className={`product-badge ${badge}`}>{badge}</span>}
                        {product.discountPercentage>0 && (
                          <span className="product-discount">-{Math.round(product.discountPercentage)}%</span>
                        )}
                      </div>
                      <div className="product-card-body">
                        <p className="product-card-category">{product.category}</p>
                        <p className="product-card-name">{product.title}</p>
                        <div className="product-card-rating">
                          <span className="reviews-count">({product.rating.toFixed(1)})</span>
                          <span className="stars">{renderStars(product.rating)}</span>
                        </div>
                        <div className="product-card-price">
                          {product.discountPercentage>0 && (
                            <span className="price-original">${originalPrice}</span>
                          )}
                          <span className="price-current">${product.price.toFixed(2)}</span>
                        </div>
                        <div className={`product-stock ${product.availabilityStatus==="In Stock"?"in":"low"}`}>
                          {product.availabilityStatus}
                        </div>
                      </div>
                    </Link>

                    <button
                      className="product-add-cart"
                      onClick={() => handleAddToCart(product)}
                    ><img src={cartIconImg} alt="cart" className="product-cart-icon"/> {"Add to Cart"}</button>
                  </div>
                );
              })}
          </div>
        )}
      </div>


    </section>
  );
}

export default HeroBanner;