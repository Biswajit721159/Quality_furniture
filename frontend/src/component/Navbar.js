import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar=()=>{

  const history=useNavigate();
  const user=JSON.parse(localStorage.getItem('user'));
  
  function logout(){
    localStorage.removeItem('user');
    history('/')
  }
    return(
        <>
            <ul >
              {/* <img className='img' src='https://leetcode.com/static/images/LeetCode_Sharing.png' alt='Error to load'/> */}
              {user ?
                 <div className='container1'>
                    <li><Link to={'/'} style={{textDecoration:"none",color:"black"}}>Quality Furniture</Link></li>
                    <li><Link to={'/Product'} style={{textDecoration:"none",color:"black"}}>Buy Products</Link></li>
                    {/* <li><Link to={'/addProduct'} style={{textDecoration:"none",color:"black"}}>Add Products</Link></li> */}
                    <li><Link to={'/Cart'} style={{textDecoration:"none",color:"black"}}>Cart</Link></li>
                    {/* <li><Link to={'/Profile'} style={{textDecoration:"none",color:"black",float:"right"}}>Profile</Link></li>
                    <li><Link onClick={logout} to={'/Register'} style={{textDecoration:"none",color:"black"}}>Logout</Link></li> */}
                    <div class="dropdown">
                      <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome {user.user.name}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link class="dropdown-item" to="/Profile">Profile</Link>
                        <Link class="dropdown-item" to="/Myorder">Myorder</Link>
                        <Link class="dropdown-item" to="/wishlist">WishList</Link>
                        <Link class="dropdown-item" to={'/Register'} onClick={logout}>Logout</Link>
                      </div>
                    </div>
                </div>
                :
                <div className='container1 navright'>
                  <li><Link to={'/Signin'} style={{textDecoration:"none"}}>Signin</Link></li>
                  <li><Link to={'/Register'}style={{textDecoration:"none"}}>Register</Link></li>
                </div>
              }
               
            </ul>
        </>
    )
}
export default Navbar