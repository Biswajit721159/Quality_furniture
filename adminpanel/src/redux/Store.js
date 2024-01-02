import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userslice'


export default configureStore({
    reducer: {
      user:userReducer,
    }, 
});