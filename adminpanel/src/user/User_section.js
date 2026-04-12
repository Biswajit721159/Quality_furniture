import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Usershow from "./Usershow";
import { loadUser } from "../redux/AllUserSlice";
import _ from 'lodash';
import { Allusermethod } from "../redux/AllUserSlice";
import Loading from "../component/Loading";
import { RefreshCw, Search, Users } from "lucide-react";

const User_Section = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { Alluser, userLoading, searchvalue } = useSelector((state) => state?.Alluser);
  const [searchValue, setsearchValue] = useState(searchvalue);

  useEffect(() => {
    if (Alluser?.length === 0) loaduser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loaduser() {
    dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo }))
  }

  const handleInputChange = (e) => {
    setsearchValue(e.target.value);
    dispatch(Allusermethod.setSearchValue(e.target.value))
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce(async (searchValue) => {
      if (searchValue) {
        dispatch(Allusermethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
        dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
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
    dispatch(Allusermethod.Reset({ Alluser: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', userLoading: false }))
    dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
          <Users size={18} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Users</h1>
          <p className="text-slate-500 text-xs">View and manage all registered users</p>
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
            placeholder="Search by email or name..."
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
      {userLoading === true && Alluser?.length === 0 ? <Loading /> : <Usershow />}
    </div>
  )
}

export default User_Section
