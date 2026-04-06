import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import ReviewShow from "./ReviewShow";
import { SetRating } from "../constant/Rating";
import { FaStar } from "react-icons/fa";

const api = process.env.REACT_APP_API

const Product_Review = (id) => {
    const userinfo = useSelector((state) => state.user)?.user
    const dispatch = useDispatch()
    const _id = id._id
    const history = useNavigate()
    const [loadrating, setloadrating] = useState(false);
    const [stats, setStats] = useState(null)

    useEffect(() => {
        loadRating();
    }, [_id])

    function loadRating() {
        setloadrating(true)
        fetch(`${api}/Reviews/findRatingPersentageofProduct/${_id}`)
            .then(res => res.json())
            .then((res) => {
                if (res.statusCode === 200) {
                    setStats(res.data)
                    setloadrating(false);
                } else {
                    history('*');
                }
            })
    }

    if (loadrating || !stats) return <Loader />

    const overallRating = stats[5].overall_rating
    const totalReviews = stats[5].total

    // Colors matching the original logic but using Tailwind hex equivalents
    const colors = [
        "bg-green-600",    // 5 star
        "bg-green-500",    // 4 star 
        "bg-yellow-500",   // 3 star
        "bg-orange-500",   // 2 star
        "bg-red-500"       // 1 star
    ]

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Rating Summary (Left Side) */}
            <div className="w-full md:w-1/3">
                <h3 className="text-lg font-bold text-stone-800 mb-4">Customer Reviews</h3>

                {/* Overall Rating */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-stone-900">{overallRating}</div>
                    <div>
                        <div className="flex mb-1">
                            <SetRating rating={overallRating} />
                        </div>
                        <p className="text-sm text-stone-500">Based on {totalReviews} reviews</p>
                    </div>
                </div>

                {/* Rating Bars */}
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star, maxInd) => {
                        // Original API returns array where index matches the loop logic in old code:
                        // 0: 1_star, 1: 2_star... 4: 5_star. Wait, old code accessed it inverted.
                        // Let's abstract the mapping cleanly based on the old logic index.
                        // stats[4] -> 5star
                        // stats[3] -> 4star
                        // stats[2] -> 3star
                        // stats[1] -> 2star
                        // stats[0] -> 1star
                        const statIndex = star - 1;
                        const percentage = stats[statIndex][`persentage_${star}_star`]
                        const count = stats[statIndex][`number_${star}_star`]

                        return (
                            <div key={star} className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 w-12 font-medium text-stone-600">
                                    {star} <FaStar className="text-amber-400" size={12} />
                                </div>
                                <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${colors[5 - star]}`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <div className="w-8 text-right text-stone-500 text-xs">{count}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* divider on mobile, left border on desktop */}
            <div className="hidden md:block w-px bg-stone-100 self-stretch mx-4"></div>
            <div className="md:hidden h-px bg-stone-100 w-full my-2"></div>

            {/* Review List (Right Side) */}
            <div className="w-full md:w-2/3">
                <ReviewShow _id={_id} />
            </div>
        </div>
    )
}
export default Product_Review