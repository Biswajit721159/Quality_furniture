import React, { useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import '../css/Auth.css'
export default function Login() {

const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const history=useNavigate();
const [wronguser,setwronguser]=useState(false)
const [button,setbutton]=useState("Submit")
const [disabled,setdisabled]=useState(false)

const api = process.env.REACT_APP_API
useEffect(()=>{
    const auth =JSON.parse(localStorage.getItem('user'));
    if(auth)
    {
        history('/')
    }
},[])

function submit(){
    setbutton("Please Wait ...")
    setdisabled(true)
    fetch(`${api}/user/login`,{
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
        if(result.data && result.data.accessToken)
        {
            localStorage.setItem("user",JSON.stringify(result.data))
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
    <div className="authform">
        <h3>Login</h3>
        <div className="">
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="inputreglog" placeholder="Enter Email Id"  required/>
        </div>
        <div className="">
           <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} className="inputreglog" placeholder="Enter Password"  required/>
            
        </div>
        <div>
         {wronguser?<label className="wrong" style={{color:"red"}}>*Invalid User</label>:""}
        </div>
        <button className="btn btn-info btn-sm" disabled={disabled} onClick={submit}>{button}</button>
    </div>
  )
}
