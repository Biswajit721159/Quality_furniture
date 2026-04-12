import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import "./App.css";
import Dashboard from "./component/Dashboard";
// eslint-disable-next-line react/jsx-pascal-case
import Reviews_Section from './Review/Reviews_Section';
// eslint-disable-next-line react/jsx-pascal-case
import Order_section from './order/Order_section';
// eslint-disable-next-line react/jsx-pascal-case
import User_section from './user/User_section';
// eslint-disable-next-line react/jsx-pascal-case
import Product_Section from "./Product/Product_Section";
import Sidebar from "./component/Sidebar";
import Adminlogin from "./component/Adminlogin";
// eslint-disable-next-line react/jsx-pascal-case
import Product_View from './Product/Product_View'
import Addproduct from './Product/Addproduct'
import ErrorPage from "./component/ErrorPage";
import Logout from "./component/Logout";
import OrderView from "./order/OrderView";
import UserView from "./user/UserView"
// eslint-disable-next-line react/jsx-pascal-case
import View_Review from './Review/View_Review'
import ViewRatingReview from "./Review/ViewRatingReview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const userinfo = useSelector((state) => state.user.user);
  return (
    <Router>
      {userinfo != null ? (
        <div className="flex min-h-screen bg-slate-100">
          <Sidebar />
          <div className="flex-1 ml-64 min-h-screen overflow-x-hidden">
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/Product" element={<Product_Section />} />
                <Route path="/Product/AddProduct" element={<Addproduct />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/Product_view/:_id" element={<Product_View />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/Review" element={<Reviews_Section />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/Review/:_id" element={<View_Review />} />
                <Route path="/Review/:_id/view" element={<ViewRatingReview />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/Order" element={<Order_section />} />
                <Route path="/Order/:_id" element={<OrderView />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/User" element={<User_section />} />
                <Route path="/User/:_id" element={<UserView />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Adminlogin />} />
          <Route path="*" element={<Logout />} />
        </Routes>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
