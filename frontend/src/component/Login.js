import React, { useState,useEffect}  from "react";
import { GoXCircleFill } from "react-icons/go";
import { HiCheckCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import '../css/Auth.css'
export default function Login() {

const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const history=useNavigate();
const [wronguser,setwronguser]=useState(false)
const [disabled,setdisabled]=useState(false)
const [errormess,seterrormess]=useState("")
const [resent,setresent]=useState(false)

const api = process.env.REACT_APP_API

const [otp,setotp]=useState({
    otp:"",
    showOtpfrom:false,
    otpFromdata:"",
    isvalidate:false,
    disabledbutton:false,
})

const [emailcontrol,setemailcontrol]=useState({
    wrongemail:false,
})

const [passwordcontrol,setpasswordcontrol]=useState({
    uppercase:false,
    lowercase:false,
    digit:false,
    specialCharacters:false,
    len:false
})

useEffect(()=>{
    const auth =JSON.parse(localStorage.getItem('user'));
    if(auth)
    {
        history('/')
    }
},[])

//password check
function containsUppercase(str) {
return /[A-Z]/.test(str);
}

function containsLowercase(str) {
return /[a-z]/.test(str);
}

function containsDigit(str) {
return /\d/.test(str);
}

function containsSpecialCharacter(str) {
return /[^\w\d]/.test(str);
}

function checkpassword(s)
  {
    s=s.replace(/\s+/g, '');
    setpassword(s)
    if(s.length==0){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        uppercase: false,
        lowercase:false,
        digit:false,
        specialCharacters:false,
        len:false
      }));
      return
    }

    if(containsUppercase(s)==true){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        uppercase: true,
      }));
    }else{
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        uppercase: false,
      }));
    }

    if(containsLowercase(s)==true){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        lowercase: true,
      }));
    }else{
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        lowercase: false,
      }));
    }

    if(containsDigit(s)==true){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        digit: true,
      }));
    }else{
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        digit: false,
      }));
    }

    if(containsSpecialCharacter(s)==true){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: true,
      }));
    }else{
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: false,
      }));
    }

    if(s.length>=8 && s.length<=15){
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        len: true,
      }));
    }else{
      setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        len: false,
      }));
    }
}

//email check
function checkforemailid(s)
{
  setwronguser(false)
  s=s.replace(/\s+/g, '');
  setemail(s);
  if(s.length==0){
    setemailcontrol((prevUserData) => ({
      ...prevUserData,
      wrongemail: false,
    }));
    return
  }
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let a= regex.test(s);
  if(a){
    setemailcontrol((prevUserData) => ({
      ...prevUserData,
      wrongemail: true,
    }));
  }
  else{
    setemailcontrol((prevUserData) => ({
      ...prevUserData,
      wrongemail: false,
    }));
  }
}

function checkotp(data)
{
  setwronguser(false)
  setwronguser(false)
  setotp((prevUserData) => ({
    ...prevUserData,
    otpFromdata: data,
  }));
  if(data==otp.otp)
  {
    setotp((prevUserData) => ({
      ...prevUserData,
      isvalidate: true,
      disabledbutton:true,
    }));
    setdisabled(false)
    return;
  }
}

function Login()
{
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
        if(result.statusCode==200)
        {
            alert(result.message)
            localStorage.setItem("user",JSON.stringify(result.data))
            history('/')
        }
        else{
            setdisabled(false)
            setwronguser(true)
        }
    },(error)=>{
        setdisabled(false)
        setwronguser(true)
    })
}

function submit()
{
    setwronguser(false)
    if(emailcontrol.wrongemail && passwordcontrol.uppercase && passwordcontrol.lowercase && passwordcontrol.digit && passwordcontrol.len &&passwordcontrol.specialCharacters){
        if(otp.isvalidate){
            Login()
        }
        else{
            setresent(true)
            setdisabled(true)
            setotp((prevUserData) => ({
                ...prevUserData,
                disabledbutton:true
            }));
            fetch(`${api}/Verification/Login/otp-send`,{
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
                if(result.statusCode==200)
                {
                    alert(result.message)
                    setotp((prevUserData) => ({
                        ...prevUserData,
                        otp: result.data,
                        showOtpfrom:true,
                        disabledbutton:false
                    }));
                    setresent(false)
                }
                else{
                    setdisabled(false)
                    setwronguser(true)
                    seterrormess(result.message)
                }
            },(error)=>{
                setdisabled(false)
                setwronguser(true)
                seterrormess("We Find Some Error")
            })
        }
   }
}

  return (
    <div className="authform">
        <h3>Login</h3>
        <div className="">
                <input type="email" value={email} onChange={(e)=>{checkforemailid(e.target.value)}}  className="inputreglog" placeholder="Enter Email Id"  required/>
                {emailcontrol.wrongemail&&<HiCheckCircle style={{color:'green'}} />}
        </div>
        <div>
            <label className="wrongtext">{emailcontrol.wrongemail==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Email Address must be in valid formate with @ symbol</label>
        </div>
        <div className="">
           <input type="password" value={password} onChange={(e)=>{checkpassword(e.target.value)}}  className="inputreglog" placeholder="Enter Password"  required/>
           {passwordcontrol.uppercase && passwordcontrol.lowercase && passwordcontrol.digit && passwordcontrol.len &&passwordcontrol.specialCharacters&&<HiCheckCircle style={{color:'green'}} />}
        </div>
        <div>
              <div className="authform">
                <label className="wrongtext">{passwordcontrol.uppercase==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />} Password Must be one Upper case Character</label>
                <label className="wrongtext">{passwordcontrol.lowercase==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}   Password Must be one Lower case Character</label>
                <label className="wrongtext">{passwordcontrol.digit==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Password Must be Contain one Digit Character</label>
                <label className="wrongtext">{passwordcontrol.specialCharacters==false?<GoXCircleFill style={{color:'red'}} />: <HiCheckCircle style={{color:'green'}} />}  Password Must be  one Special Character </label>
                <label className="wrongtext">{passwordcontrol.len==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Length of Password at Least 8 to 15 Character</label>
              </div>
            </div>
        <div className="">
              {
                otp.showOtpfrom &&
                <>
                  <input type="number" value={otp.otpFromdata} onChange={(e)=>{checkotp(e.target.value)}} disabled={otp.disabledbutton} className="inputreglog" placeholder="Enter OTP"  required/>
                  {otp.isvalidate?<label className="wrongtext"><HiCheckCircle style={{color:'green'}} /> Verify</label>:<button onClick={submit} disabled={resent} className="btn btn-info btn-sm">Resent</button>}
                </>
              }
            </div>
        <div>
         {wronguser?<label className="wrongtext" style={{color:"red"}}><GoXCircleFill/> {errormess}</label>:""}
        </div>
        <button className="btn btn-info btn-sm" disabled={disabled} onClick={submit}>Submit</button>
        <Link className="mt-3" to={'/ForgotPassword'}>Forgot Password</Link>
    </div>
  )
}
