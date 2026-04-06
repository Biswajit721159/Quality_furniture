import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { LoadOrder } from '../redux/OrderSlice';
import Loading from './Loading';
import { FaBox, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function Myorder() {
    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state.user)?.user
    const { Order, loadingOrder, LowerLimit, next, UpperLimit } = useSelector((state) => state?.Order)

    useEffect(() => {
        if (Order?.length === 0) loadproduct();
    }, [])

    function loadproduct() {
        dispatch(LoadOrder({ userinfo, LowerLimit, UpperLimit }))
    }

    function showaddress(data) {
        swal(data)
    }

    const getStatusStyle = (status) => {
        const s = (status || '').toLowerCase();
        if (s.includes('deliver') || s.includes('complet')) return 'badge-success';
        if (s.includes('cancel')) return 'badge-danger';
        if (s.includes('process') || s.includes('ship')) return 'badge-warning';
        return 'badge-info';
    };

    return (
        <>
            {loadingOrder === true && Order?.length === 0 ? (
                <Loader />
            ) : Order?.length != 0 ? (
                <div className="min-h-screen bg-page py-8 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <FaBox className="text-brand" />
                            My Orders
                        </h1>

                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-stone-50 border-b border-stone-200">
                                        <th className="text-left px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wide">Product</th>
                                        <th className="text-center px-4 py-4 text-xs font-bold text-stone-500 uppercase tracking-wide">Date</th>
                                        <th className="text-center px-4 py-4 text-xs font-bold text-stone-500 uppercase tracking-wide">Address</th>
                                        <th className="text-center px-4 py-4 text-xs font-bold text-stone-500 uppercase tracking-wide">Status</th>
                                        <th className="text-center px-4 py-4 text-xs font-bold text-stone-500 uppercase tracking-wide">Review</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {Order?.map((item, ind) => (
                                        <tr key={ind} className="hover:bg-stone-50 transition-colors">
                                            {/* Product */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link to={`/Product/${item.product_id}`}>
                                                        <img
                                                            src={item.newImage[0]}
                                                            alt={item?.product_name}
                                                            className="w-14 h-14 object-cover rounded-xl border border-stone-200 hover:scale-105 transition-transform"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <Link to={`/Product/${item.product_id}`} className="font-semibold text-stone-800 hover:text-brand transition-colors text-sm leading-snug max-w-[180px] block line-clamp-2">
                                                            {item?.product_name}
                                                        </Link>
                                                        <p className="text-xs text-stone-400 mt-0.5">
                                                            Qty: {item?.product_count} · ₹{item?.Total_rupess}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Date */}
                                            <td className="px-4 py-4 text-center text-stone-500 text-sm">{item?.Date}</td>
                                            {/* Address */}
                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={() => showaddress(item?.address)}
                                                    className="flex items-center gap-1 mx-auto px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-all"
                                                >
                                                    <FaMapMarkerAlt size={12} />
                                                    View
                                                </button>
                                            </td>
                                            {/* Status */}
                                            <td className="px-4 py-4 text-center">
                                                <span className={`${getStatusStyle(item?.status)} text-xs`}>
                                                    {item?.status}
                                                </span>
                                            </td>
                                            {/* Feedback */}
                                            <td className="px-4 py-4 text-center">
                                                {item.isfeedback ? (
                                                    <span className="flex items-center gap-1 justify-center text-xs text-stone-400 font-medium">
                                                        <FaStar className="text-amber-400" size={12} />
                                                        Reviewed
                                                    </span>
                                                ) : (
                                                    <Link to={`/${item?.id}/${item?.product_id}/Reviews`}>
                                                        <button className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-all flex items-center gap-1 mx-auto">
                                                            <FaStar size={11} />
                                                            Review
                                                        </button>
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card List */}
                        <div className="md:hidden space-y-4">
                            {Order?.map((item, ind) => (
                                <div key={ind} className="bg-white rounded-2xl shadow-card border border-stone-100 p-4">
                                    <div className="flex gap-3 mb-3">
                                        <Link to={`/Product/${item.product_id}`}>
                                            <img
                                                src={item.newImage[0]}
                                                alt={item?.product_name}
                                                className="w-20 h-20 object-cover rounded-xl border border-stone-200"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link to={`/Product/${item.product_id}`} className="font-semibold text-stone-800 text-sm line-clamp-2 hover:text-brand">
                                                {item?.product_name}
                                            </Link>
                                            <p className="text-xs text-stone-400 mt-1">Qty: {item?.product_count} · ₹{item?.Total_rupess}</p>
                                            <p className="text-xs text-stone-400">{item?.Date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <span className={`${getStatusStyle(item?.status)} text-xs`}>{item?.status}</span>
                                        <button
                                            onClick={() => showaddress(item?.address)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-all"
                                        >
                                            <FaMapMarkerAlt size={11} /> Address
                                        </button>
                                        {item.isfeedback ? (
                                            <span className="text-xs text-stone-400">✓ Reviewed</span>
                                        ) : (
                                            <Link to={`/${item?.id}/${item?.product_id}/Reviews`}>
                                                <button className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 flex items-center gap-1">
                                                    <FaStar size={11} /> Review
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-6 flex justify-center">
                            {loadingOrder ? <Loading /> : next && (
                                <button
                                    onClick={loadproduct}
                                    className="px-8 py-2.5 bg-brand text-white rounded-xl hover:bg-brand-light transition-all font-semibold shadow-md"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-page">
                    <div className="text-6xl">📦</div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-stone-700 mb-2">No Orders Yet</h2>
                        <p className="text-stone-400 text-sm mb-6">Start shopping to see your orders here</p>
                    </div>
                    <Link to="/Product">
                        <button className="px-8 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-md">
                            Browse Products
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}
