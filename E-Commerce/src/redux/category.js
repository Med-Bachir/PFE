import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "",
  subName: "",
  typeName: ""
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    subName: (state, action) => {
      state.subName = action.payload;
    },
    typeName: (state, action) => {
      state.typeName = action.payload;
    },
    reset: () => initialState // Correctly reset the state to initialState
  }
});

export const { categoryName, subName, typeName, reset } = categorySlice.actions; // Export reset
export default categorySlice.reducer;
