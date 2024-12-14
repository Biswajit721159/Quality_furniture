import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const FullpageLoader = ({ open }) => {
	return (
		<Backdrop sx={(theme) => ({ color: "blue", zIndex: theme.zIndex.drawer + 1 })} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
export default FullpageLoader;