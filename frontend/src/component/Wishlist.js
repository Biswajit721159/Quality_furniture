import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loader from "../images/loader.gif"
import {AiFillStar } from "react-icons/ai";
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert'
import {cartmethod} from '../redux/CartSlice'
import {useDispatch,useSelector} from 'react-redux'
const api = process.env.REACT_APP_API
export default function WishList() {

  const dispatch=useDispatch()
  let userinfo=JSON.parse(localStorage.getItem('user'))
  let product=JSON.parse(localStorage.getItem('Wishlist'))
  const [data,setdata]=useState([])
  const [update,setupdate]=useState(false)
  const history=useNavigate()
  const [nums,setnums]=useState([])
  const [load,setload]=useState(false)


  function loadproduct()
  {
    setload(true)
    fetch(`${api}/product/get_product_by_ids`,{
      method:'PATCH',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${userinfo.accessToken}`
      },
      body:JSON.stringify({
        product:product
      })
    }).then(responce=>responce.json()).then((res)=>{
      try{
          if(res.statusCode==201)
          {
            setload(false)
            setnums(res.data);
            settoproduct(res.data);
          }
          else if(res.statusCode==498)
          {
            localStorage.removeItem('user');
            history('/Signin');
          }
          else if(res.statusCode==404)
          {
            setnums(res.data);
            settoproduct(res.data);
            setload(false)
          }
          else
          {
            history('*');
          }
      }
      catch{
        swal("we are find Some Error")
      }
     })
  }

  function settoproduct(nums)
  {
    if(nums==undefined || product==undefined ) return
    let arr=[]
    product=JSON.parse(localStorage.getItem('Wishlist'))
    for(let i=0;i<product.length;i++)
    {
      for(let j=0;j<nums.length;j++)
      {
        if(nums[j]._id==product[i])
        {
          arr.push(nums[j]);
        }
      }
    }
    setdata([...arr])
  }

  useEffect(()=>{
    if(userinfo==null)
    {
      history('/Signin')
    }
    else
    {
      product=JSON.parse(localStorage.getItem('Wishlist'))
      loadproduct();
    }
  },[])

  function checkIdPresent(nums,id)
  {
      for(let i=0;i<nums.length;i++)
      {
          if(nums[i]==id)
          {
              return i;
          }
      }
      return -1;
  }

  function removeToWishlist(id)
  {
    let itemsList = JSON.parse(localStorage.getItem('Wishlist'))
    if(itemsList.length!=0)
    {
        let a=checkIdPresent(itemsList,id);
        if(a!=-1)
        {
            itemsList.splice(a,1);
            localStorage.setItem('Wishlist', JSON.stringify(itemsList));
        }
    }
    settoproduct(nums)
  }
  
  function AddToCart(product_id)
  {
    setload(true)
      fetch(`${api}/cart/Add_To_Cart`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
            email:userinfo.user.email,
            product_id:product_id,
            product_count:1,
        })
      }).then((responce)=>responce.json())
      .then((res)=>{
        if(res.statusCode==200)
        {
            setload(false)
            dispatch(cartmethod.ADD_TO_CART(res.data))
            history('/cart')
        }
        else if(res.statusCode==498)
        {
            localStorage.removeItem('user');
            history('/Signin');
        }
        else
        {
            history('*');
        }
    })
  }


  return (
  <>
    {
      load==true?
      <div className="Loaderitem">
          <PulseLoader color="#16A085"  />
      </div>
      :
      (data && data.length !=0) ?
      <div className='product'>
         { data.map((item,ind)=>(
               <div key={ind} className="maincard mt-2">
                   <Link to={`/Product/${item._id}`}>
                       <img className="card-img-top" src={item.newImage[0]}  alt="Card image cap"/>
                   </Link>
                   <div className="card-body">
                       <h6 className="card-title">{item.product_name}</h6>
                       <div className="row">
                           <div className="container col">
                             <h6 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h6>
                           </div>
                           <div className="container col">
                             <h6 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h6> 
                           </div>
                       </div>
                       <div className='row'>
                            <div className='col'>
                                {
                                    parseInt(item.rating)==0?<div className="card-text" style={{color:"black"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==1?<div className="card-text" style={{color:"tomato"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==2?<div className="card-text" style={{color:"red"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==3?<div className="card-text" style={{color:"#DC7633"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==4?<div className="card-text" style={{color:"#28B463"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==5?<div className="card-text" style={{color:"green"}}>{item.rating}<AiFillStar /></div>
                                    :""
                                }
                            </div>
                            <div className=" col">
                                    <h6 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100)).toFixed(2)}</h6>
                            </div>
                       </div>
                       {
                           item.total_number_of_product==0?
                           <div className=" row">
                               <div className="col">
                                   <h6 className="card-text" style={{color:'tomato'}}>closed</h6>
                               </div>
                               <div className='col'>
                                   <h6 className="card-text">{item.total_number_of_product} left</h6>
                               </div>
                           </div>
                           :
                           <div className="row">
                               <div className=" col">
                                   <h6 className="card-text" style={{color:'green'}}>Available</h6>
                               </div>
                               <div className='col'>
                                   {
                                   item.total_number_of_product!=0?<h6 className="card-text">{item.total_number_of_product} left</h6>:<h6 className="card-text" style={{color:"#E2E2F4"}}>{item.total_number_of_product} left</h6>
                                   }
                               </div>
                           </div>
                       }
                           <div className='row'>
                               <div className='col'><button className="btn btn-primary btn-danger btn-sm" onClick={()=>removeToWishlist(item._id)}>Cut</button></div>
                               <div className='col'><button className="btn btn-primary btn-sm" disabled={!item.total_number_of_product} onClick={()=>AddToCart(item._id)} >Add</button></div>
                           </div>
                   </div>
               </div>
           ))
         }
      </div>
      :
      <div className='loader-container'>
          <Link to={'/Product'}><button className='btn btn-info'>  <h4>ADD PRODUCTS</h4>  </button></Link>
      </div>
    }
  </>
 )
}
