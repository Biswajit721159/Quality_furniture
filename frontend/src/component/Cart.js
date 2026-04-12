import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BeatLoader, ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { GrAdd, GrSubtract } from "react-icons/gr";
import { FaShoppingCart, FaTag, FaTruck } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import Loader from './Loader'
import { LoadCart, AddToCartDB, RemoveToDB } from '../redux/CartSlice'
import { Ordermethod } from '../redux/OrderSlice';
import { toast } from 'react-toastify'
const api = process.env.REACT_APP_API

export default function Cart() {
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user)?.user
    let { product, loadingcart, product_Price, loadingcartcount } = useSelector((state) => state.cartdata);
    const [address, setaddress] = useState()
    const [button, setbutton] = useState("PLACE ORDER")
    const [disabled, setdisabled] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        if (userinfo === null) {
            history('/Signin')
        } else {
            setaddress(userinfo?.user?.address)
            if (userinfo?.user?.email && userinfo?.accessToken && Object?.keys(product)?.length === 0) {
                dispatch(LoadCart(userinfo))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Add_TO_CART() {
        if (product?.product_count >= product?.total_number_of_product) {
            toast.warn(`Sorry, only ${product?.total_number_of_product} items available.`)
        } else if (product?.product_count >= 5) {
            toast.warn("Max 5 items allowed in cart.")
        } else {
            dispatch(AddToCartDB({ userinfo, product_id: product?.product_id, product_count: product?.product_count + 1, product }))
        }
    }

    function SUB_TO_CART() {
        if (product?.product_count <= 0) {
            toast.warn("Use the 'Remove' button to remove the product.")
        } else {
            dispatch(AddToCartDB({ userinfo, product_id: product?.product_id, product_count: product?.product_count - 1, product }))
        }
    }

    function submit() {
        const date = new Date();
        let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        if (product?.product_count === 0) {
            toast.warn("Please select at least 1 product.")
            return;
        }
        setdisabled(true)
        setbutton(<BeatLoader color="#fff" size={8} />)

        fetch(`${api}/order`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.accessToken}`
            },
            body: JSON.stringify({
                email: userinfo.user.email,
                address,
                product_id: product?.product_id,
                product_count: product?.product_count,
                payment_method: "Cash on Delivary",
                Total_rupess: product_Price,
                Date: currentDate,
            })
        }).then(r => r.json())
            .then((res) => {
                if (res.statusCode === 201) {
                    dispatch(Ordermethod.clearOrder())
                    setbutton("Order Placed!")
                    toast.success(res.message)
                    history('/Myorder')
                    removeTocart()
                } else if (res.statusCode === 498) {
                    localStorage.removeItem('user');
                    history('/Login')
                } else {
                    toast.warn(res.message)
                    setdisabled(false)
                    setbutton("PLACE ORDER")
                }
            }).catch(() => history('*'))
    }

    function removeTocart() {
        dispatch(RemoveToDB({ userinfo, product_id: product?.product_id, product_count: product?.product_count, product }))
    }

    const originalTotal = product?.price * product?.product_count;
    const savedAmount = originalTotal - product_Price;

    return (
        <>
            {loadingcart === true ? (
                <Loader />
            ) : Object?.keys(product)?.length !== 0 ? (
                <div className="min-h-screen bg-page py-6 px-4">
                    {/* Address notice */}
                    <div className="max-w-5xl mx-auto mb-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                            <span>📍</span>
                            <span>
                                To change your delivery address, visit your{' '}
                                <Link to="/Profile" className="font-bold text-amber-700 hover:underline">Profile Section</Link>
                            </span>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left — Product */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-stone-100 p-6">
                            <h2 className="text-lg font-bold text-stone-800 mb-5 flex items-center gap-2">
                                <FaShoppingCart className="text-brand" />
                                Your Cart
                            </h2>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Product Image */}
                                <Link to={`/Product/${product?._id}`} className="flex-shrink-0">
                                    <img
                                        src={product?.newImage?.[0]}
                                        alt={product?.product_name}
                                        className="w-full sm:w-44 h-36 object-cover rounded-xl border border-stone-200 hover:scale-105 transition-transform"
                                    />
                                </Link>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-stone-900 mb-1">{product?.product_name}</h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="badge-warning flex items-center gap-1 text-xs">
                                            <FaTag size={10} />
                                            {product?.offer}% OFF
                                        </span>
                                        <span className="text-xs text-stone-400">({product?.total_number_of_product} left in stock)</span>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-xl font-bold text-brand">
                                            ₹{(product?.price - ((product?.price * product?.offer) / 100)).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-stone-400 line-through">₹{product?.price}</span>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-sm text-stone-500 font-medium">Qty:</span>
                                        <div className="flex items-center bg-stone-100 rounded-xl overflow-hidden">
                                            <button
                                                onClick={SUB_TO_CART}
                                                disabled={product?.product_count <= 0}
                                                className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <GrSubtract size={14} />
                                            </button>
                                            <span className="px-4 py-2 font-bold text-stone-800 min-w-[40px] text-center">
                                                {loadingcartcount === true ? <ClipLoader size={14} color="#7C4B2A" /> : product?.product_count}
                                            </span>
                                            <button
                                                onClick={Add_TO_CART}
                                                disabled={product?.product_count >= 5}
                                                className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <GrAdd size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={removeTocart}
                                        className="text-sm text-red-500 hover:text-red-700 hover:underline font-medium transition-colors"
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right — Price Summary */}
                        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-6">
                            <h2 className="text-lg font-bold text-stone-800 mb-5">Price Details</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-stone-600">
                                    <span>Price × {product?.product_count}</span>
                                    <span>₹{originalTotal}</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Discount</span>
                                    <span>- ₹{savedAmount?.toFixed ? savedAmount.toFixed(2) : savedAmount}</span>
                                </div>
                                <div className="flex justify-between items-center text-stone-500">
                                    <span className="flex items-center gap-1"><FaTruck size={12} /> Delivery</span>
                                    <span className="line-through text-stone-400 mr-1 text-xs">₹80</span>
                                    <span className="text-green-600 font-medium text-xs">FREE</span>
                                </div>
                                <div className="border-t border-stone-200 pt-3 flex justify-between font-bold text-stone-900 text-base">
                                    <span>Total Amount</span>
                                    <span className="text-brand">₹{product_Price}</span>
                                </div>
                            </div>

                            {savedAmount > 0 && (
                                <div className="mt-4 p-3 bg-green-50 rounded-xl text-sm text-green-700 font-medium text-center">
                                    🎉 You save ₹{typeof savedAmount === 'number' ? savedAmount.toFixed(2) : savedAmount} on this order!
                                </div>
                            )}

                            {/* Delivery Address */}
                            <div className="mt-4 p-3 bg-stone-50 rounded-xl">
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Delivery to</p>
                                <p className="text-sm text-stone-700 leading-snug">{address}</p>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={submit}
                                disabled={disabled}
                                className={`mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all shadow-md
                                    ${disabled ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
                            >
                                {button}
                                {!disabled && <MdArrowForward size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-page">
                    <div className="text-6xl">🛒</div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-stone-700 mb-2">Your cart is empty</h2>
                        <p className="text-stone-400 text-sm mb-6">Browse our furniture collection and add items you love</p>
                    </div>
                    <Link to="/Product">
                        <button className="px-8 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-md hover:shadow-lg">
                            Shop Now
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}
