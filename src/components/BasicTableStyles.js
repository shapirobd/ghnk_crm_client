import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
	url: {
    transitionDuration: "0.2s",
		textDecoration: "none",
    color: "#00F",
    "&:hover": {
      transitionDuration: "0.2s",
      color: "#0B5"
    }
	},
}));
