import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Product_show from "./Product_show";
import _ from 'lodash';
import { loadProduct } from "../redux/ProductSlice";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { productmethod } from "../redux/ProductSlice"
import { RefreshCw, Search, Package, Plus } from "lucide-react";

const Product_Section = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { productLoading, LowerLimit, UpperLimit, product } = useSelector((state) => state?.product);
  const searchvalue = useSelector((state) => state?.product?.searchvalue);
  const [searchValue, setsearchValue] = useState(searchvalue);

  useEffect(() => {
    if (product?.length === 0) loadproduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadproduct() {
    dispatch(loadProduct({ LowerLimit, UpperLimit, userinfo, searchvalue }))
  }

  const handleInputChange = (e) => {
    setsearchValue(e.target.value);
    dispatch(productmethod.ADD_SEARCH_VALUE(e.target.value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce(async (searchValue) => {
      if (searchValue) {
        dispatch(productmethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
        dispatch(loadProduct({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
      }
    }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => { debouncedSearch.cancel(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  function reset() {
    setsearchValue('')
    dispatch(productmethod.Reset({ product: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', productLoading: false }))
    dispatch(loadProduct({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Package size={18} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Products</h1>
          <p className="text-slate-500 text-xs">Add, edit and manage your product catalog</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search by name or type..."
            spellCheck="false"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 transition-all"
          />
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
        <Link
          to="/Product/AddProduct"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-md shadow-blue-600/20 no-underline"
        >
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {/* Content */}
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      {productLoading === true && product?.length === 0 ? <Loading /> : <Product_show />}
    </div>
  )
}

export default Product_Section
