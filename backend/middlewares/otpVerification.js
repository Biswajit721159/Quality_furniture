const User = require("../models/user_models");

const verifyOTP = async (req, res, next) => {
	try {
		const { email, otp } = req.body;
		if (!email || !otp) {
			res.status(404).json({ message: "Both Email and Otp required" });
		}
		let user = await User.findOne({ email: email });
		if (user) {
			const updatedAt = user.otpSaveTime;
			if (!updatedAt || Date.now() - updatedAt.getTime() > 10 * 60 * 1000) {
				return res.status(403).json({ message: "OTP expired or invalid" });
			}
			const isOTPCorrect = await bcrypt.compare(otp.toString(), user.OTP);
			user.OTP = "";
			user.otpSaveTime = "";
			await user.save();
			if (isOTPCorrect) {
				next();
			} else {
				return res.status(401).json({ message: "Invalid OTP" });
			}
		} else {
			return res.status(404).json({ message: "Please Try Again Later" });
		}
	} catch (e) {
		return res.status(500).json({ message: "server down" });
	}
};

module.exports = {
	verifyOTP,
};
