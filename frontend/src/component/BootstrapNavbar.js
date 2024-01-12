import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {MdOutlineDarkMode} from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import {FaHeart, FaSketch} from 'react-icons/fa';
import { GiLoveHowl } from "react-icons/gi";
import { IoReorderFourOutline } from "react-icons/io5";
import {cartmethod} from '../redux/CartSlice'
import {useSelector,useDispatch} from 'react-redux'
import '../css/BootstrapNavbar.css'
import Search from './Search';
const api = process.env.REACT_APP_API
const BootstrapNavbar=()=>{
    const dispatch=useDispatch();
    const history=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));
    const [mode,setmode]=useState(localStorage.getItem('mode'));
    let cartdata = useSelector((state) => state.cartdata.product_count);
    
    useEffect(()=>{
        givecolor(localStorage.getItem('mode'));
        loadcart()
    },[])

    function loadcart()
    {
        if(user==null) return;
        fetch(`${api}/cart/GetCart/${user.user.email}`,{
            headers:{
                Authorization:`Bearer ${user.accessToken}`
            }
        }).then(responce=>responce.json())
        .then((res)=>{
            if(res.statusCode==200)
            {
                dispatch(cartmethod.ADD_TO_CART(res.data))
            }
        })
    }

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
            document.body.style.backgroundColor = "#D0D3D4";
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
        history('/Signin')
    }    

    return(
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
       <Link  to={'/Product'}><img src='https://t4.ftcdn.net/jpg/03/71/92/67/360_F_371926762_MdmDMtJbXt7DoaDrxFP0dp9Nq1tSFCnR.jpg' style={{height:'40px',width:'40px' ,borderRadius:'50%'}} alt='Error'/></Link>
        <Link className="navbar-brand mx-2" to="/">QFurniture</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
           {
            user==null?
            <>
                <ul className="navbar-nav mr-auto">
                </ul>
                <span className="navbar-text">
                    <Link to='/Register'><button className='btn btn-info btn-sm'>Register</button></Link>
               </span>
               <span className="navbar-text mx-3">
                    <Link to='/Signin'><button className='btn btn-info btn-sm' >Login</button></Link>
               </span>
            </>    
            :
            <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/Product">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li> */}
                </ul>
                <span>
                    <Search/>
                </span>
                <span className="navbar-text mx-4">
                    <Link style={{color:'red'}} className='carticon' to={'/Wishlist'}><FaHeart/></Link>
                </span>
                <span className="navbar-text">
                    <Link className='navbarTextItem' to={'/Cart'}>{cartdata}</Link>
                </span>
                <span className="navbar-text">
                    <Link className='carticon' to={'/Cart'}><FaShoppingCart/></Link>
                </span>
                <span className="navbar-text mr-3 mx-2">
                    <div className="dropdown">
                        <button className="btn btn-info btn-sm dropdown-toggle navbartext" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.user.name}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" style={{color:'black'}} to="/Profile"><CgProfile /> Profile</Link>
                            <Link className="dropdown-item" style={{color:'black'}} to="/Myorder"><IoReorderFourOutline /> Myorder</Link>
                            <Link className="dropdown-item" style={{color:'black'}} to={'/Signin'} onClick={logout}><IoIosLogOut /> Logout</Link>
                        </div>
                    </div>
                </span>
                <span className="navbar-text mx-4">
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