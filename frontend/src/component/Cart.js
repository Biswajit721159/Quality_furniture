import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import {AiFillStar } from "react-icons/ai";
import {FaHeart} from 'react-icons/fa';
import loader from "../images/loader.gif"

export default function Cart() {

const userinfo=JSON.parse(localStorage.getItem('user'))
const [data,setdata]=useState([])
const [cart,setcart]=useState(JSON.parse(localStorage.getItem('cart')))
const [cost,setcost]=useState(0)

const history=useNavigate()

 useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else if(cart)
    {
        fetch(`https://quality-furniture.vercel.app/product/${cart.product_id}`,{
            headers:{
                auth:`bearer ${userinfo.auth}`
            }
        }).then(responce=>responce.json())
        .then((res)=>{
            setToproduct(res,cart)
        })
    }
 },[])

 function setToproduct(data,res)// data mean product and res mean cart
 {
     res=JSON.parse(localStorage.getItem('cart'))
     if(data==undefined || res==null) return
     else
     {
         let ans=[]
         for(let i=0;i<data.length;i++)
         {
             let obj={
                 _id:data[i]._id,
                 product_name:data[i].product_name,
                 rating:data[i].rating,
                 newImage:data[i].newImage,
                 price:data[i].price,
                 offer:data[i].offer,
                 product_type:data[i].product_type,
                 total_number_of_product:data[i].total_number_of_product,
                 number_of_people_give_rating:data[i].number_of_people_give_rating,
                 product_count:0,
                 isdeleted:false,
             }
             if(res && res.length!=0 && res.product_id==obj._id)
             {
                 obj.product_count=res.product_count;
             }
             ans.push(obj)
         }
         if(ans.length==0)
         {
            return 
         }
         setdata([...ans])
         let x=((ans[0].price-((ans[0].price*ans[0].offer)/100))*(res.product_count)).toFixed(2);
         setcost(x)
     }
 }

 function ADD_TO_DECREMENT(id)
 {
     let obj=cart
     if(cart==null || cart.length==0)
     {
         alert("Sorry You are not allow !")
     }
     else
     {
         if(cart.product_id==id && cart.product_count==0)
         {
             alert("Sorry You are not allow !")
         }
         else if(cart.product_id==id)
         {
             obj={product_id:id,product_count:cart.product_count-1}
         }
         else
         { 
             alert("Sorry You are not allow !")
         }
     }
     localStorage.setItem('cart',JSON.stringify(obj))
     setcart(JSON.parse(localStorage.getItem('cart')))
     setToproduct(data,cart)
 }
 
 function checkTheProductCount(id)
 {
     if(data==undefined) return 0;
     for(let i=0;i<data.length;i++)
     {
         if(data[i]._id==id)
         {
             return (data[i].total_number_of_product)
         }
     }
     return 0;
 }
 
 function ADD_TO_INCREMENT(id)
 {
     let obj=cart
     if(cart==null || cart.length==0)
     {
         obj={product_id:id,product_count:1}
     }
     else
     {
         if(cart.product_id==id)
         {
             let x=checkTheProductCount(id);
             if(x<=cart.product_count)
             {
                 alert("You are Not Allow ! ")
             }
             else
             {
                 obj={product_id:id,product_count:1+cart.product_count}
             }
         }
         else
         { 
             if(window.confirm('Are you sure to replace this product ?'))
             {
                 obj={product_id:id,product_count:1}
             }
         }
     }
     localStorage.setItem('cart',JSON.stringify(obj))
     setcart(JSON.parse(localStorage.getItem('cart')))
     setToproduct(data,cart)
 }


  return (
    <>
    {
         data!=undefined && data.length!=0?
            <div className='container'>
                <div className='container align-items-center  mx-5 row'>
                    { 
                            data.map((item,ind)=>(
                                <div key={ind} className="card mx-4 mt-4" style={{width: "18rem", height:"auto",backgroundColor:"#D6DBDF"}}>
                                    <Link to={`/Product/${item._id}`}>
                                        <img className="card-img-top" src={item.newImage[0]} style={{height:"200px",width:"287px"}} alt="Card image cap"/>
                                    </Link>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col'>
                                            <h6 className="card-title d-flex">{item.product_name}</h6>
                                            </div>
                                        </div>
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
                                                <div className='col'>
                                                {
                                                    item.product_count==0
                                                    ?<button className="btn btn-primary rounded-pill btn-sm mt-2" >
                                                        <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                            ADD
                                                        <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                                    </button>
                                                    :<button className="btn btn-primary rounded-pill btn-sm mt-2" >
                                                        <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                            {item.product_count}
                                                        <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                                    </button>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="row card-body">
                                            <div className='col'>
                                            <button className='btn btn-warning' disabled>₹ {cost}</button>
                                            </div>
                                            <div className='col'>
                                                <Link to={`/${cost}/Buy`}><button className='btn btn-warning'>Buy</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
            :cart!=null ?
            <div className='loader-container'><img src={loader} /></div>
            :
                <div className='loader-container'>
                    <h4>Product Not Found</h4>
                </div>
    }
    </>
  )
}
