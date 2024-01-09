let Router = require("express");
let {
  VerificationRegister,
  LoginVerification,
  VerifyOTP,
  ForgotPassword
} = require("../controlers/EmailVerification");

let verifytoken = require('../middlewares/verifiedToken')

const router = Router();

router.route("/otp-send").post(VerificationRegister);
router.route('/Login/otp-send').post(LoginVerification)
router.route('/VerifyOTP').post(VerifyOTP)
router.route('/ForgotPassword').post(ForgotPassword)
// router.route("/logout").post(verifyJWT,  logoutUser)

module.exports = router;
