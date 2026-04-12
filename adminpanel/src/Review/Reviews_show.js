import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { loadProduct } from "../redux/ProductSlice";
import DataNotFoundPage from "../component/DataNotFoundPage";
import { Star, Eye, ChevronDown, Package, MessageSquare } from "lucide-react";

/* ─────────────────────────────────────────
   Exported rating helpers (used by other tables)
───────────────────────────────────────── */
export const SetRating = ({ rating }) => {
  const num = Number(rating) || 0;

  const { color, bg, border } =
    num === 0           ? { color: '#94a3b8', bg: 'bg-slate-100',   border: 'border-slate-200'   } :
    num <= 1            ? { color: '#ef4444', bg: 'bg-red-50',      border: 'border-red-100'      } :
    num <= 2            ? { color: '#f97316', bg: 'bg-orange-50',   border: 'border-orange-100'   } :
    num <= 3            ? { color: '#eab308', bg: 'bg-yellow-50',   border: 'border-yellow-100'   } :
    num <= 4            ? { color: '#84cc16', bg: 'bg-lime-50',     border: 'border-lime-100'     } :
                          { color: '#22c55e', bg: 'bg-emerald-50',  border: 'border-emerald-100'  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${bg} ${border}`}
      style={{ color }}
    >
      <Star size={11} fill={color} stroke="none" />
      {num.toFixed(1)}
    </span>
  );
};

export const Rating = ({ rating, color }) => (
  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
    {rating}
    <Star size={13} fill={color} stroke="none" />
  </span>
);

/* ─────────────────────────────────────────
   Reviews_show — product list with review counts
───────────────────────────────────────── */
const ProductThumb = ({ src, alt }) => (
  <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
    {src ? (
      <img src={src} alt={alt || 'product'} loading="lazy" className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <Package size={16} className="text-slate-300" />
      </div>
    )}
  </div>
);

const Reviews_show = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { product, productLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.product);
  const navigate = useNavigate();

  function View(data) {
    navigate(`/Review/${data._id}`);
  }

  const handleScroll = () => {
    if (!productLoading && next) {
      dispatch(loadProduct({ LowerLimit, UpperLimit, userinfo, searchvalue }));
    }
  };

  if (!product || product.length === 0) return <DataNotFoundPage />;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Product Reviews</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              {product.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Product', 'ID', 'Type', 'Total Reviews', 'Avg Rating', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product?.map((item, idx) => (
                <tr
                  key={item?._id}
                  className={`group transition-colors duration-100 hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                >
                  {/* Product */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <ProductThumb src={item?.newImage?.[0]} alt={item?.product_name} />
                      <p className="font-semibold text-slate-800 leading-tight max-w-[140px] truncate" title={item?.product_name}>
                        {item?.product_name}
                      </p>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded" title={item?._id}>
                      #{item?._id?.slice(-8)}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-100">
                      {item?.product_type}
                    </span>
                  </td>

                  {/* Total Reviews */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                        {item?.number_of_people_give_rating}
                      </span>
                      <span className="text-xs text-slate-400">reviews</span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <SetRating rating={item?.rating} />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <button
                      onClick={() => View(item)}
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
        {productLoading && (
          <div className="px-5 py-4 border-t border-slate-100">
            <Loading />
          </div>
        )}
        {!productLoading && next && (
          <div className="flex items-center justify-center px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleScroll}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150 shadow-sm"
            >
              <ChevronDown size={15} />
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews_show;
