import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { orderDashboard } from "../redux/CountSlice";
import { ShoppingCart, RefreshCw } from 'lucide-react'

const OrderDashboard = () => {
  const dispatch  = useDispatch()
  const userinfo  = JSON.parse(localStorage.getItem('user'));
  const { orderCount, loadingOrder } = useSelector((state) => state.count)

  useEffect(() => {
    if (orderCount === 0) dispatch(orderDashboard({ userinfo }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadorder() {
    dispatch(orderDashboard({ userinfo }))
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
          <ShoppingCart size={22} className="text-violet-600" />
        </div>
        <button
          onClick={loadorder}
          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>
      <Link to="/Order" className="block no-underline">
        <p className="text-slate-500 text-sm font-medium">Total Orders</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">
          {loadingOrder ? <ClipLoader color="#7c3aed" size={24} /> : orderCount}
        </p>
        <p className="text-violet-600 text-xs font-medium mt-2 hover:underline">View all orders →</p>
      </Link>
    </div>
  );
};

export default OrderDashboard;
