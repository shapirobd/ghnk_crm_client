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
import { updateSingle } from "../actionCreators/patchActionCreators";

export default function EditSingleForm({user, singleID}) {
  const navigate = useNavigate();
	const dispatch = useDispatch();
  const singles = useSelector((state) => state.singles);

  const initialSingleData = singles.filter((single) => single.id == singleID)[0];

  const [singleValues, setSingleValues] = useState({
		name: initialSingleData.name,
		url: initialSingleData.url,
	});

  const [missingFields, setMissingFields] = useState([]);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleSingleChange = (e, key) => {
		let newValue = e.target.value;
		setSingleValues({ ...singleValues, [key]: newValue });
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (singleValues.name === "") emptyFields.push("name");
		if (singleValues.url === "") emptyFields.push("url");

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

		dispatch(updateSingle(singleID, data, code, user, setSubmitSuccess));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...singleValues };
			submitSingle(data);
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
				<InputLabel htmlFor="name">Single Name</InputLabel>
				<OutlinedInput
					id="name"
					// type="time"
					value={singleValues.name}
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
					value={singleValues.url}
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
				>
					SUBMIT
				</Button>
			</FormControl>
		</Box>
		// </ThemeProvider>
	);
}
