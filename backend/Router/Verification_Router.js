let Router = require("express");
let {
  Verification,
  LoginVerification,
  VerifyOTP
} = require("../controlers/EmailVerification");

let verifytoken = require('../middlewares/verifiedToken')

const router = Router();

router.route("/otp-send").post(Verification);
router.route('/Login/otp-send').post(LoginVerification)
router.route('/VerifyOTP').post(VerifyOTP)
// router.route("/logout").post(verifyJWT,  logoutUser)

module.exports = router;
