import { createSlice } from "@reduxjs/toolkit";

let data = JSON.parse(localStorage.getItem("cart"));
const cartSlice = createSlice({
  name: "cartstore",
  initialState: {
    product_id: data == null ? null : data.product_id,
    product_count: data == null ? 0 : data.product_count,
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      return (state = solve_Add_To_Cart_Product(state, action.payload));
    },
    SUB_TO_CART: (state, action) => {
      return (state = solve_Sub_To_Cart_Product(state, action.payload));
    },
    REMOVE_TO_CART: (state) => {
      state = {
        product: null,
        product_count: 0,
      };
    },
  },
});

function solve_Add_To_Cart_Product(cart, data) {
  let locatdata = JSON.parse(localStorage.getItem("cart"));
  let store = {
    product_id: locatdata == null ? null : locatdata.product_id,
    product_count: locatdata == null ? 0 : locatdata.product_count,
  };
  if (store.product_id == null || store.product_id == undefined) {
    store.product_id = data;
    store.product_count = 1;
  } else {
    if (store.product_id == data) {
      store.product_count += 1;
    } else {
      store.product_id = data;
      store.product_count = 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(store));
  return store;
}

function solve_Sub_To_Cart_Product(cart, data) {
  let locatdata = JSON.parse(localStorage.getItem("cart"));
  let store = {
    product_id: locatdata == null ? null : locatdata.product_id,
    product_count: locatdata == null ? 0 : locatdata.product_count,
  };
  if (store.product_id == null || store.product_id == undefined) {
    store.product_count = 0;
    return store;
  } else {
    if (store.product_id == data && store.product_count > 0) {
      store.product_count -= 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(store));
  return store;
}

export const cartmethod = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
