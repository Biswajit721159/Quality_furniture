let Router = require("express");
let {
  Verification
} = require("../controlers/EmailVerification");

let verifytoken = require('../middlewares/verifiedToken')

const router = Router();

router.route("/otp-send").post(Verification);

// router.route("/logout").post(verifyJWT,  logoutUser)

module.exports = router;
