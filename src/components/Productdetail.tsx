import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Productdetail.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import { toggleFavorite } from "../store/slices/favoriteSlice";

interface Review { rating: number; comment: string; date: string; reviewerName: string; }
interface ProductFull {
  id: number; title: string; description: string; category: string;
  price: number; discountPercentage: number; rating: number; stock: number;
  brand: string; thumbnail: string; images: string[]; tags: string[];
  availabilityStatus: string; warrantyInformation: string; shippingInformation: string;
  reviews: Review[];
}

function ProductDetail() {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch();
  const favItems  = useAppSelector((s) => s.favorites.items);
  const cartCount = useAppSelector((s) => s.cart.totalCount);

  const [product,   setProduct]   = useState<ProductFull | null>(null);
  const [related,   setRelated]   = useState<ProductFull[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [qty,       setQty]       = useState(1);
  const [addedMsg,  setAddedMsg]  = useState(false);

  const isFav = product ? favItems.some((f) => f.id === product.id) : false;

  useEffect(() => {
    if (!id) return;
    setLoading(true); setError(false); setProduct(null); setRelated([]); setActiveImg(0); setQty(1);
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data: ProductFull = await res.json();
        if (cancelled) return;
        setProduct(data); setLoading(false);
        const relRes  = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=5`);
        const relData = await relRes.json();
        if (cancelled) return;
        setRelated(relData.products.filter((p: ProductFull) => p.id !== data.id).slice(0, 4));
      } catch { if (cancelled) return; setError(true); setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  function renderStars(r: number) {
    return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.floor(r) - (r % 1 >= 0.5 ? 1 : 0));
  }

  function handleAddToCart() {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, category: product.category, discountPercentage: product.discountPercentage }));
    }
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  }

  function handleToggleFav() {
    if (!product) return;
    dispatch(toggleFavorite({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, category: product.category, rating: product.rating, discountPercentage: product.discountPercentage }));
  }

  if (loading) return (
    <div className="pd-page"><div className="pd-loading">
      <div className="pd-skeleton-img"/>
      <div className="pd-skeleton-info">
        {[90,60,40,80,50].map((w,i) => <div key={i} className="pd-skeleton-line" style={{width:`${w}%`}}/>)}
      </div>
    </div></div>
  );

  if (error || !product) return (
    <div className="pd-not-found"><h2>Product not found</h2>
      <button className="pd-back-btn" onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  );

  const originalPrice = +(product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const discount      = Math.round(product.discountPercentage);
  const allImages     = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="pd-page">


      <div className="pd-container">
        {/* Gallery */}
        <div className="pd-image-col">
          <div className="pd-main-image-wrap">
            <img src={allImages[activeImg]} alt={product.title} className="pd-main-image"/>
            {discount > 0 && <span className="pd-discount-tag">-{discount}%</span>}
            <button className={`pd-fav-float ${isFav ? "active" : ""}`} onClick={handleToggleFav}>
              {isFav ? "♥" : "♡"}
            </button>
          </div>
          {allImages.length > 1 && (
            <div className="pd-thumbnails">
              {allImages.map((img, i) => (
                <button key={i} className={`pd-thumb ${i === activeImg ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt={`view ${i + 1}`}/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pd-info-col">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-name">{product.title}</h1>
          {product.brand && <p className="pd-brand">{"by"} <strong>{product.brand}</strong></p>}

          <div className="pd-rating-row">
            <span className="pd-stars">{renderStars(product.rating)}</span>
            <span className="pd-rating-num">{product.rating.toFixed(1)}</span>
            <span className="pd-reviews">({product.reviews?.length ?? 0} {"reviews"})</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price-current">${product.price.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <span className="pd-price-original">${originalPrice}</span>
                <span className="pd-price-save">{"Save"} ${(originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="pd-description">{product.description}</p>

          {product.tags?.length > 0 && (
            <div className="pd-tags">
              {product.tags.map((tag) => <span key={tag} className="pd-tag">{tag}</span>)}
            </div>
          )}

          <div className="pd-meta">
            <span>🚚 {product.shippingInformation}</span>
            <span>🛡️ {product.warrantyInformation}</span>
          </div>

          <div className="pd-stock-row">
            <span className={`pd-stock-badge ${product.availabilityStatus === "In Stock" ? "in" : "low"}`}>
              {product.availabilityStatus}
            </span>
            {product.stock > 0 && <span className="pd-stock-count">{product.stock} left</span>}
          </div>

          <div className="pd-qty-row">
            <span className="pd-qty-label">{"Qty"}:</span>
            <div className="pd-qty-controls">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          {addedMsg && <div className="pd-added-msg">✅ Added to cart!</div>}

          <div className="pd-actions">
            <button className="pd-btn-cart" onClick={handleAddToCart}>🛒 {"Add to Cart"}</button>
            <button className={`pd-btn-fav ${isFav ? "active" : ""}`} onClick={handleToggleFav}>
              {isFav ? "♥" : "♡"}
            </button>
          </div>

          <button className="pd-goto-cart" onClick={() => navigate("/cart")}>
            View Cart ({cartCount} items) →
          </button>

          <button className="pd-back-btn" onClick={() => navigate(-1)}>← {"Back to Products"}</button>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <div className="pd-reviews-section">
          <h2 className="pd-reviews-title">{"Customer Reviews"}</h2>
          <div className="pd-reviews-grid">
            {product.reviews.map((rev, i) => (
              <div key={i} className="pd-review-card">
                <div className="pd-review-header">
                  <span className="pd-reviewer">{rev.reviewerName}</span>
                  <span className="pd-review-stars">{renderStars(rev.rating)}</span>
                </div>
                <p className="pd-review-comment">{rev.comment}</p>
                <p className="pd-review-date">{new Date(rev.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="pd-related">
          <h2 className="pd-related-title">{"Related Products"}</h2>
          <div className="pd-related-grid">
            {related.map((rel) => (
              <div key={rel.id} className="pd-related-card"
                onClick={() => { navigate(`/product/${rel.id}`); window.scrollTo(0, 0); }}>
                <div className="pd-related-image"><img src={rel.thumbnail} alt={rel.title}/></div>
                <p className="pd-related-name">{rel.title}</p>
                <p className="pd-related-price">${rel.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;