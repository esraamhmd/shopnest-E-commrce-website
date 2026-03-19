import { createSlice } from "@reduxjs/toolkit";

interface AdsState { isVisible: boolean; }
const initialState: AdsState = { isVisible: true };

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    toggleAds(state) { state.isVisible = !state.isVisible; },
  },
});

export const { toggleAds } = adsSlice.actions;
export default adsSlice.reducer;