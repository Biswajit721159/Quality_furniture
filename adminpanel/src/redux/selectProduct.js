import { createSlice } from "@reduxjs/toolkit";

const selectProductSlice = createSlice({
  name: "selectproduct",
  initialState: {
    selectproduct: null,
    selectProductLogin:true
  },

  reducers: {
    ADD_PRODUCT: (state, action) => {
      state.selectproduct = action.payload;
    },
    REMOVE_PRODUCT: (state, action) => {
      state.selectproduct = null;
    },
  },
});

export const selectProductmethod = selectProductSlice.actions;
const selectproductReducer = selectProductSlice.reducer;
export default selectproductReducer;
