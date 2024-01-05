import { createSlice } from '@reduxjs/toolkit'


const OrderSlice = createSlice({
  name: 'Order',
  initialState: {
    Order:[],
    prev:false,
    next:false,
  },

  reducers: {
    ADD_ORDER: (state,action) => {
      let data=action.payload;
      let n=data.length;
      state.prev=data[n-1].prev;
      state.next=data[n-1].next;
      data=data.slice(0,n-1);
      state.Order = data;
    },
    REMOVE_ORDER:(state,action)=>{
      state.Order=[]
      state.next=false;
      state.prev=false
    }
  },
})


export const ordermethod = OrderSlice.actions
const orderReducer=OrderSlice.reducer
export default orderReducer