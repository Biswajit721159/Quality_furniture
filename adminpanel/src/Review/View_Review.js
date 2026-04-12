import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadReview } from '../redux/ReviewSlice';
import Loading from "../component/Loading";
import TableShowReview from "./TableShowReview";
import { Reviewmethod } from '../redux/ReviewSlice'
import { ArrowLeft, RefreshCw, Star } from "lucide-react";

const View_Review = () => {
  const history = useNavigate()
  const _id = useParams()._id
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.user.user);
  const { product_id, reviewLoading } = useSelector((state) => state?.review);

  useEffect(() => {
    if (product_id !== _id) {
      dispatch(Reviewmethod.setLimit({ LowerLimit: 0, UpperLimit: 10 }))
      loadreview()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadreview() {
    dispatch(loadReview({ userinfo, LowerLimit: 0, UpperLimit: 10, product_id: _id }))
  }

  function Back() {
    history('/Review')
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
          <Star size={18} className="text-amber-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Product Reviews</h1>
          <p className="text-slate-500 text-xs font-mono">{_id}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-4 flex items-center gap-3">
        <button
          onClick={Back}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={loadreview}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Content */}
      {reviewLoading ? <Loading /> : <TableShowReview />}
    </div>
  )
}

export default View_Review
