let { ApiResponse } = require("../utils/ApiResponse.js");
const AdminUser = require("../models/AdminUser_models.js");
const mongoose = require("mongoose");

let Register=async(req,res)=>{
    const { email, first_name,last_name, password } = req.body;
  if (
    email == undefined ||
    first_name == undefined ||
    last_name == undefined ||
    password == undefined
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const existedUser = await AdminUser.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, `User already exists`));
  }

  const user = await AdminUser.create({
    email,
    first_name,
    last_name,
    password,
  });

  const createdUser = await AdminUser.findById(user._id).select("-password");

  if (!createdUser) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while registering the user"
        )
      );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
}

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await AdminUser.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiResponse(500, "Something went wrong while generating referesh and access token")
    }
}

let Login=async(req,res)=>{
    const { email, password } = req.body;
    if (!password && !email) {
        res
        .status(400)
        .json(new ApiResponse(400, null, "Password or email is required"));
    }

    const user = await AdminUser.findOne({
        $or: [{ email }],
    });

    if (!user) {
        res.status(404).json(new ApiResponse(404, null, "User does not exist"));
        return;
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
         res.status(401).json(new ApiResponse(401,null,"Invalid user credentials"))
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await AdminUser.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
}

module.exports={Register,Login}