import React, { useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const history=useNavigate();
const [wronguser,setwronguser]=useState(false)
const [button,setbutton]=useState("Submit Feedback")
const [disabled,setdisabled]=useState(false)




useEffect(()=>{
    const auth =localStorage.getItem('user')
    if(auth)
    {
        history('/')
    }
},[])

function submit(){
    setbutton("Please Wait ...")
    setdisabled(true)
    fetch('http://quality-furniture.vercel.app/login',{
        method:'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
           email:email,password:password
        })
    })
    .then(response=>response.json())
    .then((result)=>{
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result))
            history('/')
        }
        else{
            setbutton("Submit")
            setdisabled(false)
            setwronguser(true)
        }
    },(error)=>{
        setbutton("Submit")
        setdisabled(false)
        setwronguser(true)
    })
}

  return (
    <div className="container">
        <div className="col-md-4 mt-2"><h3>Login</h3></div>
        <div className="col-md-4 mt-2">
            <div className="form-group">
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="form-control" placeholder="Enter Email Id"  required/>
            </div>
        </div>
        <div className="col-md-4 mt-2">
            <div className="form-group">
                <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} className="form-control" placeholder="Enter Password"  required/>
                {wronguser?<label  style={{color:"red"}}>*Invalid User</label>:""}
            </div>
        </div>
        <div className="col-md-4 mt-3">
            <button className="btn btn-primary" disabled={disabled} onClick={submit}>{button}</button>
        </div>
    </div>
  )
}
