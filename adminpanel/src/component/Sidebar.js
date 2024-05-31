import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiShareBoxFill } from "react-icons/ri";
import { usermethod } from '../redux/userslice'
import { useDispatch, useSelector } from 'react-redux';
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import '../css/Sidebar.css'

const Sidebar = () => {
  const userinfo = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()
  const history = useNavigate();
  const [color, setcolor] = useState(localStorage.getItem('colormode'))

  useEffect(() => {
    if (localStorage.getItem('colormode') == null) {
      givecolortobody('light')
    }
    else {
      givecolortobody(localStorage.getItem('colormode'))
    }
  }, [])

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
    dispatch(usermethod.LOGOUT())
    history('/Logout')
  }


  return (
    <>
      <div className="sidebar">
        <div>
          {color == 'light' ?
            <button className='btn btn-light btn-sm' onClick={() => givecolortobody('dark')}><CiDark /></button>
            : <button className='btn btn-light btn-sm' onClick={() => givecolortobody('light')}><MdDarkMode /></button>
          }
        </div>
        <span className="logo_name mt-5" style={{ color: "green", alignItems: 'center' }}> welcome {userinfo?.user?.first_name}</span>
        <ul className="nav-links">
          <li>
            <Link to="/" className="active mt-4">
              <span className="links_name" ><RxDashboard /> Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={`/User/page/${1}`} className="active">
              <span className="links_name" ><RiShareBoxFill /> Manage User</span>
            </Link>
          </li>
          <li>
            <Link to={`/Product/page/${1}`} className="active">
              <span className="links_name" ><RiShareBoxFill /> Manage Product</span>
            </Link>
          </li>
          <li>
            <Link to={`/Order/page/${1}`} className="active">
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