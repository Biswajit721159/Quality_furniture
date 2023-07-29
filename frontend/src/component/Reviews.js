import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import loader from "../images/loader.gif"


export default function Reviews() {
 let userinfo=JSON.parse(localStorage.getItem('user'))
 let order_id=useParams().id
 let product_id=useParams().product_id

let history=useNavigate()
const [reviews,setreviews]=useState("");
const[rating,setrating]=useState("Over All Rating Out of 5");
const [product,setproduct]=useState([])

const [button,setbutton]=useState("Submit Feedback")
const [disabled,setdisabled]=useState(false)


useEffect(()=>{
  fetch(`http://quality-furniture.vercel.app/product/${product_id}`,{
    headers:
    {
        auth:`bearer ${userinfo.auth}`
    }
  }).then(responce=>responce.json()).then((result)=>{
    if(result!=undefined)
    {
      setproduct(result)
    }
  })
},[])


function submit()
{
  if(product  && product.length==0)
  {
    return 
  }
  
  let a=parseInt(product[0].rating)* parseInt(product[0].number_of_people_give_rating)+parseInt(rating);
  let b=(product[0].number_of_people_give_rating+1);
  let x=(a/b).toFixed(1);
  setbutton("Please Wait....")
  setdisabled(true)
   fetch(`http://quality-furniture.vercel.app/RaingUpdateIntoProduct/${product_id}`,{
    method:'PUT',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        auth:`bearer ${userinfo.auth}`
    },
    body:JSON.stringify({
      product_id:product_id,
      rating:x,
      number_of_people_give_rating:product[0].number_of_people_give_rating+1,
    })
   }).then(responce=>responce.json()).then((result)=>{
       console.log(result)
   })


   fetch('http://quality-furniture.vercel.app/Reviews',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          auth:`bearer ${userinfo.auth}`
      },
      body:JSON.stringify({
        email:userinfo.user.email,
        product_id:product_id,
        order_id:order_id,
        rating:rating,
        review:reviews,
      })
   }).then(response=>response.json()).then((data)=>{
     history('/Myorder')
   })
}

  return (
    <>
    {
    product && product.length!=0?
    <div>
        <div className="container mt-3">
        <div className="col-md-4 mt-3"><h3>Reviews Form</h3></div>
        <div className="col-md-4 mt-3">
          <textarea
            type="textarea"
            className="form-control"
            placeholder="Write Your Reviews"
            value={reviews}
            onChange={(e)=>setreviews(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 mt-3">
          <select className="form-control" value={rating} onChange={(e)=>setrating(e.target.value)}  >
           <option>Over All Rating out of 5</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" disabled={disabled} type="submit" onClick={submit}>
            {button}
          </button>
        </div>
       </div>
    </div>:<div className='loader-container'><img src={loader} /></div>}
    </>
  )
}
