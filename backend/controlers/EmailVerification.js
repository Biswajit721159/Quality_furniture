const nodemailer = require("nodemailer");
const User = require("../models/user_models.js");
let { ApiResponse } = require("../utils/ApiResponse.js");
let userValidation=require('../models/userValidation_models.js')
const bcrypt = require("bcrypt");

let Verification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Email is required"));
    }

    let user = await User.findOne({ email: email });
    if (user == null) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bg5050525@gmail.com",
          pass: "vqxn zycm bovh xexf",
        },
      });
      const mailOptions = {
        from: "bg5050525@gmail.com",
        to: email,
        subject: "Your OTP for Verification",
        text: `Your OTP is: ${otp}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json(new ApiResponse(500, null, "Failed to send OTP via email"));
        } else {
          return checkMailIsPresent(otp,email,res);
        }
      });
    } else {
      return res
        .status(409)
        .json(new ApiResponse(409, null, `Email already exists`));
    }
  } catch {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, "Some Error is Found Please Try Again Later")
      );
  }
};

let LoginVerification = async (req, res) => {
  try {
    const { email ,password} = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Both Email and Password is required"));
    }

    let user = await User.findOne({ email: email });
    if(!user){
      return res.status(404).json(new ApiResponse(404, null, "User does not exist"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid user credentials"));
    }
    else {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bg5050525@gmail.com",
          pass: "vqxn zycm bovh xexf",
        },
      });
      const mailOptions = {
        from: "bg5050525@gmail.com",
        to: email,
        subject: "Your OTP for Verification",
        text: `Your OTP is: ${otp}. It is valid for 10 minutes only`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json(new ApiResponse(500, null, "Failed to send OTP via email"));
        } else {
          return checkMailIsPresent(otp,email,res);
        }
      });
    } 
  } catch {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, "Some Error is Found Please Try Again Later")
      );
  }
};


let checkMailIsPresent=async(otp,email,res)=>{
  try{
    let user=await userValidation.findOne({email:email});
    if(user){
      const passwordHash = await bcrypt.hash(otp.toString(), 10);
      const result = await userValidation.updateOne(
        { email: email },
        { $set: { OTP: passwordHash } }
      );
      if (result.modifiedCount === 1) {
        return res.status(200).json(new ApiResponse(200,null, "OTP sent successfully"));
      } else {
        return res.status(200).json(new ApiResponse(200,null, `No user found with email: ${email}`));
      }
    }
    else{
      let result=await userValidation.create({email:email,OTP:otp})
      if(result){
        return res.status(200).json(new ApiResponse(200,null, "OTP sent successfully"));
      }else{
        res.status(500).json(new ApiResponse(500, null, "Some Error is Found Please Try Again Later"));
      }
    }
  }
  catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found Please Try Again Later"));
  }
}

let VerifyOTP=async(req,res)=>{


  try {
    const { email ,otp} = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Both Email and Password is required"));
    }
    else{
      let user=await userValidation.findOne({email:email});
      if(user){
        const updatedAt = user.updatedAt;
        if (!updatedAt || (Date.now() - updatedAt.getTime()) > 10 * 60 * 1000) {
          return res.status(403).json(new ApiResponse(403, null, "OTP expired or invalid"));
        }
        const isOTPCorrect  = await bcrypt.compare(otp.toString(), user.OTP);
        if (isOTPCorrect) {
          let data=await userValidation.deleteOne({ email });
          if(data) return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully")); 
          else {
            return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully")); 
          }
        } else {
          return res.status(401).json(new ApiResponse(401, null, "Invalid OTP"));
        }
      }
      else{
        return res.status(404).json(new ApiResponse(404, null, "user Not Found"));
      }
    }
  }catch {
     return res
      .status(500)
      .json(
        new ApiResponse(500, null, "Some Error is Found Please Try Again Later")
      );
    }
  

}


module.exports = { Verification,LoginVerification ,VerifyOTP};
