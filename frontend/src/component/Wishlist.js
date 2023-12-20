import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loader from "../images/loader.gif"
import {AiFillStar } from "react-icons/ai";

const api = process.env.REACT_APP_API

export default function WishList() {

  let userinfo=JSON.parse(localStorage.getItem('user'))
  let product=JSON.parse(localStorage.getItem('Wishlist'))
  const [data,setdata]=useState([])
  const [update,setupdate]=useState(false)
  const history=useNavigate()
  const [nums,setnums]=useState([])


  function loadproduct()
  {
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
          setnums(res.data);
          settoproduct(res.data);
      }
      catch{
        alert("we are find Some Error")
      }
     })
  }

  function settoproduct(nums)
  {
    if(nums==undefined || product==undefined ) return
    let arr=[]
    // console.log(product)
    // console.log(nums)
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
    //console.log(arr)
    setdata([...arr])
  }

  useEffect(()=>{
    if(userinfo==null)
    {
      history('/Register')
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
    //setupdate(!update)
  }

  // console.log(data)
  return (
  <>
     {
       (data && data.length !=0) ?
      <div className='container align-items-center  mx-5 row'>
         { data.map((item,ind)=>(
               <div key={ind} className="card mx-4 mt-4" style={{width: "18rem", height:"26rem",backgroundColor:"#D6DBDF"}}>
                   <Link to={`/Product/${item._id}`}>
                       <img className="card-img-top" src={item.newImage[0]} style={{height:"200px",width:"287px"}} alt="Card image cap"/>
                   </Link>
                   <div className="card-body">
                       <h6 className="card-title">{item.product_name}</h6>
                       <div className="row">
                           <div className="container col">
                             <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
                           </div>
                           <div className="container col">
                             <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
                           </div>
                       </div>
                       <div className='row'>
                       <div className='col'>
                                {
                                    parseInt(item.rating)==0?<button className='btn btn-secondary btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==1?<button className='btn btn-danger btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==2?<button className='btn btn-info btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==3?<button className='btn btn-warning btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==4?<button className='btn btn-primary btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==5?<button className='btn btn-success btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :""
                                }
                            </div>
                            <div className=" col">
                                    <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100)).toFixed(2)}</h5>
                            </div>
                       </div>
                       {
                           item.total_number_of_product==0?
                           <div className=" row">
                               <div className="col">
                                  <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                               </div>
                               <div className='col'>
                                   {
                                   item.total_number_of_product!=0?<strong>{item.total_number_of_product} Left</strong>:<strong style={{color:"#E2E2F4"}}>{item.total_number_of_product} Left</strong>
                                   }
                               </div>
                           </div>
                           :
                           <div className="row">
                               <div className=" col">
                                 <h5 className="card-text" style={{color:'green'}}>Available</h5>
                               </div>
                               <div className='col'>
                                   {
                                   item.total_number_of_product!=0?<strong>{item.total_number_of_product} Left</strong>:<strong style={{color:"#E2E2F4"}}>{item.total_number_of_product} Left</strong>
                                   }
                               </div>
                           </div>
                       }
                       <div className="card-body">
                           <div className='row'>
                               <div className='col'><button className="btn btn-danger" onClick={()=>removeToWishlist(item._id)}>Remove</button></div>
                           </div>
                       </div>
                   </div>
               </div>
           ))
         }
      </div>
      :
      product && product.length?
      <div className='loader-container'><img src={loader} /></div>
      :
        <div className='loader-container'>
            <Link to={'/Product'}><button className='btn btn-info'>  <h4>ADD PRODUCTS</h4>  </button></Link>
        </div>
    }
  </>
 )
}
