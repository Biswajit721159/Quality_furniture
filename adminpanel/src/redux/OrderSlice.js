import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadOrder = createAsyncThunk(
  'Order/loadOrder',
  async (parameter) => {
    try {
      let { LowerLimit, UpperLimit, searchvalue, userinfo } = parameter;
      if (searchvalue === '') searchvalue = undefined
      const response = await fetch(`${api}/order/AdminpanelOrder/${LowerLimit}/${UpperLimit}/${searchvalue}`, {
        headers: {
          Authorization: `Bearer ${userinfo?.accessToken}`
        },
      })
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateOrder = createAsyncThunk('Order/updateOrder', async (parameter) => {
  try {
    let { formData, userinfo } = parameter
    const response = await fetch(`${api}/order/updateOrder/${formData?._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
      body: JSON.stringify({
        status: formData?.status,
        address: formData?.address
      }),
    })
    const data = await response.json();
    return { data: data, formData: formData };
  } catch (error) {
    throw error
  }
})

const OrderSlice = createSlice({
  name: 'Order',
  initialState: {
    Order: [],
    orderLoading: false,
    error: '',
    prev: false,
    next: false,
    isOrderLogin: true,
    searchvalue: '',
    LowerLimit: 0,
    UpperLimit: 10,
    UpdatedOrderMessage: '',
    UpdatedOrderLoading: false
  },
  reducers: {
    clearALL: (state, action) => {
      state.Order = [];
      state.orderLoading = false;
      state.error = '';
      state.prev = false;
      state.next = false;
      state.isOrderLogin = true;
      state.searchvalue = '';
      state.LowerLimit = 0;
      state.UpperLimit = 10;
      state.UpdatedOrderMessage = '';
      state.UpdatedOrderLoading = false;
    },
    
    ADD_ORDER: (state, action) => {
      let data = action.payload;
      let n = data.length;
      state.prev = data[n - 1].prev;
      state.next = data[n - 1].next;
      data = data.slice(0, n - 1);
      state.Order = data;
    },
    REMOVE_ORDER: (state, action) => {
      state.Order = []
      state.next = false;
      state.prev = false
    },
    SetLowerLimitHighLimit: (state, action) => {
      state.LowerLimit = action.payload?.LowerLimit
      state.UpperLimit = action.payload?.UpperLimit
    },
    ADD_SEARCH_VALUE: (state, action) => {
      state.searchvalue = action.payload
    },
    Reset: (state, action) => {
      let data = action?.payload;
      if (data?.Order !== undefined) state.Order = data?.Order;
      if (data?.prev !== undefined) state.prev = data?.prev;
      if (data?.next !== undefined) state.next = data?.next;
      if (data?.searchvalue !== undefined) state.searchvalue = data?.searchvalue;
      if (data?.LowerLimit !== undefined) state.LowerLimit = data?.LowerLimit;
      if (data?.UpperLimit !== undefined) state.UpperLimit = data?.UpperLimit;
      if (data?.orderLoading !== undefined) state.orderLoading = data?.orderLoading;
      if (data?.isOrderLogin !== undefined) state.isOrderLogin = data?.isOrderLogin;
      if (data?.error !== undefined) state.error = data?.error;
    },
    setUpdatedOrderMessage: (state, action) => {
      state.UpdatedOrderMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.pending, (state) => {
        state.orderLoading = true
        state.error = null;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.error = null;
        let data = action?.payload?.data;
        if (action?.payload?.statusCode === 200) {
          const n = data.length;
          state.prev = data[n - 1]?.prev;
          state.next = data[n - 1]?.next;
          if (state.LowerLimit === 0) {
            state.Order = []
          }
          let newOrders = data?.slice?.(0, n - 1);
          let Order_ids = state?.Order?.map((data) => {
            return data?._id;
          })
          let flag = true
          let filterOrders = newOrders?.filter((data) => {
            if (Order_ids?.includes(data?._id) === false) return data;
            else flag = false
          })
          state.Order = [...state.Order, ...filterOrders];
          if (flag) {
            state.LowerLimit += 10;
            state.UpperLimit += 10;
          }
        }
        else if (action?.payload?.statusCode === 498) {
          state.isOrderLogin = false
        }
      })
      .addCase(loadOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateOrder.pending, (state) => {
        state.UpdatedOrderLoading = true
        state.UpdatedOrderMessage = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.UpdatedOrderLoading = false;
        state.UpdatedOrderMessage = null;
        let data = action?.payload?.data
        let formData = action?.payload?.formData

        if (action?.payload?.data?.statusCode === 200) {
          let order = state.Order
          let UpdatedOrder = order?.map((Data) => {
            if (Data?._id === formData?._id) {
              Data.status = formData?.status
              Data.address = formData?.address
              return Data
            } else {
              return Data
            }
          })
          state.Order = UpdatedOrder
          state.UpdatedOrderMessage = data?.message
        }
        else if (action?.payload?.data?.statusCode === 498) {
          state.isOrderLogin = false
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.UpdatedOrderLoading = false;
        state.UpdatedOrderMessage = action.error.message;
      })
  }
})


export const ordermethod = OrderSlice.actions
const orderReducer = OrderSlice.reducer
export default orderReducer