import { HashRouter, Routes, Route } from "react-router-dom";

import Header        from "./components/Header";
import HeroBanner    from "./components/Herobanner";
import ProductDetail from "./components/Productdetail";
import Footer        from "./components/Footer";
import SearchPage    from "./components/Searchpage";
import CartPage      from "./components/Cartpage";
import FavoritesPage from "./components/Favoritespage";
import PaymentPage   from "./components/Paymentpage";
import LoginPage     from "./components/Loginpage";
import SignupPage    from "./components/Signuppage";

function App() {
  return (
    <HashRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/"            element={<HeroBanner />}    />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search"      element={<SearchPage />}    />
          <Route path="/cart"        element={<CartPage />}      />
          <Route path="/favorites"   element={<FavoritesPage />} />
          <Route path="/payment"     element={<PaymentPage />}   />
          <Route path="/login"       element={<LoginPage />}     />
          <Route path="/signup"      element={<SignupPage />}    />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;