const { generateRandomToken } = require("../common/userAuth");
const user = require("../models/user_models");
const UserValidation = require("../models/userValidation_models");
const { sendEmailForForgotPassword, sendEmailForRegister } = require("../service/user.service");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	try {
		const { email, password, fullName, address } = req.body;
		if (!email || !password || !fullName || !address) {
			return res.status(404).json({ message: "some field are missing" });
		}
		const existedUser = await user.findOne({ email });
		if (existedUser) {
			return res.status(409).json({ message: "Email already exit" });
		}
		const newUser = await user.create({ email, password, name: fullName, address });
		if (!newUser) {
			return res.status(500).json({ message: "Something went wrong" });
		}
		return res.status(201).json({ message: "User registered Successfully" });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password: inputPassword, rememberMe = false } = req.body;

		if (!email || !inputPassword) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const existingUser = await user.findOne({ email }).select("-createdAt -updatedAt -__v");
		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await existingUser.isPasswordCorrect(inputPassword);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid user credentials" });
		}

		const token = existingUser.generateAccessToken(existingUser, rememberMe);

		const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined; // 30 days or session-based
		res.cookie("userlog", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge,
		});

		// Exclude sensitive fields
		const { password, passwordResetToken, ...userDetails } = existingUser.toObject();

		res.status(200).json({
			message: "User logged in successfully",
			data: {
				user: userDetails,
				accessToken: token,
			},
		});
	} catch (e) {
		console.error("Login error:", e);
		res.status(500).json({ message: "An error occurred while logging in" });
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email, baseUrl } = req.body;
		const exitUser = await user.findOne({ email });
		if (!exitUser) {
			return res.status(400).json({ message: "user not found" });
		}
		const token = generateRandomToken(email);
		exitUser.passwordResetToken = token;
		const resetUrl = baseUrl + "/PasswordReset/" + token;
		await sendEmailForForgotPassword(email, resetUrl);
		await exitUser.save();
		res.status(200).json({ message: "please check to email" });
	} catch (e) {
		res.status(500).json({ message: e?.message });
	}
};

const getResetData = async (req, res) => {
	try {
		const { token } = req.params;
		const existingUser = await user
			.findOne({ passwordResetToken: token })
			.select("-password -role -passwordResetToken");
		if (!existingUser) {
			return res.status(400).json({ message: "This link is expired" });
		}
		return res.status(200).json({ message: "user found", data: existingUser });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const savePassword = async (req, res) => {
	try {
		const { email, password, token } = req.body;
		const existedUser = await user.findOne({ email });
		if (!existedUser) {
			return res.status(400).json({ message: "user not found" });
		}
		if (existedUser.passwordResetToken === token) {
			existedUser.passwordResetToken = "";
			existedUser.password = password;
			await existedUser.save();
			return res.status(200).json({ message: "password save successfully" });
		} else {
			return res.status().json({ message: "token expired" });
		}
	} catch (e) {
		res.status(500).json({ message: e?.message });
	}
};

const sendOTP = async (req, res) => {
	try {
		const { email } = req.body;
		const existedUser = await user.findOne({ email: email });
		if (existedUser) {
			return res.status(400).json({ message: "user already exit" });
		}
		const otp = Math.floor(100000 + Math.random() * 900000);
		const passwordHash = await bcrypt.hash(otp.toString(), 10);
		const isPresent = await UserValidation.findOne({ email: email });
		if (isPresent) {
			const passwordHash = await bcrypt.hash(otp.toString(), 10);
			await UserValidation.updateOne({ email: email }, { $set: { OTP: passwordHash } });
		} else {
			await UserValidation.create({ email: email, OTP: passwordHash });
		}
		return await sendEmailForRegister(email, otp, res);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "server down" });
	}
};

module.exports = {
	register,
	login,
	forgotPassword,
	getResetData,
	savePassword,
	sendOTP,
};
