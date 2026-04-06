import React, { useEffect } from "react";
import { PulseLoader, ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from "react-redux";
import { Reviewmethod, loadReview, updatelikeAnddisLike } from "../redux/ProductReview";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const getInitial = (email) => email ? email.charAt(0).toUpperCase() : 'U';
    
    const maskEmail = (email) => {
        if (!email) return "Verified Buyer";
        const parts = email.split('@');
        return `${parts[0].slice(0, 2)}***@${parts[1]}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const avatarColors = [
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-emerald-100 text-emerald-600',
        'bg-rose-100 text-rose-600',
        'bg-amber-100 text-amber-600'
    ];

    return (
        <div className="flex flex-col gap-6">
            {loadingReview && ProductReview?.length === 0 ? (
                <div className="flex justify-center py-12">
                    <PulseLoader color="#7C4B2A" size={10} />
                </div>
            ) : ProductReview?.length > 0 ? (
                <>
                    <div className="grid gap-6 max-w-2xl mx-auto w-full">
                        {ProductReview.map((data, ind) => (
                            <div key={ind} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow w-full">
                                {/* Header with User Info and Rating */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-inner ${avatarColors[ind % avatarColors.length]}`}>
                                            {getInitial(data?.email)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                <h4 className="text-sm font-bold text-stone-900 truncate">{maskEmail(data?.email)}</h4>
                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-600 px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-stone-400 font-medium">{formatDate(data?.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100 self-start sm:self-center flex-shrink-0">
                                        <SetRating rating={data?.rating} />
                                        <span className="ml-2 text-xs font-bold text-stone-600 w-6 text-right">{data?.rating}.0</span>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div className="mb-6">
                                    <p className="text-stone-700 text-sm leading-relaxed font-medium">
                                        {data?.review}
                                    </p>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => likepost(data._id, "like")}
                                            className={`flex items-center gap-2 text-xs font-bold transition-all px-3 py-1.5 rounded-full border border-stone-100 shadow-sm outline-none
                                                ${data.islike === 1 ? 'bg-green-50 text-green-600 border-green-100' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'}`}
                                        >
                                            {updateLikeAndDisLike && review_id === data?._id ? (
                                                <ClipLoader size={12} color="#16a34a" />
                                            ) : data.islike === 1 ? (
                                                <AiFillLike size={16} />
                                            ) : (
                                                <AiOutlineLike size={16} />
                                            )}
                                            <span>Helpful ({data?.like})</span>
                                        </button>

                                        <button
                                            onClick={() => dislikepost(data._id, "dislike")}
                                            className={`flex items-center gap-2 text-xs font-bold transition-all px-3 py-1.5 rounded-full border border-stone-100 shadow-sm outline-none
                                                ${data.islike === -1 ? 'bg-red-50 text-red-500 border-red-100' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'}`}
                                        >
                                            {updateLikeAndDisLike && review_id === data?._id ? (
                                                <ClipLoader size={12} color="#ef4444" />
                                            ) : data.islike === -1 ? (
                                                <AiFillDislike size={16} />
                                            ) : (
                                                <AiOutlineDislike size={16} />
                                            )}
                                            <span className="sr-only">Not helpful</span>
                                        </button>
                                    </div>
                                    
                                    <button className="text-xs font-bold text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-widest outline-none">
                                        Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {next && (
                        <div className="flex justify-center mt-8">
                            {loadingReview ? (
                                <PulseLoader color="#7C4B2A" size={10} />
                            ) : (
                                <button
                                    onClick={loadMoreReviews}
                                    className="px-8 py-2.5 text-sm font-bold text-brand border-2 border-stone-100 bg-white rounded-xl hover:border-brand/20 hover:bg-amber-50/30 transition-all shadow-sm outline-none"
                                >
                                    View More Reviews
                                </button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-stone-50/50 rounded-3xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 border border-stone-100">
                        <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <p className="text-stone-500 font-bold">No reviews yet</p>
                    <p className="text-stone-400 text-xs mt-1">Be the first to share your thoughts!</p>
                </div>
            )}
        </div>
    )
}
export default ReviewShow;