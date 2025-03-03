import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { LoadCart, cartmethod } from '../redux/CartSlice'
import '../css/BootstrapNavbar.css'
import Searchcomponent from './Searchcomponent';
import { usermethod } from '../redux/UserSlice'
import { Ordermethod } from '../redux/OrderSlice';
import { productmethod } from '../redux/ProductSlice';
import { Reviewmethod } from '../redux/ProductReview';

const BootstrapNavbar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userinfo = useSelector((state) => state?.user)?.user
    const [mode, setmode] = useState(localStorage.getItem('mode'));
    const cost = useSelector((state) => state?.cartdata?.product_Price)
    const product = useSelector((state) => state?.cartdata?.product)


    const isCartLogedin = useSelector((state) => state?.cartdata?.isCartLogedin)
    const isProductLogedin = useSelector((state) => state?.product?.isProductLogedin)
    const isOrderLogedin = useSelector((state) => state?.Order?.isOrderLogedin)
    const isReviewLogin = useSelector((state) => state?.Review?.isReviewLogin)

    // console.log(userinfo, isCartLogedin, isProductLogedin, isOrderLogedin, isReviewLogin)

    useEffect(() => {
        if (isCartLogedin === false || isProductLogedin === false || isOrderLogedin === false || isReviewLogin === false) {
            logout()
        }
        else if (userinfo?.user?.email && userinfo?.accessToken) {
            if (Object?.keys(product)?.length === 0) dispatch(LoadCart(userinfo))
        }
        givecolor(localStorage.getItem('mode'));
    }, [userinfo, isCartLogedin, isProductLogedin, isOrderLogedin, isReviewLogin])

    function givecolor(color) {
        if (color == null) {
            localStorage.setItem('mode', 'light')
            setmode('light')
            givecolor('light')
        }
        else if (color == 'light') {
            document.body.style.backgroundColor = "#D9D9D9";
        }
        else {
            document.body.style.backgroundColor = "#85929E";
        }
    }

    function changecolor() {
        if (mode == null) {
            localStorage.setItem('mode', 'light')
            setmode('light')
            givecolor('light')
        }
        else if (mode == 'light') {
            localStorage.setItem('mode', 'dark')
            setmode('dark')
            givecolor('dark')
        }
        else {
            localStorage.setItem('mode', 'light')
            setmode('light')
            givecolor('light')
        }
    }

    function logout() {
        dispatch(cartmethod.clearAll())
        dispatch(Ordermethod.clearAll())
        dispatch(productmethod.clearAll())
        dispatch(Reviewmethod.clearAll())
        dispatch(usermethod.Logout_User())
        history('/Signin')
    }


    return (
			<nav className="navbar navbar-expand-lg navbar navbar-light bg-light ">
				<Link to={"/Product"}>
					<img
						src="https://t3.ftcdn.net/jpg/05/93/29/50/360_F_593295067_2SvEv1yO5R5JZPtnE4AHAun5js3MrTnp.jpg"
						style={{ height: "45px", width: "45px", borderRadius: "50%" }}
						alt="Error"
					/>
				</Link>
				<Link className="navbar-brand mx-2" to="/">
					QUFurniture
				</Link>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/Product">
							Home <span className="sr-only">(current)</span>
						</Link>
					</li>
				</ul>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav mr-auto"></ul>
					<span>
						<Searchcomponent />
					</span>
					{userinfo === null || userinfo === undefined ? (
						<>
							<span className="navbar-text">
								<Link to="/Register">
									<button className="btn btn-primary btn-md">Register</button>
								</Link>
							</span>
							<span className="navbar-text mx-3">
								<Link to="/Signin">
									<button className="btn btn-primary btn-md">Login</button>
								</Link>
							</span>
						</>
					) : (
						userinfo && (
							<>
								{/* <span className="navbar-text mx-2">
									<Link style={{ color: "tomato" }} className="carticon" to={"/Wishlist"}>
										<FaHeart />
									</Link>
								</span> */}
								<span className="navbar-text mr-5 mx-2">
									<Link className="carticon" to={"/Cart"}>
										<span className="cart-value">
											{product?.product_count === undefined ? 0 : product?.product_count}
										</span>
										<FaShoppingCart className="" />
										<span className="rupees-value">
											₹{cost == "NaN" || cost === undefined || cost === null ? 0 : cost}
										</span>
									</Link>
								</span>
								<span className="navbar-text mr-3 mx-2">
									<div className="dropdown">
										<button
											className="btn btn-info btn-sm dropdown-toggle navbartext"
											type="button"
											id="dropdownMenuButton"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											{userinfo?.user?.name}
										</button>
										<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
											<Link className="dropdown-item" style={{ color: "black" }} to={`/Profile`}>
												Profile
											</Link>
											<Link className="dropdown-item" style={{ color: "black" }} to="/wishlist">
												Wishlist
											</Link>
											<Link className="dropdown-item" style={{ color: "black" }} to="/Myorder">
												Myorder
											</Link>
											<Link
												className="dropdown-item"
												style={{ color: "black" }}
												to={"/Signin"}
												onClick={logout}
											>
												Logout
											</Link>
										</div>
									</div>
								</span>
								<span className="navbar-text mx-4">
									{mode === "light" ? (
										<li>
											<button className="btn btn-light rounded-circle" onClick={changecolor}>
												<MdOutlineDarkMode />
											</button>
										</li>
									) : (
										<li>
											<button className="btn btn-dark rounded-circle" onClick={changecolor}>
												<MdOutlineDarkMode />
											</button>
										</li>
									)}
								</span>
							</>
						)
					)}
				</div>
			</nav>
		);
}
export default BootstrapNavbar