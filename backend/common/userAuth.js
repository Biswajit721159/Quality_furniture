const crypto = require("crypto");

const generateRandomToken = (email) => {
	const randomToken = crypto.randomBytes(10).toString("hex");
	const combinedString = `${email}:${randomToken}`;
	const encodedToken = Buffer.from(combinedString).toString("base64");
	return encodedToken;
};
module.exports = {
	generateRandomToken,
};
