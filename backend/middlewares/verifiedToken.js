let { ApiResponse } = require("../utils/ApiResponse.js");
let AdminUser = require('../models/AdminUser_models.js')
let User = require('../models/user_models.js')

let jwt = require("jsonwebtoken");

async function verifytoken(req, res, next) {
  let jwtKey = process.env.ACCESS_TOKEN_SECRET;
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decodedToken) {
        req.user = decodedToken;
        let email = decodedToken?.email
        let user = await User.findOne({ email: email })
        let Adminuser = await AdminUser.findOne({ email: email })
        if (Adminuser && user === null) {
          next()
        }
        else if (Adminuser && user?.isBlackListUser) {
          next()
        }
        else if (user?.isBlackListUser) {
          return res.status(498).json(new ApiResponse(498, null, "This user is a black list user."))
        } else {
          next();
        }
      } else {
        return res.status(498).json(new ApiResponse(498, null, "Invalid Token"));
      }
    } catch {
      return res.status(498).json(new ApiResponse(498, null, "Invalid Token"));
    }
  } else {
    return res.status(498).json(new ApiResponse(498, null, "Invalid Token"));
  }
}

module.exports = verifytoken;
