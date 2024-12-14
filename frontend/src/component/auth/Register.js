import React, { useState, useEffect } from "react";
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	InputAdornment,
	Link as MuiLink,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	validateFullAddress,
	validateEmail,
	validateFullName,
	validatePassword,
	checkotp,
} from "../../helpers/fromValidationCheckers";
import { sendOTP, verifyOTP } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { OtpModalstyle } from "../../common/styles";
import { Modal, Backdrop, Fade } from "@mui/material";

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		address: "",
	});
	const navigate = useNavigate();
	const history = useNavigate();
	const user = useSelector((state) => state.user.user);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [resentLoading, setResentLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const [resendTimeout, setResendTimeout] = useState(0);
	const [open, setOpen] = useState(false);
	const [resendEnabled, setResendEnabled] = useState(true);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { fullName, email, password, confirmPassword, address } = formData;

		if (
			!validateFullName(fullName) ||
			!validateEmail(email) ||
			!validatePassword(password) ||
			!validateFullAddress(address)
		) {
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			setLoading(true);
			const response = await sendOTP(email);
			toast.success(response.message);
			handleOpen();
			setResendTimeout(60);
			setResendEnabled(false);
		} catch (e) {
			toast.warn(e?.message);
		} finally {
			setLoading(false);
		}
	};

	async function reSendOTP() {
		try {
			setResentLoading(true);
			const response = await sendOTP(formData.email);
			toast.success(response.message);
			handleOpen();
			setResendTimeout(60);
			setResendEnabled(false);
		} catch (error) {
			toast.warn(error?.message);
		} finally {
			setResentLoading(false);
		}
	}

	async function OTPVerified(e) {
		e.preventDefault();
		try {
			if (!checkotp(otp)) {
				return;
			}
			setSubmitLoading(true);
			const body = {
				...formData,
				otp: otp,
			};
			const response = await verifyOTP(body);
			toast.success(response.message);
			history("/Signin");
		} catch (error) {
			toast.warn(error?.message);
		} finally {
			setSubmitLoading(false);
		}
	}

	useEffect(() => {
		if (resendTimeout > 0) {
			const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			setResendEnabled(true);
		}
	}, [resendTimeout]);

	return (
		<Container
			maxWidth="sm"
			className="d-flex align-items-center justify-content-center min-vh-100 mt-3"
		>
			<Box
				elevation={6}
				sx={{
					maxWidth: "420px",
					padding: 4,
					width: "100%",
					borderRadius: 3,
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
					Welcome Back
				</Typography>
				<Typography variant="body2" align="center" color="textSecondary" mb={2}>
					Please Register in to your account to continue.
				</Typography>

				<form onSubmit={handleSubmit}>
					<Box mb={3}>
						<TextField
							label="Full Name"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PersonIcon />
									</InputAdornment>
								),
							}}
							spellCheck={false}
						/>
					</Box>
					<Box mb={3}>
						<TextField
							label="Email"
							name="email"
							value={formData.email}
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
							spellCheck={false}
						/>
					</Box>
					<Box mb={3}>
						<TextField
							label="Password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							spellCheck={false}
						/>
					</Box>
					<Box mb={3}>
						<TextField
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							spellCheck={false}
						/>
					</Box>
					<Box mb={3}>
						<TextField
							label="Full Address"
							name="address"
							value={formData.address}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LocationOnIcon />
									</InputAdornment>
								),
							}}
							spellCheck={false}
						/>
					</Box>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						size="large"
						disabled={loading}
					>
						Register
					</Button>
				</form>

				<Typography variant="body2" color="textSecondary" align="center" mt={3}>
					Already have an account?{" "}
					<MuiLink component={Link} to="/Signin" underline="hover" color="primary">
						Login here
					</MuiLink>
				</Typography>
			</Box>

			<FullpageLoader open={loading} />

			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={OtpModalstyle}>
						<Typography variant="h6" component="h2">
							Verify OTP
						</Typography>
						<form onSubmit={OTPVerified}>
							<TextField
								fullWidth
								margin="normal"
								label="OTP"
								variant="outlined"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								type="Number"
							/>
							<div>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									sx={{ mt: 2 }}
									size="small"
									disabled={submitLoading | resentLoading}
									style={{ textTransform: "none" }}
									onClick={OTPVerified}
								>
									{submitLoading ? "Submitting" : "Submit"}
								</Button>
								{!resendEnabled && !loading ? (
									<p className="mt-2" style={{ color: "green" }}>
										Resend OTP in <strong>{resendTimeout}</strong> seconds
									</p>
								) : (
									<Button
										variant="contained"
										color="secondary"
										sx={{ mt: 2 }}
										onClick={reSendOTP}
										disabled={submitLoading | resentLoading}
										size="small"
										style={{ textTransform: "none", marginLeft: "10px" }}
									>
										{resentLoading ? "Resending" : "Resend"}
									</Button>
								)}
							</div>
						</form>
					</Box>
				</Fade>
			</Modal>
		</Container>
	);
};

export default Register;
