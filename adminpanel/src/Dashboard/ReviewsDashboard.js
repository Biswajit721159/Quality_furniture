import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { reviewDashboard } from "../redux/CountSlice";
import { Star, RefreshCw } from 'lucide-react'

const ReviewsDashboard = () => {
  const dispatch  = useDispatch()
  const userinfo  = JSON.parse(localStorage.getItem('user'));
  const { reviewCount, loadingReview } = useSelector((state) => state.count);

  useEffect(() => {
    if (reviewCount === 0) dispatch(reviewDashboard({ userinfo }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadreviews() {
    dispatch(reviewDashboard({ userinfo }))
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
          <Star size={22} className="text-amber-500" />
        </div>
        <button
          onClick={loadreviews}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>
      <Link to="/Review" className="block no-underline">
        <p className="text-slate-500 text-sm font-medium">Total Reviews</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">
          {loadingReview ? <ClipLoader color="#f59e0b" size={24} /> : reviewCount}
        </p>
        <p className="text-amber-500 text-xs font-medium mt-2 hover:underline">View all reviews →</p>
      </Link>
    </div>
  );
};

export default ReviewsDashboard;
