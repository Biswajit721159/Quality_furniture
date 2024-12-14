const Router = require("express");
const router = Router();
const {
	login,
	register,
	forgotPassword,
	getResetData,
	savePassword,
	sendOTP,
} = require("../controlers/authUserControllers");
const { verifyOTP } = require("../middlewares/otpVerification");

router.route("/login").post(login);
router.route("/register").post(verifyOTP, register);
router.route("/forgotPassword").post(forgotPassword);
router.route("/getResetData/:token").get(getResetData);
router.route("/savePassword").post(savePassword);
router.route("/sendOTP").post(sendOTP);

module.exports = router;
