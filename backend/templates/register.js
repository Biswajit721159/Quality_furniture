const registerHtmlTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP for Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 36px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .message {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Verify Your Email
        </div>
        <div class="content">
            <p class="message">Thank you for registering with us. To complete your registration, please use the OTP below:</p>
            <div class="otp">${otp}</div>
            <p class="message">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
};
module.exports = { registerHtmlTemplate };
