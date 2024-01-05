import { createSlice } from '@reduxjs/toolkit'


const AlluserSlice = createSlice({
  name: 'Alluser',
  initialState: {
    Alluser:[],
    prev:false,
    next:false,
  },

  reducers: {
    ADD_USER: (state,action) => {
      let data=action.payload;
      let n=data.length;
      state.prev=data[n-1].prev;
      state.next=data[n-1].next;
      data=data.slice(0,n-1);
      state.Alluser = data;
    },
    REMOVE_USER:(state,action)=>{
      state.Alluser=[]
      state.next=false;
      state.prev=false
    }
  },
})


export const Allusermethod = AlluserSlice.actions
const AlluserReducer=AlluserSlice.reducer
export default AlluserReducer