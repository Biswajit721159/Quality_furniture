import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {usermethod} from '../redux/userslice'
import { productmethod } from "../redux/ProductSlice";
import { PulseLoader ,BeatLoader ,ClipLoader} from 'react-spinners';
import { useParams } from "react-router-dom";
import Product_show from "./Product_show";
const api=process.env.REACT_APP_API

const Product_Section=()=>{
    const dispatch=useDispatch()
    const [load,setload]=useState(false)
    const history=useNavigate()
    const LowerLimit=parseInt(useParams().LowerLimit);
    const UpperLimit=parseInt(useParams().UpperLimit);
    const userinfo=useSelector((state)=>state.user.user);
    
    useEffect(()=>{
        loadproduct()
    },[LowerLimit],[UpperLimit])

    function loadproduct()
    {
        setload(true)
        fetch(`${api}/product/getproductByLimit/${LowerLimit}/${UpperLimit}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then((res)=>res.json()).then((data)=>{
           if(data.statusCode==201)
           {
              dispatch(productmethod.ADD_PRODUCT(data.data))
              setload(false)
           }
           else if(data.statusCode==498)
           {
              dispatch(usermethod.LOGOUT())
              history('/')
           }
           else
           {
              history('*')
           }
        }).catch((error)=>{
            history('*')
        })
    }

    return(
        <>
        {
            load==true?
            <div className="Loaderitem">
               <PulseLoader color="#16A085"  />
            </div>
            :<Product_show/>
        }
        </>
    )
}

export default Product_Section