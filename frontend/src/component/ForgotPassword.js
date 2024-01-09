import React,{useState} from "react"
import { GoXCircleFill } from "react-icons/go";
import { HiCheckCircle } from "react-icons/hi";
const ForgotPassword=()=>{
    const [email,setemail]=useState("")
    const [wronguser,setwronguser]=useState(false)
    
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

    return(
        <div className="authform">
            <div className="">
                    <input type="email" value={email} onChange={(e)=>{checkforemailid(e.target.value)}}  className="inputreglog" placeholder="Enter Email Id"  required/>
                    {emailcontrol.wrongemail&&<HiCheckCircle style={{color:'green'}} />}
            </div>
            <div>
                <label className="wrongtext">{emailcontrol.wrongemail==false?<GoXCircleFill style={{color:'red'}} />:<HiCheckCircle style={{color:'green'}} />}  Email Address must be in valid formate with @ symbol</label>
            </div>
        </div>
    )
}
export default ForgotPassword