import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
	return (
		<Backdrop sx={(theme) => ({ color: "#0a26f7", zIndex: theme.zIndex.drawer + 1 })} open={true}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
export default Loading;
