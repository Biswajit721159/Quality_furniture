import { createSlice } from '@reduxjs/toolkit'


const SearchSlice = createSlice({
  name: 'search_Name',
  initialState: {
    search_Name: "",
  },

  reducers: {
    SET_SEARCH: (state,action) => {
        state.search_Name = action.payload;
    },
  },
})


export const searchmethod = SearchSlice.actions
const searchReducer=SearchSlice.reducer
export default searchReducer