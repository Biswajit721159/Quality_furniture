import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
export default function Profile() {

  const user=JSON.parse(localStorage.getItem('user'));
  const history=useNavigate()

  useEffect(()=>{
    if(user==null)
    {
      history('/Register')
    }
  },[])


  return (
    <div className='container mt-3'>
      {
        user?
        <div className='container '>
         {
         
          <div>
            <h3>Welcome {user.user.name}</h3>
            <h4>Email : {user.user.email}</h4>
            <h4>Address : {user.user.address}</h4>
            <Link to={`${user.user._id}`}><button className='btn btn-primary'>Update</button></Link>
            <Link to={'/Myorder'}><button className='btn btn-primary mx-5'>Myorder</button></Link>
          </div>
         }
        </div>
        :<div className='loader-container'>
            <h4>Profile Not Found</h4>
        </div>
      }
    </div>
  )
}
