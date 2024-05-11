import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/CartSlice'
import searchReducer from "../redux/SearchSlice";
import LoadReducer from '../redux/LoadSlice'
import Product from '../redux/ProductSlice'
export default configureStore({

  reducer: {
    product: Product,
    cartdata: cartReducer,
    Search_Name: searchReducer,
    LoadStatus: LoadReducer
  },


});