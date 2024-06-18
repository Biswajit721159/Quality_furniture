import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const LoadCart = createAsyncThunk(
  'cart/LoadCart',
  async (parameter) => {
    try {
      let userinfo = parameter
      let response = await fetch(`${api}/cart/GetCart/${userinfo?.user?.email}`, {
        headers: {
          Authorization: `Bearer ${userinfo?.accessToken}`
        }
      })
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const AddToCartDB = createAsyncThunk('cart/AddTocartDB', async (parameter) => {
  try {
    let userinfo = parameter.userinfo
    let product_id = parameter.product_id
    let product_count = parameter.product_count
    let responce = await fetch(`${api}/cart/Add_To_Cart`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
      body: JSON.stringify({
        email: userinfo?.user?.email,
        product_id: product_id,
        product_count: product_count
      })
    })
    let data = await responce.json()
    return data
  } catch (error) {
    throw error;
  }
})

export const RemoveToDB = createAsyncThunk('cart/RemovecartDB', async (parameter) => {
  try {
    let userinfo = parameter?.userinfo
    let data = await fetch(`${api}/cart/Remove_To_Cart`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
      body: JSON.stringify({
        email: userinfo?.user?.email,
      })
    }).then((responce) => responce.json())
    return data
  } catch (error) {
    throw error
  }

})



const initialState = {
  product: {},
  loadingcart: false,
  loadingcartcount: false,
  product_Price: 0,
  error: null,
  isCartLogedin: true
};

const cartSlice = createSlice({
  name: "cartstore",
  initialState,
  reducers: {
    clearAll: (state, action) => {
      state.product = {};
      state.loadingcart = false;
      state.loadingcartcount = false;
      state.product_Price = 0;
      state.error = null;
      state.isCartLogedin = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoadCart.pending, (state) => {
        state.loadingcart = true;
        state.error = null;
      })
      .addCase(LoadCart.fulfilled, (state, action) => {
        state.loadingcart = false;
        let data = action?.payload
        if (data?.statusCode === 498) {
          state.isCartLogedin = false
          return
        }
        state.product = data?.data
        state.product_Price = findCost(data?.data)
        state.error = null
      })
      .addCase(LoadCart.rejected, (state, action) => {
        state.loadingcart = false;
        state.error = action.error.message;
        state.isCartLogedin = false
      })
      .addCase(AddToCartDB.pending, (state) => {
        state.loadingcartcount = true;
        state.error = null;
      })
      .addCase(AddToCartDB.fulfilled, (state, action) => {
        state.loadingcartcount = false;
        let data = action?.payload
        if (data?.statusCode === 498) {
          state.isCartLogedin = false
          return
        }
        state.product = data?.data
        state.product_Price = findCost(data?.data)
        state.error = null
      })
      .addCase(AddToCartDB.rejected, (state, action) => {
        state.loadingcartcount = false;
        state.error = action.error.message;
        state.isCartLogedin = false
      })
      .addCase(RemoveToDB.pending, (state) => {
        state.loadingcart = true;
        state.error = null;
      })
      .addCase(RemoveToDB.fulfilled, (state, action) => {
        state.loadingcart = false;
        let data = action?.payload
        if (data?.statusCode === 498) {
          state.isCartLogedin = false
          return
        }
        state.product = data?.data
        state.product_count = data?.data?.product_count === undefined ? 0 : data?.data?.product_count
        state.product_Price = findCost(data?.data)
        state.error = null
      })
      .addCase(RemoveToDB.rejected, (state, action) => {
        state.loadingcart = false;
        state.error = action.error.message;
        state.isCartLogedin = false
      })
  }
});

function findCost(product) {
  let cost = ((product?.price - ((product?.price * product?.offer) / 100)) * (product?.product_count)).toFixed(2);
  return cost === undefined ? 0 : cost
}



export const cartmethod = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
