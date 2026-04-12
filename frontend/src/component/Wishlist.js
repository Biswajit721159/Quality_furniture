import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { RemoveToWishList } from '../redux/ProductSlice'
import { useSelector } from 'react-redux';
import { AddToCartDB } from '../redux/CartSlice'
import { usermethod } from '../redux/UserSlice';
import Loader from './Loader';
import { toast } from 'react-toastify'

const api = process.env.REACT_APP_API
export default function WishList() {

  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state.user)?.user
  const [data, setdata] = useState([])
  const history = useNavigate()
  const [load, setload] = useState(false)
  let cartproduct = useSelector((state) => state?.cartdata?.product)

  function loadproduct() {
    setload(true)
    fetch(`${api}/wishlist/GetFavouriteByemail/${userinfo?.user?.email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
    }).then(r => r.json()).then((res) => {
      try {
        if (res.statusCode === 200 || res.statusCode === 404) {
          setdata(res.data);
        } else if (res.statusCode === 498) {
          dispatch(usermethod.Logout_User())
          history('/Signin')
        } else {
          history('*');
        }
        setload(false)
      } catch {
        toast.warn("Something went wrong. Please try again.")
      }
    })
  }

  useEffect(() => {
    if (userinfo === null) {
      history('/Signin')
    } else {
      loadproduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function removeToWishlist(product_id) {
    dispatch(RemoveToWishList({ userinfo, product_id }))
    setdata(data.filter(item => item?._id !== product_id))
  }

  function AddToCart(product_id) {
    dispatch(AddToCartDB({ userinfo, product_id, product_count: 1, product: cartproduct }))
  }

  const getRatingInfo = (r) => {
    const n = parseInt(r);
    if (n >= 4) return { color: 'text-green-600', bg: 'bg-green-50' };
    if (n >= 3) return { color: 'text-amber-500', bg: 'bg-amber-50' };
    return { color: 'text-red-500', bg: 'bg-red-50' };
  };

  return (
    <>
      {load === true ? (
        <Loader />
      ) : (data && data?.length !== 0) ? (
        <div className="min-h-screen bg-page py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
              <FaHeart className="text-red-500" />
              My Wishlist
              <span className="text-sm font-normal text-stone-400 ml-1">({data.length} items)</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-5">
              {data?.map((item, ind) => {
                const rating = getRatingInfo(item.rating);
                const discountedPrice = (item?.price - ((item?.price * item?.offer) / 100)).toFixed(2);
                return (
                  <div
                    key={ind}
                    className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-stone-100 w-56 flex flex-col overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden group">
                      <Link to={`/Product/${item?._id}`}>
                        <img
                          src={item?.newImage?.[0]}
                          alt={item?.product_name}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {/* Offer badge */}
                      {item.offer > 0 && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.offer}% OFF
                        </span>
                      )}
                      {/* Remove heart */}
                      <button
                        onClick={() => removeToWishlist(item._id)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-all group/btn"
                        title="Remove from wishlist"
                      >
                        <FaHeart className="text-red-500 group-hover/btn:scale-110 transition-transform text-sm" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col flex-1">
                      <Link to={`/Product/${item?._id}`}>
                        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 mb-2 leading-snug hover:text-brand transition-colors">
                          {item?.product_name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-2 w-fit ${rating.bg} ${rating.color}`}>
                        <AiFillStar size={11} />
                        {item.rating}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-base font-bold text-brand">₹{discountedPrice}</span>
                        <span className="text-xs text-stone-400 line-through">₹{item?.price}</span>
                      </div>

                      {/* Stock */}
                      <div className="mb-3">
                        {item?.total_number_of_product === 0 ? (
                          <span className="text-xs text-red-500 font-medium">Out of Stock</span>
                        ) : (
                          <span className="text-xs text-green-600 font-medium">
                            In Stock · {item?.total_number_of_product} left
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex gap-2">
                        <button
                          onClick={() => removeToWishlist(item._id)}
                          className="flex-shrink-0 p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                          title="Remove"
                        >
                          <FaTrash size={12} />
                        </button>
                        <button
                          onClick={() => AddToCart(item._id)}
                          disabled={!item?.total_number_of_product}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all
                            ${!item?.total_number_of_product
                              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                              : 'bg-brand text-white hover:bg-brand-light'}`}
                        >
                          <FaShoppingCart size={11} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-page">
          <div className="text-6xl">🤍</div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-700 mb-2">Your Wishlist is Empty</h2>
            <p className="text-stone-400 text-sm mb-6">Save items you love to revisit them later</p>
          </div>
          <Link to="/Product">
            <button className="px-8 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-md">
              Discover Products
            </button>
          </Link>
        </div>
      )}
    </>
  )
}
