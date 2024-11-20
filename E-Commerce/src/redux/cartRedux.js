import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newRequest from "../utils/newRequest";

// Async action to fetch cart data
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await newRequest.get(`/cards/cart/${userId}`);
  return res.data; // Return the cart data
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Store cart items here
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      // Update the cartItems with the fetched data
      state.cartItems = action.payload;
    });
  },
});

export default cartSlice.reducer;
