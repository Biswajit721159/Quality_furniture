import React, { useEffect, useState } from 'react'
import { json, useNavigate } from "react-router-dom";
import loader from "../images/loader.gif"
import {useParams} from 'react-router-dom'
import { PulseLoader } from 'react-spinners';

const api = process.env.REACT_APP_API

export default function Update_userdata() {
  const _id=useParams()._id
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [address,setaddress]=useState("")

  const history=useNavigate();
  
  const [wrongname,setwrongname]=useState(false)
  const [wrongemail,setwrongemail]=useState(false)
  const [wrongaddress,setwrongaddress]=useState(false)
  const [messaddress,setmessaddress]=useState("")

  const [messname,setmessname]=useState("")
  const userinfo=JSON.parse(localStorage.getItem('user'))

  const [button,setbutton]=useState("Submit")
  const [disabled,setdisabled]=useState(false)
  const [load,setload]=useState(true)
  

  useEffect(()=>{
    if(userinfo==null)
    {
      history('/Signin')
    }
    else
    {
        loaduser()
    }
  },[])

  function loaduser()
  {
      fetch(`${api}/user/informationbyID/${_id}`,{
        headers:{
          Authorization:`Bearer ${userinfo.accessToken}`
        }
      }).then(responce=>responce.json()).then((res)=>{
          if(res.statusCode==201)
          {
            setname(res.data.name)
            setemail(res.data.email)
            setaddress(res.data.address)
            setload(false)
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
  
  function checkforname(s)
  {
    var regex = /^[a-zA-Z ]{2,30}$/;
    let a= regex.test(s);
    if(a==false)
    {
      setwrongname(true)
      setmessname("*Name must be only string and should not contain symbols or numbers")
    }
    return a;
  }

  function checkaddress(s)
  {
    if(s.length>10)
    {
      return true;
    }
    setwrongaddress(true)
    setmessaddress("*Invalid Address Please Enter Valid address")
    return false;
  }

  function update()
  {
      let a=checkaddress(address)
      let b=checkforname(name)
      if(a && b)
      {
          setbutton("Please wait...")
          setdisabled(true)
          fetch(`${api}/user/updateAddressAndName/${_id}`,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              Authorization:`Bearer ${userinfo.accessToken}`
          },
          body:JSON.stringify({
            _id:_id,
            name:name,
            email:email,
            address:address,
          }) 
        })
        .then(responce=>responce.json()).then((res)=>{
          if(res.statusCode==201)
          {
             let cart=JSON.parse(localStorage.getItem('user'))
             cart.user.name=name;
             cart.user.address=address;
             localStorage.setItem('user',JSON.stringify(cart))
             history('/Profile')
          }
          else if(res.statusCode==498)
          {
            localStorage.removeItem('user');
            history('/Signin');
          }
          else
          {
            history('*')
          }
        })
      }
  }

  return (
    
      load==false?
        <div className="Reviewsform">
                <h5>Update User</h5>
                  <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} disabled className="Reviewselectform-control" placeholder="Enter Email Id"  required/>
                  {wrongemail?<label  style={{color:"red"}}>*Invalid Email address</label>:""}

                  <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}  className="Reviewselectform-control" placeholder="Enter Full Name"  required/>
                  {wrongname?<label  style={{color:"red"}}>{messname}</label>:""}

                  <textarea type="text" value={address} onChange={(e)=>{setaddress(e.target.value)}}  className="Reviewformtextarea-control" placeholder="Enter Full Address"  required/>
                  {wrongaddress?<label  style={{color:"red"}}>{messaddress}</label>:""}

                <button className="btn btn-info mt-4" disabled={disabled} onClick={update}>{button}</button>
            </div>
      :<div className="Loaderitem">
          <PulseLoader color="#16A085"  />
       </div>
    
  )
}
