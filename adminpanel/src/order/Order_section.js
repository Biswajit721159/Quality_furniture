import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Ordershow from "./Ordershow";
import Loading from '../component/Loading'
import { loadOrder } from '../redux/OrderSlice'
import _ from 'lodash';
import { ordermethod } from "../redux/OrderSlice"
import { RefreshCw, Search, ShoppingCart } from "lucide-react";

const Order_Section = () => {
  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state?.user?.user);
  const { orderLoading, LowerLimit, UpperLimit, searchvalue, Order } = useSelector((state) => state.Order);
  const [searchValue, setsearchValue] = useState(searchvalue);

  useEffect(() => {
    if (Order?.length === 0) dispatch(loadOrder({ LowerLimit, UpperLimit, searchvalue, userinfo }));
  }, [])

  const debouncedSearch = useCallback(
    _.debounce(async (searchValue) => {
      if (searchValue) {
        dispatch(ordermethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
        dispatch(loadOrder({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => { debouncedSearch.cancel(); };
  }, [searchValue])

  function reset() {
    setsearchValue('')
    dispatch(ordermethod.Reset({ Order: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', orderLoading: false }))
    dispatch(loadOrder({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
  }

  const handleInputChange = (e) => {
    setsearchValue(e.target.value);
    dispatch(ordermethod.ADD_SEARCH_VALUE(e.target.value));
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
          <ShoppingCart size={18} className="text-violet-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Orders</h1>
          <p className="text-slate-500 text-xs">Track and update all customer orders</p>
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
            placeholder="Search by email..."
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
      </div>

      {/* Content */}
      {orderLoading === true && Order?.length === 0 ? <Loading /> : <Ordershow />}
    </div>
  )
}

export default Order_Section
