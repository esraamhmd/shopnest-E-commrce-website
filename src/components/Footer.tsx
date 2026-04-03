import { useNavigate } from "react-router-dom";
import "./Footer.css";
import helpIcon  from "../assets/icons/help.png";
import emailIcon from "../assets/icons/email.png";
import phoneIcon from "../assets/icons/phone.png";
import topIcon   from "../assets/icons/top.png";

const FOOTER_LINKS = [
  { heading:"Electronics",      items:["Mobiles","Tablets","Laptops","Home Appliances","Camera, Photo & Video","Televisions","Headphones","Video Games"] },
  { heading:"Fashion",          items:["Women's Fashion","Men's Fashion","Girls' Fashion","Boys' Fashion","Men's Watches","Women's Watches","Eyewear","Bags & Luggage"] },
  { heading:"Home and Kitchen", items:["Kitchen & Dining","Bedding","Bath","Home Decor","Home Appliances","Tools & Home Improvement","Patio, Lawn & Garden","Home Storage & Organisation"] },
  { heading:"Beauty",           items:["Women's Fragrance","Men's Fragrance","Make-up","Haircare","Skincare","Personal Care","Tools & Accessories"] },
  { heading:"Kids, Baby & Toys",items:["Strollers, Prams & Accessories","Car Seats","Baby Clothing","Feeding","Bathing & Skincare","Diapering","Baby & Toddler Toys","Toys & Games"] },
  { heading:"Top Brands",       items:["Apple","Samsung","Nike","Ray-Ban","Tefal","Starville","Chicco","Tornado"] },
  { heading:"Discover Now",     items:["Brand Glossary","noon Kuwait","noon Bahrain","noon Oman","noon Qatar"] },
];

const POPULAR = ["Body Mist","S25 Ultra","Samsung S25","Dyson","Vitamin C Serum","Sunscreen","Self Tanner","Travel Luggage","iPhone 17 Pro","iPhone 17 Air","iPhone 17 Price","iPhone 17 Pro Max","Tablet","Cosmetics","Aldo Bags","iPhone 17 Series","Barbie","Dior Perfume","Chanel Perfume","Rasasi Perfume","Versace Perfume","Lattafa Perfume","Best Laptops","Sunglasses Men","Flip flops","Birkenstock","Handbags","LG Fridge","Samsung Fridge","MacBook Air","MacBook Pro","Samsung S24","iPhone 16","Apple","ASUS","Huawei"];

function Footer() {
  const navigate = useNavigate();

  function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <footer className="footer">

      {/* Popular Searches */}
      <div className="footer-popular">
        <div className="footer-container">
          <p className="footer-popular-title">Popular Searches</p>
          <div className="popular-tags">
            {POPULAR.map((s) => (
              <button key={s} className="popular-tag"
                onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help bar */}
      <div className="footer-help">
        <div className="footer-container">
          <div className="footer-help-inner">

            <div className="help-text">
              <h3>We're Always Here To Help</h3>
              <p>Reach out to us through any of these support channels</p>
            </div>

            <div className="help-channels">
              <div className="help-channel">
                <img src={helpIcon} alt="help" className="help-icon-img"/>
                <div className="help-channel-info">
                  <p className="help-channel-label">HELP CENTER</p>
                  <p className="help-channel-value">help.shopnest.com</p>
                </div>
              </div>
              <div className="help-channel">
                <img src={emailIcon} alt="email" className="help-icon-img"/>
                <div className="help-channel-info">
                  <p className="help-channel-label">EMAIL SUPPORT</p>
                  <p className="help-channel-value">support@shopnest.com</p>
                </div>
              </div>
              <div className="help-channel">
                <img src={phoneIcon} alt="phone" className="help-icon-img"/>
                <div className="help-channel-info">
                  <p className="help-channel-label">PHONE SUPPORT</p>
                  <p className="help-channel-value">16358</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="footer-links">
        <div className="footer-container">
          <div className="footer-links-grid">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="footer-col">
                <h4>{col.heading}</h4>
                {col.items.map((item) => (
                  <a key={item} onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}>
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright"> 2025 ShopNest. All rights reserved.</p>
        </div>
      </div>

      <button className="scroll-top-btn" onClick={scrollTop} aria-label="Scroll to top">
        <img src={topIcon} alt="top" className="top-icon"/>
      </button>

    </footer>
  );
}
export default Footer;