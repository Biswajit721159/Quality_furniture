import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from '../component/Loading';
import { loadOrder } from '../redux/OrderSlice';
import { ordermethod } from '../redux/OrderSlice';
import DataNotFoundPage from "../component/DataNotFoundPage";
import { Eye, ChevronDown, ShoppingCart, CreditCard, MapPin } from "lucide-react";

/* ── Status badge config ── */
const STATUS = {
  pending:    { label: 'Pending',    cls: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-400'  },
  processing: { label: 'Processing', cls: 'bg-blue-50 text-blue-700 border-blue-200',      dot: 'bg-blue-500'   },
  done:       { label: 'Delivered',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  cancel:     { label: 'Cancelled',  cls: 'bg-red-50 text-red-600 border-red-200',         dot: 'bg-red-500'    },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS[status] || { label: status, cls: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const ProductThumb = ({ src, alt }) => (
  <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
    {src ? (
      <img src={src} alt={alt || 'product'} loading="lazy" className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">?</div>
    )}
  </div>
);

const Ordershow = () => {
  const userinfo = useSelector((state) => state?.user?.user);
  const { Order, orderLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.Order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordermethod.setUpdatedOrderMessage(''));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function View(data) {
    navigate(`/Order/${data?._id}`, { state: { data } });
  }

  const handleScroll = () => {
    if (!orderLoading && next) {
      dispatch(loadOrder({ LowerLimit, UpperLimit, searchvalue, userinfo }));
    }
  };

  if (!Order || Order.length === 0) return <DataNotFoundPage />;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Orders</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              {Order.length}
            </span>
          </div>
          {/* Status legend */}
          <div className="hidden sm:flex items-center gap-3">
            {Object.entries(STATUS).map(([key, cfg]) => (
              <span key={key} className="flex items-center gap-1 text-xs text-slate-400">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Product', 'Order ID', 'Customer', 'Qty', 'Payment', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Order.map((item, idx) => (
                <tr
                  key={idx}
                  className={`group transition-colors duration-100 hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                >
                  {/* Product (thumb + name) */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <ProductThumb src={item?.newImage?.[0]} alt={item?.product_name} />
                      <div>
                        <p className="font-semibold text-slate-800 leading-tight max-w-[120px] truncate" title={item?.product_name}>
                          {item?.product_name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">ID: {item?.product_id?.slice(-6)}</p>
                      </div>
                    </div>
                  </td>

                  {/* Order ID */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded" title={item?._id}>
                      #{item?._id?.slice(-8)}
                    </span>
                  </td>

                  {/* Customer (email + address) */}
                  <td className="px-5 py-3.5 border-b border-slate-100 min-w-[180px]">
                    <p className="text-slate-700 text-sm font-medium truncate max-w-[160px]" title={item?.email}>
                      {item?.email}
                    </p>
                    {item?.address && (
                      <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 truncate max-w-[160px]" title={item?.address}>
                        <MapPin size={10} className="flex-shrink-0" />
                        {item?.address}
                      </p>
                    )}
                  </td>

                  {/* Qty */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                      {item?.product_count}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 capitalize">
                      <CreditCard size={12} className="text-slate-400" />
                      {item?.payment_method}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="font-bold text-slate-800">₹{item?.Total_rupess?.toLocaleString('en-IN')}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <StatusBadge status={item?.status} />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="text-slate-500 text-xs">{item?.Date}</span>
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
              Load more orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordershow;
