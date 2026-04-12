import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { usermethod } from '../redux/userslice'
import { useDispatch, useSelector } from 'react-redux';
import { Allusermethod } from '../redux/AllUserSlice';
import { ordermethod } from '../redux/OrderSlice';
import { productmethod } from '../redux/ProductSlice';
import { countmethod } from '../redux/CountSlice';
import { Reviewmethod } from '../redux/ReviewSlice'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Star,
  LogOut,
  ChevronRight,
  Store
} from 'lucide-react'

const navItems = [
  { to: '/',        label: 'Dashboard',      icon: LayoutDashboard },
  { to: '/User',    label: 'Manage Users',   icon: Users           },
  { to: '/Product', label: 'Products',       icon: Package         },
  { to: '/Order',   label: 'Orders',         icon: ShoppingCart    },
  { to: '/Review',  label: 'Reviews',        icon: Star            },
]

const Sidebar = () => {
  const dispatch   = useDispatch();
  const history    = useNavigate();
  const location   = useLocation();

  const isUserLogin       = useSelector((state) => state?.Alluser?.isUserLogin)
  const isOrderLogin      = useSelector((state) => state?.Order?.isOrderLogin)
  const isProductLogin    = useSelector((state) => state?.product?.isProductLogin)
  const selectProductLogin= useSelector((state) => state?.selectProduct?.selectProductLogin)
  const userLogin         = useSelector((state) => state?.user?.userLogin)
  const isCountLogin      = useSelector((state) => state?.count?.isCountLogin)
  const isReviewLogin     = useSelector((state) => state?.review?.isReviewLogin)

  useEffect(() => {
    if (!isUserLogin || !isOrderLogin || !isProductLogin || !selectProductLogin || !userLogin || !isCountLogin || !isReviewLogin) {
      logout()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLogin, isOrderLogin, isProductLogin, selectProductLogin, isCountLogin, isReviewLogin])

  function logout() {
    dispatch(productmethod.clearALL())
    dispatch(Allusermethod.clearALL())
    dispatch(ordermethod.clearALL())
    dispatch(countmethod.clearALL())
    dispatch(Reviewmethod.clearALL())
    dispatch(usermethod.LOGOUT())
    history('/Logout')
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 flex flex-col z-50 shadow-xl">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
          <Store size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Admin Panel</p>
          <p className="text-slate-400 text-xs">Management Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = isActive(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                ${active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={18} className={active ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="text-blue-200" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group"
        >
          <LogOut size={18} className="text-slate-500 group-hover:text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
