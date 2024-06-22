import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API;

export const loadProduct = createAsyncThunk(
  'product/loadProduct',
  async (parameter) => {
    try {
      let { LowerLimit, UpperLimit, searchvalue, userinfo } = parameter;
      if (searchvalue === '') searchvalue = undefined
      const response = await fetch(`${api}/product/getproductByLimit/${searchvalue}/${LowerLimit}/${UpperLimit}`, {
        headers: {
          Authorization: `Bearer ${userinfo?.accessToken}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    prev: false,
    next: false,
    searchvalue: '',
    LowerLimit: 0,
    UpperLimit: 10,
    productLoading: false,
    isProductLogin: true,
    error: ''
  },
  reducers: {
    clearALL: (state, action) => {
      state.product = [];
      state.prev = false;
      state.next = false;
      state.searchvalue = '';
      state.LowerLimit = 0;
      state.UpperLimit = 10;
      state.productLoading = false;
      state.isProductLogin = true;
      state.error = '';
    },
    
    ADD_SEARCH_VALUE: (state, action) => {
      state.searchvalue = action?.payload;
    },
    SetLowerLimitHighLimit: (state, action) => {
      state.LowerLimit = action.payload?.LowerLimit
      state.UpperLimit = action.payload?.UpperLimit
    },
    SetSearchValue: (state, action) => {
      state.searchvalue = action.payload
    },
    Reset: (state, action) => {
      let data = action?.payload;
      if (data?.product !== undefined) state.product = data?.product;
      if (data?.prev !== undefined) state.prev = data?.prev;
      if (data?.next !== undefined) state.next = data?.next;
      if (data?.searchvalue !== undefined) state.searchvalue = data?.searchvalue;
      if (data?.LowerLimit !== undefined) state.LowerLimit = data?.LowerLimit;
      if (data?.UpperLimit !== undefined) state.UpperLimit = data?.UpperLimit;
      if (data?.productLoading !== undefined) state.productLoading = data?.productLoading;
      if (data?.isProductLogin !== undefined) state.isProductLogin = data?.isProductLogin;
      if (data?.error !== undefined) state.error = data?.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.error = null;
        const data = action.payload.data;
        if (action.payload.statusCode === 200) {
          const n = data.length;
          state.prev = data[n - 1]?.prev;
          state.next = data[n - 1]?.next;
          if (state.LowerLimit === 0) {
            state.product = []
          }
          let newProducts = data.slice(0, n - 1);
          let product_ids = state.product.map((data) => {
            return data?._id;
          })
          let flag = true
          let filterProducts = newProducts.filter((data) => {
            if (product_ids.includes(data?._id) === false) return data;
            else flag = false
          })
          state.product = [...state.product, ...filterProducts];
          if (flag) {
            state.LowerLimit += 10;
            state.UpperLimit += 10;
          }
        } else if (action.payload.statusCode === 498) {
          state.isProductLogin = false;
        }
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.error.message;
      });
  }
});

export const productmethod = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
