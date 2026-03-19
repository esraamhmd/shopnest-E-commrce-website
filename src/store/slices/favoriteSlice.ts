import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  discountPercentage: number;
}

interface FavoritesState {
  items: FavoriteItem[];
  totalCount: number;
}

const initialState: FavoritesState = { items: [], totalCount: 0 };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteItem>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) { state.items = state.items.filter((i) => i.id !== action.payload.id); }
      else { state.items.push(action.payload); }
      state.totalCount = state.items.length;
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.items      = state.items.filter((i) => i.id !== action.payload);
      state.totalCount = state.items.length;
    },
  },
});

export const { toggleFavorite, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;