import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { loadProduct } from "../redux/ProductSlice";
import DataNotFoundPage from "../component/DataNotFoundPage";
import { SetRating } from "../Review/Reviews_show";
import { Eye, ChevronDown, Package, Tag, IndianRupee } from "lucide-react";

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

const Product_show = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { product, productLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.product);
  const navigate = useNavigate();

  function View(data) {
    navigate(`/Product_view/${data._id}`);
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
            <Package size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Products</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              {product.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Product', 'ID', 'Offer', 'Price', 'Type', 'Reviews', 'Rating', 'Action'].map(h => (
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
                  {/* Product (thumb + name) */}
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

                  {/* Offer */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    {item?.offer > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100">
                        <Tag size={10} />
                        {item?.offer}% off
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="inline-flex items-center gap-0.5 font-bold text-slate-800">
                      <IndianRupee size={13} className="text-slate-500" />
                      {Number(item?.price).toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-100">
                      {item?.product_type}
                    </span>
                  </td>

                  {/* Reviews count */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                      {item?.number_of_people_give_rating}
                    </span>
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
              Load more products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product_show;
