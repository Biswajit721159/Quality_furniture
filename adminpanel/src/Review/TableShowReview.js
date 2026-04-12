import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/Loading";
import { SetRating } from "./Reviews_show";
import { useNavigate } from "react-router-dom";
import { Reviewmethod } from '../redux/ReviewSlice';
import { Eye, ChevronDown, MessageSquare, Mail, Calendar } from "lucide-react";
import DataNotFoundPage from "../component/DataNotFoundPage";

/* ── Truncated ID pill ── */
const IdPill = ({ value, prefix = '#' }) => (
  <span
    className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded cursor-default"
    title={value}
  >
    {prefix}{value?.slice(-8)}
  </span>
);

/* ── Review text preview ── */
const ReviewPreview = ({ text }) => {
  if (!text) return <span className="text-slate-300 italic text-xs">No review</span>;
  return (
    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 max-w-[220px]">
      {text}
    </p>
  );
};

const TableShowReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Review, next, orderLoading } = useSelector((state) => state?.review);

  useEffect(() => {
    dispatch(Reviewmethod.setUpdatedOrderMessage(''));
  }, []);

  function handleScroll() {}

  function View(data) {
    navigate(`View`, { state: { data } });
  }

  if (!Review || Review.length === 0) return <DataNotFoundPage />;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Reviews</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              {Review.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Review ID', 'Order ID', 'Customer', 'Rating', 'Created', 'Updated', 'Review', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Review?.map((data, idx) => (
                <tr
                  key={data?._id}
                  className={`group transition-colors duration-100 hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                >
                  {/* Review ID */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <IdPill value={data?._id} />
                  </td>

                  {/* Order ID */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <IdPill value={data?.order_id} />
                  </td>

                  {/* Customer email */}
                  <td className="px-5 py-3.5 border-b border-slate-100 min-w-[180px]">
                    <span className="inline-flex items-center gap-1.5 text-slate-600 text-sm">
                      <Mail size={12} className="text-slate-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]" title={data?.email}>{data?.email}</span>
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <SetRating rating={data?.rating} />
                  </td>

                  {/* Created */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                      <Calendar size={11} className="text-slate-400" />
                      {new Date(data?.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="text-slate-400 text-xs">
                      {new Date(data?.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>

                  {/* Review text */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <ReviewPreview text={data?.review} />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <button
                      onClick={() => View(data)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-100 hover:border-blue-600 rounded-lg transition-all duration-150"
                    >
                      <Eye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {orderLoading && (
          <div className="px-5 py-4 border-t border-slate-100">
            <Loading />
          </div>
        )}
        {!orderLoading && next && (
          <div className="flex items-center justify-center px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleScroll}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150 shadow-sm"
            >
              <ChevronDown size={15} />
              Load more reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableShowReview;
