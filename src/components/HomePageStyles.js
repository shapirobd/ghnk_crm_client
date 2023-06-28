import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
	url: {
    marginBottom: "5%",
		// transitionDuration: "0.03s",
		// transitionDelay: "0.02s",
		textDecoration: "none",
		color: "white",
		backgroundColor: "#3B3",
    padding: "15px 30px",
		"&:hover": {
			transitionDuration: "0.2s",
			backgroundColor: "#5C5",
		},
    borderRadius: "5px",
    fontWeight: 900
	},
	emptyList: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));
