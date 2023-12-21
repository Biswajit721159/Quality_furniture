import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/CartSlice'
import searchReducer from "../redux/SearchSlice";
import LoadReducer from '../redux/LoadSlice'

export default configureStore({

  reducer: {
    cartdata:cartReducer,
    Search_Name: searchReducer,
    LoadStatus:LoadReducer
  },

  
});