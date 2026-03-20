import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromFavorites } from "../store/slices/favoriteSlice";
import { addToCart } from "../store/slices/cartSlice";
import deleteIcon  from "../assets/icons/delete.png";
import cartIconImg from "../assets/icons/carrt.png";
import "./Favoritespage.css";

function FavoritesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items    = useAppSelector((s) => s.favorites.items);

  return (
    <div className="fav-page">
      <div className="fav-container">
        <h1 className="fav-title">{"My Wishlist"}</h1>
        {items.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">♡</div>
            <p>{"Your wishlist is empty"}</p>
            <p className="fav-empty-desc">"Save your favorite products here"</p>
            <button className="fav-continue-btn" onClick={() => navigate("/")}>{"Explore Products"}</button>
          </div>
        ) : (
          <div className="fav-grid">
            {items.map((item) => {
              const originalPrice = +(item.price/(1-item.discountPercentage/100)).toFixed(2);
              return (
                <div key={item.id} className="fav-card">
                  <div className="fav-card-img" onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.thumbnail} alt={item.title}
                      onError={(e) => {
                        const card = (e.target as HTMLElement).closest('.fav-card') as HTMLElement;
                        if (card) card.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="fav-card-body">
                    <p className="fav-card-category">{item.category}</p>
                    <p className="fav-card-title" onClick={() => navigate(`/product/${item.id}`)}>{item.title}</p>
                    <div className="fav-card-rating">
                      {"★".repeat(Math.floor(item.rating))}{"☆".repeat(5-Math.floor(item.rating))}
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <div className="fav-card-price">
                      <span className="fav-price-current">${item.price.toFixed(2)}</span>
                      {item.discountPercentage>0 && <span className="fav-price-original">${originalPrice}</span>}
                    </div>
                    <div className="fav-card-actions">
                      <button className="fav-add-btn" onClick={() => dispatch(addToCart({
                        id:item.id, title:item.title, price:item.price,
                        thumbnail:item.thumbnail, category:item.category,
                        discountPercentage:item.discountPercentage,
                      }))}>
                        <img src={cartIconImg} alt="cart" className="fav-cart-icon"/>
                        {"Add to Cart"}
                      </button>
                      <button className="fav-remove-btn" onClick={() => dispatch(removeFromFavorites(item.id))}>
                        <img src={deleteIcon} alt="delete" className="fav-delete-icon"/>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default FavoritesPage;