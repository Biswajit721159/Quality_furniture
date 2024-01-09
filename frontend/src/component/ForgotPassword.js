import React,{useState} from "react"
import { GoXCircleFill } from "react-icons/go";
import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API
const ForgotPassword=()=>{
    const [email,setemail]=useState("")

    const [wronguser,setwronguser]=useState(false)
    const [errormess,seterrormess]=useState("")
    const [disabled,setdisabled]=useState(false)
    const [resent,setresent]=useState(false)

    const history=useNavigate()
    const [confirmpassword,setconfirmpassword]=useState("");
    const [password,setpassword]=useState("")
    const [address,setaddress]=useState("")
    
    const [otp,setotp]=useState({
        otp:"",
        showOtpfrom:false,
        otpFromdata:"",
        isvalidate:false,
        disabledbutton:false,
    })

    const [passwordcontrol,setpasswordcontrol]=useState({
        uppercase:false,
        lowercase:false,
        digit:false,
        specialCharacters:false,
        len:false,
        showpasswordfrom:false,
    })

    const [confirmpasswordcontrol,setconfirmpasswordcontrol]=useState({
        isPasswordandconfirmPasswordIsSame:false,
        showconfirmpasswordfrom:false,
    })

    const [emailcontrol,setemailcontrol]=useState({
        wrongemail:false,
    })


    
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
        setwronguser(false);
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

    //other part

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
      setwronguser(false);
      setconfirmpassword(data)
      checkconfirmpasswordIsEqualPassword(data,password)
    }
  
    //Email id 

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

    function OTPVerified()
    {
        setresent(true)
        setwronguser(false)
        setotp((prevUserData) => ({
            ...prevUserData,
            disabledOtpForm :true,
            loginbutton:true,
        }));
        if(otp.otpFromdata==0)
        {
            alert("Please Fill Input Form")
            return ;
        }
            fetch(`${api}/Verification/passwordSave`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    otp:otp.otpFromdata,
                    password:password
                })
            })
            .then(response=>response.json())
            .then((result)=>{
                if(result.statusCode==200)
                {
                    alert(result.message)
                    localStorage.setItem("user",JSON.stringify(result.data))
                    history('/Signin')
                }
                else{
                    setotp((prevUserData) => ({
                    ...prevUserData,
                    disabledOtpForm :false,
                    loginbutton:false,
                    }));
                    setresent(false)
                    setwronguser(true)
                    seterrormess(result.message)
                }
            },(error)=>{
            setotp((prevUserData) => ({
                ...prevUserData,
                disabledOtpForm :false,
                loginbutton:false,
            }));
                setresent(false)
                setwronguser(true)
                seterrormess("Some Error is Found")
            })
    }

    function disabledinputfrom(){
        setpasswordcontrol((prevUserData) => ({
        ...prevUserData,
        showpasswordfrom:true
        }));
        setemailcontrol((prevUserData) => ({
        ...prevUserData,
        showemailfrom:true
        }));
    }

    function inableinputfrom(){
        setpasswordcontrol((prevUserData) => ({
            ...prevUserData,
            showpasswordfrom:false
        }));
        setemailcontrol((prevUserData) => ({
            ...prevUserData,
            showemailfrom:false
        }));
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
        return (emailcontrol.wrongemail && passwordcontrol.uppercase && passwordcontrol.lowercase && passwordcontrol.digit && passwordcontrol.len &&passwordcontrol.specialCharacters&&
         confirmpasswordcontrol.isPasswordandconfirmPasswordIsSame)
          
    }

    function sendOTP()
    {
        setwronguser(false)
        disabledinputfrom()
        if(checkAllInputfield())
        {
            setresent(true)
            setdisabled(true)
            setotp((prevUserData) => ({
                ...prevUserData,
                disabledOtpForm :true,
                loginbutton:true,
            }));
            fetch(`${api}/Verification/ForgotPassword`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email
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
                else{
                    inableinputfrom()
                    setdisabled(false)
                    setwronguser(true)
                    seterrormess(result.message)
                }
            },(error)=>{
                inableinputfrom()
                setdisabled(false)
                setwronguser(true)
                seterrormess("We Find Some Error")
            })
        }
        else
        {
            alert("Please Fill All the filed using description")
        }
    }

    return(
        <div className="authform">
            <div className="">
                <input type="email" value={email} onChange={(e)=>{checkforemailid(e.target.value)}}  className="inputreglog" placeholder="Enter Email Id"  required/>
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

            <div>
            <div className="">
              {
                otp.showOtpfrom &&
                <>
                  <input type="number" value={otp.otpFromdata} onChange={(e)=>{checkotp(e.target.value)}} style={{width:"260px"}} disabled={otp.disabledOtpForm} className="inputreglog" placeholder="Enter OTP"  required/>
                  <button onClick={sendOTP} disabled={resent} className="btn btn-info btn-sm">Resent</button>
                </>
              }
            </div>
            </div>
            {wronguser?<label className="wrongtext" style={{color:"red"}}><GoXCircleFill/> {errormess}</label>:""}
            {otp.showOtpButton==true? <button className="btn btn-info btn-sm" disabled={otp.loginbutton}  onClick={OTPVerified}>Reset Password</button>:
            <button className="btn btn-info btn-sm" disabled={disabled} onClick={sendOTP}>Send OTP</button>}
        </div>
    )
}
export default ForgotPassword