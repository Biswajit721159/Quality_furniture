import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { json, useNavigate } from "react-router-dom";
import loader from "../images/loader.gif"


export default function Buy() {

  const userinfo=JSON.parse(localStorage.getItem('user'))
  const cart=JSON.parse(localStorage.getItem('cart'))
  const [address,setaddress]=useState()
  const history=useNavigate();
  const [wrongaddress,setwrongaddress]=useState(false)
  const [messaddress,setmessaddress]=useState("")
  const [button,setbutton]=useState("Submit")
  const [disabled,setdisabled]=useState(false)
  const [product,setproduct]=useState([])
  const [load,setload]=useState(true)
  let [cost,setcost]=useState(0);

  useEffect(()=>{
    if(userinfo==null)
    {
      history('/Register')
    }
    else
    {
      setaddress(userinfo.user.address)
      fetch(`https://quality-furniture.vercel.app/product/${cart.product_id}`,{
        headers:
        {
            auth:`bearer ${userinfo.auth}`
        }
      }).then(responce=>responce.json()).then((res)=>{
        if(product!=undefined)
        {
          let price=parseInt(res[0].price);
          let offer=parseInt(res[0].offer)
          let actualprice=(price)-((price*offer)/100);
          let x=(actualprice*cart.product_count).toFixed(2);
          setcost(x)
          setload(false)
        }
      })
    }
  },[])

  function submit()
  {
    setdisabled(true)
    setbutton("Please Wait....")
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    fetch(`https://quality-furniture.vercel.app/product/${cart.product_id}`,{
      headers:{
        auth:`bearer ${userinfo.auth}`
    }
    }).then(responce=>responce.json()).then((product_data)=>{
      if(product_data!=undefined && product_data.length!=0)
      {
          if(product_data[0].total_number_of_product>=cart.product_count)
          {
              fetch(`https://quality-furniture.vercel.app/product/${cart.product_id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                     auth:`bearer ${userinfo.auth}`
                },
                body:JSON.stringify({
                  product_id:cart.product_id,
                  product_count:product_data[0].total_number_of_product-cart.product_count
                })
              }).then(responce=>responce.json()).then((data)=>{
                 fetch('https://quality-furniture.vercel.app/order',{
                  method:'POST',
                  headers:{
                      'Accept':'application/json',
                      'Content-Type':'application/json',
                      auth:`bearer ${userinfo.auth}`
                  },
                  body:JSON.stringify({
                    email:userinfo.user.email,
                    address:address,
                    product_id:cart.product_id,
                    product_count:cart.product_count,
                    payment_method:"Cash on Delivary",
                    Total_rupess:cost,
                    Date:currentDate,
                  })
                }).then(responce=>responce.json())
                .then((res)=>{
                  history('/Myorder')
                })
              })
          }
          else
          {
            alert("Sorry Please Decrement Your Product Count")
            history('/Cart')
          }
      }
    })    
  }
  
  return (
    <div className='container center'>
      {
        load==false?
         
          userinfo?
          <div>
            <div className='col-md-4 mt-2' style={{color:"green"}}>*Process to next step</div>
            <div className="col-md-4 mt-4">
                <div className="form-group">
                    <input type="email" value={userinfo.user.email} disabled className="form-control" placeholder="Enter Email Id"  required/>
                </div>
            </div>
            <div className="col-md-4 mt-4">
                <div className="form-group">
                    <input type="number" value={cost} disabled className="form-control"   required/>
                </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                  <textarea type="text" value={address} disabled onChange={(e)=>{setaddress(e.target.value)}}  className="form-control" placeholder="Enter Full Address"  required/>
                  {wrongaddress?<label  style={{color:"red"}}>{messaddress}</label>:""}
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <select className="form-control" disabled aria-label="Default select example">
                  <option selected>Cash on Delivary</option>
                </select>
              </div>
            </div>
            
            <div className="col-md-4 mt-2">
              <button className='btn btn-primary' disabled={disabled} onClick={submit}>{button}</button>
            </div>
          </div>
          :<h1>Page Not Found</h1>
         :<div className='loader-container'><img src={loader} /></div>
      }
    </div>
  )
}
