import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import loader from "../images/loader.gif"
import { PulseLoader } from 'react-spinners';
import '../css/Reviews.css'
const api = process.env.REACT_APP_API


export default function Reviews() {
 let userinfo=JSON.parse(localStorage.getItem('user'))
 let order_id=useParams().id
 let product_id=useParams().product_id

let history=useNavigate()
const [reviews,setreviews]=useState("");
const[rating,setrating]=useState("Over All Rating Out of 5");
const [product,setproduct]=useState()
const [order,setorder]=useState()

const [errorreviews,seterrorreviews]=useState(false)
const [errorrating,seterrorrating]=useState(false)
const [errormessreviews,seterrormessreviews]=useState("")
const [errormessrating,seterrormessrating]=useState("")

const [load,setload]=useState(true)
const [button,setbutton]=useState("Submit Feedback")
const [disabled,setdisabled]=useState(false)


useEffect(()=>{
  loadproduct()
},[])


function findOrder_id()
{
    fetch(`${api}/order/getById/${order_id}`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
          }
        }).then(responce=>responce.json())
        .then((res)=>{ 
            try{
                if(res.statusCode==201)
                {
                  setorder(res.data)
                }
                else if(res.statusCode==498)
                {
                    localStorage.removeItem('user');
                    history('/Signin')
                }
                else if(res.statusCode==404 || res.statusCode==500)
                {
                    history('*');
                }
                else
                {
                    history("*")
                }
                setload(false)
            }catch{
              history('*')
            }
      })
}

function HandaleError(result)
{
  if(result.statusCode==201)
  {
    setproduct(result.data)
    findOrder_id()
  }
  else if(result.statusCode==498)
  {
      localStorage.removeItem('user');
      history('/Login')
  }
  else if(result.statusCode==404 || result.statusCode==500)
  {
      history('*');
  }
  else
  {
      history("*")
  }
}

function loadproduct()
{
    fetch(`${api}/product/${product_id}`,{
      headers:{
        Authorization:`Bearer ${userinfo.accessToken}`
      }
    }).then(responce=>responce.json()).then((result)=>{
          try{
            HandaleError(result)
          }
          catch{
            history('*')
          }
    })
}

function checkreviews()
{
  if(reviews.length==0)
  {
       seterrorreviews(true)
       seterrormessreviews("*Please Type Something")
       return false
  }
   else if(reviews.length<8)
   {
       seterrorreviews(true)
       seterrormessreviews("*Review is Vary Less")
       return false;
   }
   else if(reviews.length>60)
   {
      seterrorreviews(true)
      seterrormessreviews("*Review is Vary High")
      return false;
   }
   return true;
}

function checkrating()
{
    if((parseInt(rating))>=1 && (parseInt(rating))<=5)
    {
      seterrorrating(false)
      return true;
    }
    else
    {
      seterrorrating(true)
      seterrormessrating("*Please Select Correct Rating")
      return false
    }
}

function PushReviews()
{
    fetch(`${api}/Reviews`,{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          Authorization:`Bearer ${userinfo.accessToken}`
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

function UpdateIntoOrder()
{
  fetch(`${api}/order/updateFeedback/${order_id}`,{
    method:'PUT',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${userinfo.accessToken}`
    },
    body:JSON.stringify({
      isfeedback:true
    })
  }).then(responce=>responce.json()).then((result)=>{
      PushReviews()
  })
}

function submit()
{
  if(product==null || order==null)
  {
    return 
  }
  
  let rat_ing=checkrating()
  let rev_iew=checkreviews()
  let a=parseInt(product.rating)* parseInt(product.number_of_people_give_rating)+parseInt(rating);
  let b=(product.number_of_people_give_rating+1);
  let x=(a/b).toFixed(1);


  if(rat_ing && rev_iew)
  {
        setbutton("Please Wait....")
        setdisabled(true)

        fetch(`${api}/product/RaingUpdateIntoProduct/${product_id}`,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              Authorization:`Bearer ${userinfo.accessToken}`
          },
          body:JSON.stringify({
            product_id:product_id,
            rating:x,
            number_of_people_give_rating:product.number_of_people_give_rating+1,
          })
        }).then(responce=>responce.json()).then((result)=>{
            UpdateIntoOrder()
        })
   }
}

  return (
    <>
    {
      load==true?
        <div className="Loaderitem">
            <PulseLoader color="#16A085"/>
        </div>
      :
        <div>
            <div className="Reviewsform mt-3">
                <h5>Reviews Form</h5>
                
                  <textarea
                    type="textarea"
                    className="Reviewformtextarea-control"
                    placeholder="Write Your Reviews"
                    value={reviews}
                    onChange={(e)=>setreviews(e.target.value)}
                    required
                  />
                  {errorreviews?<label  style={{color:"red"}}>{errormessreviews}</label>:""}
                
                  <select className="Reviewselectform-control" value={rating} onChange={(e)=>setrating(e.target.value)}  >
                    <option>Over All Rating out of 5</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  {errorrating?<label  style={{color:"red"}}>{errormessrating}</label>:""}
                
                  <button className="btn btn-info  mt-3 btn-sm" disabled={disabled} type="submit" onClick={submit}>
                    {button}
                  </button>
                
            </div>
      </div>
      }
    </>
  )
}
