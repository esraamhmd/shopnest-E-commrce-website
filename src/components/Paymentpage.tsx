import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import "./PaymentPage.css";
import checkIcon    from "../assets/icons/check.png";
import arrowbackIcon from "../assets/icons/arrowback.png";

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((s) => s.cart);


  const [method,    setMethod]    = useState<"card"|"cod">("card");
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [address,   setAddress]   = useState("");
  const [city,      setCity]      = useState("");
  const [phone,     setPhone]     = useState("");
  const [cardNum,   setCardNum]   = useState("");
  const [expiry,    setExpiry]    = useState("");
  const [cvv,       setCvv]       = useState("");
  const [placed,    setPlaced]    = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const total    = totalPrice + shipping;

  function clearFieldError(field: string) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  // Format card number with spaces
  function formatCardNum(val: string) {
    return val.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  }

  // Format expiry MM/YY
  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g,"").slice(0,4);
    if (clean.length >= 3) return clean.slice(0,2)+"/"+clean.slice(2);
    return clean;
  }

  function validate() {
    const e: Record<string, string> = {};

    if (!firstName.trim()) e.firstName = "First name is required" // : "First name is required";
    if (!lastName.trim())  e.lastName  = "Last name is required";
    if (!address.trim())   e.address   = "Address is required";
    if (!city.trim())      e.city      = "City is required";

    if (!phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[+\d\s\-()]{7,15}$/.test(phone)) {
      e.phone = "Invalid phone number";
    }

    if (method === "card") {
      const rawCard = cardNum.replace(/\s/g,"");
      if (!rawCard) {
        e.cardNum = "Card number is required";
      } else if (rawCard.length !== 16) {
        e.cardNum = "Card number must be 16 digits";
      }

      if (!expiry) {
        e.expiry = "Expiry date is required";
      } else {
        const [mm, yy] = expiry.split("/");
        const month = parseInt(mm);
        const year  = parseInt("20"+yy);
        const now   = new Date();
        if (month < 1 || month > 12) {
          e.expiry = "Invalid month";
        } else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth()+1)) {
          e.expiry = "Card has expired";
        }
      }

      if (!cvv) {
        e.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(cvv)) {
        e.cvv = "CVV must be 3 or 4 digits";
      }
    }

    return e;
  }

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlaced(true);
      dispatch(clearCart());
    }, 800);
  }

  if (placed) return (
    <div className="payment-page">
      <div className="order-success">
        <img src={checkIcon} alt="success" className="order-success-icon-img"/>
        <h2>{"Order Placed Successfully!"}</h2>
        <p>{"Thank you for your order. You will receive a confirmation shortly."}</p>
        <button className="order-home-btn" onClick={() => navigate("/")}>
          <img src={arrowbackIcon} alt="back" className="order-back-icon"/>
          "Back to Home"
        </button>
      </div>
    </div>
  );

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">{"Checkout"}</h1>
        <div className="payment-layout">

          {/* FORM */}
          <form className="payment-form" onSubmit={handleOrder} noValidate>

            {/* Shipping */}
            <div className="payment-section">
              <h2 className="payment-section-title">{"Shipping Information"}</h2>
              <div className="payment-row">
                <div className="payment-field">
                  <label>{"First Name"} <span className="required">*</span></label>
                  <input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearFieldError("firstName"); }}
                    placeholder="John"
                    className={errors.firstName?"input-error":""}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="payment-field">
                  <label>{"Last Name"} <span className="required">*</span></label>
                  <input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); clearFieldError("lastName"); }}
                    placeholder="Doe"
                    className={errors.lastName?"input-error":""}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="payment-field">
                <label>{"Street Address"} <span className="required">*</span></label>
                <input
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); clearFieldError("address"); }}
                  placeholder={"123 Main St"}
                  className={errors.address?"input-error":""}
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="payment-row">
                <div className="payment-field">
                  <label>{"City"} <span className="required">*</span></label>
                  <input
                    value={city}
                    onChange={(e) => { setCity(e.target.value); clearFieldError("city"); }}
                    placeholder="Cairo"
                    className={errors.city?"input-error":""}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
                <div className="payment-field">
                  <label>{"Phone Number"} <span className="required">*</span></label>
                  <input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearFieldError("phone"); }}
                    placeholder="+20 100 000 0000"
                    className={errors.phone?"input-error":""}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="payment-section">
              <h2 className="payment-section-title">{"Payment Method"}</h2>
              <div className="payment-methods">
                <label className={`method-option ${method==="card"?"active":""}`}>
                  <input type="radio" name="method" value="card" checked={method==="card"} onChange={() => setMethod("card")}/>
                  <span>💳 {"Credit / Debit Card"}</span>
                </label>
                <label className={`method-option ${method==="cod"?"active":""}`}>
                  <input type="radio" name="method" value="cod" checked={method==="cod"} onChange={() => setMethod("cod")}/>
                  <span>💵 {"Cash on Delivery"}</span>
                </label>
              </div>

              {method==="card" && (
                <div className="card-fields">
                  <div className="payment-field">
                    <label>{"Card Number"} <span className="required">*</span></label>
                    <input
                      value={cardNum}
                      onChange={(e) => { setCardNum(formatCardNum(e.target.value)); clearFieldError("cardNum"); }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNum?"input-error":""}
                    />
                    {errors.cardNum && <span className="field-error">{errors.cardNum}</span>}
                  </div>
                  <div className="payment-row">
                    <div className="payment-field">
                      <label>{"Expiry Date"} <span className="required">*</span></label>
                      <input
                        value={expiry}
                        onChange={(e) => { setExpiry(formatExpiry(e.target.value)); clearFieldError("expiry"); }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiry?"input-error":""}
                      />
                      {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                    </div>
                    <div className="payment-field">
                      <label>{"CVV"} <span className="required">*</span></label>
                      <input
                        value={cvv}
                        onChange={(e) => { setCvv(e.target.value.replace(/\D/g,"").slice(0,4)); clearFieldError("cvv"); }}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        className={errors.cvv?"input-error":""}
                      />
                      {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h2 className="order-summary-title">{"Order Summary"}</h2>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.thumbnail} alt={item.title}/>
                  <div className="order-item-info">
                    <p className="order-item-title">{item.title}</p>
                    <p className="order-item-qty">x{item.quantity}</p>
                  </div>
                  <p className="order-item-price">${(item.price*item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="order-total-row">
                <span>{"Subtotal"}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="order-total-row">
                <span>{"Shipping"}</span>
                <span className={shipping===0?"free":""}>{shipping===0?"FREE":`$${shipping}`}</span>
              </div>
              <div className="order-grand-total">
                <span>{"Total"}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentPage;