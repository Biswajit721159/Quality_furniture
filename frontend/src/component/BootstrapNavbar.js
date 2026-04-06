import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux'
import { LoadCart, cartmethod } from '../redux/CartSlice'
import Searchcomponent from './Searchcomponent';
import { usermethod } from '../redux/UserSlice'
import { Ordermethod } from '../redux/OrderSlice';
import { productmethod } from '../redux/ProductSlice';
import { Reviewmethod } from '../redux/ProductReview';

const BootstrapNavbar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userinfo = useSelector((state) => state?.user)?.user
    const cost = useSelector((state) => state?.cartdata?.product_Price)
    const product = useSelector((state) => state?.cartdata?.product)
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isCartLogedin = useSelector((state) => state?.cartdata?.isCartLogedin)
    const isProductLogedin = useSelector((state) => state?.product?.isProductLogedin)
    const isOrderLogedin = useSelector((state) => state?.Order?.isOrderLogedin)
    const isReviewLogin = useSelector((state) => state?.Review?.isReviewLogin)

    useEffect(() => {
        if (isCartLogedin === false || isProductLogedin === false || isOrderLogedin === false || isReviewLogin === false) {
            logout()
        }
        else if (userinfo?.user?.email && userinfo?.accessToken) {
            if (Object?.keys(product)?.length === 0) dispatch(LoadCart(userinfo))
        }
        // Ensure body matches the brand light background on mount
        document.body.style.backgroundColor = "#F5F0EB";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userinfo, isCartLogedin, isProductLogedin, isOrderLogedin, isReviewLogin])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function logout() {
        dispatch(cartmethod.clearAll())
        dispatch(Ordermethod.clearAll())
        dispatch(productmethod.clearAll())
        dispatch(Reviewmethod.clearAll())
        dispatch(usermethod.Logout_User())
        history('/Signin')
    }

    const cartCount = product?.product_count === undefined ? 0 : product?.product_count;
    const cartCost = cost === "NaN" || cost === undefined || cost === null ? 0 : cost;

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo + Brand */}
                    <div className="flex items-center gap-3">
                        <Link to="/Product">
                            <img
                                src="https://t3.ftcdn.net/jpg/05/93/29/50/360_F_593295067_2SvEv1yO5R5JZPtnE4AHAun5js3MrTnp.jpg"
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-stone-100 hover:ring-amber-200 transition-all shadow-sm"
                                alt="QUFurniture Logo"
                            />
                        </Link>
                        <Link to="/" className="text-stone-900 font-extrabold text-xl tracking-tight transition-colors">
                            QU<span className="text-amber-600">Furniture</span>
                        </Link>
                        <Link
                            to="/Product"
                            className="hidden md:block ml-4 text-stone-600 hover:text-brand text-sm font-bold px-4 py-2 rounded-xl hover:bg-amber-50 transition-all"
                        >
                            Product
                        </Link>
                    </div>

                    {/* Search - desktop */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
                        <Searchcomponent />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {userinfo === null || userinfo === undefined ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link to="/Register">
                                    <button className="text-sm font-bold text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all px-5 py-2 rounded-xl">
                                        Register
                                    </button>
                                </Link>
                                <Link to="/Signin">
                                    <button className="text-sm font-bold px-5 py-2 rounded-xl bg-brand hover:bg-brand-light text-white transition-all shadow-md hover:shadow-lg active:scale-95">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            userinfo && (
                                <div className="hidden md:flex items-center gap-6">
                                    {/* Cart */}
                                    <Link to="/Cart" className="relative flex items-center gap-2 group p-2 rounded-xl hover:bg-stone-50 transition-colors">
                                        <span className="relative">
                                            {cartCount > 0 && (
                                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold z-10 shadow-sm border-2 border-white">
                                                    {cartCount}
                                                </span>
                                            )}
                                            <FiShoppingCart className="text-stone-500 group-hover:text-brand text-[22px] transition-colors stroke-[2.5]" />
                                        </span>
                                        {cartCost > 0 && (
                                            <span className="text-sm font-bold text-stone-800 ml-2">
                                                ₹{cartCost}
                                            </span>
                                        )}
                                    </Link>

                                    {/* User Dropdown */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-bold transition-all border border-stone-200 shadow-sm"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black uppercase ring-2 ring-white">
                                                {userinfo?.user?.name?.charAt(0)}
                                            </div>
                                            <span className="max-w-[100px] truncate">{userinfo?.user?.name}</span>
                                            <svg className={`w-4 h-4 text-stone-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {dropdownOpen && (
                                            <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] bg-white border border-stone-100 overflow-hidden z-50">
                                                <div className="px-5 py-4 border-b border-stone-50 bg-stone-50/50">
                                                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">Signed in as</p>
                                                    <p className="text-sm font-bold text-stone-900 truncate">{userinfo?.user?.email}</p>
                                                </div>
                                                <div className="py-2">
                                                    {[
                                                        { to: '/Profile', label: 'My Profile' },
                                                        { to: '/wishlist', label: 'Wishlist' },
                                                        { to: '/Myorder', label: 'Order History' },
                                                    ].map(item => (
                                                        <Link
                                                            key={item.to}
                                                            to={item.to}
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="border-t border-stone-50 py-1">
                                                    <button
                                                        onClick={() => { setDropdownOpen(false); logout(); }}
                                                        className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-xl text-stone-500 hover:text-brand hover:bg-amber-50 transition-all"
                        >
                            {menuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden pb-4 border-t border-stone-100 mt-2 pt-4 space-y-3">
                        {/* Mobile Search */}
                        <div className="w-full px-2">
                            <Searchcomponent />
                        </div>

                        <Link to="/Product" onClick={() => setMenuOpen(false)}
                            className="block py-2.5 px-4 text-stone-600 font-bold hover:text-brand hover:bg-amber-50 rounded-xl transition-all text-sm">
                            Product
                        </Link>

                        {userinfo === null || userinfo === undefined ? (
                            <div className="flex flex-col gap-2 pt-2 px-2">
                                <Link to="/Register" onClick={() => setMenuOpen(false)} className="w-full">
                                    <button className="w-full py-2.5 text-sm font-bold border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all">Register</button>
                                </Link>
                                <Link to="/Signin" onClick={() => setMenuOpen(false)} className="w-full">
                                    <button className="w-full py-2.5 text-sm bg-brand text-white rounded-xl hover:bg-brand-light transition-all font-bold shadow-md">Login</button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-1 px-2">
                                <Link to="/Cart" onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 py-2.5 px-3 text-stone-600 font-bold hover:text-brand hover:bg-amber-50 rounded-xl transition-all text-sm">
                                    <FiShoppingCart className="text-[20px] stroke-[2.5]" />
                                    Cart {cartCount > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">{cartCount}</span>}
                                </Link>
                                <Link to="/Profile" onClick={() => setMenuOpen(false)}
                                    className="block py-2.5 px-3 text-stone-600 font-bold hover:text-brand hover:bg-amber-50 rounded-xl transition-all text-sm">Profile</Link>
                                <Link to="/wishlist" onClick={() => setMenuOpen(false)}
                                    className="block py-2.5 px-3 text-stone-600 font-bold hover:text-brand hover:bg-amber-50 rounded-xl transition-all text-sm">Wishlist</Link>
                                <Link to="/Myorder" onClick={() => setMenuOpen(false)}
                                    className="block py-2.5 px-3 text-stone-600 font-bold hover:text-brand hover:bg-amber-50 rounded-xl transition-all text-sm">Order History</Link>
                                
                                <button onClick={() => { setMenuOpen(false); logout(); }}
                                    className="w-full text-left py-2.5 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-bold mt-2">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
export default BootstrapNavbar