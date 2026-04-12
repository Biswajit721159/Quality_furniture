import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateReview } from "../redux/ReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Star, Loader2, CheckCircle } from "lucide-react";

const StarRating = ({ value }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={star <= value ? 'text-amber-400' : 'text-slate-200'}
          fill={star <= value ? '#fbbf24' : '#e2e8f0'}
          stroke="none"
        />
      ))}
      <span className="ml-2 text-sm font-semibold text-slate-700">{value}/5</span>
    </div>
  );
};

const ViewRatingReview = () => {
  const userinfo = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()
  const location = useLocation();
  const { data } = location.state || {};
  const [review, setReview] = useState(data?.review || '');
  const { UpdatedReviewMessage, UpdatedReviewLoading } = useSelector((state) => state?.review)
  const navigate = useNavigate();

  const handleUpdate = () => {
    data.review = review
    dispatch(updateReview({ formData: data, review, userinfo }))
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">View & Update Review</h1>
        <p className="text-slate-500 text-sm mt-1">Edit the review content for this order</p>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 space-y-5">
        {/* IDs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Order ID</label>
            <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono">
              {data?.order_id || '—'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Product ID</label>
            <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono">
              {data?.product_id || '—'}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Rating</label>
          <StarRating value={data?.rating || 0} />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Enter review text..."
          />
        </div>

        {/* Success / Error message */}
        {UpdatedReviewMessage && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
            <CheckCircle size={15} />
            {UpdatedReviewMessage}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleUpdate}
          disabled={UpdatedReviewLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
        >
          {UpdatedReviewLoading ? (
            <><Loader2 size={15} className="animate-spin" /> Updating...</>
          ) : 'Update Review'}
        </button>
      </div>
    </div>
  );
};

export default ViewRatingReview;
