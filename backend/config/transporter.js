const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "bg5050525@gmail.com",
		pass: "vqxn zycm bovh xexf",
	},
});

module.exports = transporter;
