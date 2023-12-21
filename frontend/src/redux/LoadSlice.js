import { createSlice } from '@reduxjs/toolkit'


const LoadSlice = createSlice({
  name: 'Load',
  initialState: {
    Load: false,
  },

  reducers: {
    CHANGE_LOAD_STATUS: (state,action) => {
        state.Load =!state.Load;
    },
  },
})


export const Loadmethod = LoadSlice.actions
const LoadReducer=LoadSlice.reducer
export default LoadReducer