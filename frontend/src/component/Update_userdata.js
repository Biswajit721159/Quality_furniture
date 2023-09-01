import React, { useEffect, useState } from 'react'
import { json, useNavigate } from "react-router-dom";
import loader from "../images/loader.gif"

import {useParams} from 'react-router-dom'

export default function Update_userdata() {
  const _id=useParams()._id
  //console.log(_id)
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
      history('/Register')
    }
    else
    {
        fetch(`https://quality-furniture.vercel.app/user/${_id}`,{
          headers:{
            auth:`bearer ${userinfo.auth}`
          }
        }).then(responce=>responce.json()).then((res)=>{
            if(res!=undefined && res.length!=0 && res.status!=498 && res.status!=401)
            {
              setname(res[0].name)
              setemail(res[0].email)
              setaddress(res[0].address)
              setload(false)
            }
        })
    }
  },[])

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
          fetch(`https://quality-furniture.vercel.app/user/${_id}`,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              auth:`bearer ${userinfo.auth}`
          },
          body:JSON.stringify({
            _id:_id,
            name:name,
            email:email,
            address:address,
          }) 
        })
        .then(responce=>responce.json()).then((res)=>{
          localStorage.setItem('user',JSON.stringify(res))
          history('/Profile')
        })
    }
  }

  return (
    
      load==false?
        <div className="container">
            <div className="col-md-4 mt-3">
                <h3>Update User</h3>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                  <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} disabled className="form-control" placeholder="Enter Email Id"  required/>
                  {wrongemail?<label  style={{color:"red"}}>*Invalid Email address</label>:""}
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                  <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}  className="form-control" placeholder="Enter Full Name"  required/>
                  {wrongname?<label  style={{color:"red"}}>{messname}</label>:""}
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                  <textarea type="text" value={address} onChange={(e)=>{setaddress(e.target.value)}}  className="form-control" placeholder="Enter Full Address"  required/>
                  {wrongaddress?<label  style={{color:"red"}}>{messaddress}</label>:""}
              </div>
            </div>
            <div className="col-md-4 mt-3">
                <button className="btn btn-primary" disabled={disabled} onClick={update}>{button}</button>
            </div>
        </div>
      :<div className='loader-container'><img src={loader} /></div>
    
  )
}
