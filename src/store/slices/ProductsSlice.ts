import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number; title: string; description: string; category: string;
  price: number; discountPercentage: number; rating: number; stock: number;
  brand: string; thumbnail: string; images: string[]; tags: string[]; availabilityStatus: string;
}

interface ProductsState {
  items: Product[]; categories: string[]; activeCategory: string;
  status: "idle" | "loading" | "succeeded" | "failed"; error: string | null; total: number;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err: unknown) { return rejectWithValue(getErrorMessage(err)); }
});

export const fetchProductsByCategory = createAsyncThunk("products/fetchByCategory", async (category: string, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=100`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    return await res.json();
  } catch (err: unknown) { return rejectWithValue(getErrorMessage(err)); }
});

export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (err: unknown) { return rejectWithValue(getErrorMessage(err)); }
});

export const searchProducts = createAsyncThunk("products/search", async (query: string, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=100`);
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (err: unknown) { return rejectWithValue(getErrorMessage(err)); }
});

const initialState: ProductsState = {
  items: [], categories: [], activeCategory: "all",
  status: "idle", error: null, total: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) { state.activeCategory = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload.products; state.total = action.payload.total; })
      .addCase(fetchProducts.rejected,  (state, action) => { state.status = "failed"; state.error = action.payload as string; });
    builder
      .addCase(fetchProductsByCategory.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload.products; state.total = action.payload.total; })
      .addCase(fetchProductsByCategory.rejected,  (state, action) => { state.status = "failed"; state.error = action.payload as string; });
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload; });
    builder
      .addCase(searchProducts.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(searchProducts.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload.products; state.total = action.payload.total; })
      .addCase(searchProducts.rejected,  (state, action) => { state.status = "failed"; state.error = action.payload as string; });
  },
});

export const { setActiveCategory } = productsSlice.actions;
export default productsSlice.reducer;