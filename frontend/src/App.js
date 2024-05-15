import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Product from "./component/Product";
import Show from "./component/Show";
import Product_view from "./component/Product_view";
import Profile from "./component/Profile";
import Update_userdata from "./component/Update_userdata";
import Error from "./component/Error";
import WishList from "./component/Wishlist";
import Cart from "./component/Cart";
import Myorder from "./component/Myorder";
import Reviews from "./component/Reviews";
import Footer from "./component/Footer";
import Carousel from './component/Carousel'
import './css/Loader.css'
import BootstrapNavbar from "./component/BootstrapNavbar";
import ForgotPassword from "./component/ForgotPassword";
import Test from './component/Test'
import './App.css'
function App() {
  return (
    <div className="App">
      <Router>
        <BootstrapNavbar />
        <Routes>
          <Route path="/Test" element={<Test />}></Route>
          <Route path="/" element={<Product />}></Route>
          <Route path="/Product" element={<Show />}></Route>
          <Route path="/Product/:_id" element={<Product_view />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Profile/:_id" element={<Update_userdata />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="Myorder" element={<Myorder />}></Route>
          <Route path="/:id/:product_id/Reviews" element={<Reviews />}></Route>
          <Route path="/Footer" element={<Footer />}></Route>
          <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/Signin" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
