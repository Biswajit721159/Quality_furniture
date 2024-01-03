import { BrowserRouter as Router, Routes, Route, json, useFetcher } from "react-router-dom";
import {useSelector} from 'react-redux'
import "./App.css";
import Dashboard from "./component/Dashboard";
import Reviews_Section from './component/Reviews_Section';
import Order_section from './component/Order_section';
import User_section from './component/User_section';
import Product_Section from "./Product/Product_Section";
import Sidebar from "./component/Sidebar";
import Adminlogin from "./component/Adminlogin";
import Product_View from './Product/Product_View'
import './css/Loader.css'
import ErrorPage from "./component/ErrorPage";

function App() {
  const userinfo=useSelector((state)=>state.user.user);
  return (
    <div className="App">
      <Router>
        {
          userinfo!=null ?
          <div className="Container">
              <div className="left">
                  <Sidebar/>
              </div>
              <div className="right">
                  <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/Product/:LowerLimit/:UpperLimit" element={<Product_Section/>}></Route>
                    <Route path="/Product_view/:_id" element={<Product_View/>}></Route>
                    <Route path="/Review" element={<Reviews_Section/>}></Route>
                    <Route path="/Order" element={<Order_section/>}></Route>
                    <Route path="/User" element={<User_section/>}></Route>
                    <Route path="*" element={<ErrorPage/>}></Route>
                  </Routes>
              </div>
          </div>
          :
          <Routes>
            <Route>
               <Route path="/" element={<Adminlogin/>}></Route>
            </Route>
          </Routes>
        }
      </Router>
    </div>
  );
}

export default App;
