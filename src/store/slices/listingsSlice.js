import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://u2oyhiwlmc.execute-api.us-east-1.amazonaws.com/production/get-listings";

export const fetchListings = createAsyncThunk("listings/fetchListings", async () => {
  const response = await axios.get(API_URL);
  return response.data.deals;
});

const initialState = {
  listings: [],
  filteredListings: [],
  status: "idle",
  error: null,
  filter: {
    sortBy: "newest",
    listingStatus: "all",
    searchQuery: "",
  },
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.filter.sortBy = action.payload;
      applyFilters(state);
    },
    setListingStatus(state, action) {
      state.filter.listingStatus = action.payload;
      applyFilters(state);
    },
    setSearchQuery(state, action) {
      state.filter.searchQuery = action.payload;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listings = action.payload;
        applyFilters(state);
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const applyFilters = (state) => {
  const { listings, filter } = state;
  const searchQuery = filter.searchQuery.toLowerCase();

  state.filteredListings = listings
    .filter((listing) => {
      if (!listing.zillowData) return false;
      const address = listing.address.formattedAddress.toLowerCase();
      return address.includes(searchQuery);
    })
    .filter((listing) => {
      if (filter.listingStatus === "all") return true;
      return filter.listingStatus === "sold"
        ? listing.zillowData.homeStatus === "SOLD"
        : listing.zillowData.homeStatus !== "SOLD";
    })
    .sort(() => (filter.sortBy === "oldest" ? 1 : -1));
};

export const { setSortBy, setListingStatus, setSearchQuery } = listingsSlice.actions;
export default listingsSlice.reducer;
