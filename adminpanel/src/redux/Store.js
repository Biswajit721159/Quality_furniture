import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userslice'
import productReducer from "./ProductSlice";
import selectproductReducer from "./selectProduct";
import AlluserReducer from './AllUserSlice'
import orderReducer from './OrderSlice'
import countReducer from "./CountSlice";
import ReviewReducer from "./ReviewSlice";
export default configureStore({
  reducer: {
    review: ReviewReducer,
    user: userReducer,
    product: productReducer,
    selectProduct: selectproductReducer,
    Alluser: AlluserReducer,
    Order: orderReducer,
    count: countReducer
  },
});