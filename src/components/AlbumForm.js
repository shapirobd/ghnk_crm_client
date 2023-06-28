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
import { useDispatch } from 'react-redux';
import { addAlbum } from '../actionCreators/postActionCreators'
import { API_URL } from "../config";

export default function AlbumForm({ user, newAlbumValues, setNewAlbumValues }) {
	// const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [missingFields, setMissingFields] = useState([]);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleAlbumChange = (e, key) => {
		let newValue = e.target.value;
		setNewAlbumValues({ ...newAlbumValues, [key]: newValue });
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (newAlbumValues.name === "") emptyFields.push("name");
		if (newAlbumValues.url === "") emptyFields.push("url");

		return emptyFields;
	};

	async function submitAlbum(data) {
		let isCodePresent = data.url.indexOf("album/") > -1;
		if (!isCodePresent) {
			return;
		}

		let code = data.url.substring(
			data.url.indexOf("album/") + 6,
			data.url.length
		);

		// const resp = await axios.post(API_URL + "/albums", {
		// 	...data,
		// 	code,
		// 	token: user.token,
		// });

		// if (resp.data.affectedRows) {
		// 	setSubmitSuccess(true);
		// }

		dispatch(addAlbum(data, code, user, setSubmitSuccess))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...newAlbumValues };
			submitAlbum(data);
		}

		console.log("missingFieldsFound: ", missingFieldsFound);
		return;
	};

	useEffect(() => {
		if (submitSuccess) {
			console.log("Success!!");
			jQuery(".App-header").append(`
        <div class="success-message transparent">
          Album Submitted
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
				<InputLabel htmlFor="name">Album Name</InputLabel>
				<OutlinedInput
					id="name"
					// type="time"
					value={newAlbumValues.name}
					onChange={(e) => handleAlbumChange(e, "name")}
					label="Album Name"
				/>
				{missingFields.includes("name") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Album Name is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="url">URL</InputLabel>
				<OutlinedInput
					id="url"
					// type="date"
					value={newAlbumValues.url}
					onChange={(e) => handleAlbumChange(e, "url")}
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
