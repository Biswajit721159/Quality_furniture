import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { userDashboard } from '../redux/CountSlice'
import { Users, RefreshCw } from 'lucide-react'

const UserDashboard = () => {
  const dispatch  = useDispatch()
  const userinfo  = JSON.parse(localStorage.getItem('user'));
  const { userCount, loadingUser } = useSelector((state) => state?.count)

  useEffect(() => {
    if (userCount === 0) dispatch(userDashboard({ userinfo }))
  }, [])

  function loadAgain() {
    dispatch(userDashboard({ userinfo }))
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
          <Users size={22} className="text-blue-600" />
        </div>
        <button
          onClick={loadAgain}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>
      <Link to="/User" className="block no-underline">
        <p className="text-slate-500 text-sm font-medium">Total Users</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">
          {loadingUser ? <ClipLoader color="#3b82f6" size={24} /> : userCount}
        </p>
        <p className="text-blue-600 text-xs font-medium mt-2 hover:underline">View all users →</p>
      </Link>
    </div>
  );
};

export default UserDashboard;
