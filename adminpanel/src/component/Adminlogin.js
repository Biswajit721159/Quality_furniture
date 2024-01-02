import React, { useInsertionEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API
const Adminlogin = () => {

  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const history=useNavigate()
  const [button,setbutton]=useState("Login")
  const [disabled,setdisabled]=useState(false)
  const [wronguser,setwronguser]=useState(false)

  function submit()
  {
    setbutton("Wait...")
    setdisabled(true)
      fetch(`${api}/adminpanel/Login`,{
          method:'POST',
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
    <>
      <div class="box">
        <div class="container">
          <div class="top">
            <span>Admins Login Panel</span>
          </div>
            <div class="input-field mt-2">
              <input
                type="email"
                class="input"
                name="eamil"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder="email"
                required
              />
            </div>
            <div class="input-field mt-2">
              <input
                type="Password" 
                class="input"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                name="password"
                placeholder="Password"
                required
              />
            </div>
            {wronguser && <span style={{color:"red"}}>*Wronguser</span>}
            <div class="input-field mt-2">
              <input type="submit" onClick={submit} disabled={disabled} class="submit" value={button} />
            </div>
        </div>
      </div>
    </>
  );
};
export default Adminlogin;
