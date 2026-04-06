import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa6";
import { usermethod } from '../redux/UserSlice'
import Loader from './Loader';
import { Ordermethod } from '../redux/OrderSlice';

const api = process.env.REACT_APP_API

export default function Reviews() {
    const userinfo = useSelector((state) => state.user)?.user
    let order_id = useParams().id
    let product_id = useParams().product_id

    const dispatch = useDispatch()
    let history = useNavigate()
    const [reviews, setreviews] = useState("");
    const [rating, setrating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [product, setproduct] = useState()
    const [order, setorder] = useState()

    const [errorreviews, seterrorreviews] = useState(false)
    const [errorrating, seterrorrating] = useState(false)
    const [errormessreviews, seterrormessreviews] = useState("")
    const [errormessrating, seterrormessrating] = useState("")

    const [load, setload] = useState(true)
    const [button, setbutton] = useState("Submit Feedback")
    const [disabled, setdisabled] = useState(false)

    useEffect(() => {
        if (userinfo === null || userinfo === undefined) {
            dispatch(usermethod.Logout_User())
            history('/Signin')
        } else {
            loadproduct()
        }
    }, [])

    function findOrder_id() {
        fetch(`${api}/order/getById/${order_id}`, {
            headers: { Authorization: `Bearer ${userinfo?.accessToken}` }
        }).then(res => res.json())
            .then((res) => {
                if (res.statusCode === 201) {
                    setorder(res.data)
                } else if (res.statusCode === 498) {
                    dispatch(usermethod.Logout_User())
                    history('/Signin')
                } else {
                    history("*")
                }
                setload(false)
            }).catch(() => history('*'))
    }

    function loadproduct() {
        fetch(`${api}/product/${product_id}`, {
            headers: { Authorization: `Bearer ${userinfo.accessToken}` }
        }).then(res => res.json()).then((result) => {
            if (result.statusCode === 201) {
                setproduct(result.data)
                findOrder_id()
            } else if (result.statusCode === 498) {
                dispatch(usermethod.Logout_User())
                history('/Signin')
            } else {
                history("*")
            }
        }).catch(() => history('*'))
    }

    function checkreviews() {
        if (reviews.trim().length === 0) {
            seterrorreviews(true)
            seterrormessreviews("Please write a review")
            return false
        } else if (reviews.trim().length < 8) {
            seterrorreviews(true)
            seterrormessreviews("Review is too short (min 8 characters)")
            return false;
        } else if (reviews.trim().length > 150) {
            seterrorreviews(true)
            seterrormessreviews("Review is too long (max 150 characters)")
            return false;
        }
        seterrorreviews(false)
        return true;
    }

    function checkrating() {
        if (rating >= 1 && rating <= 5) {
            seterrorrating(false)
            return true;
        } else {
            seterrorrating(true)
            seterrormessrating("Please select a star rating")
            return false
        }
    }

    function PushReviews() {
        fetch(`${api}/Reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.accessToken}`
            },
            body: JSON.stringify({
                email: userinfo.user.email,
                product_id: product_id,
                order_id: order_id,
                rating: rating,
                review: reviews,
            })
        }).then(res => res.json()).then(() => {
            history('/Myorder')
        })
    }

    function UpdateIntoOrder() {
        fetch(`${api}/order/updateFeedback/${order_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo?.accessToken}`
            },
            body: JSON.stringify({ isfeedback: true })
        }).then(res => res.json()).then((result) => {
            if (result.statusCode === 200) {
                dispatch(Ordermethod.markisfeedback({ id: order_id }))
                PushReviews()
            }
        })
    }

    function submit(e) {
        e.preventDefault()
        if (!product || !order) return

        let isRatingValid = checkrating()
        let isReviewValid = checkreviews()

        if (isRatingValid && isReviewValid) {
            setbutton("Submitting...")
            setdisabled(true)

            let newTotalRating = parseInt(product.rating) * parseInt(product.number_of_people_give_rating) + parseInt(rating);
            let newPeopleCount = product.number_of_people_give_rating + 1;
            let newAvg = (newTotalRating / newPeopleCount).toFixed(1);

            fetch(`${api}/product/RaingUpdateIntoProduct/${product_id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userinfo.accessToken}`
                },
                body: JSON.stringify({
                    product_id: product_id,
                    rating: newAvg,
                    number_of_people_give_rating: newPeopleCount,
                })
            }).then(res => res.json()).then(() => {
                UpdateIntoOrder()
            })
        }
    }

    const reviewTexts = ["Very Bad", "Bad", "Good", "Very Good", "Excellent"];

    return (
        <div className="min-h-screen bg-page flex items-start justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                {load ? (
                    <Loader />
                ) : (
                    <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-stone-900">Write a Review</h1>
                            <p className="text-stone-500 text-sm mt-1">Share your experience with this product</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Star Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">Overall Rating</label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => { setrating(star); seterrorrating(false); }}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none transition-transform hover:scale-110 p-1"
                                        >
                                            <FaStar
                                                size={32}
                                                className={`transition-colors duration-200 ${star <= (hoverRating || rating)
                                                        ? "text-amber-400"
                                                        : "text-stone-200 hover:text-amber-200"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                        {rating > 0 ? reviewTexts[rating - 1] : "Select Rating"}
                                    </span>
                                </div>
                                {errorrating && <p className="text-xs text-red-500 mt-2">{errormessrating}</p>}
                            </div>

                            {/* Review Text */}
                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">Your Review</label>
                                <textarea
                                    className={`input-base resize-none h-32 ${errorreviews ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    placeholder="What did you like or dislike? How's the quality?"
                                    value={reviews}
                                    spellCheck='false'
                                    onChange={(e) => { setreviews(e.target.value); seterrorreviews(false); }}
                                />
                                <div className="flex justify-between items-start mt-1">
                                    {errorreviews ? (
                                        <p className="text-xs text-red-500">{errormessreviews}</p>
                                    ) : (
                                        <p className="text-xs text-stone-400">Min 8 characters</p>
                                    )}
                                    <span className={`text-xs ${reviews.length > 150 ? 'text-red-500' : 'text-stone-400'}`}>
                                        {reviews.length}/150
                                    </span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={disabled}
                                className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md
                                    ${disabled ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
                            >
                                {button}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
