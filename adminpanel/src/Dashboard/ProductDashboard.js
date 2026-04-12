import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { productDashboard } from "../redux/CountSlice";
import { Package, RefreshCw } from 'lucide-react'

const ProductDashboard = () => {
  const dispatch  = useDispatch()
  const userinfo  = JSON.parse(localStorage.getItem('user'));
  const { productCount, loadingProduct } = useSelector((state) => state.count);

  useEffect(() => {
    if (productCount === 0) dispatch(productDashboard({ userinfo }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadAgain() {
    dispatch(productDashboard({ userinfo }))
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Package size={22} className="text-emerald-600" />
        </div>
        <button
          onClick={loadAgain}
          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>
      <Link to="/Product" className="block no-underline">
        <p className="text-slate-500 text-sm font-medium">Total Products</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">
          {loadingProduct ? <ClipLoader color="#10b981" size={24} /> : productCount}
        </p>
        <p className="text-emerald-600 text-xs font-medium mt-2 hover:underline">View all products →</p>
      </Link>
    </div>
  );
};

export default ProductDashboard;
