import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
  },

  reducers: {
    LOGIN: (state,action) => {
        localStorage.setItem('user',JSON.stringify(action.payload))
        state.user = action.payload;
    },
    LOGOUT:(state,action)=>{
      localStorage.removeItem('user');
      state.user=JSON.parse(localStorage.getItem('user'))
      return
    }
  },
})


export const usermethod = userSlice.actions
const userReducer=userSlice.reducer
export default userReducer