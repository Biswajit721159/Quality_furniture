import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartstore",
  initialState: {
    product_id: null,
    product_count: 0,
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      if(action.payload==null) return state
      state.product_id=action.payload.product_id;
      state.product_count=action.payload.product_count;
      return state;
    },
    Remove_To_Cart:(state,action)=>{
      state.product_id=null;
      state.product_count=0
      return state
    }
  },
});



export const cartmethod = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
