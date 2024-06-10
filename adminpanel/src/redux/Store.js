import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userslice'
import productReducer from "./ProductSlice";
import selectproductReducer from "./selectProduct";
import AlluserReducer from './AllUserSlice'
import orderReducer from './OrderSlice'
import countReducer from "./CountSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    selectProduct: selectproductReducer,
    Alluser: AlluserReducer,
    Order: orderReducer,
    count: countReducer
  },
});