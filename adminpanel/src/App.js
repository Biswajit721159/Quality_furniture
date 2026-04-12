import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import "./App.css";
import Dashboard from "./component/Dashboard";
import Reviews_Section from './Review/Reviews_Section';
import Order_section from './order/Order_section';
import User_section from './user/User_section';
import Product_Section from "./Product/Product_Section";
import Sidebar from "./component/Sidebar";
import Adminlogin from "./component/Adminlogin";
import Product_View from './Product/Product_View'
import Addproduct from './Product/Addproduct'
import ErrorPage from "./component/ErrorPage";
import Logout from "./component/Logout";
import OrderView from "./order/OrderView";
import UserView from "./user/UserView"
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
          {/* Fixed Sidebar */}
          <Sidebar />
          {/* Main content area offset by sidebar width */}
          <div className="flex-1 ml-64 min-h-screen overflow-x-hidden">
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Product" element={<Product_Section />} />
                <Route path="/Product/AddProduct" element={<Addproduct />} />
                <Route path="/Product_view/:_id" element={<Product_View />} />
                <Route path="/Review" element={<Reviews_Section />} />
                <Route path="/Review/:_id" element={<View_Review />} />
                <Route path="/Review/:_id/view" element={<ViewRatingReview />} />
                <Route path="/Order" element={<Order_section />} />
                <Route path="/Order/:_id" element={<OrderView />} />
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
