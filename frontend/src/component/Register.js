import React, { useState,useEffect }  from "react";
import { json, useNavigate } from "react-router-dom";
import { GoXCircleFill } from "react-icons/go";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md"
import '../css/Auth.css'
const api = process.env.REACT_APP_API
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
const [messemail,setmessemail]=useState("Email Address must be in valid formate with @ symbol")
const [messpassword,setmesspassword]=useState("");
const [messaddress,setmessaddress]=useState("")
const [button,setbutton]=useState("Submit")


const [disabled,setdisabled]=useState(false)
const [resent,setresent]=useState(false)

const [wronginformation,setwronginformation]=useState(false);
const [messwronginformation,setmesswronginformation]=useState("");
const [confirmpassword,setconfirmpassword]=useState("");

const [confirmpasswordcontrol,setconfirmpasswordcontrol]=useState({
  isPasswordandconfirmPasswordIsSame:false,
  showconfirmpasswordfrom:false,
})

const [namecontrol,setnamecontrol]=useState({
  charcter:false,
  word:false,
  lenWord:false,
  len:false,
  specialCharacters:false,
  shownamefrom:false,
})

const [passwordcontrol,setpasswordcontrol]=useState({
  uppercase:false,
  lowercase:false,
  digit:false,
  specialCharacters:false,
  len:false,
  showpasswordfrom:false,
})

const [addresscontorl,setaddresscontrol]=useState({
  street:false,
  city:false,
  pin:false,
  state:false,
  specialCharacters:false,
  len:false,
  mobile:false,
  numaricNumer:false,
  showaddressfrom:false
})

const [emailcontrol,setemailcontrol]=useState({
  wrongemail:false,
  showemailfrom:false,
})

