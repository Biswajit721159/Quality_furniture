import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";
import ProductReview from "./Product_Review";
import Footer from "../component/Footer";
import Loader from "./Loader";
import { FcPrevious, FcNext } from "react-icons/fc";
import { SetRating } from "../constant/Rating";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { AddToCartDB, RemoveToDB } from "../redux/CartSlice";
const api = process.env.REACT_APP_API;

export default function Product_view() {
    const [product, setproduct] = useState(null);
    const _id = useParams()?._id;
    const history = useNavigate();
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state?.user)?.user;
    let [load, setload] = useState(true);
    const [relatedProduct, setrelatedProduct] = useState(null);
    const [removebutton] = useState(false);
    let cartproduct = useSelector((state) => state?.cartdata?.product);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        loadproduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id]);

    function loadproduct() {
        setload(true);
        fetch(`${api}/product/${_id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 201) {
                    setproduct(data?.data);
                    findrelatedproduct(data?.data);
                    setload(false);
                    setActiveImg(0);
                } else {
                    history("*");
                }
            });
    }

    function findrelatedproduct(product) {
        if (product == null || product.product_type == null) return;
        fetch(`${api}/product/getproductByType/${product.product_type}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 201) setrelatedProduct(data?.data);
            });
    }

    function Add_TO_CART() {
        dispatch(AddToCartDB({ userinfo, product_id: _id, product_count: 1, product: cartproduct }));
    }

    function removeTocart() {
        dispatch(RemoveToDB({ userinfo, product_id: cartproduct?.product_id, product_count: cartproduct?.product_count, product: cartproduct }));
    }

    const discountedPrice = product
        ? (product.price - (product.price * product.offer) / 100).toFixed(2)
        : 0;

    const savings = product ? (product.price - discountedPrice).toFixed(2) : 0;

    return (
        <>
            {load === true ? (
                <Loader />
            ) : product !== null ? (
                <div className="min-h-screen bg-page">
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        {/* Main Product Section */}
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* Image Gallery */}
                            <div className="lg:w-1/2">
                                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-stone-100 p-4">
                                    {/* Main Image */}
                                    <div className="relative rounded-xl overflow-hidden bg-stone-50 mb-3">
                                        <img
                                            className="w-full h-80 object-cover"
                                            src={product?.newImage?.[activeImg]}
                                            alt={product?.product_name}
                                        />
                                        {/* Carousel nav overlays */}
                                        {activeImg > 0 && (
                                            <button
                                                onClick={() => setActiveImg(activeImg - 1)}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                            >
                                                <FcPrevious size={20} />
                                            </button>
                                        )}
                                        {activeImg < (product?.newImage?.length - 1) && (
                                            <button
                                                onClick={() => setActiveImg(activeImg + 1)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                            >
                                                <FcNext size={20} />
                                            </button>
                                        )}
                                    </div>
                                    {/* Thumbnails */}
                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                        {product?.newImage?.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImg(idx)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-brand' : 'border-stone-200 hover:border-stone-400'}`}
                                            >
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="lg:w-1/2">
                                <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-6 h-full">

                                    {/* Name & Category */}
                                    <div className="mb-4">
                                        {product?.product_type && (
                                            <span className="inline-block text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full mb-2">
                                                {product.product_type}
                                            </span>
                                        )}
                                        <h1 className="text-2xl font-bold text-stone-900 leading-snug">
                                            {product?.product_name}
                                        </h1>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone-100">
                                        <SetRating rating={product?.rating} />
                                        <span className="text-stone-400 text-sm font-bold tracking-tight">{product?.rating} Out of 5</span>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mb-5">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="text-3xl font-bold text-brand">₹{discountedPrice}</span>
                                            <span className="text-lg text-stone-400 line-through">₹{product?.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="badge-warning flex items-center gap-1">
                                                <MdLocalOffer size={12} />
                                                {product?.offer}% OFF
                                            </span>
                                            <span className="text-sm text-green-600 font-medium">
                                                You save ₹{savings}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div className="mb-6 p-3 bg-stone-50 rounded-xl">
                                        {product?.total_number_of_product > 0 ? (
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    In Stock
                                                </span>
                                                <span className="text-stone-500 text-sm">
                                                    Only <strong>{product?.total_number_of_product}</strong> left
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="flex items-center gap-2 text-red-500 font-semibold text-sm">
                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Cart Button */}
                                    {cartproduct && cartproduct.product_id === _id ? (
                                        <button
                                            onClick={removeTocart}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                                        >
                                            <FaTrash size={16} />
                                            {removebutton ? <BeatLoader color="#fff" size={8} /> : "Remove from Cart"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={Add_TO_CART}
                                            disabled={!product?.total_number_of_product}
                                            className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95
                                                ${product?.total_number_of_product
                                                    ? 'bg-brand hover:bg-brand-light text-white'
                                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                                        >
                                            <FaShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                    )}

                                    {/* Features */}
                                    <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
                                        {[
                                            '🚚 Free Delivery',
                                            '↩️ Easy Returns',
                                            '🔒 Secure Payment',
                                            '⭐ Quality Assured',
                                        ].map(f => (
                                            <div key={f} className="text-xs text-stone-500 flex items-center gap-1">{f}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="mt-8 bg-white rounded-2xl shadow-card border border-stone-100 p-6">
                            <ProductReview _id={_id} />
                        </div>

                        {/* Related Products */}
                        {relatedProduct && (
                            <div className="mt-8">
                                <h2 className="text-lg font-bold text-stone-800 mb-4 px-1">Related Products</h2>
                                <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-4">
                                    <Carousel data={relatedProduct} _id={_id} message="Related Product" />
                                </div>
                            </div>
                        )}
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <span className="text-6xl">🪑</span>
                    <h2 className="text-2xl font-bold text-stone-600">Product Not Found</h2>
                </div>
            )}
        </>
    );
}
