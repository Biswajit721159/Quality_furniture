import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiShareBoxFill } from "react-icons/ri";
import { usermethod } from '../redux/userslice'
import { useDispatch, useSelector } from 'react-redux';
import { Allusermethod } from '../redux/AllUserSlice';
import { ordermethod } from '../redux/OrderSlice';
import { productmethod } from '../redux/ProductSlice';
import '../css/Sidebar.css'

const Sidebar = () => {
  const userinfo = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [color, setcolor] = useState(localStorage.getItem('colormode'))
  const isUserLogin = useSelector((state) => state?.Alluser?.isUserLogin)
  const isOrderLogin = useSelector((state) => state?.Order?.isOrderLogin)
  const isProductLogin = useSelector((state) => state?.product?.isProductLogin)
  const selectProductLogin = useSelector((state) => state?.selectProduct?.selectProductLogin)
  const userLogin = useSelector((state) => state?.user?.userLogin)

  // console.log(isUserLogin, isOrderLogin, isProductLogin, selectProductLogin, userLogin)

  useEffect(() => {
    if (!isUserLogin || !isOrderLogin || !isProductLogin || !selectProductLogin || !userLogin) {
      logout()
    }
    if (localStorage.getItem('colormode') === null) {
      givecolortobody('light')
    }
    else {
      givecolortobody(localStorage.getItem('colormode'))
    }
  }, [isUserLogin, isOrderLogin, isOrderLogin, isProductLogin, selectProductLogin])

  function givecolortobody(color) {
    setcolor(color)
    localStorage.setItem('colormode', color)

    if (color == 'light') {
      document.body.style.backgroundColor = "#D0D3D4";
    }
    else {
      document.body.style.backgroundColor = "#85929E";
    }
  }

  function logout() {
    dispatch(productmethod.Reset({ isProductLogin: true }))
    dispatch(Allusermethod.Reset({ isUserLogin: true }))
    dispatch(ordermethod.Reset({ isOrderLogin: true }))
    dispatch(usermethod.LOGOUT())
    history('/Logout')
  }


  return (
    <>
      <div className="sidebar">
        {/* <div>
          {color == 'light' ?
            <button className='btn btn-light btn-sm' onClick={() => givecolortobody('dark')}><CiDark /></button>
            : <button className='btn btn-light btn-sm' onClick={() => givecolortobody('light')}><MdDarkMode /></button>
          }
        </div> */}
        {/* <span className="logo_name mt-5" style={{ color: "green", alignItems: 'center' }}> welcome {userinfo?.user?.first_name}</span> */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="active mt-4">
              <span className="links_name" ><RxDashboard /> Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={`/User`} className="active">
              <span className="links_name" ><RiShareBoxFill /> Manage User</span>
            </Link>
          </li>
          <li>
            <Link to={`/Product`} className="active">
              <span className="links_name" ><RiShareBoxFill /> Manage Product</span>
            </Link>
          </li>
          <li>
            <Link to={`/Order`} className="active">
              <span className="links_name" > <RiShareBoxFill /> Manage Order</span>
            </Link>
          </li>
          <li>
            <Link to={`/Review/page/${1}`} className="active">
              <span className="links_name" ><RiShareBoxFill /> Manage Reviews</span>
            </Link>
          </li>
          <li className="log_out">
            <Link className="active">
              <span className="links_name" onClick={logout} > <IoIosLogOut /> LogOut</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar