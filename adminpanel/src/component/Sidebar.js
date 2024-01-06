import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Sidebar.css'
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiShareBoxFill } from "react-icons/ri";
import {usermethod} from '../redux/userslice'
import {useDispatch, useSelector} from 'react-redux'
import Adminlogin from '../component/Adminlogin'
const Sidebar=()=>{
  const userinfo=useSelector((state)=>state.user.user)
  const dispatch=useDispatch()
  const history=useNavigate();
  function logout()
  {
    dispatch(usermethod.LOGOUT())
    history('/Logout')
  }
    return(
        <>
        <div className="sidebar">
           <div className="logo-details">
             <span className="logo_name" style={{color:"green"}}> Welcome {userinfo.user.first_name}</span>
           </div>
           <ul className="nav-links">
        <li>
          <Link to="/" className="active">
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
          <Link  className="active">
            <span className="links_name" onClick={logout} > <IoIosLogOut /> LogOut</span>
          </Link>
        </li>  
      </ul>
        </div>
        </>
    )
}

export default Sidebar