import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/UserSlice'
import cartReducer from '../redux/CartSlice'
import Product from '../redux/ProductSlice'
export default configureStore({

  reducer: {
    user: userReducer,
    product: Product,
    cartdata: cartReducer,
  },


});