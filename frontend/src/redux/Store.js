import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/UserSlice'
import cartReducer from '../redux/CartSlice'
import Product from '../redux/ProductSlice'
import FrontPageProductSliceReducer from '../redux/TopProductSlice'
export default configureStore({

  reducer: {
    user: userReducer,
    product: Product,
    cartdata: cartReducer,
    FrontPageProduct: FrontPageProductSliceReducer
  },


});