import React, { useState } from "react";
import { TextField, Button, InputAdornment, Typography, Box, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../helpers/fromValidationCheckers";
import { toast } from "react-toastify";
import FullpageLoader from "../../common/FullpageLoader";
import { forgotPassword } from "../../utility/userApi";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			toast.error("Invalid Email");
			return;
		}
		try {
			setLoading(true);
			const baseUrl = `${window.location.protocol}//${window.location.host}`;
			const response = await forgotPassword({ email, baseUrl });
			toast.success(response?.message);
			navigate("/Signin");
		} catch (e) {
			toast.warn(e?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			className="d-flex justify-content-center align-items-center vh-100"
			sx={{
				padding: "20px",
			}}
		>
			<Box
				className="shadow-lg p-5"
				sx={{
					maxWidth: "420px",
					width: "100%",
					borderRadius: "12px",
					backgroundColor: "#fff",
				}}
			>
				<Typography
					variant="h5"
					component="h1"
					align="center"
					fontWeight="bold"
					color="primary"
					gutterBottom
				>
					Forgot Password
				</Typography>
				<Typography variant="body2" align="center" color="textSecondary" mb={2}>
					Enter your email to receive a password reset link.
				</Typography>

				<form onSubmit={handleSubmit}>
					<Box mb={3}>
						<TextField
							label="Email Address"
							name="email"
							value={email}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon />
									</InputAdornment>
								),
							}}
						/>
					</Box>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{
							backgroundColor: "#1976d2",
							padding: "10px 20px",
							fontSize: "16px",
							"&:hover": { backgroundColor: "#1565c0" },
						}}
						disabled={loading}
						size="small"
					>
						Send Reset Link
					</Button>
				</form>

				<Divider sx={{ my: 3 }} />

				<Typography variant="body2" align="center">
					Back to{" "}
					<Link
						to="/Signin"
						style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}
					>
						Login
					</Link>
				</Typography>
			</Box>
			<FullpageLoader open={loading} />
		</Box>
	);
};

export default ForgotPassword;
