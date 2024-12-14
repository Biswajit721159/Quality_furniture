import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment, Container, Grid, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { checkTokenData, savePassword } from "../../utility/userApi";
import FullpageLoader from "../../common/FullpageLoader";
import { validatePassword } from "../../helpers/fromValidationCheckers";

const PasswordReset = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [user, setUser] = useState();

	// Fetch the token data
	const fetchTokenData = async () => {
		try {
			setLoading(true);
			const response = await checkTokenData(token);
			setUser(response.data);
		} catch (e) {
			toast.warn(e?.message);
			navigate("/404");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTokenData();
	}, []);

	// Form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validatePassword(password)) {
			toast.error("Invalid Password");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Password and confirm Password are not same");
			return;
		}
		try {
			setLoading(true);
			const response = await savePassword({ email: user.email, password, token });
			toast.success(response.message);
			navigate("/Signin");
		} catch (e) {
			toast.warn(e.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container
			maxWidth="sm"
			className="d-flex justify-content-center align-items-center min-vh-100 mt-3"
		>
			<Box
				className="card shadow-lg p-20 w-100"
				elevation={6}
				sx={{
					maxWidth: "420px",
					padding: 4,
					width: "100%",
					borderRadius: 3,
					backgroundColor: "#fff",
				}}
			>
				<h5 className="text-center text-primary mb-4">Reset Your Password</h5>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="New Password"
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
						</Grid>

						<Grid item xs={12}>
							<TextField
								label="Confirm Password"
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
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
						</Grid>

						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								sx={{
									backgroundColor: "#3b82f6",
									"&:hover": { backgroundColor: "#2563eb" },
								}}
							>
								Reset Password
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
			<FullpageLoader open={loading} />
		</Container>
	);
};

export default PasswordReset;
