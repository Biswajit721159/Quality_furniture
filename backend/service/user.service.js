const forgetHtmltemplate = require("../templates/forgotPassword");
const { createMailOption } = require("../common/sendEmail");
const { sendMail } = require("../common/sendEmail");
const { registerHtmlTemplate } = require("../templates/register");

const sendEmailForForgotPassword = async (email, resetUrl) => {
	try {
		const htmlTemplate = forgetHtmltemplate(resetUrl);
		const subject = "Password Reset Request";
		const text = `Hi, We received a request to reset the password for your account.`;
		const mailOption = createMailOption(email, subject, text, htmlTemplate);
		await sendMail(mailOption);
	} catch (e) {
		throw new Error(e?.message);
	}
};

const sendEmailForRegister = async (email, otp, res) => {
	try {
		const htmlTemplate = registerHtmlTemplate(otp);
		const subject = "Registration OTP";
		const text = `Hi, \n\nThank you for registering with us. Please use the following OTP to complete your registration: ${otp}. \n\nThis OTP is valid for the next 10 minutes. Do not share it with anyone.\n\nRegards,\nQUFurniture`;
		const mailOption = createMailOption(email, subject, text, htmlTemplate);
		await sendMail(mailOption);
		return res.status(200).json({ message: "OTP has been successfully sent to your email." });
	} catch (e) {
		throw new Error(e?.message);
	}
};

module.exports = {
	sendEmailForForgotPassword,
	sendEmailForRegister,
};
