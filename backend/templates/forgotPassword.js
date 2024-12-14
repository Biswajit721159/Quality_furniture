const forgetHtmltemplate = (resetUrl) => {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <p style="color: #666666; margin-bottom: 20px;">Hi there,</p>
        <p style="color: #666666; margin-bottom: 20px;">
            We received a request to reset the password for your account. Click the button below to reset your password. 
            If you did not request a password reset, please ignore this email or contact support if you have questions.
        </p>
        <div style="text-align: center; margin-bottom: 20px;">
            <a href="${resetUrl}" 
               style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 4px;">
               Reset Your Password
            </a>
        </div>
        <p style="color: #666666; margin-bottom: 20px;">
            If you have any issues, feel free to reach out to our support team.
        </p>
        <p style="color: #666666; margin-top: 20px;">
            Thank you,<br>
            The Support Team
        </p>
    </div>
</body>
</html>`;
};

module.exports = forgetHtmltemplate;
