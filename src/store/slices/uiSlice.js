import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMapView: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleViewMode: (state) => {
      state.isMapView = !state.isMapView;
    },
  },
});

export const { toggleViewMode } = uiSlice.actions;
export default uiSlice.reducer;
