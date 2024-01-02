import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Sidebar.css'
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiShareBoxFill } from "react-icons/ri";
const Sidebar=()=>{
    return(
        <>
        <div className="sidebar">
           <div className="logo-details">
             <span className="logo_name" style={{color:"green"}}>Welcome </span>
           </div>
           <ul className="nav-links">
        <li>
          <Link to="/" className="active">
            <span className="links_name" ><RxDashboard /> Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/Product" className="active">
            <span className="links_name" ><RiShareBoxFill /> Manage Product</span>
          </Link>
        </li>
        <li>
          <Link to="/Order" className="active">
            <span className="links_name" > <RiShareBoxFill /> Manage Order</span>
          </Link>
        </li>
        <li>
          <Link to="/Review" className="active">
            <span className="links_name" ><RiShareBoxFill /> Manage Reviews</span>
          </Link>
        </li>
        <li className="log_out" >
          <Link to="/logout" className="active">
            <span className="links_name" > <IoIosLogOut /> Log out</span>
          </Link>
        </li>  
      </ul>
        </div>
        </>
    )
}

export default Sidebar