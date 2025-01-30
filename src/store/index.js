import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./slices/listingsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    ui: uiReducer,
  },
});
