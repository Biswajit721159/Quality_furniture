import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../component/Footer'
import Slider from './Slider';
import { loadProduct, searchProduct, AddToWishList, RemoveToWishList } from '../redux/ProductSlice'
import { productmethod } from '../redux/ProductSlice'
import { AddToCartDB, RemoveToDB } from '../redux/CartSlice'
import { FaHeart } from 'react-icons/fa';

import Loader from './Loader';
import Loading from './Loading';
import GoodToSee from './GoodToSee';
import GoToMainPage from './GoToMainPage';
import { SetRating } from '../constant/Rating'
import Filter from './Filter';

export default function Show() {

    const dispatch = useDispatch()
    const history = useNavigate()
    const [searchParams] = useSearchParams()
    const userinfo = useSelector((state) => state?.user)?.user
    const [wishlistid, setwishlistid] = useState(0)
    const [sortOption, setSortOption] = useState('none')
    const [cartLoadingId, setCartLoadingId] = useState(null)

    const { product: cartproduct, loadingcart, loadingcartcount } = useSelector((state) => state?.cartdata)
    
    const urlSearchQuery = searchParams.get('search') || '';

    let { product, lowerLimit, higherLimit, lowprice, highprice, selectcatagory, loadingproduct, next_page, wishlistloader } = useSelector((state) => state?.product)

    useEffect(() => {
        dispatch(productmethod.setSearchProduct({ searchproduct: urlSearchQuery }));
        dispatch(productmethod.AddEveryThing({ lowerLimit: 0, higherLimit: 15 }));
        dispatch(searchProduct({ lowprice, highprice, selectcatagory, searchInput: urlSearchQuery, lowerLimit: 0, higherLimit: 15, userinfo }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlSearchQuery, dispatch])

    const getSortedProducts = () => {
        let sorted = [...(product || [])];
        if (sortOption === 'lowToHigh') {
            sorted.sort((a, b) => parseInt(a.price - ((a.price * a.offer) / 100)) - parseInt(b.price - ((b.price * b.offer) / 100)));
        } else if (sortOption === 'highToLow') {
            sorted.sort((a, b) => parseInt(b.price - ((b.price * b.offer) / 100)) - parseInt(a.price - ((a.price * a.offer) / 100)));
        } else if (sortOption === 'topRated') {
            sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        } else if (sortOption === 'bestOffer') {
            sorted.sort((a, b) => parseInt(b.offer) - parseInt(a.offer));
        }
        return sorted;
    }
    const displayProducts = getSortedProducts();

    function addToWishlist(product_id) {
        if (checkLogin()) { history('/Signin'); return; }
        setwishlistid(product_id)
        dispatch(AddToWishList({ userinfo, product_id }))
    }

    function removeToWishlist(product_id) {
        if (checkLogin()) { history('/Signin'); return; }
        setwishlistid(product_id)
        dispatch(RemoveToWishList({ userinfo, product_id }))
    }

    function AddToCart(product_id) {
        if (checkLogin()) { history('/Signin'); return; }
        setCartLoadingId(product_id)
        if (cartproduct?.product_id === product_id) {
            dispatch(AddToCartDB({ userinfo, product_id: cartproduct?.product_id, product_count: cartproduct?.product_count + 1, product: cartproduct }))
        } else {
            dispatch(AddToCartDB({ userinfo, product_id, product_count: 1, product: cartproduct }))
        }
    }

    function removeTocart(product_id) {
        if (checkLogin()) { history('/Signin'); return; }
        setCartLoadingId(product_id)
        dispatch(RemoveToDB({ userinfo, product_id: cartproduct?.product_id, product_count: cartproduct?.product_count, product: cartproduct }))
    }

    function NextPage() {
        lowerLimit += 15
        higherLimit += 15
        dispatch(productmethod.AddEveryThing({ lowerLimit, higherLimit }))
        dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchInput: urlSearchQuery, lowerLimit, higherLimit, userinfo }))
    }

    const [takeid, settakeid] = useState(0)

    function handleMouseOver(product_id) { settakeid(product_id) }
    function handleMouseLeave() { settakeid(0) }

    function checkLogin() {
        return !userinfo?.accessToken;
    }

    const getDiscountedPrice = (price, offer) =>
        (price - (price * offer) / 100).toFixed(2);

    return (
        <div className="min-h-screen bg-page">
            {loadingproduct === true && product?.length === 0 ? (
                <Loader />
            ) : product?.length !== 0 ? (
                <>
                    {/* Main Layout */}
                    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filter */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 sticky top-24 z-10">
                                <Filter />
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col min-w-0">
                            {/* Top Bar Sort */}
                            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex-1">
                                    {loadingproduct === true ? <Loading /> : <GoodToSee />}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-stone-600 uppercase tracking-wide">Sort By</span>
                                    <select 
                                        className="text-sm font-medium border border-stone-200 rounded-lg px-3 py-2 bg-stone-50 text-stone-700 outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 cursor-pointer shadow-sm transition-all"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="none">Relevance</option>
                                        <option value="lowToHigh">Price: Low to High</option>
                                        <option value="highToLow">Price: High to Low</option>
                                        <option value="topRated">Top Rated</option>
                                        <option value="bestOffer">Best Offer</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Product Grid */}
                            <div className="flex flex-wrap justify-center gap-5 pb-6">
                                {displayProducts?.map((item, ind) => (
                                <div
                                    key={ind}
                                    className="bg-white rounded-2xl shadow-card overflow-hidden border border-stone-100 w-56 flex flex-col"
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden">
                                        {takeid === item._id ? (
                                            <Link to={`/Product/${item._id}`} onMouseLeave={handleMouseLeave} onMouseOver={() => handleMouseOver(item._id)}>
                                                <Slider data={item.newImage} />
                                            </Link>
                                        ) : (
                                            <Link to={`/Product/${item._id}`} onMouseOver={() => handleMouseOver(item._id)}>
                                                <img
                                                    src={item?.newImage[0]}
                                                    alt={item.product_name}
                                                    className="w-full h-44 object-cover"
                                                />
                                            </Link>
                                        )}
                                        {/* Offer Badge */}
                                        {item.offer > 0 && (
                                            <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {item.offer}% OFF
                                            </span>
                                        )}
                                        {/* Wishlist Heart */}
                                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:scale-110 transition-transform outline-none border-none">
                                            {wishlistloader === true && wishlistid === item._id ? (
                                                <ClipLoader color="#7C4B2A" size={14} />
                                            ) : item.islove === false ? (
                                                <FaHeart className="text-stone-300 hover:text-red-400 transition-colors text-sm" onClick={() => addToWishlist(item._id)} />
                                            ) : (
                                                <FaHeart className="text-red-500 text-sm" onClick={() => removeToWishlist(item._id)} />
                                            )}
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-3 flex flex-col flex-1">
                                        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 mb-2 leading-snug">
                                            {item.product_name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-2">
                                            <SetRating rating={item.rating} />
                                        </div>

                                        {/* Price Row */}
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-base font-bold text-brand">
                                                ₹{getDiscountedPrice(item.price, item.offer)}
                                            </span>
                                            <span className="text-xs text-stone-400 line-through">₹{item.price}</span>
                                        </div>

                                        {/* Stock */}
                                        <div className="mb-3">
                                            {item.total_number_of_product === 0 ? (
                                                <span className="text-xs text-red-500 font-medium">Out of Stock</span>
                                            ) : (
                                                <span className="text-xs text-green-600 font-medium">
                                                    In Stock · {item.total_number_of_product} left
                                                </span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <div className="mt-auto">
                                            {item.total_number_of_product === 0 ? (
                                                <button className="w-full py-1.5 text-xs bg-stone-100 text-stone-400 rounded-lg cursor-not-allowed font-medium outline-none border-none" disabled>
                                                    Out of Stock
                                                </button>
                                            ) : item?._id === cartproduct?.product_id ? (
                                                <button
                                                    onClick={() => removeTocart(item._id)}
                                                    disabled={loadingcart && cartLoadingId === item._id}
                                                    className="w-full py-1.5 text-xs bg-red-50 text-red-600 border-none rounded-lg hover:bg-red-100 transition-all font-semibold outline-none flex items-center justify-center gap-2"
                                                >
                                                    {loadingcart && cartLoadingId === item._id ? (
                                                        <ClipLoader color="#EF4444" size={12} />
                                                    ) : "Remove from Cart"}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => AddToCart(item._id)}
                                                    disabled={loadingcartcount && cartLoadingId === item._id}
                                                    className="w-full py-1.5 text-xs bg-brand text-white border-none rounded-lg hover:bg-brand-light transition-all font-semibold outline-none flex items-center justify-center gap-2"
                                                >
                                                    {loadingcartcount && cartLoadingId === item._id ? (
                                                        <ClipLoader color="#ffffff" size={12} />
                                                    ) : "Add to Cart"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {loadingproduct === true ? (
                            <Loading />
                        ) : next_page && (
                            <div className="flex justify-center pb-8 border-t border-stone-200 pt-6">
                                <button
                                    onClick={NextPage}
                                    className="px-8 py-2.5 bg-brand text-white rounded-xl hover:bg-brand-light transition-all font-semibold shadow-md hover:shadow-lg outline-none border-none"
                                >
                                    Load More Products
                                </button>
                            </div>
                        )}
                        </div>
                    </div>

                    <hr className="border-stone-200" />
                    <Footer />
                </>
            ) : (
                <GoToMainPage />
            )}
        </div>
    )
}
