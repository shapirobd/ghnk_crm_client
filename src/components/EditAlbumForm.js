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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAlbum } from "../actionCreators/patchActionCreators";

export default function AlbumForm({ user, albumID }) {
  const navigate = useNavigate();
  const albums = useSelector((state) => state.albums);
	const dispatch = useDispatch();

  const initialAlbumData = albums.filter((album) => album.id == albumID)[0];

  const [albumValues, setAlbumValues] = useState({
		name: initialAlbumData.name,
		url: initialAlbumData.url,
	});

  const [missingFields, setMissingFields] = useState([]);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleAlbumChange = (e, key) => {
		let newValue = e.target.value;
		setAlbumValues({ ...albumValues, [key]: newValue });
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (albumValues.name === "") emptyFields.push("name");
		if (albumValues.url === "") emptyFields.push("url");

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

		dispatch(updateAlbum(albumID, data, code, user, setSubmitSuccess));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...albumValues };
			submitAlbum(data);
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
				<InputLabel htmlFor="name">Album Name</InputLabel>
				<OutlinedInput
					id="name"
					// type="time"
					value={albumValues.name}
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
					value={albumValues.url}
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
				>
					SUBMIT
				</Button>
			</FormControl>
		</Box>
		// </ThemeProvider>
	);
}
