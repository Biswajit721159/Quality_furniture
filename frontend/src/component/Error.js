import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const NotFound = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-3">
			<Typography variant="h1" className="text-primary fw-bold mb-3">
				404
			</Typography>
			<Typography variant="h6" className="fs-4 text-secondary fw-semibold mb-3">
				Page Not Found!
			</Typography>
			<Typography className="text-muted my-3">
				Sorry, the page you are looking for doesn't exist.
			</Typography>
			<div className="fs-1 mb-4 mt-3">😕</div>
			<button onClick={handleGoHome} className="btn btn-primary btn-lg">
				Go to Home
			</button>
		</div>
	);
};

export default NotFound;
