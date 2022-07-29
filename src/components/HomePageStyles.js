import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
	url: {
    marginBottom: "5%",
		transitionDuration: "0.2s",
		textDecoration: "none",
		color: "white",
		backgroundColor: "#0C0",
    padding: "15px 30px",
		"&:hover": {
			transitionDuration: "0.2s",
			backgroundColor: "#3F3",
		},
	},
}));
