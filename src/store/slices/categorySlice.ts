import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface CategoryState { activeCategory: string; }
const initialState: CategoryState = { activeCategory: "all" };

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;