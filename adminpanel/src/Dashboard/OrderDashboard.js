import React, { useEffect, useState } from "react";
import "../css/Main.css";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader ,BeatLoader ,ClipLoader} from 'react-spinners';
import {usermethod} from '../redux/userslice'
import {useDispatch} from 'react-redux'
const api = process.env.REACT_APP_API
const OrderDashboard = () => {
  const dispatch=useDispatch()
  const[load,setload]=useState(false)
  const userinfo=JSON.parse(localStorage.getItem('user'));
  const [productcount,setproductcount]=useState(0);
  const [count,setcount]=useState(0)
  const history=useNavigate()
  
  useEffect(()=>{
      const intervalId = setInterval(() => {
        if (count <= productcount) 
        {
          setcount((prevCount) => prevCount + 1);
        } 
        else 
        {
          clearInterval(intervalId);
        }
      }, 10);
      return () => clearInterval(intervalId);
  },[count])


  useEffect(()=>{
    loadproduct();
  },[])


  function loadproduct()
  {
    setload(true)
    fetch(`${api}/order/Dashboard/countNumberOrder`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(responce=>responce.json())
    .then((res)=>{
        if(res.statusCode==201)
        {
            setproductcount(res.data)
            setcount(0)
            setload(false)
        }
        else if(res.statusCode==498)
        {
            dispatch(usermethod.LOGOUT())
        }
        else
        {
            history('*');
        }
    }).catch((error)=>{
      history('*')
    })
  }

  return (
    <>
      <div class="box">
        <Link>
          <div class="right-side">
            <div class="box-topic">Total Order</div>
            <div class="number">
              {load==true?<PulseLoader color="#16A085"  />:count}
            </div>
            <div class="indicator"></div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default OrderDashboard;
