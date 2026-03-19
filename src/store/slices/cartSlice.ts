import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  category: string;
  discountPercentage: number;
}

interface CartState {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

function recalc(state: CartState) {
  state.totalCount = state.items.reduce((s, i) => s + i.quantity, 0);
  state.totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) { existing.quantity += 1; }
      else { state.items.push({ ...action.payload, quantity: 1 }); }
      recalc(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      recalc(state);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
      recalc(state);
    },
    clearCart(state) {
      state.items = []; state.totalCount = 0; state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;