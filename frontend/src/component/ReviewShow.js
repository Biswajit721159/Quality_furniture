import React, { useEffect } from "react";
import { PulseLoader, ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from "react-redux";
import { Reviewmethod, loadReview, updatelikeAnddisLike } from "../redux/ProductReview";
import Loading from '../component/Loading';
import { SetRating } from '../constant/Rating';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ReviewShow = (id) => {
    const _id = id._id
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user)?.user;
    const history = useNavigate();
    const { ProductReview, loadingReview, next, LowerLimit, UpperLimit, product_id, updateLikeAndDisLike, review_id } = useSelector((state) => state.Review);

    useEffect(() => {
        if (product_id === _id) {
            if (ProductReview?.length === 0) {
                dispatch(loadReview({ userinfo, product_id: _id, LowerLimit: 0, UpperLimit: 5 }));
            }
        } else {
            dispatch(Reviewmethod.clearOrder());
            dispatch(loadReview({ userinfo, product_id: _id, LowerLimit: 0, UpperLimit: 5 }));
        }
    }, [])

    function loadMoreReviews() {
        dispatch(loadReview({ userinfo, product_id: _id, LowerLimit: LowerLimit, UpperLimit: UpperLimit }));
    }

    function checkLogin() {
        return !userinfo?.accessToken;
    }

    function likepost(reviewId, option) {
        if (checkLogin()) { history('/Signin'); return; }
        if (!updateLikeAndDisLike) {
            dispatch(Reviewmethod.setReviewid(reviewId));
            dispatch(updatelikeAnddisLike({ review_id: reviewId, option, userinfo }))
        }
    }

    function dislikepost(reviewId, option) {
        if (checkLogin()) { history('/Signin'); return; }
        if (!updateLikeAndDisLike) {
            dispatch(Reviewmethod.setReviewid(reviewId));
            dispatch(updatelikeAnddisLike({ review_id: reviewId, option, userinfo }))
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {loadingReview && ProductReview?.length === 0 ? (
                <div className="flex justify-center py-6">
                    <PulseLoader color="#7C4B2A" size={8} />
                </div>
            ) : ProductReview?.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {ProductReview.map((data, ind) => (
                            <div key={ind} className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <SetRating rating={data?.rating} />
                                    {/* We don't have the user's name saved in review in this schema, so just show rating line */}
                                </div>
                                <p className="text-sm text-stone-700 leading-relaxed italic">
                                    "{data?.review}"
                                </p>

                                {/* Like/Dislike Actions */}
                                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-stone-200/60">
                                    <button
                                        onClick={() => likepost(data._id, "like")}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-green-600 transition-colors"
                                    >
                                        {updateLikeAndDisLike && review_id === data?._id ? (
                                            <ClipLoader size={14} color="#16a34a" />
                                        ) : data.islike === 1 ? (
                                            <AiFillLike className="text-green-600" size={16} />
                                        ) : (
                                            <AiOutlineLike size={16} />
                                        )}
                                        <span className={data.islike === 1 ? 'text-green-600' : ''}>{data?.like}</span>
                                    </button>

                                    <button
                                        onClick={() => dislikepost(data._id, "dislike")}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-500 transition-colors"
                                    >
                                        {updateLikeAndDisLike && review_id === data?._id ? (
                                            <ClipLoader size={12} color="#ef4444" />
                                        ) : data.islike === -1 ? (
                                            <AiFillDislike className="text-red-500" size={16} />
                                        ) : (
                                            <AiOutlineDislike size={16} />
                                        )}
                                        <span className={data.islike === -1 ? 'text-red-500' : ''}>{data?.dislike}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {next && (
                        <div className="flex justify-center mt-4">
                            {loadingReview ? (
                                <PulseLoader color="#7C4B2A" size={8} />
                            ) : (
                                <button
                                    onClick={loadMoreReviews}
                                    className="px-6 py-2 text-sm font-semibold text-brand border border-brand bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors"
                                >
                                    Load More Reviews
                                </button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-100 border-dashed">
                    <p className="text-stone-500 text-sm">No reviews yet. Be the first to review this product!</p>
                </div>
            )}
        </div>
    )
}
export default ReviewShow