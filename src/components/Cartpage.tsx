import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";
import deleteIcon   from "../assets/icons/delete.png";
import arrowbackIcon from "../assets/icons/arrowback.png";
import "./Cartpage.css";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((s) => s.cart);
  const shipping = totalPrice >= 50 ? 0 : 5.99;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">{"Shopping Cart"}</h1>
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>{"Your cart is empty"}</p>
            <p className="cart-empty-desc">"You haven't added any products yet. Start shopping!"</p>
            <button className="cart-continue-btn" onClick={() => navigate("/")}>{"Continue Shopping"}</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} className="cart-item-img" onClick={() => navigate(`/product/${item.id}`)}/>
                  <div className="cart-item-info">
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-title" onClick={() => navigate(`/product/${item.id}`)}>{item.title}</p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <div className="qty-controls">
                        <button onClick={() => dispatch(updateQuantity({id:item.id, quantity:item.quantity-1}))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({id:item.id, quantity:item.quantity+1}))}>+</button>
                      </div>
                      <button className="cart-remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                        <img src={deleteIcon} alt="delete" className="delete-icon"/>
                        {"Remove"}
                      </button>
                    </div>
                  </div>
                  <p className="cart-item-subtotal">${(item.price*item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className="cart-summary-title">{"Order Summary"}</h2>
              <div className="cart-summary-row">
                <span>{"Subtotal"} ({items.reduce((s,i)=>s+i.quantity,0)} {"items"})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>{"Shipping"}</span>
                <span className={shipping===0?"free":""}>{shipping===0?"FREE":`$${shipping}`}</span>
              </div>
              <div className="cart-summary-total">
                <span>{"Total"}</span>
                <span>${(totalPrice+shipping).toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={() => navigate("/payment")}>{"Proceed to Checkout"}</button>
              <button className="cart-continue-link" onClick={() => navigate("/")}>
                <img src={arrowbackIcon} alt="back" className="back-icon"/>
                {"Continue Shopping"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CartPage;