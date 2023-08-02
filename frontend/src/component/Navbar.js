import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {MdOutlineDarkMode} from 'react-icons/md';

const Navbar=()=>{

  const history=useNavigate();
  const user=JSON.parse(localStorage.getItem('user'));
  const [mode,setmode]=useState(localStorage.getItem('mode'))

  function logout(){
    localStorage.removeItem('user');
    history('/')
  }

  useEffect(()=>{
    givecolor(localStorage.getItem('mode'));
  },[])

  function givecolor(color)
  {
    if(color=='light')
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
    if(mode=='light')
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
  
    return(
        <>
            <ul >
             <div className='container1'>
              {user ?
                <>
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
                  </>    
                :
                <>
                  <li><Link to={'/Signin'} style={{textDecoration:"none"}}>Signin</Link></li>
                  <li><Link to={'/Register'}style={{textDecoration:"none"}}>Register</Link></li>
                  </>
                }
                {
                  mode=="light"?
                  <li><button className='btn btn-light rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                  :<li><button className='btn btn-dark rounded-circle' onClick={changecolor}><MdOutlineDarkMode/></button></li>
                }
            </div>   
            </ul>
        </>
    )
}
export default Navbar