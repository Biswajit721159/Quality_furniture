let { ApiResponse } = require("../utils/ApiResponse.js");
let jwt = require("jsonwebtoken");

function verifytoken(req, res, next) {
  let jwtKey = process.env.ACCESS_TOKEN_SECRET;
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decodedToken) {
        req.user = decodedToken; 
        next();
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
