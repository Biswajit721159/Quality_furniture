import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {MdOutlineDarkMode} from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import {FaHeart, FaSketch} from 'react-icons/fa';
import { GiLoveHowl } from "react-icons/gi";
import { IoReorderFourOutline } from "react-icons/io5";
import {useSelector} from 'react-redux'
import '../css/BootstrapNavbar.css'

const BootstrapNavbar=()=>{

    const history=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));
    const [mode,setmode]=useState(localStorage.getItem('mode'));
    let cartdata = useSelector((state) => state.cartdata.product_count);
    
    useEffect(()=>{
        givecolor(localStorage.getItem('mode'));
    },[])

    function givecolor(color)
    {
        if(color==null)
        {
        localStorage.setItem('mode','dark')
        setmode('dark')
        givecolor('dark')
        }
        else if(color=='light')
        {
        document.body.style.backgroundColor = "#D0D3D4 ";
        }
        else
        {
        document.body.style.backgroundColor = "#85929E";
        }
    }

    function changecolor()
    {
        if(mode==null)
        {
        localStorage.setItem('mode','light')
        setmode('light')
        givecolor('light')
        }
        else if(mode=='light')
        {
        localStorage.setItem('mode','dark')
        setmode('dark')
        givecolor('dark')
        }
        else
        {
        localStorage.setItem('mode','light')
        setmode('light')
        givecolor('light')
        }
    }

    function logout(){
        localStorage.removeItem('user');
        history('/')
    }    

    return(
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <img src='https://t4.ftcdn.net/jpg/03/71/92/67/360_F_371926762_MdmDMtJbXt7DoaDrxFP0dp9Nq1tSFCnR.jpg' style={{height:'40px',width:'40px' ,borderRadius:'50%'}} alt='Error'/>
        <Link class="navbar-brand mx-2" to="/">QFurniture</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
           {
            user==null?
            <>
                <ul class="navbar-nav mr-auto">
                </ul>
                <span class="navbar-text">
                    <Link to='/Register'><button className='btn btn-info btn-sm'>Register</button></Link>
               </span>
               <span class="navbar-text mx-3">
                    <Link to='/Signin'><button className='btn btn-info btn-sm' >Login</button></Link>
               </span>
            </>    
            :
            <>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/Product">Home <span class="sr-only">(current)</span></Link>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li> */}
                </ul>
                <span class="navbar-text mr-3">
                    <div class="dropdown">
                        <button class="btn btn-info btn-sm dropdown-toggle navbartext" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.user.name}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link class="dropdown-item" style={{color:'black'}} to="/Profile"><CgProfile /> Profile</Link>
                            <Link class="dropdown-item" style={{color:'black'}} to="/Myorder"><IoReorderFourOutline /> Myorder</Link>
                            <Link class="dropdown-item" style={{color:'black'}} to={'/Register'} onClick={logout}><IoIosLogOut /> Logout</Link>
                        </div>
                    </div>
                </span>
                <span class="navbar-text">
                    <Link className='navbarTextItem' to={'/Cart'}>{cartdata}</Link>
                </span>
                <span class="navbar-text">
                    <Link className='carticon' to={'/Cart'}><FaShoppingCart/></Link>
                </span>
                <span class="navbar-text mx-4">
                    <Link style={{color:'red'}} className='carticon' to={'/Wishlist'}><FaHeart/></Link>
                </span>
                <span class="navbar-text mx-4">
                    {
                    mode=="light"?
                    <li><button className='btn btn-light rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                    :<li><button className='btn btn-dark rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                    }
                </span>
            </>
            }
        </div>
    </nav>
    )
}
export default BootstrapNavbar