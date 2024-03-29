import React, { useState, useEffect } from "react";
import {
	Checkbox,
	Box,
	FormControlLabel,
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
import CreateVenueSection from "./CreateVenueSection";
import SelectVenueSection from "./SelectVenueSection";
import jQuery from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { addShow } from '../actionCreators/postActionCreators'
import { API_URL } from "../config";

export default function ShowsForm({ venues, venueType }) {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// const theme = createTheme(Theme);
	// const classes = useStyles();
	const [selectedVenue, setSelectedVenue] = useState("");
	const [selectedVenueId, setSelectedVenueId] = useState(0);
	const [newVenueValues, setNewVenueValues] = useState({
		name: "",
		address: "",
		city: "",
		state: "",
		link: "",
	});
	const [newShowValues, setNewShowValues] = useState({
		venueID: 0,
		date: "",
		time: "",
		is_solo: false,
		ticket_link: "",
		other_artists: "",
	});
	const [missingFields, setMissingFields] = useState([]);

	const handleVenueChange = (e) => {
		const selectedOption = jQuery(".venueOption").filter(function () {
			return jQuery(this).text() === e.target.value;
		});
		const id = parseInt(selectedOption.attr("id").replace("venue_", ""));
		setSelectedVenue(e.target.value);
		updateVenueId(id);
	};

	const handleShowChange = (e, key) => {
		let newValue = e.target.value;
		if (key === "is_solo") {
			newValue = e.target.checked;
		}
		setNewShowValues({ ...newShowValues, [key]: newValue });
	};

	const handleNewVenueChange = (e, key) => {
		let newValue = e.target.value;
		setNewVenueValues({ ...newVenueValues, [key]: newValue });
	};

	const updateVenueId = (id) => {
		setSelectedVenueId(id);
	};

	const findMissingFields = () => {
		const emptyFields = [];
		if (newShowValues.date === "") emptyFields.push("date");
		if (newShowValues.time === "") emptyFields.push("time");
		if (venueType === "Create Venue") {
			for (let key in newVenueValues) {
				if (newVenueValues[key] === "") emptyFields.push(key);
			}
		} else {
			if (newShowValues.venueID === 0) emptyFields.push("venueID");
		}
		return emptyFields;
	};

	// async function submitShow(data) {
	// 	console.log(data);
	// 	const resp = await axios.post(API_URL + "/shows", {
	// 		...data,
	// 		token: user.token,
	// 	});
	// }

	const handleSubmit = (e) => {
		e.preventDefault();
		const missingFieldsFound = findMissingFields();
		setMissingFields(missingFieldsFound);

		if (!missingFieldsFound.length) {
			const data = { ...newShowValues };
			if (venueType === "Create Venue") {
				data["newVenue"] = newVenueValues;
			}
			dispatch(addShow(data, user));
		}

		console.log("missingFieldsFound: ", missingFieldsFound);
		return;
	};

	useEffect(() => {
		setNewShowValues({ ...newShowValues, venueID: selectedVenueId });
	}, [selectedVenueId]);

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
			{venueType === "Select Venue" ? (
				<SelectVenueSection
					selectedVenue={selectedVenue}
					handleVenueChange={handleVenueChange}
					venues={venues}
					missingFields={missingFields}
				/>
			) : (
				<CreateVenueSection
					newVenueValues={newVenueValues}
					handleNewVenueChange={handleNewVenueChange}
					missingFields={missingFields}
				/>
			)}
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="other_artists">Other Artists</InputLabel>
				<OutlinedInput
					id="other_artists"
					value={newShowValues.other_artists}
					onChange={(e) => handleShowChange(e, "other_artists")}
					label="Other Artists"
				/>
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="ticket_link">Ticket Link</InputLabel>
				<OutlinedInput
					id="ticket_link"
					// type="time"
					value={newShowValues.ticket_link}
					onChange={(e) => handleShowChange(e, "ticket_link")}
					label="Ticket Link"
				/>
				{/* {missingFields.includes("link") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Link is required
					</Typography>
				)} */}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<OutlinedInput
					id="date"
					type="date"
					value={newShowValues.date}
					onChange={(e) => handleShowChange(e, "date")}
					label="Date"
				/>
				{missingFields.includes("date") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Date is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<OutlinedInput
					id="outlined-adornment-password"
					type="time"
					value={newShowValues.time}
					onChange={(e) => handleShowChange(e, "time")}
					label="Time"
				/>
				{missingFields.includes("time") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Time is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }}>
				<FormControlLabel
					control={
						<Checkbox
							id="outlined-adornment-amount"
							value={newShowValues.is_solo}
							onChange={(e) => handleShowChange(e, "is_solo")}
							type="checkbox"
						/>
					}
					label="Solo Show?"
				/>
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
