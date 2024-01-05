import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userslice'
import productReducer from "./ProductSlice";
import selectproductReducer from "./selectProduct";
import AlluserReducer from './AllUserSlice'
export default configureStore({
    reducer: {
      user:userReducer,
      product:productReducer,
      selectProduct:selectproductReducer,
      Alluser:AlluserReducer
    }, 
});