import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./component/Main";
import Footer from "./component/Footer";
import Reviews_Section from './component/Reviews_Section';
import Order_section from './component/Order_section';
import User_section from './component/User_section';
import Product_Section from "./component/Product_Section";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Navbar/>
        {/* <Main/> */}
        {/* <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/product" element={<Product_Section/>}></Route>
          <Route path="/Review" element={<Reviews_Section/>}></Route>
          <Route path="/Order" element={<Order_section/>}></Route>
          <Route path="/user" element={<User_section/>}></Route>
        </Routes> */}
        {/* <Footer/> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
