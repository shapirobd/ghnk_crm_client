import React, { useState, useEffect } from "react";
import {
	Box,
	InputLabel,
	FormControl,
	OutlinedInput,
	Button,
	Typography,
} from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useStyles } from "./ShowsFormStyles";
// import Theme from "./ShowsFormTheme";
import axios from "axios";
import jQuery from "jquery";
import { useDispatch } from "react-redux";
import { addSingle } from '../actionCreators/postActionCreators';
import { API_URL } from "../config";

export default function SingleForm({
	user,
	newSingleValues,
	setNewSingleValues
}) {
	// const user = useSelector((state) => state.user);
	// const theme = createTheme(Theme);
	// const classes = useStyles();
	const dispatch = useDispatch();
	const [missingFields, setMissingFields] = useState([]);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleSingleChange = (e, key) => {
		let newValue = e.target.value;
		setNewSingleValues({ ...newSingleValues, [key]: newValue });
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (newSingleValues.name === "") emptyFields.push("name");
		if (newSingleValues.url === "") emptyFields.push("url");

		return emptyFields;
	};

	async function submitSingle(data) {
		let isCodePresent = data.url.indexOf("track/") > -1;
		if (!isCodePresent) {
			return;
		}

		let code = data.url.substring(
			data.url.indexOf("track/") + 6,
			data.url.indexOf("?")
		);

		// const resp = await axios.post(API_URL + "/singles", {
		// 	...data,
		// 	code,
		// 	token: user.token,
		// });

		// if (resp.data.affectedRows) {
		// 	setSubmitSuccess(true);
		// }
		dispatch(addSingle(data, code, user, setSubmitSuccess));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...newSingleValues };
			submitSingle(data);
		}

		console.log("missingFieldsFound: ", missingFieldsFound);
		return;
	};

	useEffect(() => {
		if (submitSuccess) {
			console.log("Success!!");
			jQuery(".App-header").append(`
        <div class="success-message transparent">
          Single Submitted
        </div>`);
			jQuery(".success-message").removeClass("transparent");
			jQuery(".success-message").addClass("not-transparent");
			setTimeout(() => {
				jQuery(".success-message").removeClass("not-transparent");
				jQuery(".success-message").addClass("transparent");
			}, 3000);
			setSubmitSuccess(false);
		}
	}, [submitSuccess]);

	return (
		// <ThemeProvider theme={theme}>
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="name">Single Name</InputLabel>
				<OutlinedInput
					id="name"
					// type="time"
					value={newSingleValues.name}
					onChange={(e) => handleSingleChange(e, "name")}
					label="Single Name"
				/>
				{missingFields.includes("name") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Single Name is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="url">URL</InputLabel>
				<OutlinedInput
					id="url"
					// type="date"
					value={newSingleValues.url}
					onChange={(e) => handleSingleChange(e, "url")}
					label="URL"
				/>
				{missingFields.includes("url") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						URL is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }}>
				<Button
					onClick={(e) => handleSubmit(e)}
					sx={{
						backgroundColor: "#1976D2",
						color: "white",
						"&:hover": { backgroundColor: "#49A6FF" },
					}}
					className="ignoreInvert"
				>
					SUBMIT
				</Button>
			</FormControl>
		</Box>
		// </ThemeProvider>
	);
}
