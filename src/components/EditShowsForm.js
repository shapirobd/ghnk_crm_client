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
import { updateShow } from "../actionCreators/patchActionCreators";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const EditShowsForm = ({ venues, venueType, showID }) => {
  const navigate = useNavigate();
  const showsWithVenues = useSelector((state) => state.showsWithVenues);
  const shows = useSelector((state) => state.shows.shows);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	console.log('shows = ', shows)

  const initialShowData = shows.filter(
		(show) => show.id == showID
	)[0];

  const initialVenueData = venues.filter(
		(venue) => venue.id === initialShowData.venueID
	)[0];

  const [showValues, setShowValues] = useState({
		venueID: initialShowData.venueID,
		date: initialShowData.date.substring(0, 10),
		time: initialShowData.time,
		is_solo: initialShowData.is_solo,
		ticket_link: initialShowData.ticket_link,
	});
	const [selectedVenue, setSelectedVenue] = useState(
		initialVenueData.name
	);
	const [selectedVenueId, setSelectedVenueId] = useState(
		initialShowData.venueID
	);
	const [newVenueValues, setNewVenueValues] = useState({
		name: "",
		address: "",
		city: "",
		state: "",
		link: "",
	});
	const [missingFields, setMissingFields] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
		setShowValues({ ...showValues, [key]: newValue });
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
		if (showValues.date === "") emptyFields.push("date");
		if (showValues.time === "") emptyFields.push("time");
		if (venueType === "Create New Venue") {
			for (let key in newVenueValues) {
				if (newVenueValues[key] === "") emptyFields.push(key);
			}
		} else {
			if (showValues.venueID === 0) emptyFields.push("venueID");
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
			const data = { ...showValues };
			if (venueType === "Create New Venue") {
				data["newVenue"] = newVenueValues;
			}
      console.log("DATA: ", data)
      let success = false;
			dispatch(updateShow(showID, data, user, setSubmitSuccess));
      
		}

		console.log("missingFieldsFound: ", missingFieldsFound);
		return;
	};

  useEffect(() => {
    if (submitSuccess) {
      navigate("/");
      setSubmitSuccess(false)
    }
  }, [submitSuccess])

	useEffect(() => {
		setShowValues({ ...showValues, venueID: selectedVenueId });
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
				<InputLabel htmlFor="ticket_link">Ticket Link</InputLabel>
				<OutlinedInput
					id="ticket_link"
					// type="time"
					value={showValues.ticket_link}
					onChange={(e) => handleShowChange(e, "ticket_link")}
					label="Ticket Link"
				/>
				{missingFields.includes("link") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Link is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<OutlinedInput
					id="date"
					type="date"
					value={showValues.date}
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
					value={showValues.time}
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
							value={showValues.is_solo}
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
				>
					SUBMIT
				</Button>
			</FormControl>
		</Box>
		// </ThemeProvider>
	);
}

export default EditShowsForm;