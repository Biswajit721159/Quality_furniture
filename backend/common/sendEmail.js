const transporter = require("../config/transporter");

const createMailOption = (email, subject, text, HtmlTemplates) => {
	try {
		const mailOptions = {
			from: "bg5050525@gmail.com",
			to: email,
			subject: subject,
			text: text,
			html: HtmlTemplates,
		};
		return mailOptions;
	} catch (e) {
		throw new Error(e?.message);
	}
};

const sendMail = async (mailOptions) => {
	try {
		await transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw new Error("Failed to send email");
			} else {
				console.log("Email successfully send to user");
			}
		});
	} catch (e) {
		throw new Error(e?.message);
	}
};

module.exports = { createMailOption, sendMail };
