import React, { useEffect, useState } from "react";
import {
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	Typography,
	Box,
	Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helpers/fromValidationCheckers";
import { toast } from "react-toastify";
import { login } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import { useDispatch, useSelector } from "react-redux";
import { usermethod } from "../../redux/UserSlice";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = formData;
		if (!validateEmail(email)) {
			toast.error("Invalid Email");
			return;
		}
		if (!validatePassword(password)) {
			toast.error("Invalid Password");
			return;
		}
		try {
			setLoading(true);
			const response = await login(formData);
			dispatch(usermethod.Add_User(response.data));
			navigate(-1);
			toast.success(response?.message);
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
				className="shadow-lg p-4"
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
					Welcome Back
				</Typography>
				<Typography variant="body2" align="center" color="textSecondary" mb={2}>
					Please log in to your account to continue.
				</Typography>

				<form onSubmit={handleSubmit}>
					<Box mb={3}>
						<TextField
							label="Email Address"
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
						/>
					</Box>
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
						<FormControlLabel
							control={
								<Checkbox
									name="rememberMe"
									checked={formData.rememberMe}
									onChange={handleChange}
									color="primary"
								/>
							}
							label="Remember Me"
						/>
						<Link
							to="/ForgotPassword"
							style={{ fontSize: "14px", color: "#1976d2", textDecoration: "none" }}
						>
							Forgot Password?
						</Link>
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
					>
						Login
					</Button>
				</form>
				<Divider sx={{ my: 3 }} />

				<Typography variant="body2" align="center">
					Don't have an account?{" "}
					<Link
						to="/Register"
						style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}
					>
						Register here
					</Link>
				</Typography>
			</Box>
			<FullpageLoader open={loading} />
		</Box>
	);
};

export default Login;
