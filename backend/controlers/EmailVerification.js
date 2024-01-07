const nodemailer = require("nodemailer");
const User = require("../models/user_models.js");
let { ApiResponse } = require("../utils/ApiResponse.js");

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
          return res
            .status(200)
            .json(new ApiResponse(200, otp, "OTP sent successfully"));
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

module.exports = { Verification };
