import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  city: string;
  lat: number | null;
  lng: number | null;
}

const initialState: LocationState = { city: "Cairo", lat: null, lng: null };

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) { state.city = action.payload; },
    setCoords(state, action: PayloadAction<{ lat: number; lng: number; city: string }>) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.city = action.payload.city;
    },
  },
});

export const { setCity, setCoords } = locationSlice.actions;
export default locationSlice.reducer;