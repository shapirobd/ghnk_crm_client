import React, { useState, useEffect } from "react";
import {
	Box,
	InputLabel,
	FormControl,
	OutlinedInput,
	Select,
	MenuItem,
	Button,
	Typography,
} from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useStyles } from "./ShowsFormStyles";
// import Theme from "./ShowsFormTheme";
import axios from "axios";
import jQuery from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSong } from "../actionCreators/patchActionCreators";

export default function EditSongForm({user, songID}) {
  const navigate = useNavigate();
	const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);

  const initialSongData = songs.filter((song) => song.id == songID)[0];

  const [songValues, setSongValues] = useState({
		name: initialSongData.name,
		url: initialSongData.url,
		category: initialSongData.category || "Single",
	});

  const [missingFields, setMissingFields] = useState([]);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleSongChange = (e, key) => {
		let newValue = e.target.value;
		setSongValues({ ...songValues, [key]: newValue });
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (songValues.name === "") emptyFields.push("name");
		if (songValues.url === "") emptyFields.push("url");

		return emptyFields;
	};

	async function submitSong(data) {
		let isCodePresent = data.url.indexOf("track/") > -1;
		if (!isCodePresent) {
			return;
		}

		let code = data.url.substring(
			data.url.indexOf("track/") + 6,
			data.url.indexOf("?")
		);

		dispatch(updateSong(songID, data, code, user, setSubmitSuccess));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...songValues };
			submitSong(data);
		}

		console.log("missingFieldsFound: ", missingFieldsFound);
		return;
	};

	useEffect(() => {
		if (submitSuccess) {
			console.log("Success!!");
			navigate("/")
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
				<InputLabel htmlFor="name">Song Name</InputLabel>
				<OutlinedInput
					id="name"
					// type="time"
					value={songValues.name}
					onChange={(e) => handleSongChange(e, "name")}
					label="Song Name"
				/>
				{missingFields.includes("name") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Song Name is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="url">URL</InputLabel>
				<OutlinedInput
					id="url"
					// type="date"
					value={songValues.url}
					onChange={(e) => handleSongChange(e, "url")}
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
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel id="category-label">Category</InputLabel>
				<Select
					labelId="category-label"
					id="category"
					value={songValues.category}
					onChange={(e) => handleSongChange(e, "category")}
					label="Category"
				>
					<MenuItem value="Single">Single</MenuItem>
					<MenuItem value="New Release">New Release</MenuItem>
				</Select>
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
