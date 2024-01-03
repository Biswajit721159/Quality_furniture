import { createSlice } from '@reduxjs/toolkit'


const productSlice = createSlice({
  name: 'product',
  initialState: {
    product:[],
    prev:false,
    next:false,
  },

  reducers: {
    ADD_PRODUCT: (state,action) => {
      let data=action.payload;
      let n=data.length;
      state.prev=data[n-1].prev;
      state.next=data[n-1].next;
      data=data.slice(0,n-1);
      state.product = data;
    },
    Remove_PRODUCT:(state,action)=>{
      state.product=[]
      state.next=false;
      state.prev=false
    }
  },
})


export const productmethod = productSlice.actions
const productReducer=productSlice.reducer
export default productReducer