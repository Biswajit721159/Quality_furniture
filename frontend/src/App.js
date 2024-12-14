import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./component/Register";
// import Login from "./component/Login";
import Product from "./component/Product";
import Show from "./component/Show";
import Product_view from "./component/Product_view";
import Update_userdata from "./component/Update_userdata";
import Error from "./component/Error";
import WishList from "./component/Wishlist";
import Cart from "./component/Cart";
import Myorder from "./component/Myorder";
import Reviews from "./component/Reviews";
import Footer from "./component/Footer";
import "./css/Loader.css";
import BootstrapNavbar from "./component/BootstrapNavbar";
// import ForgotPassword from "./component/ForgotPassword";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import PasswordReset from "./component/auth/PasswordReset";
function App() {
	return (
		<div className="App">
			<Router>
				<BootstrapNavbar />
				<Routes>
					<Route path="/" element={<Product />}></Route>
					<Route path="/Product" element={<Show />}></Route>
					<Route path="/Product/:_id" element={<Product_view />}></Route>
					<Route path="/Profile" element={<Update_userdata />}></Route>
					<Route path="/wishlist" element={<WishList />}></Route>
					<Route path="/Cart" element={<Cart />}></Route>
					<Route path="Myorder" element={<Myorder />}></Route>
					<Route path="/:id/:product_id/Reviews" element={<Reviews />}></Route>
					<Route path="/Footer" element={<Footer />}></Route>
					<Route path="/Register" element={<Register />}></Route>
					<Route path="/Signin" element={<Login />}></Route>
					<Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
					<Route path="/PasswordReset/:token" element={<PasswordReset />}></Route>
					<Route path="*" element={<Error />}></Route>
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