const [otp,setotp]=useState({
  showOtpfrom:false,
  otpFromdata:"",
  showOtpButton:false,
  disabledOtpForm :false,
  loginbutton:false,
})



  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth)
    {
        history('/')
    }
  },[])
  

  //name section
  function containsNumber(inputString) {
    return /\d/.test(inputString);
  }

  function checkforname(e)
  {
    setwronginformation(false);
    let s=e.target.value;
    s=s.replace(/\s+/g, ' ');
    setname(s)
    let a=containsNumber(s);
    if(s.length==0){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        charcter: false,
        word:false,
        lenWord:false,
        len:false,
        specialCharacters:false
      }));
      return
    }
    if(a){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        charcter: false,
      }));
    }
    else{
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        charcter: true,
      }));
    }
    const wordsArray = s.trim().split(/\s+/);

    if(wordsArray.length<=1){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        word: false,
      }));
    }
    else{
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        word: true,
      }));
    }
    let count=0;
    wordsArray.forEach(element => {
      if(element.length<=1){
        count++;
        setnamecontrol((prevUserData) => ({
          ...prevUserData,
          lenWord: false,
        }));
      }
    });
    if(count==0){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        lenWord: true,
      }));
    }

    if(s.length>=10 && s.length<=20){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        len: true,
      }));
    }
    else{
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        len: false,
      }));
    }
    count=0
    let arr=s.split('')
    arr.forEach((data)=>{
      if((data>='a' && data<='z') || (data>='A' && data<='Z') || data==' '){
        
      }
      else{
        count++;
      }
    })
    if(count==0){
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: true,
      }));
    }else{
      setnamecontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: false,
      }));
    }


    // let s=e.target.value
    // var regex = /^[a-zA-Z ]{2,30}$/;
    // let a= regex.test(s);
    // if(a==false)
    // {
    //   setwrongname(true)
    //   setmessname("Name must be only string and should not contain symbols or numbers")
    // }
    // setwrongname(!a)
    // return a;
  }

  //email section 

  function checkforemailid(s)
  {
    setwronginformation(false);
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

  //password section
  
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
    setwronginformation(false);
    s=s.replace(/\s+/g, '');
    setpassword(s);
    checkconfirmpasswordIsEqualPassword(confirmpassword,s);
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

  //address section

  function extractMobileNumber(inputString) {
    const regex = /\b\d{10}\b/g;
    const matches = inputString.match(regex);
    if (matches && matches.length > 0) {
        return  true;
    } else {
        return false; 
    }
  }

  function checkaddress(s)
  {
    setwronginformation(false);
    s=s.replace(/\s+/g, ' ');
    s=s.toLowerCase();
    setaddress(s);
    if(s.length==0){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        street: false,
        city:false,
        pin:false,
        state:false,
        specialCharacters:false,
        len:false
      }));
      return
    }

    let searchString = "street";
    if(s.includes(searchString)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        street: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        street: false,
      }));
    }
    searchString = "city";
    if(s.includes(searchString)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        city: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        city: false,
      }));
    }
    searchString = "pin";
    if(s.includes(searchString)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        pin: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        pin: false,
      }));
    }
    searchString = "state";
    if(s.includes(searchString)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        state: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        state: false,
      }));
    }
    searchString = "mobile";
    if(s.includes(searchString)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        mobile: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        mobile: false,
      }));
    }

    if(s.length>=45 && s.length<=100){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        len: true,
      }));
    }
    else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        len: false,
      }));
    }
    let count=0;
    let specialCharacterscount=0;
    let digitcount=0;

    for(let i=0;i<s.length;i++){
      if((s[i]>='a' && s[i]<='z')){
        continue;
      }
      else if(s[i]==' '){
        continue;
      }
      else if(s[i]>='0' && s[i]<='9') {
        digitcount++;
      }
      else if(s[i]==',' || s[i]=='-' || s[i]=='.'){
        specialCharacterscount++;
      }
      else{
        count++;
      }
    }

    if(digitcount<=22){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        numaricNumer: true,
      }));
    }
    else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        numaricNumer: false,
      }));
    }

    if(count==0 && specialCharacterscount<=10){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: true,
      }));
    }
    else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        specialCharacters: false,
      }));
    }

    if(extractMobileNumber(s)){
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        mobile: true,
      }));
    }else{
      setaddresscontrol((prevUserData) => ({
        ...prevUserData,
        mobile: false,
      }));
    }

  }

  function inableconfirmpassword()
  {
    setconfirmpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      isPasswordandconfirmPasswordIsSame:false
    }));
  }

  function disabledconfirmpassword()
  {
    setconfirmpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      isPasswordandconfirmPasswordIsSame:true
    }));
  }

  //check confirm password

  function checkconfirmpasswordIsEqualPassword(confirmpassword,password)
  {
    if(confirmpassword.length==0){
      disabledconfirmpassword()
    }
    if(confirmpassword==password){
      disabledconfirmpassword()
    }
    else{
      inableconfirmpassword()
    }
  }

  function checkconfirmpassword(data)
  {
    setwronginformation(false);
    setconfirmpassword(data)
    checkconfirmpasswordIsEqualPassword(data,password)
  }

  //validate OTP

  function checkotp(data)
  {
    setotp((prevUserData) => ({
      ...prevUserData,
      otpFromdata: data,
    }));
  }

  function checkAllInputfield()
  {
    return (namecontrol.charcter && namecontrol.word && namecontrol.lenWord && namecontrol.len &&namecontrol.specialCharacters
      &&emailcontrol.wrongemail && passwordcontrol.uppercase && passwordcontrol.lowercase && passwordcontrol.digit && passwordcontrol.len &&passwordcontrol.specialCharacters&&
      addresscontorl.street && addresscontorl.city && addresscontorl.pin && addresscontorl.state && addresscontorl.specialCharacters &&addresscontorl.len && confirmpasswordcontrol.isPasswordandconfirmPasswordIsSame)
    
  }

  function disabledinputfrom()
  {
    setnamecontrol((prevUserData) => ({
      ...prevUserData,
      shownamefrom:true
    }));
    setemailcontrol((prevUserData) => ({
      ...prevUserData,
      showemailfrom:true
    }));
    setpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      showpasswordfrom:true
    }));
    setaddresscontrol((prevUserData) => ({
      ...prevUserData,
      showaddressfrom:true
    }));
    setconfirmpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      showconfirmpasswordfrom:true
    }));
  }

  function inableinputfrom()
  {
    setnamecontrol((prevUserData) => ({
      ...prevUserData,
      shownamefrom:false
    }));
    setemailcontrol((prevUserData) => ({
      ...prevUserData,
      showemailfrom:false
    }));
    setpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      showpasswordfrom:false
    }));
    setaddresscontrol((prevUserData) => ({
      ...prevUserData,
      showaddressfrom:false
    }));
    setconfirmpasswordcontrol((prevUserData) => ({
      ...prevUserData,
      showconfirmpasswordfrom:false
    }));
  }

  function inableotpcontrol()
  {
    setotp((prevUserData) => ({
      ...prevUserData,
      disabledOtpForm :false,
      loginbutton:false,
    }));
    setresent(false)
  }

  function disableotpcontrol()
  {
    setresent(true)
    setotp((prevUserData) => ({
      ...prevUserData,
      disabledOtpForm :true,
      loginbutton:true,
    }));
  }

  function Register()
  {
      setdisabled(true)
      fetch(`${api}/user/register`,{
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
            if(result.statusCode==201)
            {
              alert("SuccessFully Register")
              history('/Signin')
            }
            else 
            {
              setwronginformation(true);
              setmesswronginformation(result.message)
              setdisabled(false)
            }
        })
  }

  function OTPVerified()
  {
    setwronginformation(false)
    if(checkAllInputfield()==false || otp.otpFromdata==0)
    {
      alert("Please Fill Input Form")
      return ;
    }
    disableotpcontrol()
      fetch(`${api}/Verification/VerifyOTP`,{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            otp:otp.otpFromdata,
            name:name,
            email:email,
            password:password,
            address:address
          })
      })
      .then(response=>response.json())
      .then((result)=>{
          if(result.statusCode==200 || result.statusCode==201){
            alert("SuccessFully Register")
            history('/Signin')
          }
          else{
            inableotpcontrol()
            setwronginformation(true)
            setmesswronginformation(result.message)
          }
      },(error)=>{
        inableotpcontrol()
        setwronginformation(true)
        setmesswronginformation("Some Error is Found")
      })
  }

  function SendOTP()
  {
    if(checkAllInputfield())
    {
        setwronginformation(false)
        disabledinputfrom()
        setdisabled(true)
        disableotpcontrol()
        fetch(`${api}/Verification/otp-send`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
        })
      })
      .then(response=>response.json())
      .then((result)=>{
          if(result.statusCode==200)
          {
            alert(result.message)
            setotp((prevUserData) => ({
              ...prevUserData,
              showOtpfrom:true,
              showOtpButton:true,
              disabledOtpForm :false,
              loginbutton:false,
            }));
            setresent(false)
          }
          else 
          {
            inableinputfrom()
            setwronginformation(true);
            setmesswronginformation(result.message)
            setresent(false)
            setdisabled(false)
          }
      }).catch(()=>{
            inableinputfrom()
            setwronginformation(true);
            setmesswronginformation("we find some error Please Try Again Later")
            setresent(false)
            setdisabled(false)
      })
    }
    else
    {
      alert("Please Fill All the filed using The Description")
    }
  }

    return(
        <div className="authform">
            <h3 >Register</h3>

            <div className="">
                  <input type="text" value={name} onChange={(e)=>checkforname(e)} disabled={namecontrol.shownamefrom} className="inputreglog" placeholder="Enter Full Name"  required/>
                  {namecontrol.charcter && namecontrol.word && namecontrol.lenWord && namecontrol.len &&namecontrol.specialCharacters&&<HiCheckCircle style={{color:'green'}} />}
            </div>
            <div>
              <div className="authform">
                <label className="wrongtext">{namecontrol.charcter==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />} FullName Must not be Contain Number</label>
                <label className="wrongtext">{namecontrol.word==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  FullName Must be Minimum Two Word</label>
                <label className="wrongtext">{namecontrol.lenWord==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Length of Each word Greater then one</label>
                <label className="wrongtext">{namecontrol.len==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Length of FullName in Between 10 to 20</label>
                <label className="wrongtext">{namecontrol.specialCharacters==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Avoid Numbers and Special Characters</label>
              </div>
            </div>


            <div className="">
                <input type="email" value={email} onChange={(e)=>{checkforemailid(e.target.value)}} disabled={emailcontrol.showemailfrom} className="inputreglog" placeholder="Enter Email Id"  required/>
                {emailcontrol.wrongemail&&<HiCheckCircle style={{color:'green'}} />}
            </div>
            <div>
                <label className="wrongtext">{emailcontrol.wrongemail==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Email Address must be in valid formate with @ symbol</label>
            </div>


            <div className="">
                <input type="password" value={password} onChange={(e)=>{checkpassword(e.target.value)}} disabled={passwordcontrol.showpasswordfrom} className="inputreglog" placeholder="Enter Password"  required/>
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
                <input type="password" value={confirmpassword} onChange={(e)=>{checkconfirmpassword(e.target.value)}} disabled={confirmpasswordcontrol.showconfirmpasswordfrom} className="inputreglog" placeholder="Enter confirm Password"  required/>
                {confirmpasswordcontrol.isPasswordandconfirmPasswordIsSame&&<HiCheckCircle style={{color:'green'}} />}
            </div>

            <div>
              <div className="authform">
                <label className="wrongtext">{confirmpasswordcontrol.isPasswordandconfirmPasswordIsSame==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />} Password and Confirmpassword Must be Same</label>
              </div>
            </div>


            <div className=""> 
                <textarea type="text" value={address} onChange={(e)=>{checkaddress(e.target.value)}} disabled={addresscontorl.showaddressfrom} style={{height:'60px'}} className="inputreglog" placeholder="Enter Full Address"  required/>
                {addresscontorl.street && addresscontorl.city && addresscontorl.pin && addresscontorl.state && addresscontorl.specialCharacters &&addresscontorl.len && addresscontorl.mobile && addresscontorl.numaricNumer&&<HiCheckCircle style={{color:'green'}} />}
            </div>
            <div>
              <div className="authform">
                <label className="wrongtext">{addresscontorl.street==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />} Address must be a string containing only street name</label>
                <label className="wrongtext">{addresscontorl.city==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Address must be a string containing only city name</label>
                <label className="wrongtext">{addresscontorl.pin==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Address must be a string containing only pin name</label>
                <label className="wrongtext">{addresscontorl.state==false?<GoXCircleFill style={{color:'red'}} />: <HiCheckCircle style={{color:'green'}} />}Address must be a string containing only state name</label>
                <label className="wrongtext">{addresscontorl.mobile==false?<GoXCircleFill style={{color:'red'}} />: <HiCheckCircle style={{color:'green'}} />}Address must be a string containing only mobile Number</label>
                <label className="wrongtext">{addresscontorl.numaricNumer==false?<GoXCircleFill style={{color:'red'}} />: <HiCheckCircle style={{color:'green'}} />}Address must be contain at Max 22 numaric Number</label>
                <label className="wrongtext">{addresscontorl.specialCharacters==false?<GoXCircleFill style={{color:'red'}} />: <HiCheckCircle style={{color:'green'}} />}Address Maximum 9 Special charcter Accept That are <strong> ,-. </strong></label>
                <label className="wrongtext">{addresscontorl.len==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Length of Address in Between 45 to 100 Character</label>
              </div>
            </div>

            <div className="">
              {
                otp.showOtpfrom &&
                <>
                  <input type="number" value={otp.otpFromdata} onChange={(e)=>{checkotp(e.target.value)}} style={{width:"260px"}} disabled={otp.disabledOtpForm} className="inputreglog" placeholder="Enter OTP"  required/>
                  <button onClick={SendOTP} disabled={resent} className="btn btn-info btn-sm">Resent</button>
                </>
              }
            </div>
            {wronginformation&&<label className="wrongtext" style={{color:"red"}}><GoXCircleFill /> {messwronginformation}</label>}


            {otp.showOtpButton==true? <button className="btn btn-info btn-sm" disabled={otp.loginbutton}  onClick={OTPVerified}>Register</button>:
               <button className="btn btn-info btn-sm" disabled={disabled} onClick={SendOTP}>Send OTP</button>}
        </div>
    )
}

export default Register;
