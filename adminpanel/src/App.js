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
import './css/Loader.css'
import ErrorPage from "./component/ErrorPage";
import Logout from "./component/Logout";

function App() {
  const userinfo = useSelector((state) => state.user.user);
  return (
    <Router>
      {userinfo != null ?
        <div className="Container">
          <div className="left">
            <Sidebar />
          </div>
          <div className="right">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Product/page/:page" element={<Product_Section />} />
              <Route path="/Product/AddProduct" element={<Addproduct />} />
              <Route path="/Product_view/:_id" element={<Product_View />} />
              <Route path="/Review/page/:page" element={<Reviews_Section />} />
              <Route path="/Order/page/:page" element={<Order_section />} />
              <Route path="/User/page/:page" element={<User_section />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
        :
        <Routes>
          <Route path="/" element={<Adminlogin />} />
          <Route path="*" element={<Logout />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
