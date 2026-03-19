import { configureStore } from "@reduxjs/toolkit";
import authReducer      from "./slices/authSlice";
import cartReducer      from "./slices/cartSlice";
import favoritesReducer from "./slices/favoriteSlice";
import locationReducer  from "./slices/locationSlice";
import categoryReducer  from "./slices/categorySlice";
import productsReducer  from "./slices/ProductsSlice";
import adsReducer       from "./slices/Adsslice";

export const store = configureStore({
  reducer: {
    auth:      authReducer,
    cart:      cartReducer,
    favorites: favoritesReducer,
    location:  locationReducer,
    category:  categoryReducer,
    products:  productsReducer,
    ads:       adsReducer,
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;