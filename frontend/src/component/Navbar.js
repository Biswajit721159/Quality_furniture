import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {MdOutlineDarkMode} from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { GiLoveHowl } from "react-icons/gi";
import { IoReorderFourOutline } from "react-icons/io5";
import {useSelector} from 'react-redux'
import {searchmethod} from '../redux/SearchSlice'
import { useDispatch } from 'react-redux';
import '../css/Navbar.css'
const Navbar=()=>{

  const history=useNavigate();
  const user=JSON.parse(localStorage.getItem('user'));
  const [mode,setmode]=useState(localStorage.getItem('mode'))
  const [searchproduct,setsearchproduct]=useState("")
  const dispatch=useDispatch()
  let cartdata = useSelector((state) => state.cartdata.product_count);

  function logout(){
    localStorage.removeItem('user');
    history('/')
  }

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
      document.body.style.backgroundColor = "white";
    }
    else
    {
      document.body.style.backgroundColor = "#BFC9CA";
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

  function search(s)
  {
    dispatch(searchmethod.SET_SEARCH(s))
  }
  
    return(
        <>
            <ul >
             <div className='container1'>
              {user ?
                <>
                {
                  mode=="light"?
                  <li><button className='btn btn-light rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                  :<li><button className='btn btn-dark rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                }
                    <li><Link to={'/'} style={{textDecoration:"none",color:"white"}}>QualityFurniture</Link></li>
                    <li><Link to={'/Product'} style={{textDecoration:"none",color:"white"}}>Home</Link></li>
                    <div class="dropdown mt-1">
                      <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome {user.user.name}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link class="dropdown-item" to="/Profile"><CgProfile /> profile</Link>
                        <Link class="dropdown-item" to="/Myorder"><IoReorderFourOutline /> Myorder</Link>
                        <Link class="dropdown-item" to="/wishlist"><GiLoveHowl /> WishList</Link>
                        <Link class="dropdown-item" to={'/Register'} onClick={logout}><IoIosLogOut /> Logout</Link>
                      </div>
                    </div>
                    
                    <div className="form-inline">
                        <input className="form-control mr-sm-2" value={searchproduct} name='search' onChange={(e)=>{setsearchproduct(e.target.value)}}  type="search" placeholder="Search product" aria-label="Search"/>
                        <button className="btn btn-outline-success  my-2 my-sm-0" onClick={()=>search(searchproduct)} type="submit">Search</button>
                    </div>

                    <li>
                      <Link to={'/Cart'} style={{textDecoration:"none",color:"white"}} >
                        <div className='cartdata'>
                          <p style={{fontSize:15,color:"yellow"}}>{cartdata}</p> 
                          <p><FaShoppingCart/></p>
                        </div>
                      </Link>
                    </li>
                </>    
                :
                <>
                  <li><Link to={'/'} style={{textDecoration:"none",color:"white"}}>Quality Furniture</Link></li>
                  <li><Link to={'/Signin'} style={{textDecoration:"none",color:"white"}}>Signin</Link></li>
                  <li><Link to={'/Register'}style={{textDecoration:"none",color:"white"}}>Register</Link></li>
                  </>
                }
            </div>   
            </ul>
        </>
    )
}
export default Navbar