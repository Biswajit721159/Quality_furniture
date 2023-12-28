import React, { useState,useEffect }  from "react";
import { json, useNavigate } from "react-router-dom";
import '../css/Auth.css'
const Register=()=>{

const [name,setname]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [address,setaddress]=useState("")
const history=useNavigate();

const [wrongname,setwrongname]=useState(false)
const [wrongemail,setwrongemail]=useState(false)
const [wrongpassword,setwrongpasword]=useState(false)
const [wrongaddress,setwrongaddress]=useState(false)


const [messname,setmessname]=useState("")
const [messemail,setmessemail]=useState("")
const [messpassword,setmesspassword]=useState("");
const [messaddress,setmessaddress]=useState("")

const [button,setbutton]=useState("Submit")
const [disabled,setdisabled]=useState(false)



  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth)
    {
        history('/')
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

  function checkforemailid(s)
  {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let a= regex.test(s);
    if(a==false)
    {
      setwrongemail(true)
      setmessemail("*Email Address must be in valid formate with @ symbol")
    }
    return  a;
  }

  function checkpassword(s)
  {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let a= regex.test(s);
    if(a==false)
    {
      setwrongpasword(true)
      setmesspassword("*Password must have at least one Uppercase, lowercase, digit, special characters & 8 characters")
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

  function submit()
  {
    let a=checkforname(name)
    let b=checkforemailid(email)
    let c=checkpassword(password)
    let d=checkaddress(address)
    setwrongname(!a)
    setwrongemail(!b)
    setwrongpasword(!c)
    setwrongaddress(!d)
    
    if(a && b && c && d)
    {
      setbutton("Please Wait....")
      setdisabled(true)
      fetch(`https://quality-furniture.vercel.app/usermail/${email}`).then(response=>response.json()).then((res)=>{
        if(res.message==false)
        {
            fetch('https://quality-furniture.vercel.app/register',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  name:name,
                  email:email,
                  password:password,
                  address:address
                })
            })
            .then(response=>response.json())
            .then((result)=>{
                localStorage.setItem("user",JSON.stringify(result))
                history('/')
            })
        }
        else
        {
          setbutton("Submit")
          setdisabled(false)
          setwrongemail(true)
          setmessemail("*Email Already present")
        }
      })
     }
  }

    return(
        <div className="authform">
            <h3 >Register</h3>
            <div className="">
                  <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}  className="inputreglog" placeholder="Enter Full Name"  required/>
            </div>
            <div className="">
                 {wrongname?<label className="wrong" style={{color:"red"}}>{messname}</label>:""}
            </div>
            <div className="">
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="inputreglog" placeholder="Enter Email Id"  required/>
            </div>
            <div>
                {wrongemail?<label className="wrong" style={{color:"red"}}>{messemail}</label>:""}
            </div>
            <div className="">
                <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} className="inputreglog" placeholder="Enter Password"  required/>
            </div>
            <div>
                {wrongpassword?<label className="wrong"  style={{color:"red"}}>{messpassword}</label>:""}
            </div>
            <div className="">
                <textarea type="text" value={address} onChange={(e)=>{setaddress(e.target.value)}} className="inputreglog" placeholder="Enter Full Address"  required/>
            </div>
            <div>
                {wrongaddress?<label className="wrong" style={{color:"red"}}>{messaddress}</label>:""}
            </div>
            <button className="btn btn-info  btn-sm"  disabled={disabled} onClick={submit}>{button}</button>
        </div>
    )
}

export default Register;
