let User = require("../models/user_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");

let register = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (
    name == undefined ||
    email == undefined ||
    password == undefined ||
    address == undefined
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, `User already exists`));
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
  });

  const createdUser = await User.findById(user._id).select("-password");

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
};

const generateAccessAndRefereshTokens = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while generating referesh and access token"
        )
      );
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password && !email) {
    res
      .status(400)
      .json(new ApiResponse(400, null, "Password or email is required"));
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    res.status(404).json(new ApiResponse(404, null, "User does not exist"));
    return;
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid user credentials"));
    return;
  }

  const accessToken = await generateAccessAndRefereshTokens(user._id, res);
  const loggedInUser = await User.findById(user._id).select(["-password", "-updatedAt", "-createdAt", "-__v"]);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
};

const getinfromationByEmail = async (req, res) => {
  try {
    let result = await User.find({ email: req.params.email });
    if (result.length) {
      res.status(201).json(new ApiResponse(201, true, "success"));
    } else {
      res.status(404).json(new ApiResponse(404, null, "User does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

const getinfromationById = async (req, res) => {
  try {
    let result = await User.findOne({
      _id: new mongoose.mongo.BSON.ObjectId(req.params._id),
    }).select("-password");
    if (result) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(404).json(new ApiResponse(404, null, "User does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

const updateNameAddress = async (req, res) => {
  try {
    let result = await User.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
        },
      }
    );
    if (result.acknowledged) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let countNumberUser = async (req, res) => {
  try {
    const result = await User.countDocuments({});
    res.status(201).json(new ApiResponse(201, result, "success"));
  }
  catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let getAlluser = async (req, res) => {
  try {
    let LowerLimit = req.params.LowerLimit;
    let HighLimit = req.params.HighLimit;
    let Limit = HighLimit - LowerLimit;
    let result = await User.find({}).select("-password").skip(LowerLimit).limit(Limit + 1).exec();
    let hasNextPage = result.length > Limit;
    let actualResult = hasNextPage ? result.slice(0, Limit) : result;
    let hasPrevPage = LowerLimit > 0;
    let pagination = {
      'prev': hasPrevPage,
      'next': hasNextPage,
    }
    if (actualResult.length) actualResult.push(pagination)
    if (actualResult) {
      res.status(201).json(new ApiResponse(201, actualResult, "success"));
    }
    else {
      res.status(404).json(new ApiResponse(404, null, "Review does not exist"));
    }
  }
  catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

module.exports = {
  register,
  loginUser,
  getinfromationByEmail,
  getinfromationById,
  updateNameAddress,
  countNumberUser,
  getAlluser,
};
